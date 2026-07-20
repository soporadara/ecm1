<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AcceptanceTest extends TestCase
{
    use RefreshDatabase;

    public function test_full_ecommerce_lifecycle()
    {
        $this->artisan('db:seed', ['--class' => 'StoreSeeder']);
        
        $admin = User::factory()->create(['name' => 'Super Admin', 'email' => 'admin@test.com', 'is_admin' => true]);
        $customer = User::factory()->create(['name' => 'Customer', 'email' => 'customer@test.com']);
        $category = Category::first();

        // 1. PRODUCT MANAGER: Create Product via CMS
        $response = $this->actingAs($admin)->post('/admin/products', [
            'name' => 'Test Acceptance Product',
            'slug' => 'test-acceptance-product',
            'category_id' => $category->id,
            'price' => 100,
            'stock' => 50,
            'is_active' => true,
            'variants' => [
                ['size' => 'M', 'color' => 'Red', 'price' => 110, 'stock' => 10, 'sku' => 'TEST-M-RED'],
                ['size' => 'L', 'color' => 'Blue', 'price' => 120, 'stock' => 5, 'sku' => 'TEST-L-BLUE'],
            ],
            'image_url' => 'https://via.placeholder.com/500'
        ]);

        $response->assertRedirect('/admin/products');
        
        $product = Product::where('slug', 'test-acceptance-product')->with('variants')->first();
        $this->assertNotNull($product, "Failed: Product not created in database");
        $this->assertEquals(2, $product->variants->count(), "Failed: Product variants not saved");
        echo "Step 1 & 2 & 3 & 4 (Product Manager CMS): Passed\n";

        // 2. CUSTOMER: Find on storefront
        $response = $this->get('/shop');
        $response->assertStatus(200);
        
        $response = $this->get('/shop/' . $product->slug);
        $response->assertStatus(200);
        echo "Step 5 (Customer Storefront View): Passed\n";

        // 3. CUSTOMER: Add to Cart
        $variant = $product->variants->first();
        $response = $this->actingAs($customer)->post('/cart', [
            'product_id' => $product->id,
            'product_variant_id' => $variant->id,
            'quantity' => 2
        ]);
        $response->assertRedirect(); // back
        
        $this->assertDatabaseHas('cart_items', [
            'product_id' => $product->id,
            'product_variant_id' => $variant->id,
            'quantity' => 2
        ]);
        echo "Step 6 (Customer Cart): Passed\n";

        // 4. CUSTOMER: Checkout
        $response = $this->actingAs($customer)->post('/checkout', [
            'shipping_address' => '123 Test St',
            'shipping_province' => 'Phnom Penh',
            'shipping_district' => 'Daun Penh',
            'shipping_commune' => 'Wat Phnom',
            'shipping_phone' => '012345678',
            'payment_method' => 'aba'
        ]);

        $order = Order::where('user_id', $customer->id)->first();
        if (!$order) {
            $response->dumpSession();
            $response->dump();
        }
        $this->assertNotNull($order, "Failed: Order not created");
        $this->assertEquals('pending', $order->status);
        $this->assertEquals('aba', $order->payment_method);
        echo "Step 7 & 8 (Customer Checkout & Mock Payment): Passed\n";

        // 5. SUPER ADMIN: Update Order
        $response = $this->actingAs($admin)->patch('/admin/orders/' . $order->id, [
            'status' => 'processing'
        ]);
        
        $order->refresh();
        $this->assertEquals('processing', $order->status, "Failed: Order status not updated");
        echo "Step 9 & 10 (Admin Order Status Update): Passed\n";

        echo "\n=== ALL ACCEPTANCE TESTS PASSED ===\n";
    }
}
