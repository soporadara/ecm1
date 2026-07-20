<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Popup;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class PopupController extends Controller
{
    public function index()
    {
        $popups = Popup::latest()->paginate(10);
        return Inertia::render('Admin/Popups/Index', [
            'popups' => $popups
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Popups/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'heading' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'link_url' => 'nullable|string|max:255',
            'is_active' => 'boolean',
            'image' => 'nullable|image|max:2048'
        ]);

        $popup = new Popup();
        $popup->title = $validated['title'];
        $popup->heading = $validated['heading'] ?? null;
        $popup->description = $validated['description'] ?? null;
        $popup->link_url = $validated['link_url'] ?? null;
        $popup->is_active = $validated['is_active'] ?? false;

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('popups', 'public');
            $popup->image_path = '/storage/' . $path;
        }

        $popup->save();

        return redirect()->route('admin.popups.index')->with('success', 'Popup created successfully.');
    }

    public function edit(Popup $popup)
    {
        return Inertia::render('Admin/Popups/Edit', [
            'popup' => $popup
        ]);
    }

    public function update(Request $request, Popup $popup)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'heading' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'link_url' => 'nullable|string|max:255',
            'is_active' => 'boolean',
            'image' => 'nullable|image|max:2048'
        ]);

        $popup->title = $validated['title'];
        $popup->heading = $validated['heading'] ?? null;
        $popup->description = $validated['description'] ?? null;
        $popup->link_url = $validated['link_url'] ?? null;
        $popup->is_active = $validated['is_active'] ?? false;

        if ($request->hasFile('image')) {
            if ($popup->image_path) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $popup->image_path));
            }
            $path = $request->file('image')->store('popups', 'public');
            $popup->image_path = '/storage/' . $path;
        }

        $popup->save();

        return redirect()->route('admin.popups.index')->with('success', 'Popup updated successfully.');
    }

    public function destroy(Popup $popup)
    {
        if ($popup->image_path) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $popup->image_path));
        }
        $popup->delete();

        return redirect()->route('admin.popups.index')->with('success', 'Popup deleted successfully.');
    }
}
