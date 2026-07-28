<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $posts = Post::with(['user', 'category'])
            ->when($request->filled('from'), fn ($query) => $query->whereDate('published_at', '>=', $request->input('from')))
            ->when($request->filled('to'), fn ($query) => $query->whereDate('published_at', '<=', $request->input('to')))
            ->latest()
            ->paginate(15)
            ->withQueryString();
        
        return Inertia::render('Admin/Posts/Index', [
            'posts' => $posts,
            'filters' => $request->only(['from', 'to']),
        ]);
    }

    public function importDoc(Request $request)
    {
        $request->validate([
            'url' => 'required|url',
        ]);

        $url = $request->input('url');
        
        if (preg_match('/\/document\/d\/([a-zA-Z0-9_-]+)/', $url, $matches)) {
            $docId = $matches[1];
            $exportUrl = "https://docs.google.com/document/d/{$docId}/export?format=txt";
            
            try {
                $response = \Illuminate\Support\Facades\Http::get($exportUrl);
                if ($response->successful()) {
                    return response()->json(['text' => $response->body()]);
                }
            } catch (\Exception $e) {
                // ignore and fall through to error
            }
        }
        
        return response()->json(['error' => 'Unable to fetch the Google Doc. Make sure the link is correct and set to "Anyone with the link can view".'], 422);
    }

    public function create()
    {
        $categories = \App\Models\PostCategory::orderBy('name')->get();
        return Inertia::render('Admin/Posts/Create', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:posts',
            'content' => 'nullable|string',
            'image' => 'nullable|url',
            'image_urls' => 'nullable|string',
            'image_files' => 'nullable|array',
            'image_files.*' => 'image|max:5120',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string',
            'post_category_id' => 'nullable|exists:post_categories,id',
            'is_published' => 'boolean',
            'scheduled_at' => 'nullable|date',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        $validated['user_id'] = auth('admin')->id();
        $validated['images'] = $this->collectImages($request, $validated['image_urls'] ?? null, $validated['image'] ?? null);
        $validated['published_at'] = $validated['is_published']
            ? ($validated['scheduled_at'] ?? now())
            : null;

        unset($validated['image_urls'], $validated['image_files']);

        Post::create($validated);

        return redirect()->route('admin.posts.index')->with('success', 'Post created successfully.');
    }

    public function edit(Post $post)
    {
        $categories = \App\Models\PostCategory::orderBy('name')->get();
        return Inertia::render('Admin/Posts/Edit', [
            'post' => $post,
            'categories' => $categories
        ]);
    }

    public function update(Request $request, Post $post)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:posts,slug,' . $post->id,
            'content' => 'nullable|string',
            'image' => 'nullable|url',
            'image_urls' => 'nullable|string',
            'image_files' => 'nullable|array',
            'image_files.*' => 'image|max:5120',
            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string',
            'post_category_id' => 'nullable|exists:post_categories,id',
            'is_published' => 'boolean',
            'scheduled_at' => 'nullable|date',
        ]);

        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['title']);
        }

        $validated['images'] = $this->collectImages($request, $validated['image_urls'] ?? null, $validated['image'] ?? null, $post->images ?? []);
        $validated['published_at'] = $validated['is_published']
            ? ($validated['scheduled_at'] ?? $post->published_at ?? now())
            : null;

        unset($validated['image_urls'], $validated['image_files']);

        $post->update($validated);

        return redirect()->route('admin.posts.index')->with('success', 'Post updated successfully.');
    }

    public function destroy(Post $post)
    {
        $post->delete();

        return redirect()->route('admin.posts.index')->with('success', 'Post deleted successfully.');
    }

    private function collectImages(Request $request, ?string $imageUrls, ?string $coverImage, array $existing = []): array
    {
        $images = collect($existing)
            ->merge(preg_split('/\r\n|\r|\n/', (string) $imageUrls))
            ->merge($coverImage ? [$coverImage] : [])
            ->map(fn ($url) => trim((string) $url))
            ->filter()
            ->unique()
            ->values();

        foreach ($request->file('image_files', []) as $file) {
            $path = $file->store('posts', 'public');
            $images->push(Storage::disk('public')->url($path));
        }

        return $images->unique()->values()->all();
    }
}
