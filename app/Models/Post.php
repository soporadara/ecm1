<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $guarded = [];

    protected function image(): \Illuminate\Database\Eloquent\Casts\Attribute
    {
        return \Illuminate\Database\Eloquent\Casts\Attribute::make(
            get: function ($value, $attributes) {
                $imagePath = null;
                if (!empty($value)) {
                    $imagePath = $value;
                } elseif (!empty($attributes['images'])) {
                    $images = json_decode($attributes['images'], true);
                    if (!empty($images) && is_array($images) && count($images) > 0) {
                        $imagePath = $images[0];
                    }
                } elseif (!empty($attributes['content'])) {
                    if (preg_match('/<img[^>]+src=[\'"]([^\'"]+)[\'"][^>]*>/i', $attributes['content'], $matches)) {
                        $imagePath = $matches[1];
                    } elseif (preg_match('/!\[.*?\]\((.*?)\)/', $attributes['content'], $matches)) {
                        $imagePath = $matches[1];
                    }
                }
                
                if ($imagePath) {
                    if (str_starts_with($imagePath, 'http') || str_starts_with($imagePath, '/')) {
                        return $imagePath;
                    }
                    return asset('storage/' . $imagePath);
                }
                
                return null;
            }
        );
    }

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

    public function comments()
    {
        return $this->hasMany(PostComment::class);
    }

    public function category()
    {
        return $this->belongsTo(PostCategory::class, 'post_category_id');
    }
}
