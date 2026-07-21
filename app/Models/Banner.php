<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    protected $guarded = [];

    protected $casts = [
        'is_active' => 'boolean',
        'open_in_new_tab' => 'boolean',
        'start_date' => 'datetime',
        'end_date' => 'datetime',
    ];

    public function desktopMedia()
    {
        return $this->belongsTo(Media::class, 'desktop_media_id');
    }

    public function mobileMedia()
    {
        return $this->belongsTo(Media::class, 'mobile_media_id');
    }
}
