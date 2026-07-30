<?php

use App\Http\Controllers\ProductController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [\App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/debug-pages', function () {
    return \App\Models\Page::get(['id', 'title', 'slug', 'is_system']);
});

// Auth routes
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;

Route::middleware('guest')->group(function () {
    Route::middleware('throttle:6,1')->group(function () {
        Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
        Route::post('/login', [AuthController::class, 'storeLogin']);
        Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
        Route::post('/register', [AuthController::class, 'storeRegister']);
        Route::get('/cms/login', [AuthController::class, 'showCmsLogin'])->name('cms.login');
        Route::post('/cms/login', [AuthController::class, 'cmsLogin'])->name('cms.login.store');
        
        Route::post('/forgot-password/send-pin', [AuthController::class, 'sendResetPin'])->name('password.send-pin');
        Route::post('/forgot-password/verify-pin', [AuthController::class, 'verifyResetPin'])->name('password.verify-pin');
        Route::post('/forgot-password/reset', [AuthController::class, 'resetPassword'])->name('password.update');
    });
    
    Route::get('/forgot-password', [AuthController::class, 'showForgotPassword'])->name('password.request');
    Route::get('/reset-password', [AuthController::class, 'showResetPassword'])->name('password.reset');
});

Route::post('/auth/firebase/session', [AuthController::class, 'firebaseSession'])->middleware('guest')->name('auth.firebase.session');
Route::post('/auth/firebase/google', [AuthController::class, 'firebaseGoogle'])->middleware('guest')->name('auth.firebase.google');
Route::post('/auth/firebase/cms', [AuthController::class, 'cmsFirebase'])->middleware('guest:admin')->name('auth.firebase.cms');

Route::post('/logout', [AuthController::class, 'logout'])->name('logout')->middleware('auth');
Route::redirect('/cms/dashboard', '/admin')->middleware(['auth', 'is_admin']);

Route::get('/shop', [ProductController::class, 'index'])->name('shop.index');
Route::get('/shop/{product:slug}', [ProductController::class, 'show'])->name('shop.show');
Route::get('/api/search', [ProductController::class, 'searchLive'])->name('api.search');
Route::get('/auth/google', [\App\Http\Controllers\AuthController::class, 'socialiteRedirect'])->name('auth.google');
Route::get('/auth/google/callback', [\App\Http\Controllers\AuthController::class, 'socialiteCallback']);

// Admin Auth Routes
Route::get('/cms/login', [\App\Http\Controllers\AuthController::class, 'showCmsLogin'])->name('cms.login');
Route::post('/cms/login', [\App\Http\Controllers\AuthController::class, 'cmsLogin']);
Route::post('/cms/firebase', [\App\Http\Controllers\AuthController::class, 'cmsFirebase'])->name('cms.firebase');
Route::get('/cart', [\App\Http\Controllers\CartController::class, 'index'])->name('cart.index');
Route::post('/cart', [\App\Http\Controllers\CartController::class, 'store'])->name('cart.store');
Route::put('/cart/{item}', [\App\Http\Controllers\CartController::class, 'update'])->name('cart.update');
Route::delete('/cart/{item}', [\App\Http\Controllers\CartController::class, 'destroy'])->name('cart.destroy');
Route::get('/checkout', [\App\Http\Controllers\CheckoutController::class, 'index'])->name('checkout.index');
Route::post('/checkout', [\App\Http\Controllers\CheckoutController::class, 'store'])->name('checkout.store');

Route::prefix('admin')->name('admin.')->group(function () {
    $canManageFeatureFlags = static function (?User $user): bool {
        return (bool) $user && (
            $user->hasRole('Super Administrator') ||
            in_array($user->role, ['superadmin', 'super_admin'], true)
        );
    };

    Route::get('feature-flags', function (Request $request) use ($canManageFeatureFlags) {
        if (!$request->user()) {
            return redirect('/login');
        }

        if (!$canManageFeatureFlags($request->user())) {
            return redirect('/login');
        }

        return app(\App\Http\Controllers\Admin\FeatureFlagController::class)->index();
    })->name('feature-flags.index');

    Route::patch('feature-flags/{featureFlag}', function (Request $request, \App\Models\FeatureFlag $featureFlag) use ($canManageFeatureFlags) {
        if (!$request->user()) {
            return redirect('/login');
        }

        if (!$canManageFeatureFlags($request->user())) {
            return redirect('/login');
        }

        return app(\App\Http\Controllers\Admin\FeatureFlagController::class)->update($request, $featureFlag);
    })->name('feature-flags.update');

    // Team Notes
    Route::post('notes/trash/{id}', [\App\Http\Controllers\Admin\NoteController::class, 'trash'])->name('notes.trash');
    Route::post('notes/restore/{id}', [\App\Http\Controllers\Admin\NoteController::class, 'restore'])->name('notes.restore');
    Route::resource('note-folders', \App\Http\Controllers\Admin\NoteFolderController::class)->except(['show']);
    Route::resource('notes', \App\Http\Controllers\Admin\NoteController::class);
});

