<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ImportedProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = is_array($this->resource) ? $this->resource : $this->resource->toArray();

        return [
            'provider' => $data['provider'] ?? $data['marketplace'] ?? 'taobao',
            'source_url' => $data['source_url'] ?? $data['original_url'] ?? '',
            'normalized_url' => $data['normalized_url'] ?? '',
            'external_product_id' => $data['external_product_id'] ?? $data['original_id'] ?? '',
            'selected_external_sku_id' => $data['selected_external_sku_id'] ?? null,
            'title' => $data['title'] ?? 'Unknown Product',
            'translated_title' => $data['translated_title'] ?? '',
            'short_description' => $data['short_description'] ?? '',
            'full_description' => $data['full_description'] ?? $data['description'] ?? '',
            'source_currency' => $data['source_currency'] ?? 'CNY',
            'source_price' => $data['source_price'] ?? $data['price_cny'] ?? null,
            'converted_usd_price' => $data['converted_usd_price'] ?? $data['price_usd'] ?? null,
            'converted_khr_price' => $data['converted_khr_price'] ?? null,
            'main_image' => $data['main_image'] ?? (is_array($data['images'] ?? null) && count($data['images']) > 0 ? $data['images'][0] : ''),
            
            // Guaranteed arrays
            'images' => is_array($data['images'] ?? null) ? $data['images'] : [],
            'variants' => is_array($data['variants'] ?? null) ? $data['variants'] : [],
            'option_groups' => is_array($data['option_groups'] ?? null) ? $data['option_groups'] : (is_array($data['options'] ?? null) ? $data['options'] : []),
            
            // Guaranteed objects
            'metadata' => is_array($data['metadata'] ?? null) ? $data['metadata'] : (is_object($data['metadata'] ?? null) ? (array) $data['metadata'] : []),
            'seller' => is_array($data['seller'] ?? null) ? $data['seller'] : (is_object($data['seller'] ?? null) ? (array) $data['seller'] : []),
            'delivery' => is_array($data['delivery'] ?? null) ? $data['delivery'] : (is_object($data['delivery'] ?? null) ? (array) $data['delivery'] : []),
            'prices' => is_array($data['prices'] ?? null) ? $data['prices'] : (is_object($data['prices'] ?? null) ? (array) $data['prices'] : []),
            'attributes' => is_array($data['attributes'] ?? null) ? $data['attributes'] : (is_object($data['attributes'] ?? null) ? (array) $data['attributes'] : []),
        ];
    }
}
