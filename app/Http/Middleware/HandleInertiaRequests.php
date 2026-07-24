<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Helpers\FeatureFlags;
use App\Services\CustomerProfileCompletionService;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        // Only load cart when the storefront cart feature is enabled
        $cart = null;
        if (FeatureFlags::enabled('storefront_cart_enabled') && \Illuminate\Support\Facades\Schema::hasTable('carts')) {
            $sessionId = \Illuminate\Support\Facades\Session::getId();
            if (auth()->check()) {
                $cart = \App\Models\Cart::with(['items.product.images', 'items.productVariant'])
                    ->where('user_id', auth()->id())
                    ->first();
            }
            if (!$cart) {
                $cart = \App\Models\Cart::with(['items.product.images', 'items.productVariant'])
                    ->where('session_id', $sessionId)
                    ->first();
            }
        }

        $isAdminRoute = $request->is('admin') || $request->is('admin/*') || $request->is('cms/*');
        $activeUser = $isAdminRoute ? auth('admin')->user() : auth('web')->user();

        return [
            ...parent::share($request),
            'auth' => fn () => [
                'user' => $activeUser ? array_merge($activeUser->toArray(), [
                    'roles' => $activeUser->getRoleNames(),
                    'permissions' => $activeUser->getAllPermissions()->pluck('name'),
                    'profile_missing_fields' => $activeUser->is_admin ? [] : app(CustomerProfileCompletionService::class)->missingFields($activeUser),
                    'profile_is_complete' => $activeUser->is_admin ? true : app(CustomerProfileCompletionService::class)->isComplete($activeUser),
                ]) : null,
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'global_nav' => fn () => [
                'categories' => \App\Models\Category::whereNull('parent_id')->with('children')->get(),
                'brands' => \App\Models\Brand::take(6)->get(),
                'collections' => \App\Models\Collection::where('is_active', true)->take(6)->get(),
                'menus' => \Illuminate\Support\Facades\Schema::hasTable('menus') 
                    ? \App\Models\Menu::where('is_active', true)
                        ->with(['items' => fn($q) => $q->whereNull('parent_id')->orderBy('order')->with('children')])
                        ->orderBy('id')
                        ->get() 
                    : [],
            ],
            'seo_settings' => \Illuminate\Support\Facades\Schema::hasTable('settings')
                ? \App\Models\Setting::where('group', 'seo')->pluck('value', 'key')->toArray()
                : [],
            'general_settings' => \Illuminate\Support\Facades\Schema::hasTable('settings')
                ? \App\Models\Setting::where('group', 'general')->pluck('value', 'key')->toArray()
                : [],
            'cart' => $cart,
        ];
    }
}
