<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SeoController extends Controller
{
    public function index()
    {
        $this->authorize('settings.view');

        $settings = Setting::where('group', 'seo')->pluck('value', 'key')->toArray();

        return Inertia::render('Admin/Settings/Seo', [
            'seoSettings' => [
                'meta_title' => $settings['meta_title'] ?? config('app.name'),
                'meta_description' => $settings['meta_description'] ?? 'Welcome to our store',
                'meta_keywords' => $settings['meta_keywords'] ?? 'ecommerce, store, shop',
                'og_image' => $settings['og_image'] ?? null,
                'twitter_handle' => $settings['twitter_handle'] ?? '@store',
            ]
        ]);
    }

    public function store(Request $request)
    {
        $this->authorize('settings.update');

        $validated = $request->validate([
            'meta_title' => 'required|string|max:255',
            'meta_description' => 'required|string|max:500',
            'meta_keywords' => 'nullable|string|max:255',
            'og_image' => 'nullable|string',
            'twitter_handle' => 'nullable|string|max:255',
        ]);

        foreach ($validated as $key => $value) {
            Setting::updateOrCreate(
                ['group' => 'seo', 'key' => $key],
                ['value' => $value]
            );
        }

        return redirect()->back()->with('success', 'SEO settings updated successfully.');
    }
}
