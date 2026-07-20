<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\HomePageSection;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $sections = HomePageSection::where('is_active', true)->orderBy('sort_order')->get();
        
        $allProductIds = collect();
        
        foreach ($sections as $section) {
            $content = json_decode($section->content, true);
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
            $content = json_decode($section->content, true) ?? [];
            $data['content_data'] = $content;

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
        
        $activePopup = \App\Models\Popup::where('is_active', true)->latest()->first();
        
        return Inertia::render('Home', [
            'sections' => $mappedSections,
            'popup' => $activePopup
        ]);
    }
}
