<?php

namespace App\Http\Controllers;

use App\Helpers\FeatureFlags;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        if (FeatureFlags::disabled('storefront_products_enabled')) {
            return redirect()->route('home');
        }

        $query = Product::with(['category', 'images', 'brand', 'variants'])
            ->where('is_active', true);

        // Category Filter
        if ($request->has('category') && $request->input('category')) {
            $categories = explode(',', $request->input('category'));
            $query->whereHas('category', function ($q) use ($categories) {
                $q->whereIn('slug', $categories);
            });
        }

        // Brand Filter
        if ($request->has('brand') && $request->input('brand')) {
            $brands = explode(',', $request->input('brand'));
            $query->whereHas('brand', function ($q) use ($brands) {
                $q->whereIn('slug', $brands);
            });
        }

        // Collection Filter
        if ($request->has('collection') && $request->input('collection')) {
            $collections = explode(',', $request->input('collection'));
            $query->whereHas('collection', function ($q) use ($collections) {
                $q->whereIn('slug', $collections);
            });
        }

        // Price Filter
        if ($request->has('min_price') && is_numeric($request->input('min_price'))) {
            $query->where('price', '>=', $request->input('min_price'));
        }
        if ($request->has('max_price') && is_numeric($request->input('max_price'))) {
            $query->where('price', '<=', $request->input('max_price'));
        }

        // Search Filter
        if ($request->has('search') && $request->input('search')) {
            $searchTerm = '%' . $request->input('search') . '%';
            $query->where(function($q) use ($searchTerm) {
                $q->where('name', 'like', $searchTerm)
                  ->orWhere('sku', 'like', $searchTerm)
                  ->orWhere('short_description', 'like', $searchTerm);
            });
        }

        // Discount Filter
        if ($request->has('discount') && $request->input('discount')) {
            $query->whereNotNull('sale_price');
        }

        // Stock Filter
        if ($request->has('in_stock') && $request->input('in_stock')) {
            $query->where('stock', '>', 0);
        }
        
        // Color Filter
        if ($request->has('color') && $request->input('color')) {
            $colors = explode(',', $request->input('color'));
            $query->whereHas('variants', function ($q) use ($colors) {
                $q->whereIn('color', $colors);
            });
        }
        
        // Size Filter
        if ($request->has('size') && $request->input('size')) {
            $sizes = explode(',', $request->input('size'));
            $query->whereHas('variants', function ($q) use ($sizes) {
                $q->whereIn('size', $sizes);
            });
        }

        // Sorting
        $sort = $request->input('sort', 'recommended');
        match ($sort) {
            'price_low' => $query->orderBy('sale_price', 'asc')->orderBy('price', 'asc'),
            'price_high' => $query->orderBy('sale_price', 'desc')->orderBy('price', 'desc'),
            'newest' => $query->orderBy('created_at', 'desc'),
            'a_z' => $query->orderBy('name', 'asc'),
            'z_a' => $query->orderBy('name', 'desc'),
            'discount' => $query->orderByRaw('(price - sale_price) DESC'),
            default => $query->orderBy('created_at', 'desc'),
        };

        $products = $query->paginate(12)->withQueryString();

        return Inertia::render('Shop/Index', [
            'products' => $products,
            'filters' => $request->all()
        ]);
    }

    public function show(Product $product)
    {
        if (FeatureFlags::disabled('storefront_products_enabled')) {
            return redirect()->route('home');
        }

        $relatedProducts = Product::with('images')
            ->where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->where('is_active', true)
            ->take(4)
            ->get();

        return Inertia::render('Shop/Show', [
            'product' => $product->load(['category', 'images', 'variants', 'reviews.user']),
            'relatedProducts' => $relatedProducts
        ]);
    }

    public function searchLive(Request $request)
    {
        if (FeatureFlags::disabled('storefront_product_search_enabled')) {
            return response()->json([]);
        }

        $query = $request->input('q');
        
        if (!$query || strlen($query) < 2) {
            return response()->json([]);
        }

        $products = Product::with(['images'])
            ->where('is_active', true)
            ->where(function($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                  ->orWhere('sku', 'like', "%{$query}%");
            })
            ->take(5)
            ->get(['id', 'name', 'slug', 'price', 'sale_price', 'sku']);

        return response()->json($products);
    }
}
