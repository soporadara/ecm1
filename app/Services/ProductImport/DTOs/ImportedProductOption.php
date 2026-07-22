<?php

namespace App\Services\ProductImport\DTOs;

class ImportedProductOption
{
    public function __construct(
        public string $name,
        public array $values // array of strings (e.g., ['Black', 'Khaki'])
    ) {}
}