Route::middleware('auth:web')->group(function () {
    Route::put('/profile', [\App\Http\Controllers\ProfileController::class, 'update'])->name('profile.update');
    Route::put('/profile/password', [\App\Http\Controllers\ProfileController::class, 'updatePassword'])->name('profile.password.update');
    Route::post('/profile/avatar', [\App\Http\Controllers\ProfileController::class, 'updateAvatar'])->name('profile.avatar.update');
    Route::post('/profile/send-pin', [\App\Http\Controllers\ProfileController::class, 'sendPin'])->name('profile.send-pin');
    Route::post('/profile/verify-pin', [\App\Http\Controllers\ProfileController::class, 'verifyPin'])->name('profile.verify-pin');
});

// Admin routes
Route::post('/cms/logout', [\App\Http\Controllers\AuthController::class, 'cmsLogout'])->name('cms.logout')->middleware('auth:admin');

Route::middleware(['auth:admin', 'is_admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');
    Route::get('/profile', [\App\Http\Controllers\ProfileController::class, 'editAdmin'])->name('profile.edit');
    Route::put('/profile', [\App\Http\Controllers\ProfileController::class, 'update'])->name('profile.update');
    Route::put('/profile/password', [\App\Http\Controllers\ProfileController::class, 'updatePassword'])->name('profile.password.update');
    Route::post('/profile/avatar', [\App\Http\Controllers\ProfileController::class, 'updateAvatar'])->name('profile.avatar.update');
    Route::post('/profile/send-pin', [\App\Http\Controllers\ProfileController::class, 'sendPin'])->name('profile.send-pin');
    Route::post('/profile/verify-pin', [\App\Http\Controllers\ProfileController::class, 'verifyPin'])->name('profile.verify-pin');
    Route::post('/profile/google-link', [\App\Http\Controllers\ProfileController::class, 'linkGoogle'])->name('profile.google-link');
    Route::post('/profile/google-unlink', [\App\Http\Controllers\ProfileController::class, 'unlinkGoogle'])->name('profile.google-unlink');
    

    // Logistics Customers & Orders
    Route::resource('products', \App\Http\Controllers\Admin\ProductController::class)->except(['show']);

    Route::get('logistics/customers', [\App\Http\Controllers\Admin\ManualOrderController::class, 'index'])->name('logistics.customers');
    Route::get('logistics/customers/{customer}/orders', [\App\Http\Controllers\Admin\ManualOrderController::class, 'customerOrders'])->name('logistics.customer-orders');
    Route::get('logistics/orders', [\App\Http\Controllers\Admin\ManualOrderController::class, 'allOrders'])->name('logistics.orders');
    Route::get('logistics/orders/{order}', [\App\Http\Controllers\Admin\ManualOrderController::class, 'show'])->name('logistics.orders.show');
    Route::put('logistics/orders/{order}', [\App\Http\Controllers\Admin\ManualOrderController::class, 'update'])->name('logistics.orders.update');
    
    // Receipt Integration
    Route::get('receipts/generate', [\App\Http\Controllers\Admin\ReceiptController::class, 'generate'])->name('receipts.generate');
    Route::get('receipts/{receipt}', [\App\Http\Controllers\Admin\ReceiptController::class, 'show'])->name('receipts.show');

    // Reports
    Route::get('logistics/reports', [\App\Http\Controllers\Admin\ReportController::class, 'index'])->name('logistics.reports');
    Route::get('logistics/reports/generate', [\App\Http\Controllers\Admin\ReportController::class, 'generate'])->name('logistics.reports.generate');

    // CMS & Settings
    Route::resource('pages', \App\Http\Controllers\Admin\PageController::class)->except(['show']);
    Route::post('posts/import-doc', [\App\Http\Controllers\Admin\PostController::class, 'importDoc'])->name('posts.import-doc');
    Route::get('posts/{post}/comments', [\App\Http\Controllers\Admin\PostController::class, 'comments'])->name('posts.comments');
    Route::delete('comments/{comment}', [\App\Http\Controllers\Admin\PostController::class, 'deleteComment'])->name('comments.destroy');
    Route::post('comments/{comment}/reply', [\App\Http\Controllers\Admin\PostController::class, 'replyComment'])->name('comments.reply');
    Route::resource('post-categories', \App\Http\Controllers\Admin\PostCategoryController::class)->except(['show', 'create', 'edit']);
    Route::resource('posts', \App\Http\Controllers\Admin\PostController::class)->except(['show']);
    Route::resource('popups', \App\Http\Controllers\Admin\PopupController::class)->except(['show']);
    Route::get('available-sites', [\App\Http\Controllers\Admin\MarketplaceAdminController::class, 'index'])->name('available-sites.index');
    Route::post('available-sites', [\App\Http\Controllers\Admin\MarketplaceAdminController::class, 'store'])->name('available-sites.store');
    Route::match(['put', 'patch'], 'available-sites/{marketplace}', [\App\Http\Controllers\Admin\MarketplaceAdminController::class, 'update'])->name('available-sites.update');
    Route::delete('available-sites/{marketplace}', [\App\Http\Controllers\Admin\MarketplaceAdminController::class, 'destroy'])->name('available-sites.destroy');
    Route::redirect('marketplaces', '/admin/available-sites')->name('marketplaces.index');
    Route::redirect('content-settings/order-messages', '/admin/settings');
    Route::redirect('contact-messages', '/admin');
    Route::redirect('media', '/admin/settings');
    
    // Menus
    Route::resource('menus', \App\Http\Controllers\Admin\MenuController::class)->except(['create', 'show', 'edit']);
    Route::post('menus/{menu}/items/bulk', [\App\Http\Controllers\Admin\MenuController::class, 'storeBulkItems'])->name('menus.items.storeBulk');
    Route::post('menus/{menu}/items', [\App\Http\Controllers\Admin\MenuController::class, 'storeItem'])->name('menus.items.store');
    Route::put('menus/{menu}/items/{item}', [\App\Http\Controllers\Admin\MenuController::class, 'updateItem'])->name('menus.items.update');
    Route::delete('menus/{menu}/items/{item}', [\App\Http\Controllers\Admin\MenuController::class, 'destroyItem'])->name('menus.items.destroy');
    
    // Banner management
    Route::patch('banners/mode', [\App\Http\Controllers\Admin\BannerController::class, 'updateMode'])->name('banners.mode');
    Route::resource('banners', \App\Http\Controllers\Admin\BannerController::class);

    // Testimonials management
    Route::post('testimonials/reorder', [\App\Http\Controllers\Admin\TestimonialController::class, 'reorder'])->name('testimonials.reorder');
    Route::resource('testimonials', \App\Http\Controllers\Admin\TestimonialController::class)->except(['create', 'show', 'edit']);

    // Settings
    Route::get('/settings', [\App\Http\Controllers\Admin\SettingController::class, 'index'])->name('settings.index');
    Route::post('/settings', [\App\Http\Controllers\Admin\SettingController::class, 'store'])->name('settings.store');
    
    Route::get('/fly-icons', [\App\Http\Controllers\Admin\FlyIconController::class, 'index'])->name('fly-icons.index');
    Route::post('/fly-icons', [\App\Http\Controllers\Admin\FlyIconController::class, 'store'])->name('fly-icons.store');
    
    // Staff & Users
    Route::resource('users', \App\Http\Controllers\Admin\UserController::class)->only(['index', 'update']);
    Route::resource('staff', \App\Http\Controllers\Admin\StaffController::class)->except(['show']);

    // Customers & Users (Super Admin Only)
    Route::resource('customers-management', \App\Http\Controllers\Admin\CustomerManagementController::class)->only(['index', 'update', 'destroy']);
    Route::post('customers-management/{user}/reset-password', [\App\Http\Controllers\Admin\CustomerManagementController::class, 'resetPassword'])->name('customers-management.reset-password');
    Route::post('customers-management/{user}/toggle-status', [\App\Http\Controllers\Admin\CustomerManagementController::class, 'toggleStatus'])->name('customers-management.toggle-status');
    
    Route::get('audit-logs', [\App\Http\Controllers\Admin\AuditLogController::class, 'index'])->name('audit.index');
    Route::delete('audit-logs/clear', [\App\Http\Controllers\Admin\AuditLogController::class, 'clear'])->name('audit.clear');
    Route::get('security/access-control', [\App\Http\Controllers\Admin\SecurityAccessController::class, 'index'])->name('security.access-control');
    Route::delete('security/access-control/{block}', [\App\Http\Controllers\Admin\SecurityAccessController::class, 'destroy'])->name('security.access-control.destroy');
});

    // Logistics Customer Routes
    Route::middleware('auth')->group(function () {
        Route::get('/profile', [\App\Http\Controllers\ProfileController::class, 'editCustomer'])->name('profile.edit');
        Route::get('/profile/complete', [\App\Http\Controllers\ProfileController::class, 'showComplete'])->name('profile.complete');
        Route::post('/profile/complete', [\App\Http\Controllers\ProfileController::class, 'storeComplete']);
        Route::post('/profile/complete/skip', [\App\Http\Controllers\ProfileController::class, 'skipComplete'])->name('profile.complete.skip');
        
        Route::get('/dashboard', [\App\Http\Controllers\Customer\DashboardController::class, 'index'])->name('dashboard');
        Route::get('/account', [\App\Http\Controllers\Customer\DashboardController::class, 'index'])->name('account');
        Route::get('/dashboard/orders', [\App\Http\Controllers\Customer\OrderController::class, 'index'])->name('dashboard.orders');
        Route::get('/dashboard/orders/{order}', [\App\Http\Controllers\Customer\OrderController::class, 'show'])->name('dashboard.orders.show');
        Route::redirect('/dashboard/track', '/my-orders')->name('dashboard.track');
        Route::get('/my-orders', [\App\Http\Controllers\Customer\OrderController::class, 'index'])->name('my-orders');
        Route::get('/my-orders/{order}', [\App\Http\Controllers\Customer\OrderController::class, 'show'])->name('my-orders.show');
        Route::redirect('/track-orders', '/my-orders')->name('track-orders');
        Route::redirect('/order-history', '/my-orders')->name('order-history');
        Route::get('/receipts', [\App\Http\Controllers\Customer\OrderController::class, 'index'])->name('receipts');
        Route::get('/security', [\App\Http\Controllers\ProfileController::class, 'editCustomer'])->name('security');
        Route::get('/attachments/{attachment}/download', [\App\Http\Controllers\Customer\OrderController::class, 'downloadAttachment'])->name('attachments.download');
        
        Route::get('/manual-order', [\App\Http\Controllers\Customer\ManualOrderController::class, 'create'])->name('manual-order.create');
        Route::post('/manual-order', [\App\Http\Controllers\Customer\ManualOrderController::class, 'store']);
    });
Route::get('/blog', [\App\Http\Controllers\BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [\App\Http\Controllers\BlogController::class, 'show'])->name('blog.show');
Route::post('/blog/{post}/comments', [\App\Http\Controllers\PostCommentController::class, 'store'])->name('blog.comments.store');

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
Route::get('/seed-test-blog', function () {
    $post = \App\Models\Post::updateOrCreate(
        ['slug' => 'why-every-plumber-needs-a-1-ton-mini-excavator-in-their-fleet'],
        [
            'title' => 'Why Every Plumber Needs a 1-Ton Mini Excavator in Their Fleet',
            'content' => 'In one scenario where a customer calls with a broken sewer pipe, and you need to fix it fast. But if your team has to dig by hand in a tiny backyard, it takes hours. The work is hard, labor costs go up, and a job that should be done by noon ends up taking two full days.
Now, imagine doing that exact same job with a mini excavator.',
            'image' => 'https://img.miniexcavator.org/ebay/Website-Team/Class3-4June/20-june/b2-01.webp',
            'is_published' => true,
            'published_at' => now(),
            'user_id' => null
        ]
    );
});

