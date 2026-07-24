<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('orders')) {
            return;
        }

        DB::table('orders')
            ->whereIn('status', ['delivered', 'completed'])
            ->update(['status' => 'delivered']);

        DB::table('orders')
            ->where('status', 'draft')
            ->update(['status' => 'draft']);

        DB::table('orders')
            ->whereNotIn('status', ['draft', 'delivered'])
            ->update(['status' => 'in_progress']);

        DB::table('orders')
            ->whereIn('payment_status', ['paid'])
            ->update(['payment_status' => 'paid']);

        DB::table('orders')
            ->where(function ($query) {
                $query->whereNull('payment_status')
                    ->orWhere('payment_status', '!=', 'paid');
            })
            ->update(['payment_status' => 'unpaid']);
    }

    public function down(): void
    {
        // Intentionally not reversible: this migration normalizes legacy workflow labels.
    }
};
