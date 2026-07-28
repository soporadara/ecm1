<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    use HasFactory;

    protected $fillable = [
        'note_folder_id',
        'title',
        'content',
        'is_trashed',
        'user_id',
    ];

    protected $casts = [
        'is_trashed' => 'boolean',
    ];

    public function folder()
    {
        return $this->belongsTo(NoteFolder::class, 'note_folder_id');
    }
}
