<?php

namespace App\Services\ProductImport\DTOs;

class ImportedShopData
{
    public function __construct(
        public ?string $shop_id = null,
        public ?string $shop_name = null,
        public ?string $shop_url = null,
        public ?string $seller_id = null,
        public ?string $shop_logo = null,
        public ?bool $is_tmall = false
    ) {}
}
