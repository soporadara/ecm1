<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use App\Models\Media;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class BannerController extends Controller
{
    public function index()
    {
        $banners = Banner::with(['desktopMedia', 'mobileMedia'])
            ->orderBy('sort_order')
            ->get()
            ->map(fn($banner) => [
                'id' => $banner->id,
                'internal_name' => $banner->internal_name,
                'title_en' => $banner->title_en,
                'is_active' => $banner->is_active,
                'sort_order' => $banner->sort_order,
                'desktop_image_url' => $banner->desktopMedia ? asset('storage/' . $banner->desktopMedia->path) : null,
            ]);

        return Inertia::render('Admin/Banners/Index', [
            'banners' => $banners,
        ]);
    }

    public function create()
    {
        $media = Media::latest()->get()->map(fn($m) => [
            'id' => $m->id,
            'name' => $m->name,
            'url' => asset('storage/' . $m->path),
        ]);

        return Inertia::render('Admin/Banners/Create', [
            'mediaLibrary' => $media,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'internal_name' => 'required|string|max:255',
            'eyebrow_en' => 'nullable|string|max:255',
            'eyebrow_km' => 'nullable|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'title_km' => 'nullable|string|max:255',
            'description_en' => 'nullable|string',
            'description_km' => 'nullable|string',
            'primary_button_label' => 'nullable|string|max:255',
            'primary_button_url' => 'nullable|string|max:255',
            'secondary_button_label' => 'nullable|string|max:255',
            'secondary_button_url' => 'nullable|string|max:255',
            'desktop_image' => 'nullable|image|max:5120',
            'mobile_image' => 'nullable|image|max:5120',
            'fallback_color' => 'nullable|string|max:20',
            'text_position' => 'required|in:left,center,right',
            'content_alignment' => 'required|in:top,center,bottom',
            'theme_variant' => 'required|in:light,dark',
            'open_in_new_tab' => 'boolean',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        if ($request->hasFile('desktop_image')) {
            $path = $request->file('desktop_image')->store('banners', 'public');
            $media = Media::create(['name' => $request->file('desktop_image')->getClientOriginalName(), 'path' => $path, 'mime_type' => $request->file('desktop_image')->getMimeType(), 'size' => $request->file('desktop_image')->getSize()]);
            $validated['desktop_media_id'] = $media->id;
        }

        if ($request->hasFile('mobile_image')) {
            $path = $request->file('mobile_image')->store('banners', 'public');
            $media = Media::create(['name' => $request->file('mobile_image')->getClientOriginalName(), 'path' => $path, 'mime_type' => $request->file('mobile_image')->getMimeType(), 'size' => $request->file('mobile_image')->getSize()]);
            $validated['mobile_media_id'] = $media->id;
        }

        unset($validated['desktop_image']);
        unset($validated['mobile_image']);

        Banner::create($validated);

        return redirect()->route('admin.banners.index')->with('success', 'Banner created successfully.');
    }

    public function edit(Banner $banner)
    {
        $media = Media::latest()->get()->map(fn($m) => [
            'id' => $m->id,
            'name' => $m->name,
            'url' => asset('storage/' . $m->path),
        ]);

        return Inertia::render('Admin/Banners/Edit', [
            'banner' => $banner,
            'mediaLibrary' => $media,
        ]);
    }

    public function update(Request $request, Banner $banner)
    {
        $validated = $request->validate([
            'internal_name' => 'required|string|max:255',
            'eyebrow_en' => 'nullable|string|max:255',
            'eyebrow_km' => 'nullable|string|max:255',
            'title_en' => 'nullable|string|max:255',
            'title_km' => 'nullable|string|max:255',
            'description_en' => 'nullable|string',
            'description_km' => 'nullable|string',
            'primary_button_label' => 'nullable|string|max:255',
            'primary_button_url' => 'nullable|string|max:255',
            'secondary_button_label' => 'nullable|string|max:255',
            'secondary_button_url' => 'nullable|string|max:255',
            'desktop_image' => 'nullable|image|max:5120',
            'mobile_image' => 'nullable|image|max:5120',
            'fallback_color' => 'nullable|string|max:20',
            'text_position' => 'required|in:left,center,right',
            'content_alignment' => 'required|in:top,center,bottom',
            'theme_variant' => 'required|in:light,dark',
            'open_in_new_tab' => 'boolean',
            'is_active' => 'boolean',
            'sort_order' => 'integer',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        if ($request->hasFile('desktop_image')) {
            $path = $request->file('desktop_image')->store('banners', 'public');
            $media = Media::create(['name' => $request->file('desktop_image')->getClientOriginalName(), 'path' => $path, 'mime_type' => $request->file('desktop_image')->getMimeType(), 'size' => $request->file('desktop_image')->getSize()]);
            $validated['desktop_media_id'] = $media->id;
        }

        if ($request->hasFile('mobile_image')) {
            $path = $request->file('mobile_image')->store('banners', 'public');
            $media = Media::create(['name' => $request->file('mobile_image')->getClientOriginalName(), 'path' => $path, 'mime_type' => $request->file('mobile_image')->getMimeType(), 'size' => $request->file('mobile_image')->getSize()]);
            $validated['mobile_media_id'] = $media->id;
        }

        unset($validated['desktop_image']);
        unset($validated['mobile_image']);

        $banner->update($validated);

        return redirect()->route('admin.banners.index')->with('success', 'Banner updated successfully.');
    }

    public function destroy(Banner $banner)
    {
        $banner->delete();
        return redirect()->route('admin.banners.index')->with('success', 'Banner deleted successfully.');
    }
}
