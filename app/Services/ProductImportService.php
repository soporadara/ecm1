<?php

namespace App\Services;

use Illuminate\Support\Str;

class ProductImportService
{
    /**
     * Determine the marketplace and extract the original product ID from the URL.
     * Mock the scraping process and return formatted product data.
     */
    public function importFromUrl(string $url): array
    {
        $parsedUrl = parse_url($url);
        $domain = $parsedUrl['host'] ?? '';
        $query = $parsedUrl['query'] ?? '';
        parse_str($query, $queryParams);

        $marketplace = 'unknown';
        $originalId = (string) Str::uuid(); // Default fallback
        $skuId = $queryParams['skuId'] ?? null;
        
        $normalizedUrl = $url;

        if (Str::contains($domain, 'taobao.com')) {
            $marketplace = 'taobao';
            if (isset($queryParams['id'])) {
                $originalId = $queryParams['id'];
                // Rebuild clean URL without tracking params
                $normalizedUrl = 'https://item.taobao.com/item.htm?id=' . $originalId;
            }
        } elseif (Str::contains($domain, 'tmall.com')) {
            $marketplace = 'tmall';
            if (isset($queryParams['id'])) {
                $originalId = $queryParams['id'];
                $normalizedUrl = 'https://detail.tmall.com/item.htm?id=' . $originalId;
            }
        } elseif (Str::contains($domain, '1688.com')) {
            $marketplace = '1688';
            preg_match('/offer\/(\d+)/', $url, $matches);
            if (!empty($matches[1])) {
                $originalId = $matches[1];
                $normalizedUrl = 'https://detail.1688.com/offer/' . $originalId . '.html';
            }
        } elseif (Str::contains($domain, 'alibaba.com')) {
            $marketplace = 'alibaba';
            preg_match('/product-detail\/[^\/]+_(\d+)/', $url, $matches);
            if (!empty($matches[1])) {
                $originalId = $matches[1];
            }
        } elseif (Str::contains($domain, 'pinduoduo.com') || Str::contains($domain, 'yangkeduo.com')) {
            $marketplace = 'pinduoduo';
            if (isset($queryParams['goods_id'])) {
                $originalId = $queryParams['goods_id'];
            }
        } elseif (Str::contains($domain, 'aliexpress.com')) {
            $marketplace = 'aliexpress';
            preg_match('/item\/(\d+)/', $url, $matches);
            if (!empty($matches[1])) {
                $originalId = $matches[1];
            }
        }

        if ($marketplace === 'unknown') {
            return [
                'status' => 'failed',
                'error' => [
                    'code' => 'provider_response_invalid',
                    'message' => 'Unsupported marketplace URL. Please use a supported platform link or create a manual order.',
                    'retryable' => false
                ]
            ];
        }

        // Delay to simulate scraping API
        sleep(2);

        // Return a highly realistic mock product payload matching the user's Taobao URL concept
        return [
            'success' => true,
            'data' => [
                'provider' => $marketplace,
                'source_url' => $url,
                'normalized_url' => $normalizedUrl,
                'external_product_id' => $originalId,
                'selected_external_sku_id' => $skuId,
                'title' => 'Spring/Summer New Korean Style Loose Fit Wide Leg Pants High Waist Casual Trousers for Women',
                'translated_title' => '春夏新款韩版宽松阔腿裤高腰休闲裤女',
                'original_title' => '春夏新款韩版宽松阔腿裤高腰休闲裤女', // Retained for compatibility with frontend code
                'short_description' => '',
                'full_description' => 'A beautifully tailored casual pant perfect for the spring and summer seasons. Imported high-quality fabric.',
                'description' => 'A beautifully tailored casual pant perfect for the spring and summer seasons. Imported high-quality fabric.', // Retained
                'source_currency' => 'CNY',
                'source_price' => 129.00,
                'price_cny' => 129.00, // Retained
                'converted_usd_price' => 18.50,
                'price_usd' => 18.50, // Retained
                'converted_khr_price' => null,
                'seller' => [
                    'name' => 'Fashion Studio 88',
                    'rating' => null
                ],
                'seller_name' => 'Fashion Studio 88', // Retained
                'delivery' => [
                    'estimated_from' => null,
                    'estimated_to' => null,
                    'shipping_fee' => null,
                    'return_policy' => null
                ],
                'marketplace' => $marketplace, // Retained
                'original_id' => $originalId, // Retained
                'main_image' => 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80',
                'images' => [
                    'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80',
                    'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?w=800&q=80',
                    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80'
                ],
                'option_groups' => [], // Ensure options groups are safely initialized
                'variants' => [
                    [
                        'id' => 'v1',
                        'sku' => 'BLK-S',
                        'name' => 'Black / S',
                        'price_cny' => 129.00,
                        'stock' => 50,
                        'image' => null,
                        'attributes' => [
                            ['name' => 'Color', 'value' => 'Black'],
                            ['name' => 'Size', 'value' => 'S']
                        ]
                    ],
                    [
                        'id' => 'v2',
                        'sku' => 'BLK-M',
                        'name' => 'Black / M',
                        'price_cny' => 129.00,
                        'stock' => 30,
                        'image' => null,
                        'attributes' => [
                            ['name' => 'Color', 'value' => 'Black'],
                            ['name' => 'Size', 'value' => 'M']
                        ]
                    ],
                    [
                        'id' => 'v3',
                        'sku' => 'KHA-S',
                        'name' => 'Khaki / S',
                        'price_cny' => 139.00,
                        'stock' => 10,
                        'image' => null,
                        'attributes' => [
                            ['name' => 'Color', 'value' => 'Khaki'],
                            ['name' => 'Size', 'value' => 'S']
                        ]
                    ]
                ],
                'options' => [
                    [
                        'name' => 'Color',
                        'values' => ['Black', 'Khaki']
                    ],
                    [
                        'name' => 'Size',
                        'values' => ['S', 'M', 'L', 'XL']
                    ]
                ],
                'metadata' => []
            ]
        ];
    }
}
