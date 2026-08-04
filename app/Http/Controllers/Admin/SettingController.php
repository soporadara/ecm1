<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        $settings = Setting::where('group', 'general')->pluck('value', 'key');
        
        return Inertia::render('Admin/Settings/Index', [
            'settings' => $settings,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'store_name' => 'required|string|max:255',
            'support_email' => 'required|email|max:255',
            'support_phone' => 'nullable|string|max:50',
            'currency' => 'required|in:USD,VND',
            'store_address' => 'nullable|string',
            'about_title' => 'nullable|string|max:255',
            'about_text' => 'nullable|string|max:2000',
            'social_links' => 'nullable|array',
            'social_links.*.name' => 'nullable|string|max:255',
            'social_links.*.url' => 'nullable|string|max:1000',
            'social_links.*.icon' => 'nullable|string|max:1000',
            'fab_email' => 'nullable|string|max:255',
            'fab_phone' => 'nullable|string|max:255',
            'fab_messenger' => 'nullable|string|max:255',
            'fab_telegram' => 'nullable|string|max:255',
            'cambodia_map_embed_url' => 'nullable|string',
            'cambodia_map_open_url' => 'nullable|string|max:1000',
            'cambodia_map_address' => 'nullable|string|max:1000',
            'vietnam_map_embed_url' => 'nullable|string',
            'vietnam_map_open_url' => 'nullable|string|max:1000',
            'vietnam_map_address' => 'nullable|string|max:1000',
            'store_logo' => 'nullable',
            'store_favicon' => 'nullable',
        ]);

        $settingsToSave = [
            'store_name' => $validated['store_name'] ?? null,
            'support_email' => $validated['support_email'] ?? null,
            'support_phone' => $validated['support_phone'] ?? null,
            'currency' => $validated['currency'] ?? null,
            'default_currency' => $validated['currency'] ?? 'USD',
            'store_address' => $validated['store_address'] ?? null,
            'about_title' => $validated['about_title'] ?? null,
            'about_text' => $validated['about_text'] ?? null,
            'social_links' => isset($validated['social_links']) ? json_encode($validated['social_links']) : null,
            'fab_email' => $validated['fab_email'] ?? null,
            'fab_phone' => $validated['fab_phone'] ?? null,
            'fab_messenger' => $validated['fab_messenger'] ?? null,
            'fab_telegram' => $validated['fab_telegram'] ?? null,
            'cambodia_map_embed_url' => $validated['cambodia_map_embed_url'] ?? null,
            'cambodia_map_open_url' => $validated['cambodia_map_open_url'] ?? null,
            'cambodia_map_address' => $validated['cambodia_map_address'] ?? null,
            'vietnam_map_embed_url' => $validated['vietnam_map_embed_url'] ?? null,
            'vietnam_map_open_url' => $validated['vietnam_map_open_url'] ?? null,
            'vietnam_map_address' => $validated['vietnam_map_address'] ?? null,
        ];

        if ($request->hasFile('store_logo')) {
            $logoPath = $request->file('store_logo')->store('settings', 'public');
            $settingsToSave['store_logo'] = '/storage/' . $logoPath;
        } elseif ($request->exists('store_logo')) {
            $settingsToSave['store_logo'] = $request->input('store_logo');
        }

        if ($request->hasFile('store_favicon')) {
            $faviconPath = $request->file('store_favicon')->store('settings', 'public');
            $settingsToSave['store_favicon'] = '/storage/' . $faviconPath;
        } elseif ($request->exists('store_favicon')) {
            $settingsToSave['store_favicon'] = $request->input('store_favicon');
        }

        foreach ($settingsToSave as $key => $value) {
            if ($value !== null || $key === 'store_address' || $key === 'support_phone' || $key === 'social_links' || str_starts_with($key, 'about_') || str_starts_with($key, 'fab_') || str_contains($key, '_map_')) {
                Setting::updateOrCreate(
                    ['group' => 'general', 'key' => $key],
                    ['value' => $value ?? '']
                );
            }
        }

        \Illuminate\Support\Facades\Cache::forget('general_settings');

        return back()->with('success', 'General settings updated successfully.');
    }
}
