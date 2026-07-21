<?php

namespace App\Helpers;

use App\Models\FeatureFlag;
use Illuminate\Support\Facades\Cache;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Log;

class FeatureFlags
{
    /**
     * Check if a feature flag is enabled.
     */
    public static function enabled(string $name): bool
    {
        return Cache::remember("feature_flag:{$name}", 60, function () use ($name) {
            try {
                $flag = FeatureFlag::where('name', $name)->first();
                return $flag ? (bool) $flag->value : false;
            } catch (QueryException $e) {
                // Table might not exist yet during migrations or setup
                return false;
            }
        });
    }

    /**
     * Check if a feature flag is disabled.
     */
    public static function disabled(string $name): bool
    {
        return !static::enabled($name);
    }

    /**
     * Get all flags grouped by their group name.
     */
    public static function all(): array
    {
        try {
            return FeatureFlag::orderBy('group')->orderBy('name')->get()->toArray();
        } catch (QueryException $e) {
            return [];
        }
    }

    /**
     * Get all flags as a key => value map.
     */
    public static function allAsMap(): array
    {
        try {
            return FeatureFlag::pluck('value', 'name')
                ->map(fn ($v) => (bool) $v)
                ->toArray();
        } catch (QueryException $e) {
            return [];
        }
    }

    /**
     * Clear the cache for a specific flag (call after updating).
     */
    public static function clearCache(string $name): void
    {
        Cache::forget("feature_flag:{$name}");
    }

    /**
     * Clear all flag caches.
     */
    public static function clearAll(): void
    {
        try {
            $names = FeatureFlag::pluck('name');
            foreach ($names as $name) {
                Cache::forget("feature_flag:{$name}");
            }
        } catch (QueryException $e) {
            // Ignore if table missing
        }
    }
}
