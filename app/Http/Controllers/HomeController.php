<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\Product;
use App\Models\HomePageSection;
use App\Models\Marketplace;
use App\Models\Setting;
use App\Helpers\FeatureFlags;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Database\QueryException;

class HomeController extends Controller
{
    public function index()
    {
        // 1. Fetch Logistics Data
        try {
            $marketplaces = Marketplace::where('is_enabled', true)
                ->where('status', 'active')
                ->where(function ($query) {
                    $query->whereNull('starts_at')->orWhere('starts_at', '<=', now());
                })
                ->where(function ($query) {
                    $query->whereNull('ends_at')->orWhere('ends_at', '>=', now());
                })
                ->orderBy('sort_order')
                ->get()
                ->map(fn($m) => [
                    'id'          => $m->id,
                    'name'        => $m->name,
                    'name_km'     => $m->name_km,
                    'name_en'     => $m->name_en,
                    'name_vi'     => $m->name_vi,
                    'slug'        => $m->slug,
                    'logo'        => $m->icon_path ? asset('storage/' . $m->icon_path) : ($m->logo ?: $m->icon_source_url),
                    'brand_color' => $m->brand_color,
                    'website_url' => $m->website_url,
                    'alt_text'    => $m->alt_text,
                    'open_in_new_tab' => $m->open_in_new_tab ?? true,
                    'android_app_url' => $m->android_app_url,
                    'ios_app_url'     => $m->ios_app_url,
                    'description' => $m->description,
                    'status'      => $m->status,
                    'maintenance_message' => $m->maintenance_message,
                ]);
        } catch (QueryException $e) {
            $marketplaces = [];
        }

        $featureFlags = FeatureFlags::allAsMap();
        $storefrontEnabled = $featureFlags['storefront_products_enabled'] ?? false;

        // 2. Fetch CMS/Storefront Data (Original logic)
        $sections = HomePageSection::where('is_active', true)->orderBy('sort_order')->get();
        
        $mappedSections = collect();
        
        // Only load products if the storefront is enabled in feature flags
        if ($storefrontEnabled) {
            $allProductIds = collect();
            
            foreach ($sections as $section) {
                $content = is_string($section->content) ? json_decode($section->content, true) : $section->content;
                if ($content && isset($content['product_ids'])) {
                    $allProductIds = $allProductIds->merge($content['product_ids']);
                }
            }

            // Add some random/trending products for sections that don't specify explicit IDs
            $trendingProducts = Product::with(['images', 'variants'])->where('is_featured', true)->take(8)->get();
            $popularProducts = Product::with(['images', 'variants'])->inRandomOrder()->take(12)->get();
            
            $allProductIds = $allProductIds->merge($trendingProducts->pluck('id'))
                                           ->merge($popularProducts->pluck('id'))
                                           ->unique();

            $products = Product::with(['images', 'variants'])
                ->whereIn('id', $allProductIds)
                ->get()
                ->keyBy('id');

            // Transform sections to include their hydrated products
            $mappedSections = $sections->map(function ($section) use ($products, $trendingProducts, $popularProducts) {
                $data = $section->toArray();
                $content = is_string($section->content) ? json_decode($section->content, true) : $section->content;
                $content = $content ?? [];
                $data['content'] = $content;

                if (isset($content['product_ids'])) {
                    $data['products'] = collect($content['product_ids'])
                        ->map(fn($id) => $products->get($id))
                        ->filter()
                        ->values();
                } else {
                    // Populate default products for specific dynamic sections
                    if ($section->type === 'trending') {
                        $data['products'] = $trendingProducts;
                    } elseif (in_array($section->type, ['popular_tabs', 'recommended', 'best_sellers', 'limited_stock', 'customer_favorites'])) {
                        $data['products'] = $popularProducts->shuffle()->take(4)->values();
                    } else {
                        $data['products'] = [];
                    }
                }

                return $data;
            });
        } else {
            // Storefront is disabled, still pass sections (like the hero banner) but strip products
            $mappedSections = $sections->map(function ($section) {
                $data = $section->toArray();
                $content = is_string($section->content) ? json_decode($section->content, true) : $section->content;
                $data['content'] = $content ?? [];
                $data['products'] = [];
                return $data;
            });
        }
        
        $activePopup = \App\Models\Popup::where('is_active', true)
            ->where(function ($query) {
                $query->whereNull('starts_at')->orWhere('starts_at', '<=', now());
            })
            ->where(function ($query) {
                $query->whereNull('ends_at')->orWhere('ends_at', '>=', now());
            })
            ->latest()
            ->first();

        $popupData = $activePopup ? [
            ...$activePopup->toArray(),
            'image_path' => $activePopup->image_path
                ? (str_starts_with($activePopup->image_path, 'http') || str_starts_with($activePopup->image_path, '/storage/')
                    ? $activePopup->image_path
                    : asset('storage/' . $activePopup->image_path))
                : null,
        ] : null;
        
        // Fetch active banners
        $banners = Banner::with(['desktopMedia', 'mobileMedia'])
            ->where('is_active', true)
            ->where(function($query) {
                $query->whereNull('start_date')->orWhere('start_date', '<=', now());
            })
            ->where(function($query) {
                $query->whereNull('end_date')->orWhere('end_date', '>=', now());
            })
            ->orderBy('sort_order')
            ->take(4)
            ->get()
            ->map(fn($banner) => [
                'id' => $banner->id,
                'title_en' => $banner->title_en,
                'title_km' => $banner->title_km,
                'eyebrow_en' => $banner->eyebrow_en,
                'eyebrow_km' => $banner->eyebrow_km,
                'description_en' => $banner->description_en,
                'description_km' => $banner->description_km,
                'primary_button_label' => $banner->primary_button_label,
                'primary_button_url' => $banner->primary_button_url,
                'fallback_color' => $banner->fallback_color,
                'text_position' => $banner->text_position,
                'content_alignment' => $banner->content_alignment,
                'theme_variant' => $banner->theme_variant,
                'header_theme' => $banner->header_theme ?? $banner->theme_variant ?? 'dark',
                'desktop_image_url' => $banner->desktopMedia ? asset('storage/' . $banner->desktopMedia->path) : null,
                'mobile_image_url' => $banner->mobileMedia ? asset('storage/' . $banner->mobileMedia->path) : null,
            ]);

        // Fetch the Home page from the pages table to use its SEO data
        $homePage = \App\Models\Page::where('slug', 'home')->first();
        
        // Fetch Testimonials
        $testimonials = \App\Models\Testimonial::where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('id', 'desc')
            ->get();

        // Fetch Recent Blogs
        $recentBlogs = \App\Models\Post::with(['category', 'user'])
            ->where('is_published', true)
            ->where(function ($query) {
                $query->whereNull('published_at')->orWhere('published_at', '<=', now());
            })
            ->latest('published_at')
            ->take(3)
            ->get();
        
        return Inertia::render('Home', [
            'banners'      => $banners,
            'bannerMode'   => Setting::where('group', 'general')->where('key', 'home_banner_mode')->value('value') ?: 'slideshow',
            'sections'     => $mappedSections,
            'popup'        => $popupData,
            'marketplaces' => $marketplaces,
            'featureFlags' => $featureFlags,
            'page'         => $homePage,
            'testimonials' => $testimonials,
            'recentBlogs'  => $recentBlogs,
        ]);
    }
}
