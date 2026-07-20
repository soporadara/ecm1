<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HomePageSection;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class BannerController extends Controller
{
    public function index()
    {
        $heroSection = HomePageSection::where('type', 'hero')->first();
        
        return Inertia::render('Admin/Settings/Banner', [
            'banner' => $heroSection ? [
                'id' => $heroSection->id,
                'title' => $heroSection->title,
                'subtitle' => $heroSection->subtitle,
                'content_data' => $heroSection->content,
                'is_active' => $heroSection->is_active,
            ] : null,
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'title' => 'nullable|string',
            'subtitle' => 'nullable|string',
            'media_type' => 'required|in:image,video',
            'media_source' => 'required|in:url,upload',
            'media_url' => 'nullable|string',
            'media_file' => 'nullable|file|mimes:jpeg,png,jpg,webp,mp4,webm|max:51200', // max 50MB
            'button_text' => 'nullable|string',
            'button_link' => 'nullable|string',
        ]);

        $heroSection = HomePageSection::firstOrCreate(
            ['type' => 'hero'],
            ['sort_order' => 1]
        );

        $contentData = $heroSection->content ?? [];

        // Handle File Upload
        if ($request->media_source === 'upload' && $request->hasFile('media_file')) {
            $path = $request->file('media_file')->store('banners', 'public');
            $contentData['media_url'] = '/storage/' . $path;
        } elseif ($request->media_source === 'url' && $request->filled('media_url')) {
            $contentData['media_url'] = $request->media_url;
        }

        $contentData['media_type'] = $request->media_type;
        $contentData['media_source'] = $request->media_source;
        $contentData['button_text'] = $request->button_text;
        $contentData['button_link'] = $request->button_link;

        $heroSection->update([
            'title' => $request->title,
            'subtitle' => $request->subtitle,
            'content' => $contentData,
        ]);

        return back()->with('success', 'Banner updated successfully.');
    }
}
