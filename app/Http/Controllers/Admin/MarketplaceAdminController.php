<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Marketplace;
use App\Models\MarketplaceDomain;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MarketplaceAdminController extends Controller
{
    public function index()
    {
        $marketplaces = Marketplace::withCount('domains')
            ->with('domains')
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('Admin/Marketplaces/Index', [
            'marketplaces' => $marketplaces,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'                    => 'required|string|max:100',
            'slug'                    => 'required|string|max:100|unique:marketplaces,slug',
            'brand_color'             => 'nullable|string|max:7',
            'website_url'             => 'nullable|url|max:255',
            'android_app_url'         => 'nullable|string|max:255',
            'ios_app_url'             => 'nullable|string|max:255',
            'description'             => 'nullable|string|max:500',
            'is_enabled'              => 'boolean',
            'import_enabled'          => 'boolean',
            'manual_fallback_enabled' => 'boolean',
            'status'                  => 'required|string|in:active,maintenance,disabled',
            'maintenance_message'     => 'nullable|string|max:500',
            'sort_order'              => 'integer|min:0',
            'domains'                 => 'array',
            'domains.*'               => 'string|max:100',
        ]);

        $domains = $data['domains'] ?? [];
        unset($data['domains']);

        $marketplace = Marketplace::create($data);

        foreach ($domains as $domain) {
            MarketplaceDomain::firstOrCreate(
                ['domain' => $domain],
                ['marketplace_id' => $marketplace->id]
            );
        }

        return back()->with('success', 'Marketplace created.');
    }

    public function update(Request $request, Marketplace $marketplace)
    {
        $data = $request->validate([
            'name'                    => 'required|string|max:100',
            'brand_color'             => 'nullable|string|max:7',
            'website_url'             => 'nullable|url|max:255',
            'android_app_url'         => 'nullable|string|max:255',
            'ios_app_url'             => 'nullable|string|max:255',
            'description'             => 'nullable|string|max:500',
            'is_enabled'              => 'boolean',
            'import_enabled'          => 'boolean',
            'manual_fallback_enabled' => 'boolean',
            'status'                  => 'required|string|in:active,maintenance,disabled',
            'maintenance_message'     => 'nullable|string|max:500',
            'sort_order'              => 'integer|min:0',
        ]);

        $marketplace->update($data);

        return back()->with('success', 'Marketplace updated.');
    }

    public function destroy(Marketplace $marketplace)
    {
        $marketplace->domains()->delete();
        $marketplace->delete();

        return back()->with('success', 'Marketplace deleted.');
    }
}
