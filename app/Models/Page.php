<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    protected $guarded = [];

    protected $casts = [
        'is_published' => 'boolean',
        'is_system' => 'boolean',
        'is_private' => 'boolean',
        'show_in_navigation' => 'boolean',
        'is_deletable' => 'boolean',
    ];
}
