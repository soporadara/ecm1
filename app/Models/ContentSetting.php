<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContentSetting extends Model
{
    protected $guarded = [];

    public static function publicValue(string $group, string $key, string $default = '', string $locale = 'en'): string
    {
        $value = static::where(compact('group', 'key', 'locale'))
            ->where('is_public', true)
            ->value('value');

        return $value === null || $value === '' ? $default : (string) $value;
    }
}
