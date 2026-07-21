<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\FeatureFlags;
use App\Http\Controllers\Controller;
use App\Models\FeatureFlag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FeatureFlagController extends Controller
{
    public function index()
    {
        $flags = FeatureFlag::orderBy('group')->orderBy('name')->get();

        $grouped = $flags->groupBy('group')->map(fn($items) => $items->values());

        return Inertia::render('Admin/FeatureFlags/Index', [
            'groupedFlags' => $grouped,
            'flags'        => $flags,
        ]);
    }

    public function update(Request $request, FeatureFlag $featureFlag)
    {
        $request->validate([
            'value' => 'required|boolean',
        ]);

        if (!$featureFlag->is_admin_editable) {
            abort(403, 'This feature flag cannot be changed through the admin panel.');
        }

        $featureFlag->update(['value' => $request->boolean('value')]);

        // Clear cached value so the change takes effect immediately
        FeatureFlags::clearCache($featureFlag->name);

        return back()->with('success', "Feature flag \"{$featureFlag->label}\" updated.");
    }
}
