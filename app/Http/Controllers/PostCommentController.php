<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\PostComment;
use Illuminate\Http\Request;

class PostCommentController extends Controller
{
    public function store(Request $request, Post $post)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'website' => 'nullable|url|max:255',
            'review_title' => 'nullable|string|max:255',
            'content' => 'required|string|max:1000',
        ]);

        $comment = $post->comments()->create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'website' => $validated['website'] ?? null,
            'review_title' => $validated['review_title'] ?? null,
            'content' => $validated['content'],
            'is_approved' => true, // Auto-approve for now based on plan
        ]);

        \App\Models\User::notifyAdmins(new \App\Notifications\AdminSystemNotification(
            "New comment by {$comment->name} on '{$post->title}'",
            "comment",
            "/admin/posts/{$post->id}/comments"
        ));

        return back()->with('success', 'Your comment has been posted successfully.');
    }
}
