<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('users') && Schema::hasColumn('users', 'preferred_currency')) {
            DB::table('users')
                ->whereNull('preferred_currency')
                ->orWhere('preferred_currency', 'KHR')
                ->orWhereNotIn('preferred_currency', ['USD', 'VND'])
                ->update(['preferred_currency' => 'USD']);
        }

        if (Schema::hasTable('orders') && Schema::hasColumn('orders', 'currency_code')) {
            DB::table('orders')
                ->whereNull('currency_code')
                ->orWhere('currency_code', 'KHR')
                ->orWhereNotIn('currency_code', ['USD', 'VND'])
                ->update(['currency_code' => 'USD']);
        }

        if (Schema::hasTable('receipts') && Schema::hasColumn('receipts', 'snapshot_json')) {
            DB::table('receipts')
                ->where('snapshot_json', 'like', '%KHR%')
                ->update([
                    'snapshot_json' => DB::raw("REPLACE(snapshot_json, 'KHR', 'USD')"),
                ]);
        }

        if (Schema::hasTable('settings')) {
            DB::table('settings')
                ->where('group', 'general')
                ->whereIn('key', ['currency', 'default_currency'])
                ->where(function ($query) {
                    $query->whereNull('value')->orWhere('value', 'KHR')->orWhereNotIn('value', ['USD', 'VND']);
                })
                ->update(['value' => 'USD']);
        }
    }

    public function down(): void
    {
        // Intentionally not restoring KHR. The active application currency set is USD/VND only.
    }
};
