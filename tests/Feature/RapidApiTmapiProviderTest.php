<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Support\Facades\Http;
use App\Services\ProductImport\Providers\RapidApiTmapiProvider;
use App\Services\ProductImport\Exceptions\InvalidItemException;
use App\Services\ProductImport\Exceptions\QuotaExceededException;
use App\Services\ProductImport\Exceptions\ProviderTimeoutException;
use App\Services\ProductImport\Exceptions\MarketplaceProviderException;
use Illuminate\Http\Client\ConnectionException;
use Illuminate\Support\Facades\Config;

class RapidApiTmapiProviderTest extends TestCase
{
    protected RapidApiTmapiProvider $provider;

    protected function setUp(): void
    {
        parent::setUp();
        $this->provider = app(RapidApiTmapiProvider::class);
        
        Config::set('services.rapidapi.key', 'fake-key');
        Config::set('services.rapidapi.host', 'fake-host');
        Config::set('services.rapidapi.item_detail_url', 'https://fake.url/item_detail');
        Config::set('services.rapidapi.retry_times', 0); // Disable retry for tests
    }

    public function test_normalizes_success_response_correctly()
    {
        $fakeResponse = [
            'code' => 200,
            'data' => [
                'title' => 'Test Product',
                'currency' => 'CNY',
                'buy_enable' => true,
                'skus' => [
                    ['skuid' => '1', 'sale_price' => '100', 'stock' => '50']
                ]
            ]
        ];

        Http::fake([
            'https://fake.url/item_detail*' => Http::response($fakeResponse, 200)
        ]);

        $dto = $this->provider->getProductDetails('taobao', '123456', 'https://example.com/123');

        $this->assertEquals('Test Product', $dto->title);
        $this->assertEquals('CNY', $dto->currency);
        $this->assertEquals(100.0, $dto->minimum_price);
        $this->assertCount(1, $dto->variants);
    }

    public function test_throws_quota_exceeded_on_429()
    {
        Http::fake([
            'https://fake.url/item_detail*' => Http::response(['message' => 'Quota Exceeded'], 429)
        ]);

        $this->expectException(QuotaExceededException::class);

        $this->provider->getProductDetails('taobao', '123456', 'https://example.com/123');
    }

    public function test_throws_invalid_item_on_404()
    {
        Http::fake([
            'https://fake.url/item_detail*' => Http::response(['message' => 'Not found'], 404)
        ]);

        $this->expectException(InvalidItemException::class);

        $this->provider->getProductDetails('taobao', '123456', 'https://example.com/123');
    }

    public function test_throws_timeout_on_connection_exception()
    {
        Http::fake([
            'https://fake.url/item_detail*' => function () {
                throw new ConnectionException("Connection timed out");
            }
        ]);

        $this->expectException(ProviderTimeoutException::class);

        $this->provider->getProductDetails('taobao', '123456', 'https://example.com/123');
    }

    public function test_throws_marketplace_provider_exception_on_500()
    {
        Http::fake([
            'https://fake.url/item_detail*' => Http::response(['message' => 'Internal Server Error'], 500)
        ]);

        $this->expectException(MarketplaceProviderException::class);

        $this->provider->getProductDetails('taobao', '123456', 'https://example.com/123');
    }

    public function test_throws_invalid_item_when_code_is_404_in_json()
    {
        Http::fake([
            'https://fake.url/item_detail*' => Http::response(['code' => 404, 'msg' => 'Invalid item'], 200)
        ]);

        $this->expectException(InvalidItemException::class);

        $this->provider->getProductDetails('taobao', '123456', 'https://example.com/123');
    }
}
