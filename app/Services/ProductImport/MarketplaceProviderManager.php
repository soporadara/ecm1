<?php

namespace App\Services\ProductImport;

use App\Services\ProductImport\Contracts\MarketplaceProductProvider;
use App\Services\ProductImport\Providers\RapidApiTmapiProvider;
use Illuminate\Support\Facades\Log;

class MarketplaceProviderManager
{
    /**
     * Get the configured provider for Taobao/Tmall.
     */
    public function getTaobaoProvider(): MarketplaceProductProvider
    {
        $providerConfig = config('services.marketplace.taobao_provider', 'rapidapi_tmapi');

        if ($providerConfig === 'rapidapi_tmapi') {
            return app(RapidApiTmapiProvider::class);
        }

        Log::warning("Unknown Taobao provider configured: {$providerConfig}. Falling back to RapidAPI TMAPI.");
        return app(RapidApiTmapiProvider::class);
    }
}
