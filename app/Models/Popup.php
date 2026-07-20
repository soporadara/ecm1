<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Popup extends Model
{
    protected $fillable = [
        'title',
        'heading',
        'description',
        'image_path',
        'link_url',
        'is_active',
    ];
}
