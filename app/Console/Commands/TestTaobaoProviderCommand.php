<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\ProductImport\MarketplaceProviderManager;
use App\Services\ProductImport\Exceptions\MarketplaceProviderException;

class TestTaobaoProviderCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'marketplace:test-taobao {item_id : The Taobao/Tmall item ID}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test the Taobao RapidAPI provider connection and extraction';

    /**
     * Execute the console command.
     */
    public function handle(MarketplaceProviderManager $manager)
    {
        $itemId = $this->argument('item_id');
        $this->info("Testing Taobao provider for item ID: {$itemId}");

        $provider = $manager->getTaobaoProvider();

        if (!$provider->checkHealth()) {
            $this->error("Provider configuration is incomplete or invalid.");
            return 1;
        }

        try {
            $this->info("Requesting product details...");
            $data = $provider->getProductDetails('taobao', $itemId, "https://item.taobao.com/item.htm?id={$itemId}");
            
            $this->info("Success! Product data retrieved.");
            
            $this->table(
                ['Property', 'Value'],
                [
                    ['Title', $data->title],
                    ['Currency', $data->currency],
                    ['Min Price', $data->minimum_price],
                    ['Max Price', $data->maximum_price],
                    ['Images Count', count($data->main_images)],
                    ['Option Groups Count', count($data->option_groups)],
                    ['SKUs/Variants Count', count($data->variants)],
                ]
            );
            
            return 0;
            
        } catch (MarketplaceProviderException $e) {
            $this->error("Provider API Error: " . $e->getMessage());
            $this->line("Safe User Message: " . $e->getSafeUserMessage());
            return 1;
        } catch (\Exception $e) {
            $this->error("Unexpected Error: " . $e->getMessage());
            return 1;
        }
    }
}
