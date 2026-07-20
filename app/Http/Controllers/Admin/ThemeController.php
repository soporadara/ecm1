<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ThemeController extends Controller
{
    public function index()
    {
        // Currently hardcoded since this is a custom React app, not WordPress
        // We present a pseudo "Active Theme" interface to meet user expectations
        return Inertia::render('Admin/Themes/Index', [
            'active_theme' => [
                'name' => 'Rafel Ecommerce',
                'version' => '1.0.0',
                'author' => 'Sopora',
                'description' => 'A custom built headless React+Inertia theme for high-end commerce.',
            ]
        ]);
    }

    public function customize()
    {
        $colors = Setting::where('group', 'theme_colors')->pluck('value', 'key');

        return Inertia::render('Admin/Themes/Customize', [
            'colors' => $colors
        ]);
    }

    public function updateCustomize(Request $request)
    {
        $validated = $request->validate([
            'primary_color' => 'nullable|string|max:20',
            'secondary_color' => 'nullable|string|max:20',
            'bg_color' => 'nullable|string|max:20',
        ]);

        foreach ($validated as $key => $value) {
            Setting::updateOrCreate(
                ['group' => 'theme_colors', 'key' => $key],
                ['value' => $value ?? '']
            );
        }

        return back()->with('success', 'Theme customized successfully. The storefront colors have been updated.');
    }
}
