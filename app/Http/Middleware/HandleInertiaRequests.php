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

        $adminNotifications = [];
        if ($isAdminRoute && $activeUser && \Illuminate\Support\Facades\Schema::hasTable('manual_orders')) {
            $adminNotifications = \App\Models\ManualOrder::with('user')
                ->orderBy('created_at', 'desc')
                ->take(10)
                ->get()
                ->map(function($order) {
                    $action = 'submitted';
                    if ($order->status === 'cancelled') $action = 'cancelled';
                    else if ($order->status === 'completed') $action = 'completed';
                    
                    return [
                        'id' => $order->id,
                        'title' => 'Manual Order ' . ucfirst($action),
                        'message' => 'Order #' . $order->order_number . ' ' . $action . ' by ' . ($order->user->name ?? 'Guest'),
                        'avatar' => $order->user->avatar ?? null,
                        'name' => $order->user->name ?? 'Guest',
                        'status' => $order->status,
                        'time' => $order->created_at->diffForHumans(),
                        'url' => '/admin/logistics/orders'
                    ];
                });
        }

        return [
            ...parent::share($request),
            'auth' => fn () => [
                'user' => $activeUser ? array_merge($activeUser->toArray(), [
                    'roles' => $activeUser->getRoleNames(),
                    'permissions' => $activeUser->getAllPermissions()->pluck('name'),
                    'profile_missing_fields' => $activeUser->is_admin ? [] : app(CustomerProfileCompletionService::class)->missingFields($activeUser),
                    'profile_is_complete' => $activeUser->is_admin ? true : app(CustomerProfileCompletionService::class)->isComplete($activeUser),
                ]) : null,
                'admin_notifications' => $adminNotifications,
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
                'open_login_modal' => fn () => $request->session()->get('open_login_modal'),
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
                'pages' => \Illuminate\Support\Facades\Schema::hasTable('pages')
                    ? \App\Models\Page::where('is_published', true)->get(['id', 'title', 'slug', 'is_system'])
                    : [],
            ],
            'seo_settings' => \Illuminate\Support\Facades\Schema::hasTable('settings')
                ? \App\Models\Setting::where('group', 'seo')->pluck('value', 'key')->toArray()
                : [],
            'general_settings' => \Illuminate\Support\Facades\Schema::hasTable('settings')
                ? \App\Models\Setting::where('group', 'general')->pluck('value', 'key')->toArray()
                : [],
            'admin_counts' => $request->is('admin/*') || $request->is('admin') ? [
                'customers' => \App\Models\User::where('role', 'customer')->count(),
                'orders' => \Illuminate\Support\Facades\Schema::hasTable('orders') ? \DB::table('orders')->count() : 0,
                'posts' => \Illuminate\Support\Facades\Schema::hasTable('posts') ? \DB::table('posts')->count() : 0,
                'pages' => \Illuminate\Support\Facades\Schema::hasTable('pages') ? \DB::table('pages')->count() : 0,
            ] : [],
            'cart' => $cart,
        ];
    }
}
