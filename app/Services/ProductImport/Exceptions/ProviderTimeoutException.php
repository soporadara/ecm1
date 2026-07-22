<?php

namespace App\Services\ProductImport\Exceptions;

class ProviderTimeoutException extends MarketplaceProviderException
{
    public function __construct($message = "Provider API request timed out", $code = 408, \Throwable $previous = null)
    {
        parent::__construct(
            $message, 
            $code, 
            $previous, 
            'The provider is currently responding too slowly. Please try again later or use Manual Order.'
        );
    }
}
