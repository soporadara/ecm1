<?php

namespace App\Services\ProductImport\Providers;

use App\Services\ProductImport\Contracts\MarketplaceProductProvider;
use App\Services\ProductImport\DTOs\ImportedProductData;
use App\Services\ProductImport\Exceptions\InvalidItemException;
use App\Services\ProductImport\Exceptions\ProviderTimeoutException;
use App\Services\ProductImport\Exceptions\QuotaExceededException;
use App\Services\ProductImport\Exceptions\MarketplaceProviderException;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\RequestException;

class RapidApiTmapiProvider implements MarketplaceProductProvider
{
    public function getName(): string
    {
        return 'rapidapi_tmapi';
    }

    public function getProductDetails(string $marketplace, string $itemId, string $sourceUrl): ImportedProductData
    {
        $url = config('services.rapidapi.item_detail_url');
        
        if (empty($url)) {
            throw new MarketplaceProviderException("Provider configuration is incomplete.");
        }

        $response = $this->makeRequest($url, ['item_id' => $itemId]);
        
        $data = $response->json();

        if (!isset($data['code']) || $data['code'] !== 200) {
            $this->handleProviderError($data);
        }

        return $this->normalizeProductData($marketplace, $sourceUrl, $itemId, $data['data'] ?? []);
    }

    public function getProductDescription(string $marketplace, string $itemId): array
    {
        $url = config('services.rapidapi.item_description_url');
        
        if (empty($url)) {
            return ['detail_imgs' => [], 'detail_html' => null];
        }

        try {
            $response = $this->makeRequest($url, ['item_id' => $itemId]);
            $data = $response->json();
            
            if (isset($data['code']) && $data['code'] === 200 && isset($data['data'])) {
                return [
                    'detail_imgs' => $data['data']['detail_imgs'] ?? [],
                    'detail_html' => $data['data']['detail_html'] ?? null,
                ];
            }
        } catch (\Exception $e) {
            Log::warning("Failed to fetch product description for {$itemId}: " . $e->getMessage());
        }

        return ['detail_imgs' => [], 'detail_html' => null];
    }

    public function checkHealth(): bool
    {
        return !empty(config('services.rapidapi.key')) && !empty(config('services.rapidapi.host'));
    }

    protected function makeRequest(string $url, array $params)
    {
        $key = config('services.rapidapi.key');
        $host = config('services.rapidapi.host');
        $timeout = config('services.rapidapi.timeout_seconds', 20);
        $connectTimeout = config('services.rapidapi.connect_timeout_seconds', 8);
        $retries = config('services.rapidapi.retry_times', 2);

        if (empty($key) || empty($host)) {
            throw new MarketplaceProviderException("RapidAPI credentials missing.");
        }

        try {
            $response = Http::withHeaders([
                'X-RapidAPI-Host' => $host,
                'X-RapidAPI-Key' => $key,
            ])
            ->timeout($timeout)
            ->connectTimeout($connectTimeout)
            ->retry($retries, 100, function (\Exception $exception, $request) {
                if ($exception instanceof ConnectionException) {
                    return true;
                }
                if ($exception instanceof RequestException && $exception->response->status() >= 500) {
                    return true;
                }
                return false;
            })
            ->get($url, $params);

            if ($response->failed()) {
                $status = $response->status();
                if ($status === 429) {
                    throw new QuotaExceededException();
                }
                if ($status === 408) {
                    throw new ProviderTimeoutException();
                }
                if ($status === 404 || $status === 400) {
                    throw new InvalidItemException();
                }
                
                throw new MarketplaceProviderException("Provider returned HTTP {$status}");
            }

            return $response;

        } catch (ConnectionException $e) {
            throw new ProviderTimeoutException("Connection to provider timed out.", 408, $e);
        }
    }

    protected function handleProviderError(array $data)
    {
        $code = $data['code'] ?? null;
        $msg = $data['msg'] ?? 'Unknown error from provider';

        Log::error("RapidAPI TMAPI Provider Error: {$code} - {$msg}", ['data' => $data]);

        // Mapping typical provider codes if known
        if (str_contains(strtolower($msg), 'invalid item') || $code === 404) {
            throw new InvalidItemException();
        }

        if (str_contains(strtolower($msg), 'quota') || $code === 429) {
            throw new QuotaExceededException();
        }

        throw new MarketplaceProviderException("Provider returned error: {$msg}");
    }

