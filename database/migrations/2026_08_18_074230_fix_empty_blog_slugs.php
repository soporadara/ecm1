<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Post;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $posts = Post::whereNull('slug')->orWhere('slug', '')->get();
        foreach ($posts as $post) {
            $slug = Str::slug($post->title);
            if (empty($slug)) {
                $slug = 'post-' . uniqid();
            }
            
            $originalSlug = $slug;
            $counter = 1;
            while (Post::where('slug', $slug)->where('id', '!=', $post->id)->exists()) {
                $slug = $originalSlug . '-' . $counter;
                $counter++;
            }
            
            $post->slug = $slug;
            $post->save();
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // No down migration needed
    }
};
