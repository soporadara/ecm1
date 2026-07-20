<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HomePageSection;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomePageSectionController extends Controller
{
    public function index()
    {
        $sections = HomePageSection::orderBy('sort_order')->get();
        return Inertia::render('Admin/Sections/Index', [
            'sections' => $sections
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|string',
            'title' => 'nullable|string',
            'subtitle' => 'nullable|string',
            'content' => 'nullable|array',
        ]);
        
        $validated['content'] = json_encode($validated['content'] ?? []);
        $validated['sort_order'] = HomePageSection::max('sort_order') + 1;

        HomePageSection::create($validated);

        return back()->with('success', 'Section created');
    }

    public function update(Request $request, HomePageSection $section)
    {
        $validated = $request->validate([
            'title' => 'nullable|string',
            'subtitle' => 'nullable|string',
            'content' => 'nullable|array',
            'is_active' => 'boolean'
        ]);

        $validated['content'] = json_encode($validated['content'] ?? []);
        $section->update($validated);

        return back()->with('success', 'Section updated');
    }

    public function reorder(Request $request)
    {
        $items = $request->input('items', []);
        foreach ($items as $index => $id) {
            HomePageSection::where('id', $id)->update(['sort_order' => $index]);
        }
        return back();
    }
}
