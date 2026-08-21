<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuoteRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'origin',
        'destination',
        'product_type',
        'quantity',
        'weight',
        'dimensions',
        'shipping_method',
        'name',
        'phone',
        'email',
        'status',
    ];
}
