<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class TestimonialController extends Controller
{
    public function index()
    {
        $testimonials = Testimonial::orderBy('sort_order')->orderBy('id', 'desc')->get();
        return Inertia::render('Admin/Testimonials/Index', [
            'testimonials' => $testimonials
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'content' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
            'image' => 'nullable|image|max:2048',
            'product_image_1' => 'nullable|image|max:2048',
            'product_image_2' => 'nullable|image|max:2048'
        ]);

        if ($request->hasFile('image')) {
            $validated['image_path'] = $request->file('image')->store('testimonials', 'public');
        }
        if ($request->hasFile('product_image_1')) {
            $validated['product_image_1'] = $request->file('product_image_1')->store('testimonials/products', 'public');
        }
        if ($request->hasFile('product_image_2')) {
            $validated['product_image_2'] = $request->file('product_image_2')->store('testimonials/products', 'public');
        }

        unset($validated['image'], $validated['product_image_1_file'], $validated['product_image_2_file']); // We'll just unset image, the product images overwrite if named differently but we use same name. Wait, if request has file product_image_1 it overwrites string. But better to unset the file from array if necessary. Actually $validated['product_image_1'] will be replaced by the path, so it's fine. Wait, $request->file() and unset.
        unset($validated['image']);
        // The files in $validated would be UploadedFile objects, but we replaced them with string paths above.
        
        Testimonial::create($validated);

        return back()->with('success', 'Testimonial added successfully.');
    }

    public function update(Request $request, Testimonial $testimonial)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'content' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
            'image' => 'nullable|image|max:2048',
            'product_image_1' => 'nullable|image|max:2048',
            'product_image_2' => 'nullable|image|max:2048'
        ]);

        if ($request->hasFile('image')) {
            if ($testimonial->image_path) {
                Storage::disk('public')->delete($testimonial->image_path);
            }
            $validated['image_path'] = $request->file('image')->store('testimonials', 'public');
        } elseif ($request->boolean('remove_image')) {
            if ($testimonial->image_path) {
                Storage::disk('public')->delete($testimonial->image_path);
            }
            $validated['image_path'] = null;
        }

        if ($request->hasFile('product_image_1')) {
            if ($testimonial->product_image_1) {
                Storage::disk('public')->delete($testimonial->product_image_1);
            }
            $validated['product_image_1'] = $request->file('product_image_1')->store('testimonials/products', 'public');
        } elseif ($request->boolean('remove_product_image_1')) {
            if ($testimonial->product_image_1) {
                Storage::disk('public')->delete($testimonial->product_image_1);
            }
            $validated['product_image_1'] = null;
        }

        if ($request->hasFile('product_image_2')) {
            if ($testimonial->product_image_2) {
                Storage::disk('public')->delete($testimonial->product_image_2);
            }
            $validated['product_image_2'] = $request->file('product_image_2')->store('testimonials/products', 'public');
        } elseif ($request->boolean('remove_product_image_2')) {
            if ($testimonial->product_image_2) {
                Storage::disk('public')->delete($testimonial->product_image_2);
            }
            $validated['product_image_2'] = null;
        }

        unset($validated['image']);
        unset($validated['remove_image']);
        unset($validated['remove_product_image_1']);
        unset($validated['remove_product_image_2']);

        $testimonial->update($validated);

        return back()->with('success', 'Testimonial updated successfully.');
    }

    public function destroy(Testimonial $testimonial)
    {
        if ($testimonial->image_path) {
            Storage::disk('public')->delete($testimonial->image_path);
        }
        if ($testimonial->product_image_1) {
            Storage::disk('public')->delete($testimonial->product_image_1);
        }
        if ($testimonial->product_image_2) {
            Storage::disk('public')->delete($testimonial->product_image_2);
        }
        $testimonial->delete();

        return back()->with('success', 'Testimonial deleted successfully.');
    }

    public function reorder(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|exists:testimonials,id',
            'items.*.sort_order' => 'required|integer'
        ]);

        foreach ($validated['items'] as $item) {
            Testimonial::where('id', $item['id'])->update(['sort_order' => $item['sort_order']]);
        }

        return back()->with('success', 'Order updated successfully.');
    }
}
