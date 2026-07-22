<?php

namespace App\Services\ProductImport\DTOs;

class ImportedProductVariant
{
    public function __construct(
        public string $external_sku_id,
        public ?string $option_value_ids, // e.g., "1627207:3232483;122216750:42189993"
        public string $resolved_option_labels, // e.g., "Black / S"
        public float $sale_price,
        public ?float $original_price,
        public ?int $stock,
        public ?string $image,
        public bool $purchasable
    ) {}
}
