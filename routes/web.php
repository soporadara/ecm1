<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [\App\Http\Controllers\HomeController::class, 'index'])->name('home');

// Auth routes
use App\Http\Controllers\AuthController;

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);
    
    // Google Auth
    Route::get('/auth/google', [AuthController::class, 'redirectToGoogle'])->name('auth.google');
    Route::get('/auth/google/callback', [AuthController::class, 'handleGoogleCallback']);

    // Password Reset
    Route::get('/forgot-password', [\App\Http\Controllers\PasswordResetController::class, 'showForgotForm'])->name('password.request');
    Route::post('/forgot-password', [\App\Http\Controllers\PasswordResetController::class, 'sendResetLink'])->name('password.email');
    Route::get('/reset-password/{token}', [\App\Http\Controllers\PasswordResetController::class, 'showResetForm'])->name('password.reset');
    Route::post('/reset-password', [\App\Http\Controllers\PasswordResetController::class, 'resetPassword'])->name('password.update');
});

Route::post('/logout', [AuthController::class, 'logout'])->name('logout')->middleware('auth');

Route::middleware('auth')->group(function () {
    Route::put('/profile', [\App\Http\Controllers\ProfileController::class, 'update'])->name('profile.update');
    Route::put('/profile/password', [\App\Http\Controllers\ProfileController::class, 'updatePassword'])->name('profile.password.update');
    Route::post('/profile/avatar', [\App\Http\Controllers\ProfileController::class, 'updateAvatar'])->name('profile.avatar.update');
});

// Admin routes
Route::middleware(['auth', 'is_admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');
    Route::get('/profile', [\App\Http\Controllers\ProfileController::class, 'editAdmin'])->name('profile.edit');
    

    Route::resource('products', \App\Http\Controllers\Admin\ProductController::class);
    Route::get('orders', [\App\Http\Controllers\Admin\OrderController::class, 'index'])->name('orders.index');
    Route::patch('orders/{order}', [\App\Http\Controllers\Admin\OrderController::class, 'update'])->name('orders.update');
    Route::resource('pages', \App\Http\Controllers\Admin\PageController::class);
    Route::resource('posts', \App\Http\Controllers\Admin\PostController::class);
    Route::resource('popups', \App\Http\Controllers\Admin\PopupController::class);
    
    // Categories
    Route::resource('categories', \App\Http\Controllers\Admin\CategoryController::class);

    // Customers
    Route::get('customers', [\App\Http\Controllers\Admin\CustomerController::class, 'index'])->name('customers.index');
    Route::get('customers/{user}', [\App\Http\Controllers\Admin\CustomerController::class, 'show'])->name('customers.show');

    // Brands
    Route::resource('brands', \App\Http\Controllers\Admin\BrandController::class)->only(['index', 'store', 'update', 'destroy']);

    // Coupons
    Route::resource('coupons', \App\Http\Controllers\Admin\CouponController::class);
    
    // Media Library
    Route::get('media', [\App\Http\Controllers\Admin\MediaController::class, 'index'])->name('media.index');
    Route::post('media', [\App\Http\Controllers\Admin\MediaController::class, 'store'])->name('media.store');
    Route::delete('media/{media}', [\App\Http\Controllers\Admin\MediaController::class, 'destroy'])->name('media.destroy');
    
    // Menus
    Route::resource('menus', \App\Http\Controllers\Admin\MenuController::class)->except(['create', 'show', 'edit']);
    Route::post('menus/{menu}/items/bulk', [\App\Http\Controllers\Admin\MenuController::class, 'storeBulkItems'])->name('menus.items.storeBulk');
    Route::post('menus/{menu}/items', [\App\Http\Controllers\Admin\MenuController::class, 'storeItem'])->name('menus.items.store');
    Route::put('menus/{menu}/items/{item}', [\App\Http\Controllers\Admin\MenuController::class, 'updateItem'])->name('menus.items.update');
    Route::delete('menus/{menu}/items/{item}', [\App\Http\Controllers\Admin\MenuController::class, 'destroyItem'])->name('menus.items.destroy');
    
    // Banner Settings
    Route::resource('banners', \App\Http\Controllers\Admin\BannerController::class);
    
    // SEO Settings
    Route::get('/seo', [\App\Http\Controllers\Admin\SeoController::class, 'index'])->name('seo.index');
    Route::post('/seo', [\App\Http\Controllers\Admin\SeoController::class, 'store'])->name('seo.store');

    // CMS Modules
    Route::resource('reviews', \App\Http\Controllers\Admin\ReviewController::class)->only(['index', 'destroy']);
    Route::get('/settings', [\App\Http\Controllers\Admin\SettingController::class, 'index'])->name('settings.index');
    Route::post('/settings', [\App\Http\Controllers\Admin\SettingController::class, 'store'])->name('settings.store');
    Route::get('/themes', [\App\Http\Controllers\Admin\ThemeController::class, 'index'])->name('themes.index');
    Route::get('/customize', [\App\Http\Controllers\Admin\ThemeController::class, 'customize'])->name('themes.customize');
    Route::post('/customize', [\App\Http\Controllers\Admin\ThemeController::class, 'updateCustomize'])->name('themes.customize.update');

    // User management
    Route::resource('users', \App\Http\Controllers\Admin\UserController::class)->only(['index', 'update']);
    
    // Staff & RBAC
    Route::resource('staff', \App\Http\Controllers\Admin\StaffController::class)->except(['show']);

    // Feature Flags (Logistics Platform)
    Route::get('feature-flags', [\App\Http\Controllers\Admin\FeatureFlagController::class, 'index'])->name('feature-flags.index');
    Route::patch('feature-flags/{featureFlag}', [\App\Http\Controllers\Admin\FeatureFlagController::class, 'update'])->name('feature-flags.update');

    // Marketplaces (Logistics Platform)
    Route::resource('marketplaces', \App\Http\Controllers\Admin\MarketplaceAdminController::class)->only(['index', 'store', 'update', 'destroy']);
});

