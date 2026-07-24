<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PublicNavigationAndDemoTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_navigation_source_contains_final_menu_without_blogs(): void
    {
        $layout = file_get_contents(resource_path('js/Layouts/MainLayout.tsx'));
        $mobile = file_get_contents(resource_path('js/Components/MobileMenu.tsx'));
        $home = file_get_contents(resource_path('js/Pages/Home.tsx'));

        foreach (['Home', 'Manual Order', 'Contact'] as $label) {
            $this->assertStringContainsString($label, $layout);
            $this->assertStringContainsString($label, $mobile);
        }

        $this->assertStringNotContainsString("label: 'Blogs'", $layout);
        $this->assertStringNotContainsString("label: 'Blogs'", $mobile);
        $this->assertStringNotContainsString('href="/blog"', $layout);
        $this->assertStringNotContainsString('href="/blog"', $mobile);
        $this->assertStringNotContainsString('Track Orders', $layout);
        $this->assertStringNotContainsString('Order History', $layout);
        $this->assertStringNotContainsString('Track My Orders', $home);
        $this->assertStringNotContainsString('View Order History', $home);
    }

    public function test_homepage_source_contains_two_service_cards_and_available_sites(): void
    {
        $home = file_get_contents(resource_path('js/Pages/Home.tsx'));
        $english = file_get_contents(resource_path('js/locales/en.json'));
        $khmer = file_get_contents(resource_path('js/locales/km.json'));
        $vietnamese = file_get_contents(resource_path('js/locales/vi.json'));

        $this->assertStringContainsString('services.product_purchasing', $home);
        $this->assertStringContainsString('services.logistics_delivery', $home);
        $this->assertStringContainsString('Product Purchasing Service', $english);
        $this->assertStringContainsString('សេវាកម្មបញ្ជាទិញទំនិញ', $khmer);
        $this->assertStringContainsString('Dịch vụ logistics và giao hàng', $vietnamese);
        $this->assertStringContainsString('data-service-card="true"', $home);
        $this->assertSame(1, substr_count($home, 'services.map'));
        $this->assertStringContainsString('available_sites.title', $home);
        $this->assertStringContainsString('Available Sites', $english);
        $this->assertStringContainsString('គេហទំព័រដែលអាចបញ្ជាទិញបាន', $khmer);
        $this->assertStringContainsString('Các trang mua sắm được hỗ trợ', $vietnamese);
    }

    public function test_cms_sidebar_keeps_available_sites_and_removes_retired_modules(): void
    {
        $layout = file_get_contents(resource_path('js/Layouts/AdminLayout.tsx'));

        $this->assertStringContainsString('Available Sites', $layout);
        $this->assertStringContainsString('/admin/available-sites', $layout);
        $this->assertStringNotContainsString('Manual Order Wording', $layout);
        $this->assertStringNotContainsString('Media Library', $layout);
        $this->assertStringNotContainsString('Contact Messages', $layout);
        $this->assertStringNotContainsString("label: 'SEO'", $layout);
    }

    public function test_old_duplicate_customer_order_routes_redirect_to_my_orders(): void
    {
        $customer = User::factory()->create([
            'is_admin' => false,
            'role' => 'customer',
        ]);

        $this->actingAs($customer)->get('/track-orders')->assertRedirect('/my-orders');
        $this->actingAs($customer)->get('/order-history')->assertRedirect('/my-orders');
    }

    public function test_logged_out_manual_order_redirects_to_customer_login_with_intended_url(): void
    {
        $response = $this->get('/manual-order');

        $response->assertRedirect('/login');
        $this->assertSame('http://localhost/manual-order', session()->get('url.intended'));
    }

    public function test_cms_blog_management_routes_remain_available_to_staff(): void
    {
        $admin = User::factory()->create([
            'is_admin' => true,
            'role' => 'super_admin',
        ]);

        $this->actingAs($admin)->get('/admin/posts')->assertOk();
    }

    public function test_demo_seed_creates_required_accounts(): void
    {
        $this->artisan('demo:seed --fresh')->assertSuccessful();

        $this->assertDatabaseHas('users', [
            'email' => 'sokha.customer@example.test',
            'customer_code' => 'CUS-TEST-KH-0001',
            'preferred_locale' => 'km',
            'preferred_currency' => 'USD',
            'is_demo' => true,
        ]);

        $this->assertDatabaseHas('users', [
            'email' => 'nguyen.customer@example.test',
            'customer_code' => 'CUS-TEST-VN-0002',
            'preferred_locale' => 'vi',
            'preferred_currency' => 'VND',
            'is_demo' => true,
        ]);

        $this->assertDatabaseHas('users', [
            'email' => 'superadmin@example.test',
            'role' => 'super_admin',
            'is_admin' => true,
            'is_demo' => true,
        ]);

        $this->assertDatabaseHas('orders', [
            'order_number' => 'ORD-TEST-KH-0001',
            'currency_code' => 'USD',
            'final_total_amount' => 9400,
            'is_demo' => true,
        ]);

        $this->assertDatabaseHas('orders', [
            'order_number' => 'ORD-TEST-VN-0002',
            'currency_code' => 'VND',
            'final_total_amount' => 1530000,
            'is_demo' => true,
        ]);

        $this->assertDatabaseHas('receipts', [
            'receipt_number' => 'RCP-TEST-KH-0001',
            'is_demo' => true,
        ]);
    }
}
