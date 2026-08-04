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
        \Log::info('SETTINGS_DUMP:', \App\Models\Setting::pluck('value', 'key')->toArray());
        
        \App\Models\Setting::updateOrCreate(['key' => 'cambodia_map_embed_url'], ['value' => 'https://www.google.com/maps?q=11.6441475,104.9126435&z=17&output=embed']);
        \App\Models\Setting::updateOrCreate(['key' => 'vietnam_map_embed_url'], ['value' => 'https://www.google.com/maps?q=11.082713,106.1664121&z=17&output=embed']);
        
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
        
        // Setup new testimonials temporarily
        $brain_dir = '/Users/soporadararin/.gemini/antigravity-ide/brain/7f11cf6d-32d0-49c3-b31f-a947608ea301';
        $dest_dir = storage_path('app/public/testimonials');
        if (!is_dir($dest_dir)) {
            mkdir($dest_dir, 0777, true);
        }

        if (\App\Models\Testimonial::where('customer_name', 'Sokha')->count() === 0) {
            $files = glob($brain_dir . '/*.png');
            $man_file = ''; $woman1_file = ''; $woman2_file = '';
            foreach ($files as $file) {
                if (strpos($file, 'khmer_vn_man_cafe') !== false) $man_file = $file;
                if (strpos($file, 'khmer_woman_outdoors') !== false) $woman1_file = $file;
                if (strpos($file, 'vn_woman_walking') !== false) $woman2_file = $file;
            }
            if ($man_file) copy($man_file, $dest_dir . '/man.png');
            if ($woman1_file) copy($woman1_file, $dest_dir . '/woman1.png');
            if ($woman2_file) copy($woman2_file, $dest_dir . '/woman2.png');

            \App\Models\Testimonial::truncate();
            $names = ['Sokha', 'Linh', 'Bora'];
            $contents = [
                'home.testimonial_1',
                'home.testimonial_2',
                'home.testimonial_3'
            ];
            $images = ['testimonials/man.png', 'testimonials/woman2.png', 'testimonials/woman1.png'];
            
            // Get the promo popup image to use as product_image_1
            $promo = \App\Models\Popup::where('is_active', true)->first();
            $promoImg = $promo ? $promo->image_path : null;

            for ($i = 0; $i < 3; $i++) {
                $t = new \App\Models\Testimonial();
                $t->customer_name = $names[$i];
                $t->content = $contents[$i];
                $t->rating = 5;
                $t->image_path = $images[$i];
                $t->product_image_1 = $promoImg ? str_replace('/storage/', '', $promoImg) : null;
                $t->is_active = true;
                $t->save();
            }
        }

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
