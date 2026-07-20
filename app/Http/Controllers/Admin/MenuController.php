<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Menu;
use App\Models\MenuItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenuController extends Controller
{
    public function index()
    {
        $menus = Menu::with(['items' => function($q) {
            $q->whereNull('parent_id')->with('children');
        }])->get();

        return Inertia::render('Admin/Menus/Index', [
            'menus' => $menus
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'handle' => 'required|string|max:255|unique:menus,handle',
            'location' => 'nullable|string|max:255',
        ]);

        Menu::create($validated);

        return back()->with('success', 'Menu created successfully.');
    }

    public function update(Request $request, Menu $menu)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'handle' => 'required|string|max:255|unique:menus,handle,' . $menu->id,
            'location' => 'nullable|string|max:255',
        ]);

        $menu->update($validated);

        return back()->with('success', 'Menu updated successfully.');
    }

    public function destroy(Menu $menu)
    {
        $menu->delete();
        return back()->with('success', 'Menu deleted successfully.');
    }

    // --- Menu Items ---

    public function storeItem(Request $request, Menu $menu)
    {
        $validated = $request->validate([
            'parent_id' => 'nullable|exists:menu_items,id',
            'label' => 'required|string|max:255',
            'url' => 'required|string|max:255',
            'icon' => 'nullable|string|max:255',
            'order' => 'integer',
            'new_tab' => 'boolean',
        ]);

        $menu->items()->create($validated);

        return back()->with('success', 'Menu item added.');
    }

    public function updateItem(Request $request, Menu $menu, MenuItem $item)
    {
        $validated = $request->validate([
            'parent_id' => 'nullable|exists:menu_items,id',
            'label' => 'required|string|max:255',
            'url' => 'required|string|max:255',
            'icon' => 'nullable|string|max:255',
            'order' => 'integer',
            'new_tab' => 'boolean',
        ]);

        $item->update($validated);

        return back()->with('success', 'Menu item updated.');
    }

    public function destroyItem(Menu $menu, MenuItem $item)
    {
        $item->delete();
        return back()->with('success', 'Menu item deleted.');
    }
}