    protected function normalizeProductData(string $marketplace, string $sourceUrl, string $itemId, array $data): ImportedProductData
    {
        $shop = null;
        if (isset($data['shop_info']) && is_array($data['shop_info'])) {
            $shop = new \App\Services\ProductImport\DTOs\ImportedShopData(
                shop_id: (string) ($data['shop_info']['shop_id'] ?? ''),
                shop_name: $data['shop_info']['shop_name'] ?? null,
                shop_url: $data['shop_info']['shop_url'] ?? null,
                seller_id: (string) ($data['shop_info']['seller_id'] ?? ''),
                shop_logo: $data['shop_info']['shop_logo'] ?? null,
                is_tmall: (bool) ($data['shop_info']['is_tmall'] ?? false)
            );
        }

        // Build a pid:vid -> Name lookup map for variants
        $optionLookup = [];
        $optionGroups = [];

        if (isset($data['sku_props']) && is_array($data['sku_props'])) {
            foreach ($data['sku_props'] as $prop) {
                $propName = $prop['prop_name'] ?? '';
                $pid = $prop['pid'] ?? '';
                
                $values = [];
                if (isset($prop['values']) && is_array($prop['values'])) {
                    foreach ($prop['values'] as $val) {
                        $vid = $val['vid'] ?? '';
                        $valName = $val['name'] ?? '';
                        $values[] = $valName;

                        if ($pid && $vid) {
                            $optionLookup["{$pid}:{$vid}"] = $valName;
                        }
                    }
                }

                if ($propName && !empty($values)) {
                    $optionGroups[] = new \App\Services\ProductImport\DTOs\ImportedProductOption(
                        name: $propName,
                        values: $values
                    );
                }
            }
        }

        $variants = [];
        $minPrice = null;
        $maxPrice = null;

        if (isset($data['skus']) && is_array($data['skus'])) {
            foreach ($data['skus'] as $sku) {
                $skuId = (string) ($sku['skuid'] ?? '');
                $salePrice = (float) ($sku['sub_price'] ?? $sku['sale_price'] ?? 0);
                $originalPrice = isset($sku['origin_price']) ? (float) $sku['origin_price'] : null;
                $stock = isset($sku['stock']) ? (int) $sku['stock'] : null;
                $propsIds = $sku['props_ids'] ?? null;

                if ($minPrice === null || $salePrice < $minPrice) {
                    $minPrice = $salePrice;
                }
                if ($maxPrice === null || $salePrice > $maxPrice) {
                    $maxPrice = $salePrice;
                }

                // Resolve labels
                $labels = [];
                if ($propsIds) {
                    $parts = explode(';', $propsIds);
                    foreach ($parts as $part) {
                        if (isset($optionLookup[$part])) {
                            $labels[] = $optionLookup[$part];
                        }
                    }
                }
                $resolvedLabels = !empty($labels) ? implode(' / ', $labels) : 'Default';

                // Try to find image (some variants have images, some don't. We'd map from sku_props.values.imageUrl if we built a better lookup)
                $image = null;
                if ($propsIds && isset($data['sku_props']) && is_array($data['sku_props'])) {
                    $parts = explode(';', $propsIds);
                    foreach ($data['sku_props'] as $prop) {
                        if (isset($prop['values']) && is_array($prop['values'])) {
                            foreach ($prop['values'] as $val) {
                                $pid = $prop['pid'] ?? '';
                                $vid = $val['vid'] ?? '';
                                if (in_array("{$pid}:{$vid}", $parts) && !empty($val['imageUrl'])) {
                                    $image = $val['imageUrl'];
                                    break 2;
                                }
                            }
                        }
                    }
                }

                if ($skuId) {
                    $variants[] = new \App\Services\ProductImport\DTOs\ImportedProductVariant(
                        external_sku_id: $skuId,
                        option_value_ids: $propsIds,
                        resolved_option_labels: $resolvedLabels,
                        sale_price: $salePrice,
                        original_price: $originalPrice,
                        stock: $stock,
                        image: $image,
                        purchasable: $stock > 0
                    );
                }
            }
        }

        $deliveryOrigin = null;
        if (isset($data['delivery_info']['area_from']) && is_array($data['delivery_info']['area_from'])) {
            $deliveryOrigin = implode(', ', $data['delivery_info']['area_from']);
        }
        $postage = $data['delivery_info']['postage'] ?? null;

        return new ImportedProductData(
            marketplace: $marketplace,
            source_url: $sourceUrl,
            external_item_id: $itemId,
            title: $data['title'] ?? 'Unknown Product',
            original_language: 'zh',
            category_id: (string) ($data['category_id'] ?? ''),
            root_category_id: (string) ($data['root_category_id'] ?? ''),
            currency: $data['currency'] ?? 'CNY',
            minimum_price: $minPrice,
            maximum_price: $maxPrice,
            main_images: is_array($data['main_imgs'] ?? null) ? $data['main_imgs'] : [],
            video_url: $data['video_url'] ?? null,
            product_properties: is_array($data['product_props'] ?? null) ? $data['product_props'] : [],
            description_images: [],
            sanitized_description_html: null,
            shop: $shop,
            delivery_origin: $deliveryOrigin,
            domestic_postage_text: $postage,
            option_groups: $optionGroups,
            variants: $variants,
            can_buy: (bool) ($data['buy_enable'] ?? true),
            can_add_to_cart: (bool) ($data['cart_enable'] ?? true),
            provider_name: $this->getName()
        );
    }
}
