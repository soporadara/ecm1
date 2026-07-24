<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\PostCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $query = Post::with('user', 'category')
            ->where('is_published', true)
            ->where(function ($q) {
                $q->whereNull('published_at')->orWhere('published_at', '<=', now());
            });

        if ($request->filled('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        $posts = $query
            ->when($request->filled('from'), fn ($q) => $q->whereDate('published_at', '>=', $request->input('from')))
            ->when($request->filled('to'), fn ($q) => $q->whereDate('published_at', '<=', $request->input('to')))
            ->latest('published_at')
            ->paginate(12)
            ->withQueryString();

        $categories = PostCategory::withCount('posts')->orderBy('name')->get();

        return Inertia::render('Blog/Index', [
            'posts' => $posts,
            'categories' => $categories,
            'filters' => $request->only(['from', 'to', 'category']),
        ]);
    }

    public function show($slug)
    {
        $post = Post::with('user', 'category')
            ->where('slug', $slug)
            ->where('is_published', true)
            ->where(function ($query) {
                $query->whereNull('published_at')->orWhere('published_at', '<=', now());
            })
            ->firstOrFail();

        $relatedPosts = Post::where('is_published', true)
            ->where(function ($query) {
                $query->whereNull('published_at')->orWhere('published_at', '<=', now());
            })
            ->where('id', '!=', $post->id)
            ->latest('published_at')
            ->take(3)
            ->get();

        $categories = PostCategory::withCount('posts')->orderBy('name')->get();

        return Inertia::render('Blog/Show', [
            'post' => $post,
            'relatedPosts' => $relatedPosts,
            'categories' => $categories
        ]);
    }
}

