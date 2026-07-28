<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Note;
use App\Models\NoteFolder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NoteController extends Controller
{
    public function index(Request $request)
    {
        $folders = NoteFolder::all();
        
        $folderId = $request->query('folder_id');
        $isBin = $request->query('bin') == '1';

        $query = Note::query();

        if ($isBin) {
            $query->where('is_trashed', true);
        } else {
            $query->where('is_trashed', false);
            if ($folderId) {
                $query->where('note_folder_id', $folderId);
            }
        }

        $notes = $query->orderBy('updated_at', 'desc')->get();

        return Inertia::render('Admin/Notes/Index', [
            'folders' => $folders,
            'notes' => $notes,
            'currentFolderId' => $folderId,
            'isBin' => $isBin,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'note_folder_id' => 'nullable|exists:note_folders,id',
        ]);

        $note = Note::create([
            'title' => $validated['title'] ?? 'Untitled Note',
            'content' => $validated['content'],
            'note_folder_id' => $validated['note_folder_id'],
            'user_id' => auth()->id(),
            'is_trashed' => false,
        ]);

        return redirect()->route('admin.notes.index', [
            'folder_id' => $note->note_folder_id,
            'note_id' => $note->id
        ])->with('success', 'Note created.');
    }

    public function update(Request $request, $id)
    {
        $note = Note::findOrFail($id);

        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'note_folder_id' => 'nullable|exists:note_folders,id',
        ]);

        $note->update([
            'title' => $validated['title'] ?? 'Untitled Note',
            'content' => $validated['content'],
            'note_folder_id' => $validated['note_folder_id'],
        ]);

        return back();
    }

    public function trash($id)
    {
        $note = Note::findOrFail($id);
        $note->update(['is_trashed' => true]);

        return redirect()->route('admin.notes.index', ['folder_id' => $note->note_folder_id])
            ->with('success', 'Note moved to bin.');
    }

    public function restore($id)
    {
        $note = Note::findOrFail($id);
        $note->update(['is_trashed' => false]);

        return redirect()->route('admin.notes.index', ['folder_id' => $note->note_folder_id])
            ->with('success', 'Note restored.');
    }

    public function destroy($id)
    {
        $note = Note::findOrFail($id);
        $note->delete();

        return back()->with('success', 'Note deleted permanently.');
    }
}
