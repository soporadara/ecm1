<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\NoteFolder;
use Illuminate\Http\Request;

class NoteFolderController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        NoteFolder::create([
            'name' => $validated['name'],
            'user_id' => auth()->id(),
        ]);

        return back()->with('success', 'Folder created successfully.');
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $folder = NoteFolder::findOrFail($id);
        $folder->update(['name' => $validated['name']]);

        return back()->with('success', 'Folder updated successfully.');
    }

    public function destroy($id)
    {
        $folder = NoteFolder::findOrFail($id);
        $folder->delete();

        return back()->with('success', 'Folder deleted successfully.');
    }
}
