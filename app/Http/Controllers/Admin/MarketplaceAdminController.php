<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Marketplace;
use App\Models\MarketplaceDomain;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
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
            'name_km'                 => 'nullable|string|max:100',
            'name_en'                 => 'nullable|string|max:100',
            'name_vi'                 => 'nullable|string|max:100',
            'slug'                    => 'nullable|string|max:100|unique:marketplaces,slug',
            'brand_color'             => 'nullable|string|max:7',
            'website_url'             => ['nullable', 'url', 'max:255', $this->safePublicUrlRule()],
            'icon_source_url'         => ['nullable', 'url', 'max:255', $this->safePublicUrlRule()],
            'icon_path'               => 'nullable|string|max:255',
            'alt_text'                => 'nullable|string|max:150',
            'android_app_url'         => 'nullable|string|max:255',
            'ios_app_url'             => 'nullable|string|max:255',
            'description'             => 'nullable|string|max:500',
            'is_enabled'              => 'boolean',
            'open_in_new_tab'         => 'boolean',
            'import_enabled'          => 'boolean',
            'manual_fallback_enabled' => 'boolean',
            'status'                  => 'required|string|in:active,maintenance,disabled',
            'maintenance_message'     => 'nullable|string|max:500',
            'sort_order'              => 'integer|min:0',
            'starts_at'               => 'nullable|date',
            'ends_at'                 => 'nullable|date|after_or_equal:starts_at',
            'domains'                 => 'array',
            'domains.*'               => 'string|max:100',
        ]);

        $domains = $data['domains'] ?? [];
        unset($data['domains']);
        $data['slug'] = $data['slug'] ? Str::slug($data['slug']) : Str::slug($data['name']);
        if ($data['slug'] === '') {
            $data['slug'] = 'site-'.Str::lower(Str::random(8));
        }
        $data['is_enabled'] = true;
        $data['open_in_new_tab'] = true;
        $data['created_by'] = $request->user()->id;
        $data['updated_by'] = $request->user()->id;

        $marketplace = Marketplace::create($data);

        foreach ($domains as $domain) {
            MarketplaceDomain::firstOrCreate(
                ['domain' => $domain],
                ['marketplace_id' => $marketplace->id]
            );
        }

        return back()->with('success', 'Available site created.');
    }

    public function update(Request $request, Marketplace $marketplace)
    {
        $data = $request->validate([
            'name'                    => 'required|string|max:100',
            'name_km'                 => 'nullable|string|max:100',
            'name_en'                 => 'nullable|string|max:100',
            'name_vi'                 => 'nullable|string|max:100',
            'slug'                    => ['nullable', 'string', 'max:100', Rule::unique('marketplaces', 'slug')->ignore($marketplace->id)],
            'brand_color'             => 'nullable|string|max:7',
            'website_url'             => ['nullable', 'url', 'max:255', $this->safePublicUrlRule()],
            'icon_source_url'         => ['nullable', 'url', 'max:255', $this->safePublicUrlRule()],
            'icon_path'               => 'nullable|string|max:255',
            'alt_text'                => 'nullable|string|max:150',
            'android_app_url'         => 'nullable|string|max:255',
            'ios_app_url'             => 'nullable|string|max:255',
            'description'             => 'nullable|string|max:500',
            'is_enabled'              => 'boolean',
            'open_in_new_tab'         => 'boolean',
            'import_enabled'          => 'boolean',
            'manual_fallback_enabled' => 'boolean',
            'status'                  => 'required|string|in:active,maintenance,disabled',
            'maintenance_message'     => 'nullable|string|max:500',
            'sort_order'              => 'integer|min:0',
            'starts_at'               => 'nullable|date',
            'ends_at'                 => 'nullable|date|after_or_equal:starts_at',
        ]);

        if (!empty($data['slug'])) {
            $data['slug'] = Str::slug($data['slug']);
            if ($data['slug'] === '') {
                unset($data['slug']);
            }
        }
        $data['updated_by'] = $request->user()->id;
        $marketplace->update($data);

        return back()->with('success', 'Available site updated.');
    }

    public function reorder(Request $request)
    {
        $data = $request->validate([
            'order' => 'required|array',
            'order.*' => 'required|integer|exists:marketplaces,id',
        ]);

        foreach ($data['order'] as $index => $id) {
            Marketplace::where('id', $id)->update(['sort_order' => $index]);
        }

        return back()->with('success', 'Order updated successfully.');
    }

    public function destroy(Marketplace $marketplace)
    {
        $marketplace->update([
            'is_enabled' => false,
            'status' => 'disabled',
            'updated_by' => auth('admin')->id(),
        ]);
        $marketplace->delete();

        return back()->with('success', 'Available site deleted.');
    }

    private function safePublicUrlRule(): \Closure
    {
        return function (string $attribute, mixed $value, \Closure $fail): void {
            if (!$value) {
                return;
            }

            $parts = parse_url((string) $value);
            $scheme = strtolower($parts['scheme'] ?? '');
            $host = strtolower($parts['host'] ?? '');

            if (!in_array($scheme, ['http', 'https'], true) || !$host) {
                $fail('The '.$attribute.' must be a public http or https URL.');
                return;
            }

            if ($host === 'localhost' || str_ends_with($host, '.local')) {
                $fail('The '.$attribute.' must not point to a local address.');
            }
        };
    }
}
