<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        $posts = Post::with('user')
            ->where('is_published', true)
            ->latest('published_at')
            ->paginate(12);

        return Inertia::render('Blog/Index', [
            'posts' => $posts
        ]);
    }

    public function show($slug)
    {
        $post = Post::with('user')
            ->where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        // Get related posts (e.g. latest 3)
        $relatedPosts = Post::where('is_published', true)
            ->where('id', '!=', $post->id)
            ->latest('published_at')
            ->take(3)
            ->get();

        return Inertia::render('Blog/Show', [
            'post' => $post,
            'relatedPosts' => $relatedPosts
        ]);
    }
}