// Storefront routes (gated by feature flags via middleware)
Route::middleware(['storefront'])->group(function () {
    Route::get('/shop', [ProductController::class, 'index'])->name('shop.index');
    Route::get('/api/search', [ProductController::class, 'searchLive'])->name('api.search');
    Route::get('/shop/{product:slug}', [ProductController::class, 'show'])->name('shop.show');

    // Customer Profile
    Route::middleware('auth')->group(function () {
        Route::get('/profile', [\App\Http\Controllers\ProfileController::class, 'editCustomer'])->name('profile.edit');
    });

    // Reviews
    Route::post('/products/{product}/reviews', [\App\Http\Controllers\ReviewController::class, 'store'])
        ->middleware('auth')
        ->name('reviews.store');

    Route::get('/cart', [\App\Http\Controllers\CartController::class, 'index'])->name('cart.index');
    Route::post('/cart', [\App\Http\Controllers\CartController::class, 'store'])->name('cart.store');
    Route::patch('/cart/{item}', [\App\Http\Controllers\CartController::class, 'update'])->name('cart.update');
    Route::delete('/cart/{item}', [\App\Http\Controllers\CartController::class, 'destroy'])->name('cart.destroy');

    Route::get('/checkout', [\App\Http\Controllers\CheckoutController::class, 'index'])->name('checkout.index');
    Route::post('/checkout', [\App\Http\Controllers\CheckoutController::class, 'store'])->name('checkout.store');

    // Quick Checkout routes
    Route::post('/api/coupons/validate', [\App\Http\Controllers\QuickCheckoutController::class, 'validateCoupon'])->name('api.coupons.validate');
    Route::post('/checkout/quick', [\App\Http\Controllers\QuickCheckoutController::class, 'store'])->name('checkout.quick.store');

    // Stripe Routes
    Route::get('/checkout/stripe', [\App\Http\Controllers\StripeCheckoutController::class, 'createSession'])->name('checkout.stripe');
    Route::get('/checkout/success', [\App\Http\Controllers\StripeCheckoutController::class, 'success'])->name('checkout.success');
    Route::get('/checkout/cancel', [\App\Http\Controllers\StripeCheckoutController::class, 'cancel'])->name('checkout.cancel');
});

Route::get('/blog', [\App\Http\Controllers\BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [\App\Http\Controllers\BlogController::class, 'show'])->name('blog.show');

Route::get('/pages/{slug}', [\App\Http\Controllers\PageController::class, 'show'])->name('page.show');

// Logistics Platform Public Routes
Route::get('/how-it-works', [\App\Http\Controllers\LogisticsController::class, 'howItWorks'])->name('how-it-works');
Route::get('/shipping-rates', [\App\Http\Controllers\LogisticsController::class, 'shippingRates'])->name('shipping-rates');
Route::get('/warehouses', [\App\Http\Controllers\LogisticsController::class, 'warehouses'])->name('warehouses');
Route::get('/track', [\App\Http\Controllers\LogisticsController::class, 'track'])->name('track');
Route::get('/contact', [\App\Http\Controllers\LogisticsController::class, 'contact'])->name('contact');
Route::get('/logistics/import', [\App\Http\Controllers\ProductImportController::class, 'index'])->name('logistics.import.index');
Route::post('/logistics/import/preview', [\App\Http\Controllers\ProductImportController::class, 'preview'])->name('logistics.import.preview');
Route::post('/logistics/import/confirm', [\App\Http\Controllers\ProductImportController::class, 'confirm'])->name('logistics.import.confirm');
Route::get('/logistics/imports/{importJob}', [\App\Http\Controllers\ProductImportController::class, 'show'])->name('logistics.import.show');
Route::post('/logistics/imports/{importJob}/retry', [\App\Http\Controllers\ProductImportController::class, 'retry'])->name('logistics.import.retry');

Route::get('/migrate-logistics', function () {
    if (request('key') !== 'logistics2026') abort(403);
    Artisan::call('migrate', ['--force' => true]);
    
    // Seed essential pages so they show up in CMS
    $pages = [
        ['title' => 'Home', 'slug' => 'home'],
        ['title' => 'Blog', 'slug' => 'blog'],
        ['title' => 'Shop', 'slug' => 'shop']
    ];
    foreach ($pages as $p) {
        if (!\App\Models\Page::where('slug', $p['slug'])->exists()) {
            \App\Models\Page::create([
                'title' => $p['title'],
                'slug' => $p['slug'],
                'content' => '',
                'is_published' => true,
                'seo_title' => $p['title'],
                'seo_description' => ''
            ]);
        }
    }
    
    return "Database migrated and core pages seeded successfully. You can return to the site.";
});

// Localization
