<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'estimated_delivery_at' => 'datetime',
            'submitted_at' => 'datetime',
            'delivered_at' => 'datetime',
            'completed_at' => 'datetime',
            'cancelled_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(OrderImage::class);
    }

    public function attachments(): HasMany
    {
        return $this->hasMany(OrderAttachment::class);
    }

    public function statusHistories(): HasMany
    {
        return $this->hasMany(OrderStatusHistory::class);
    }

    public function messages(): HasMany
    {
        return $this->hasMany(OrderMessage::class);
    }

    public function receipts(): HasMany
    {
        return $this->hasMany(Receipt::class);
    }

    public function assignee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public static function generateOrderNumber(): string
    {
        $attempt = 0;
        do {
            $count = self::withTrashed()->count() + $attempt;
            
            $letterIndex = (int) floor($count / 999);
            $letters = self::numToLetters($letterIndex);
            
            $number = ($count % 999) + 1;
            
            $code = 'ORD-' . $letters . str_pad((string) $number, 3, '0', STR_PAD_LEFT);
            $attempt++;
        } while (self::where('order_number', $code)->exists());

        return $code;
    }

    private static function numToLetters(int $num): string
    {
        $letters = '';
        while ($num >= 0) {
            $letters = chr(65 + ($num % 26)) . $letters;
            $num = (int) floor($num / 26) - 1;
        }
        return $letters;
    }
}
