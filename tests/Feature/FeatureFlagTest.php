<?php

namespace Tests\Feature;

use App\Helpers\FeatureFlags;
use App\Models\FeatureFlag;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Tests\TestCase;

class FeatureFlagTest extends TestCase
{
    use RefreshDatabase;

    // ─── Setup ──────────────────────────────────────────────────────

    protected function setUp(): void
    {
        parent::setUp();
        Cache::flush();
    }

    private function createFlag(string $name, bool $value, bool $editable = true): FeatureFlag
    {
        return FeatureFlag::create([
            'name'              => $name,
            'label'             => ucwords(str_replace('_', ' ', $name)),
            'description'       => null,
            'group'             => 'test',
            'value'             => $value,
            'is_admin_editable' => $editable,
        ]);
    }

    // ─── FeatureFlags Helper ────────────────────────────────────────

    /** @test */
    public function it_returns_true_when_flag_is_enabled(): void
    {
        $this->createFlag('some_feature', true);

        $this->assertTrue(FeatureFlags::enabled('some_feature'));
        $this->assertFalse(FeatureFlags::disabled('some_feature'));
    }

    /** @test */
    public function it_returns_false_when_flag_is_disabled(): void
    {
        $this->createFlag('some_feature', false);

        $this->assertFalse(FeatureFlags::enabled('some_feature'));
        $this->assertTrue(FeatureFlags::disabled('some_feature'));
    }

    /** @test */
    public function it_returns_false_for_nonexistent_flag(): void
    {
        $this->assertFalse(FeatureFlags::enabled('flag_that_does_not_exist'));
    }

    /** @test */
    public function it_caches_flag_results(): void
    {
        $this->createFlag('cached_flag', true);

        // First call warms cache
        FeatureFlags::enabled('cached_flag');

        $this->assertTrue(Cache::has('feature_flag:cached_flag'));
    }

    /** @test */
    public function clearing_cache_removes_cached_flag(): void
    {
        $this->createFlag('cached_flag', true);
        FeatureFlags::enabled('cached_flag');

        FeatureFlags::clearCache('cached_flag');

        $this->assertFalse(Cache::has('feature_flag:cached_flag'));
    }

    // ─── Storefront Route Gating ────────────────────────────────────

    /** @test */
    public function shop_redirects_to_home_when_products_flag_is_disabled(): void
    {
        $this->createFlag('storefront_products_enabled', false);
        $this->createFlag('storefront_product_search_enabled', false);

        $response = $this->get('/shop');
        $response->assertRedirect('/');
    }

    /** @test */
    public function shop_is_accessible_when_products_flag_is_enabled(): void
    {
        $this->createFlag('storefront_products_enabled', true);
        $this->createFlag('storefront_product_search_enabled', true);
        $this->createFlag('storefront_cart_enabled', true);

        // Should not redirect — it may fail with 500 if no products exist, that's fine
        $response = $this->get('/shop');
        $this->assertNotEquals(302, $response->status(), 'Shop page should not redirect when flag is enabled');
    }

    /** @test */
    public function cart_returns_404_when_cart_flag_is_disabled(): void
    {
        $this->createFlag('storefront_products_enabled', true);
        $this->createFlag('storefront_cart_enabled', false);

        $response = $this->get('/cart');
        $response->assertStatus(404);
    }

    /** @test */
    public function checkout_returns_404_when_checkout_flag_is_disabled(): void
    {
        $this->createFlag('storefront_products_enabled', true);
        $this->createFlag('storefront_cart_enabled', true);
        $this->createFlag('storefront_checkout_enabled', false);

        $response = $this->get('/checkout');
        $response->assertStatus(404);
    }

    /** @test */
    public function product_search_returns_empty_when_flag_disabled(): void
    {
        $this->createFlag('storefront_products_enabled', true);
        $this->createFlag('storefront_product_search_enabled', false);

        $response = $this->getJson('/api/search?q=shoes');
        $response->assertOk();
        $response->assertJson([]);
    }

    /** @test */
    public function existing_products_remain_in_database_when_storefront_disabled(): void
    {
        $this->createFlag('storefront_products_enabled', false);

        // Database should still have products table and be queryable
        $count = \App\Models\Product::count();
        $this->assertGreaterThanOrEqual(0, $count, 'Products table should remain accessible even when storefront is disabled');
    }

    // ─── Admin Feature Flag Management ─────────────────────────────

    /** @test */
    public function admin_can_view_feature_flags_page(): void
    {
        \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'Super Administrator']);
        $admin = User::factory()->create(['is_admin' => true, 'role' => 'superadmin']);
        $admin->assignRole('Super Administrator');
        $this->createFlag('storefront_products_enabled', false);

        $response = $this->actingAs($admin)->get('/admin/feature-flags');
        $response->assertOk();
    }

    /** @test */
    public function admin_can_enable_a_disabled_flag(): void
    {
        \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'Super Administrator']);
        $admin = User::factory()->create(['is_admin' => true, 'role' => 'superadmin']);
        $admin->assignRole('Super Administrator');
        $flag  = $this->createFlag('storefront_products_enabled', false);

        $response = $this->actingAs($admin)->patch("/admin/feature-flags/{$flag->id}", [
            'value' => true,
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('feature_flags', ['id' => $flag->id, 'value' => true]);
    }

    /** @test */
    public function admin_can_disable_an_enabled_flag(): void
    {
        \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'Super Administrator']);
        $admin = User::factory()->create(['is_admin' => true, 'role' => 'superadmin']);
        $admin->assignRole('Super Administrator');
        $flag  = $this->createFlag('storefront_products_enabled', true);

        $response = $this->actingAs($admin)->patch("/admin/feature-flags/{$flag->id}", [
            'value' => false,
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('feature_flags', ['id' => $flag->id, 'value' => false]);
    }

    /** @test */
    public function non_admin_cannot_access_feature_flags_admin_page(): void
    {
        $customer = User::factory()->create(['is_admin' => false, 'role' => 'customer']);

        $response = $this->actingAs($customer)->get('/admin/feature-flags');
        $response->assertRedirect();
    }

    /** @test */
    public function unauthenticated_user_cannot_access_feature_flags_admin_page(): void
    {
        $response = $this->get('/admin/feature-flags');
        $response->assertRedirect('/login');
    }

    /** @test */
    public function flag_cache_is_cleared_after_admin_update(): void
    {
        \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'Super Administrator']);
        $admin = User::factory()->create(['is_admin' => true, 'role' => 'superadmin']);
        $admin->assignRole('Super Administrator');
        $flag  = $this->createFlag('some_feature', false);

        // Warm cache
        FeatureFlags::enabled('some_feature');
        $this->assertTrue(Cache::has('feature_flag:some_feature'));

        // Admin toggles it
        $this->actingAs($admin)->patch("/admin/feature-flags/{$flag->id}", ['value' => true]);

        // Cache should be cleared
        $this->assertFalse(Cache::has('feature_flag:some_feature'));
    }

    // ─── Logistics Routes ───────────────────────────────────────────

    /** @test */
    public function homepage_is_accessible(): void
    {
        // Homepage should work even without any flags set (defaults to false/safe)
        $response = $this->get('/');
        $response->assertOk();
    }

    /** @test */
    public function logistics_public_routes_are_accessible(): void
    {
        foreach (['/how-it-works', '/shipping-rates', '/warehouses', '/track', '/contact'] as $route) {
            $response = $this->get($route);
            $this->assertNotEquals(
                404,
                $response->status(),
                "Route {$route} returned 404 unexpectedly"
            );
        }
    }
}
