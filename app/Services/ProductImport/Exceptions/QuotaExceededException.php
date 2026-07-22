<?php

namespace App\Services\ProductImport\Exceptions;

class QuotaExceededException extends MarketplaceProviderException
{
    public function __construct($message = "Provider API quota exceeded", $code = 429, \Throwable $previous = null)
    {
        parent::__construct(
            $message, 
            $code, 
            $previous, 
            'Automatic product information is temporarily unavailable. You can continue using Manual Order.'
        );
    }
}
