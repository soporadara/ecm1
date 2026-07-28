<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FlyIconController extends Controller
{
    public function index()
    {
        $settings = Setting::where('group', 'general')->pluck('value', 'key');
        return Inertia::render('Admin/ContentSettings/FlyIcons', [
            'settings' => $settings,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'links' => 'nullable|array',
            'links.*.id' => 'required|string',
            'links.*.name' => 'required|string|max:255',
            'links.*.url' => 'required|string|max:1000',
            'links.*.icon_file' => 'nullable|image|max:2048',
            'links.*.icon_url' => 'nullable|string|max:1000',
        ]);

        $existingLinks = json_decode(Setting::where('group', 'general')->where('key', 'fab_links')->value('value') ?: '[]', true);
        $existingLinksMap = collect($existingLinks)->keyBy('id');
        
        $links = [];

        if ($request->has('links') && is_array($request->links)) {
            foreach ($request->links as $index => $linkData) {
                $id = $linkData['id'];
                $iconUrl = $linkData['icon_url'] ?? null;

                // Handle file upload
                if ($request->hasFile("links.{$index}.icon_file")) {
                    $file = $request->file("links.{$index}.icon_file");
                    $path = $file->store('fab_icons', 'public');
                    $iconUrl = Storage::url($path);
                } elseif (!$iconUrl && isset($existingLinksMap[$id])) {
                    $iconUrl = $existingLinksMap[$id]['icon_url'];
                }

                $links[] = [
                    'id' => $id,
                    'name' => $linkData['name'],
                    'url' => $linkData['url'],
                    'icon_url' => $iconUrl,
                ];
            }
        }

        Setting::updateOrCreate(
            ['group' => 'general', 'key' => 'fab_links'],
            ['value' => json_encode($links)]
        );

        return back()->with('success', 'Fly Icons updated successfully.');
    }
}
