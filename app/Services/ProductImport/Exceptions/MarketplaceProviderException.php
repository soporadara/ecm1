<?php

namespace App\Services\ProductImport\Exceptions;

use Exception;

class MarketplaceProviderException extends Exception
{
    protected ?string $safeUserMessage;

    public function __construct($message = "", $code = 0, \Throwable $previous = null, ?string $safeUserMessage = null)
    {
        parent::__construct($message, $code, $previous);
        $this->safeUserMessage = $safeUserMessage ?? 'Automatic product information is temporarily unavailable. You can continue using Manual Order.';
    }

    public function getSafeUserMessage(): string
    {
        return $this->safeUserMessage;
    }
}
