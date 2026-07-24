<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'images' => 'array',
            'published_at' => 'datetime',
            'scheduled_at' => 'datetime',
            'is_published' => 'boolean',
        ];
    }
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(PostCategory::class, 'post_category_id');
    }
}
