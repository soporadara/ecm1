<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with(['category', 'brand'])->latest()->paginate(10);
        return Inertia::render('Admin/Products/Index', [
            'products' => $products
        ]);
    }

    public function create()
    {
        $categories = \App\Models\Category::all();
        $brands = \App\Models\Brand::all();
        $collections = \App\Models\Collection::all();
        return Inertia::render('Admin/Products/Create', [
            'categories' => $categories,
            'brands' => $brands,
            'collections' => $collections,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:products,slug',
            'short_description' => 'nullable|string',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'sale_price' => 'nullable|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'sku' => 'nullable|string',
            'barcode' => 'nullable|string',
            'material' => 'nullable|string',
            'care_instructions' => 'nullable|string',
            'weight' => 'nullable|string',
            'dimensions' => 'nullable|string',
            'shipping_info' => 'nullable|string',
            'return_info' => 'nullable|string',
            'seo_title' => 'nullable|string',
            'seo_description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'brand_id' => 'nullable|exists:brands,id',
            'collection_id' => 'nullable|exists:collections,id',
            'is_active' => 'boolean',
            'variants' => 'nullable|array',
            'variants.*.size' => 'nullable|string',
            'variants.*.color' => 'nullable|string',
            'variants.*.price' => 'nullable|numeric',
            'variants.*.stock' => 'required|integer|min:0',
            'variants.*.sku' => 'nullable|string',
            'gallery' => 'nullable|array',
            'gallery.*.url' => 'required|url',
            'gallery.*.is_hover' => 'boolean'
        ]);

        $productData = collect($validated)->except(['variants', 'gallery'])->toArray();
        $product = Product::create($productData);

        if (!empty($validated['variants'])) {
            foreach ($validated['variants'] as $variantData) {
                $product->variants()->create($variantData);
            }
        }

        if (!empty($validated['gallery'])) {
            foreach ($validated['gallery'] as $index => $imgData) {
                $product->images()->create([
                    'path' => $imgData['url'],
                    'alt_text' => $product->name . ' - Image ' . ($index + 1),
                    'sort_order' => $index + 1,
                    'is_hover_image' => $imgData['is_hover'] ?? false
                ]);
            }
        }

        return redirect()->route('admin.products.index')->with('success', 'Product created successfully.');
    }

    public function edit(Product $product)
    {
        return Inertia::render('Admin/Products/Edit', [
            'product' => $product->load(['variants', 'images', 'category']),
            'categories' => \App\Models\Category::all(),
            'brands' => \App\Models\Brand::all(),
            'collections' => \App\Models\Collection::all(),
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:products,slug,' . $product->id,
            'short_description' => 'nullable|string',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'sale_price' => 'nullable|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'sku' => 'nullable|string',
            'barcode' => 'nullable|string',
            'material' => 'nullable|string',
            'care_instructions' => 'nullable|string',
            'weight' => 'nullable|string',
            'dimensions' => 'nullable|string',
            'shipping_info' => 'nullable|string',
            'return_info' => 'nullable|string',
            'seo_title' => 'nullable|string',
            'seo_description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'brand_id' => 'nullable|exists:brands,id',
            'collection_id' => 'nullable|exists:collections,id',
            'is_active' => 'boolean',
            'gallery' => 'nullable|array',
            'gallery.*.url' => 'required|url',
            'gallery.*.is_hover' => 'boolean'
        ]);

        $productData = collect($validated)->except(['gallery'])->toArray();
        $product->update($productData);

        if (isset($validated['gallery'])) {
            $product->images()->delete(); // clear old gallery
            foreach ($validated['gallery'] as $index => $imgData) {
                $product->images()->create([
                    'path' => $imgData['url'],
                    'alt_text' => $product->name . ' - Image ' . ($index + 1),
                    'sort_order' => $index + 1,
                    'is_hover_image' => $imgData['is_hover'] ?? false
                ]);
            }
        }

        return redirect()->route('admin.products.index')->with('success', 'Product updated successfully.');
    }
    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('admin.products.index')->with('success', 'Product deleted.');
    }
}
