<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class ManualOrder extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'paid_at' => 'datetime',
            'delivered_at' => 'datetime',
            'cancelled_at' => 'datetime',
            'total_amount' => 'decimal:2',
            'budget' => 'decimal:2',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function items(): HasMany
    {
        return $this->hasMany(ManualOrderItem::class);
    }

    public function files(): HasMany
    {
        return $this->hasMany(ManualOrderFile::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
    
    public function receipts(): HasMany
    {
        return $this->hasMany(Receipt::class, 'order_id'); // We'll need to adapt Receipt model to handle this or just relate directly
    }

    /**
     * Generate a unique order number, e.g. MVM-ORD-001, MVM-ORD-002.
     */
    public static function generateOrderNumber(): string
    {
        $latest = self::where('order_number', 'like', 'MVM-ORD-%')
            ->lockForUpdate()
            ->orderByDesc('order_number')
            ->value('order_number');

        if ($latest && preg_match('/MVM-ORD-(\d+)$/', $latest, $matches)) {
            $next = (int) $matches[1] + 1;
        } else {
            $next = 1;
        }

        do {
            $code = 'MVM-ORD-' . str_pad((string) $next, 3, '0', STR_PAD_LEFT);
            $next++;
        } while (self::where('order_number', $code)->exists());

        return $code;
    }
}
