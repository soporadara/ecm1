<?php

namespace App\Services\ProductImport\DTOs;

class ImportedProductData
{
    public function __construct(
        public string $marketplace,
        public string $source_url,
        public string $external_item_id,
        public string $title,
        public ?string $original_language = 'zh',
        public ?string $category_id = null,
        public ?string $root_category_id = null,
        public string $currency = 'CNY',
        public ?float $minimum_price = null,
        public ?float $maximum_price = null,
        public array $main_images = [], // array of strings
        public ?string $video_url = null,
        public array $product_properties = [], // array of key-value pairs
        public array $description_images = [], // array of strings
        public ?string $sanitized_description_html = null,
        public ?ImportedShopData $shop = null,
        public ?string $delivery_origin = null,
        public ?string $domestic_postage_text = null,
        /** @var ImportedProductOption[] */
        public array $option_groups = [],
        /** @var ImportedProductVariant[] */
        public array $variants = [],
        public bool $can_buy = true,
        public bool $can_add_to_cart = true,
        public ?string $imported_at = null,
        public string $provider_name = 'unknown'
    ) {
        $this->imported_at = $this->imported_at ?? now()->toIso8601String();
    }
}
