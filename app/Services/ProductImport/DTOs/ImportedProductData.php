<?php

namespace App\Services\ProductImport\DTOs;

class ImportedProductData
{
    public string $provider;
    public string $source_url;
    public string $external_product_id;
    public string $title;
    public ?string $translated_title = null;
    public ?string $short_description = null;
    public ?string $full_description = null;
    public string $source_currency;
    public float $source_price;
    public ?float $converted_usd_price = null;
    public ?float $converted_khr_price = null;
    public ?string $seller_name = null;
    public ?float $seller_rating = null;
    public ?string $estimated_delivery_date = null;
    public ?float $shipping_fee = null;
    public ?string $return_policy = null;
    public array $images = [];
    public array $option_groups = [];
    public array $variants = [];
    public array $metadata = [];

    public function toArray(): array
    {
        return [
            'provider' => $this->provider,
            'source_url' => $this->source_url,
            'external_product_id' => $this->external_product_id,
            'title' => $this->title,
            'translated_title' => $this->translated_title,
            'short_description' => $this->short_description,
            'full_description' => $this->full_description,
            'source_currency' => $this->source_currency,
            'source_price' => $this->source_price,
            'converted_usd_price' => $this->converted_usd_price,
            'converted_khr_price' => $this->converted_khr_price,
            'seller_name' => $this->seller_name,
            'seller_rating' => $this->seller_rating,
            'estimated_delivery_date' => $this->estimated_delivery_date,
            'shipping_fee' => $this->shipping_fee,
            'return_policy' => $this->return_policy,
            'images' => $this->images,
            'option_groups' => $this->option_groups,
            'variants' => $this->variants,
            'metadata' => $this->metadata,
        ];
    }
}
