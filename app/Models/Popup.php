<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Popup extends Model
{
    protected $fillable = [
        'title',
        'badge_text',
        'heading',
        'description',
        'image_path',
        'creative_size',
        'link_url',
        'button_label',
        'accent_color',
        'is_active',
        'starts_at',
        'ends_at',
        'is_demo',
        'demo_batch_id',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'starts_at' => 'datetime',
        'ends_at' => 'datetime',
    ];
}
