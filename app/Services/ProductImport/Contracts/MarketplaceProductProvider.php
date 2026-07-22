<?php

namespace App\Services\ProductImport\Contracts;

use App\Services\ProductImport\DTOs\ImportedProductData;

interface MarketplaceProductProvider
{
    /**
     * Get the name of the provider.
     */
    public function getName(): string;

    /**
     * Retrieve and normalize the product details.
     */
    public function getProductDetails(string $marketplace, string $itemId, string $sourceUrl): ImportedProductData;

    /**
     * Retrieve the product description HTML and images.
     */
    public function getProductDescription(string $marketplace, string $itemId): array;

    /**
     * Perform a health check on the provider.
     */
    public function checkHealth(): bool;
}
