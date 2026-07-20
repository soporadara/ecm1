<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'valid_until' => 'datetime',
        'is_active' => 'boolean',
    ];
    
    public function isValid()
    {
        if (!$this->is_active) return false;
        if ($this->valid_until && $this->valid_until->isPast()) return false;
        if ($this->usage_limit && $this->used >= $this->usage_limit) return false;
        return true;
    }
}
