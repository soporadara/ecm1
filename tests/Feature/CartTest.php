<?php

namespace Tests\Feature;

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CartTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_view_cart()
    {
        $response = $this->get('/cart');
        $response->assertStatus(200);
    }

    public function test_can_add_item_to_cart()
    {
        $product = Product::factory()->create([
            'price' => 99.99
        ]);

        $response = $this->post('/cart', [
            'product_id' => $product->id,
            'quantity' => 2
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('cart_items', [
            'product_id' => $product->id,
            'quantity' => 2,
            'price' => 99.99
        ]);
    }

    public function test_can_remove_item_from_cart()
    {
        $product = Product::factory()->create(['price' => 50.00]);
        $this->post('/cart', ['product_id' => $product->id, 'quantity' => 1]);
        
        $item = \App\Models\CartItem::first();
        
        $response = $this->delete('/cart/' . $item->id);
        
        $response->assertRedirect();
        $this->assertDatabaseMissing('cart_items', ['id' => $item->id]);
    }
}
