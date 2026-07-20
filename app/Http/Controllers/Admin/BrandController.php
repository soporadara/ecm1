<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BrandController extends Controller
{
    public function index()
    {
        $brands = Brand::withCount('products')->orderBy('name')->get()->map(fn($b) => [
            'id' => $b->id,
            'name' => $b->name,
            'slug' => $b->slug ?? Str::slug($b->name),
            'logo' => $b->logo ?? null,
            'products_count' => $b->products_count,
        ]);

        return Inertia::render('Admin/Brands/Index', ['brands' => $brands]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:brands,name',
            'logo' => 'nullable|string',
        ]);
        $validated['slug'] = Str::slug($validated['name']);
        Brand::create($validated);
        return back()->with('success', 'Brand created.');
    }

    public function update(Request $request, Brand $brand)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:brands,name,' . $brand->id,
            'logo' => 'nullable|string',
        ]);
        $brand->update($validated);
        return back()->with('success', 'Brand updated.');
    }

    public function destroy(Brand $brand)
    {
        if ($brand->products()->count() > 0) {
            return back()->withErrors(['error' => 'Cannot delete a brand with products assigned.']);
        }
        $brand->delete();
        return back()->with('success', 'Brand deleted.');
    }
}
