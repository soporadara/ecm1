<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TelegramFaq extends Model
{
    protected $fillable = [
        'question_en',
        'question_km',
        'question_vi',
        'answer_en',
        'answer_km',
        'answer_vi',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];
}
