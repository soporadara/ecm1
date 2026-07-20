<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
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
        ]);

        foreach ($validated as $key => $value) {
            Setting::updateOrCreate(
                ['group' => 'general', 'key' => $key],
                ['value' => $value ?? '']
            );
        }

        return back()->with('success', 'General settings updated successfully.');
    }
}
