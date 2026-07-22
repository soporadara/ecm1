<?php

namespace App\Services\ProductImport\Exceptions;

class InvalidItemException extends MarketplaceProviderException
{
    public function __construct($message = "Invalid or unsupported item", $code = 400, \Throwable $previous = null)
    {
        parent::__construct(
            $message, 
            $code, 
            $previous, 
            'The requested item is invalid, unsupported, or no longer available.'
        );
    }
}
