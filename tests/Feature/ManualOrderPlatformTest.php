<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ManualOrderPlatformTest extends TestCase
{
    use RefreshDatabase;

    public function test_contact_page_is_static_and_does_not_accept_messages(): void
    {
        $this->get('/contact')->assertOk();

        $response = $this->post('/contact', [
            'name' => 'Customer Name',
            'email' => 'customer@example.com',
            'phone' => '+85512345678',
            'subject' => 'Manual Order Question',
            'message' => 'I need help with a manual order shipment.',
            'preferred_contact_method' => 'Telegram',
        ]);

        $response->assertStatus(405);
        $this->assertDatabaseMissing('contact_messages', ['email' => 'customer@example.com']);
    }

    public function test_customer_cannot_login_to_cms(): void
    {
        User::factory()->create([
            'email' => 'customer@example.com',
            'is_admin' => false,
            'role' => 'customer',
        ]);

        $response = $this->post('/cms/login', [
            'email' => 'customer@example.com',
            'password' => 'password',
        ]);

        $response->assertRedirect('/cms/login');
        $this->assertGuest();
    }

    public function test_customer_cannot_access_cms_contact_messages(): void
    {
        $customer = User::factory()->create(['is_admin' => false, 'role' => 'customer']);

        $this->actingAs($customer)
            ->get('/admin/contact-messages')
            ->assertForbidden();
    }

    public function test_manual_order_rejects_invalid_currency(): void
    {
        $customer = User::factory()->create([
            'customer_code' => 'CUS-2026-000001',
            'phone_e164' => '+85512345678',
            'address_line_1' => 'Phnom Penh',
            'city' => 'Phnom Penh',
            'country_code' => 'KH',
            'email_verified_at' => now(),
            'profile_completed_at' => now(),
            'preferred_currency' => 'USD',
            'preferred_locale' => 'km',
        ]);

        $response = $this->actingAs($customer)->post('/manual-order', [
            'contact_email' => 'order@example.com',
            'contact_phone' => '+85512345678',
            'address_line_1' => 'Phnom Penh',
            'currency_code' => 'KHR',
            'confirmation' => '1',
            'products' => [
                [
                    'name' => 'Test product',
                    'quantity' => 1,
                ],
            ],
        ]);

        $response->assertSessionHasErrors('currency_code');
        $this->assertDatabaseCount('orders', 0);
    }

    public function test_customer_can_submit_manual_order_without_estimated_price(): void
    {
        $customer = User::factory()->create([
            'customer_code' => 'CUS-2026-000002',
            'email' => 'customer@example.com',
            'name' => 'Dara Test Customer',
            'phone_e164' => '+85512345678',
            'address_line_1' => 'Sensok Phnom Penh',
            'city' => 'Phnom Penh',
            'country_code' => 'KH',
            'email_verified_at' => now(),
            'profile_completed_at' => now(),
            'preferred_currency' => 'USD',
            'preferred_locale' => 'en',
            'role' => 'customer',
            'is_admin' => false,
        ]);

        $response = $this->actingAs($customer)->post('/manual-order', [
            'contact_email' => 'customer@example.com',
            'contact_phone' => '+85512345678',
            'address_line_1' => 'Sensok Phnom Penh',
            'city' => 'Phnom Penh',
            'currency_code' => 'USD',
            'confirmation' => '1',
            'products' => [
                [
                    'name' => 'White running shoes',
                    'description' => 'Size 39 if available.',
                    'quantity' => 2,
                    'type' => 'Sneaker',
                    'color' => 'White',
                    'size' => '39',
                    'estimated_unit_price' => '99.99',
                    'customer_note' => 'Please confirm before buying.',
                    'urls' => ['https://example.com/product/shoes'],
                ],
            ],
        ]);

        $response->assertRedirect();

        $this->assertDatabaseHas('orders', [
            'user_id' => $customer->id,
            'title' => 'White running shoes',
            'pricing_status' => 'not_calculated',
            'subtotal_amount' => 0,
            'estimated_total_amount' => null,
        ]);

        $this->assertDatabaseHas('order_items', [
            'product_name' => 'White running shoes',
            'quantity' => 2,
            'estimated_unit_price' => null,
            'line_total' => null,
        ]);
    }

    public function test_profile_completion_rejects_duplicate_phone_with_validation_error(): void
    {
        User::factory()->create([
            'phone_e164' => '+85593843699',
            'role' => 'customer',
            'is_admin' => false,
        ]);

        $customer = User::factory()->create([
            'phone_e164' => null,
            'role' => 'customer',
            'is_admin' => false,
        ]);

        $this->actingAs($customer)
            ->from('/profile/complete')
            ->post('/profile/complete', [
                'name' => $customer->name,
                'phone_e164' => '+855 93843699',
                'address_line_1' => 'Sensok Phnom Penh, Cambodia',
                'city' => 'Phnom Penh',
                'country_code' => 'KH',
                'preferred_locale' => 'en',
                'preferred_currency' => 'USD',
                'telegram_username' => '@soporadararin',
            ])
            ->assertRedirect('/profile/complete')
            ->assertSessionHasErrors('phone_e164');

        $this->assertDatabaseMissing('users', [
            'id' => $customer->id,
            'phone_e164' => '+85593843699',
        ]);
    }

    public function test_profile_update_rejects_duplicate_phone_with_validation_error(): void
    {
        User::factory()->create([
            'phone_e164' => '+85593843699',
            'role' => 'customer',
            'is_admin' => false,
        ]);

        $customer = User::factory()->create([
            'phone_e164' => '+85511111111',
            'role' => 'customer',
            'is_admin' => false,
        ]);

        $this->actingAs($customer)
            ->from('/profile')
            ->put('/profile', [
                'name' => $customer->name,
                'phone_e164' => '+855 93843699',
                'address_line_1' => 'Phnom Penh',
                'city' => 'Phnom Penh',
                'country_code' => 'KH',
                'preferred_locale' => 'en',
                'preferred_currency' => 'USD',
            ])
            ->assertRedirect('/profile')
            ->assertSessionHasErrors('phone_e164');
    }
}
