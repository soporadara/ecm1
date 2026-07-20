<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MediaController extends Controller
{
    public function index()
    {
        $media = Media::latest()->paginate(24)->through(fn($m) => [
            'id' => $m->id,
            'name' => $m->name,
            'url' => asset('storage/' . $m->path),
            'mime_type' => $m->mime_type,
            'size' => round($m->size / 1024, 1) . ' KB',
            'created_at' => $m->created_at->diffForHumans(),
        ]);

        return Inertia::render('Admin/Media/Index', [
            'media' => $media,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'files.*' => 'required|file|mimes:jpeg,png,jpg,gif,svg,webp,mp4,webm|max:10240',
        ]);

        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $path = $file->store('media', 'public');
                
                Media::create([
                    'name' => $file->getClientOriginalName(),
                    'file_name' => basename($path),
                    'mime_type' => $file->getMimeType(),
                    'size' => $file->getSize(),
                    'path' => $path,
                    'user_id' => auth()->id(),
                ]);
            }
            return back()->with('success', 'Media uploaded successfully.');
        }

        return back()->withErrors(['error' => 'No files provided.']);
    }

    public function destroy(Media $media)
    {
        Storage::disk('public')->delete($media->path);
        $media->delete();
        
        return back()->with('success', 'Media deleted successfully.');
    }
}
