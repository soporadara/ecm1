<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Receipt extends Model
{
    use SoftDeletes;

    protected $guarded = [];

    protected function casts(): array
    {
        return [
            'snapshot_json' => 'array',
            'is_voided' => 'boolean',
        ];
    }

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function manualOrder(): BelongsTo
    {
        return $this->belongsTo(ManualOrder::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function generatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'generated_by');
    }

    public static function generateReceiptNumber(): string
    {
        do {
            $year = date('Y');
            $code = 'RCP-' . $year . '-' . str_pad((string) random_int(1, 999999), 6, '0', STR_PAD_LEFT);
        } while (self::where('receipt_number', $code)->exists());

        return $code;
    }
}
