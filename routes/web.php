<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [\App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/migrate-db-temp', function() {
    \Illuminate\Support\Facades\Artisan::call('migrate:fresh', ['--seed' => true, '--force' => true]);
    return 'migrated and seeded';
});



Route::get('/shop', [ProductController::class, 'index'])->name('shop.index');
Route::get('/api/search', [ProductController::class, 'searchLive'])->name('api.search');
Route::get('/shop/{product:slug}', [ProductController::class, 'show'])->name('shop.show');

// Reviews
Route::post('/products/{product}/reviews', [\App\Http\Controllers\ReviewController::class, 'store'])
    ->middleware('auth')
    ->name('reviews.store');

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

Route::middleware(['auth', 'is_admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');
    
    Route::resource('products', \App\Http\Controllers\Admin\ProductController::class);
    Route::get('orders', [\App\Http\Controllers\Admin\OrderController::class, 'index'])->name('orders.index');
    Route::patch('orders/{order}', [\App\Http\Controllers\Admin\OrderController::class, 'update'])->name('orders.update');
    Route::resource('pages', \App\Http\Controllers\Admin\PageController::class);
    Route::resource('posts', \App\Http\Controllers\Admin\PostController::class);
    Route::resource('popups', \App\Http\Controllers\Admin\PopupController::class);
    
    // Banner Settings
    Route::get('settings/banner', [\App\Http\Controllers\Admin\BannerController::class, 'index'])->name('admin.settings.banner');
    Route::post('settings/banner', [\App\Http\Controllers\Admin\BannerController::class, 'update'])->name('admin.settings.banner.update');
    
    // User management
    Route::resource('users', \App\Http\Controllers\Admin\UserController::class)->only(['index', 'update']);
});

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

Route::get('/blog', [\App\Http\Controllers\BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [\App\Http\Controllers\BlogController::class, 'show'])->name('blog.show');

Route::get('/pages/{slug}', [\App\Http\Controllers\PageController::class, 'show'])->name('page.show');
