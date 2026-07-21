<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Marketplace extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'logo',
        'brand_color',
        'website_url',
        'android_app_url',
        'ios_app_url',
        'universal_link',
        'description',
        'is_enabled',
        'import_enabled',
        'manual_fallback_enabled',
        'status',
        'maintenance_message',
        'supported_countries',
        'sort_order',
        'cache_lifetime_minutes',
    ];

    protected $casts = [
        'is_enabled'              => 'boolean',
        'import_enabled'          => 'boolean',
        'manual_fallback_enabled' => 'boolean',
        'supported_countries'     => 'array',
    ];

    public function domains(): HasMany
    {
        return $this->hasMany(MarketplaceDomain::class);
    }
}
