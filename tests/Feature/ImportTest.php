<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Services\ProductImportService;

class ImportTest extends TestCase
{
    use RefreshDatabase;

    public function test_import_endpoint_redirects_to_preview()
    {
        $response = $this->post('/logistics/import/preview', [
            'url' => 'https://item.taobao.com/item.htm?id=921712571727'
        ]);

        $response->assertRedirect();
        
        // Assert we redirect to the show route
        $location = $response->headers->get('Location');
        $this->assertStringContainsString('/logistics/imports/import_', $location);
    }

    public function test_taobao_url_normalization_and_sku_extraction()
    {
        $service = new ProductImportService();
        $result = $service->importFromUrl('https://item.taobao.com/item.htm?id=921712571727&mi_id=123&pvid=456&scm=789&skuId=5964722494939&spm=a21bo.50862.201871.1&utparam=something');
        
        $this->assertEquals('taobao', $result['data']['provider']);
        $this->assertEquals('921712571727', $result['data']['external_product_id']);
        $this->assertEquals('5964722494939', $result['data']['selected_external_sku_id']);
        $this->assertEquals('https://item.taobao.com/item.htm?id=921712571727', $result['data']['normalized_url']);
    }

    public function test_unsupported_marketplace_returns_failed_status()
    {
        $service = new ProductImportService();
        $result = $service->importFromUrl('https://example.com/product/123');
        
        $this->assertEquals('failed', $result['status']);
        $this->assertEquals('provider_response_invalid', $result['error']['code']);
    }

    public function test_empty_options_and_variants_are_returned_as_empty_arrays()
    {
        $service = new ProductImportService();
        $result = $service->importFromUrl('https://item.taobao.com/item.htm?id=921712571727');
        
        $this->assertIsArray($result['data']['option_groups']);
        $this->assertIsArray($result['data']['variants']);
        $this->assertIsArray($result['data']['images']);
    }
}

