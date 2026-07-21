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
            'currency' => 'required|string|max:10',
            'store_address' => 'nullable|string',
            'store_logo' => 'nullable',
            'store_favicon' => 'nullable',
        ]);

        $settingsToSave = [
            'store_name' => $validated['store_name'] ?? null,
            'support_email' => $validated['support_email'] ?? null,
            'support_phone' => $validated['support_phone'] ?? null,
            'currency' => $validated['currency'] ?? null,
            'store_address' => $validated['store_address'] ?? null,
        ];

        if ($request->hasFile('store_logo')) {
            $logoPath = $request->file('store_logo')->store('settings', 'public');
            $settingsToSave['store_logo'] = '/storage/' . $logoPath;
        } elseif (is_string($request->input('store_logo'))) {
            $settingsToSave['store_logo'] = $request->input('store_logo');
        }

        if ($request->hasFile('store_favicon')) {
            $faviconPath = $request->file('store_favicon')->store('settings', 'public');
            $settingsToSave['store_favicon'] = '/storage/' . $faviconPath;
        } elseif (is_string($request->input('store_favicon'))) {
            $settingsToSave['store_favicon'] = $request->input('store_favicon');
        }

        foreach ($settingsToSave as $key => $value) {
            if ($value !== null || $key === 'store_address' || $key === 'support_phone') {
                Setting::updateOrCreate(
                    ['group' => 'general', 'key' => $key],
                    ['value' => $value ?? '']
                );
            }
        }

        return back()->with('success', 'General settings updated successfully.');
    }
}
