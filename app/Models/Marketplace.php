<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Marketplace extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'name_km',
        'name_en',
        'name_vi',
        'slug',
        'logo',
        'icon_path',
        'icon_source_url',
        'alt_text',
        'brand_color',
        'website_url',
        'android_app_url',
        'ios_app_url',
        'universal_link',
        'description',
        'is_enabled',
        'open_in_new_tab',
        'import_enabled',
        'manual_fallback_enabled',
        'status',
        'maintenance_message',
        'supported_countries',
        'sort_order',
        'starts_at',
        'ends_at',
        'created_by',
        'updated_by',
        'cache_lifetime_minutes',
    ];

    protected $casts = [
        'is_enabled'              => 'boolean',
        'open_in_new_tab'         => 'boolean',
        'import_enabled'          => 'boolean',
        'manual_fallback_enabled' => 'boolean',
        'supported_countries'     => 'array',
        'starts_at'               => 'datetime',
        'ends_at'                 => 'datetime',
    ];

    public function domains(): HasMany
    {
        return $this->hasMany(MarketplaceDomain::class);
    }
}
