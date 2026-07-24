<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Popup;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class PopupController extends Controller
{
    public function index()
    {
        $popups = Popup::latest()->paginate(10)->through(fn (Popup $popup) => [
            ...$popup->toArray(),
            'image_url' => $this->imageUrl($popup),
        ]);

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
            'badge_text' => 'nullable|string|max:80',
            'heading' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'creative_size' => ['required', Rule::in($this->creativeSizes())],
            'link_url' => 'nullable|string|max:255',
            'button_label' => 'nullable|string|max:80',
            'accent_color' => ['nullable', 'string', 'max:7', 'regex:/^#[0-9A-Fa-f]{6}$/'],
            'is_active' => 'boolean',
            'starts_at' => 'nullable|date',
            'ends_at' => 'nullable|date|after_or_equal:starts_at',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:12288'
        ]);

        if ($validated['is_active'] ?? false) {
            Popup::where('is_active', true)->update(['is_active' => false]);
        }

        $data = collect($validated)->except('image')->toArray();
        $popup = new Popup($data);
        $popup->button_label = ($validated['button_label'] ?? null) ?: 'Shop Now';
        $popup->accent_color = ($validated['accent_color'] ?? null) ?: '#ff4c3b';

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('popups', 'public');
            $popup->image_path = $path;
        }

        $popup->save();

        return redirect()->route('admin.popups.index')->with('success', 'Popup created successfully.');
    }

    public function edit(Popup $popup)
    {
        return Inertia::render('Admin/Popups/Edit', [
            'popup' => [
                ...$popup->toArray(),
                'image_url' => $this->imageUrl($popup),
            ],
        ]);
    }

    public function update(Request $request, Popup $popup)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'badge_text' => 'nullable|string|max:80',
            'heading' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'creative_size' => ['required', Rule::in($this->creativeSizes())],
            'link_url' => 'nullable|string|max:255',
            'button_label' => 'nullable|string|max:80',
            'accent_color' => ['nullable', 'string', 'max:7', 'regex:/^#[0-9A-Fa-f]{6}$/'],
            'is_active' => 'boolean',
            'starts_at' => 'nullable|date',
            'ends_at' => 'nullable|date|after_or_equal:starts_at',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:12288'
        ]);

        if (($validated['is_active'] ?? false) && !$popup->is_active) {
            Popup::where('is_active', true)->whereKeyNot($popup->id)->update(['is_active' => false]);
        }

        $data = collect($validated)->except('image')->toArray();
        $popup->fill($data);
        $popup->button_label = ($validated['button_label'] ?? null) ?: 'Shop Now';
        $popup->accent_color = ($validated['accent_color'] ?? null) ?: '#ff4c3b';

        if ($request->hasFile('image')) {
            if ($popup->image_path) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $popup->image_path));
            }
            $path = $request->file('image')->store('popups', 'public');
            $popup->image_path = $path;
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

    private function imageUrl(Popup $popup): ?string
    {
        if (!$popup->image_path) {
            return null;
        }

        if (str_starts_with($popup->image_path, 'http') || str_starts_with($popup->image_path, '/storage/')) {
            return $popup->image_path;
        }

        return asset('storage/' . $popup->image_path);
    }

    private function creativeSizes(): array
    {
        return ['landscape_1920x1080', 'square_1280x1280', 'portrait_1080x1920'];
    }
}
