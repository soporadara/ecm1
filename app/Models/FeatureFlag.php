<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FeatureFlag extends Model
{
    protected $fillable = [
        'name',
        'label',
        'description',
        'group',
        'value',
        'is_admin_editable',
    ];

    protected $casts = [
        'value'             => 'boolean',
        'is_admin_editable' => 'boolean',
    ];
}
