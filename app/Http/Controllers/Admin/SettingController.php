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
            'social_1_name' => 'nullable|string|max:80',
            'social_1_url' => 'nullable|url|max:255',
            'social_1_icon' => 'nullable|string|max:80',
            'social_2_name' => 'nullable|string|max:80',
            'social_2_url' => 'nullable|url|max:255',
            'social_2_icon' => 'nullable|string|max:80',
            'social_3_name' => 'nullable|string|max:80',
            'social_3_url' => 'nullable|url|max:255',
            'social_3_icon' => 'nullable|string|max:80',
            'social_4_name' => 'nullable|string|max:80',
            'social_4_url' => 'nullable|url|max:255',
            'social_4_icon' => 'nullable|string|max:80',
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
            'social_1_name' => $validated['social_1_name'] ?? null,
            'social_1_url' => $validated['social_1_url'] ?? null,
            'social_1_icon' => $validated['social_1_icon'] ?? null,
            'social_2_name' => $validated['social_2_name'] ?? null,
            'social_2_url' => $validated['social_2_url'] ?? null,
            'social_2_icon' => $validated['social_2_icon'] ?? null,
            'social_3_name' => $validated['social_3_name'] ?? null,
            'social_3_url' => $validated['social_3_url'] ?? null,
            'social_3_icon' => $validated['social_3_icon'] ?? null,
            'social_4_name' => $validated['social_4_name'] ?? null,
            'social_4_url' => $validated['social_4_url'] ?? null,
            'social_4_icon' => $validated['social_4_icon'] ?? null,
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
            if ($value !== null || $key === 'store_address' || $key === 'support_phone' || str_starts_with($key, 'social_') || str_starts_with($key, 'about_')) {
                Setting::updateOrCreate(
                    ['group' => 'general', 'key' => $key],
                    ['value' => $value ?? '']
                );
            }
        }

        return back()->with('success', 'General settings updated successfully.');
    }
}
