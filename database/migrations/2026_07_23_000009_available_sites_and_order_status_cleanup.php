<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('marketplaces', function (Blueprint $table) {
            foreach ([
                'name_km',
                'name_en',
                'name_vi',
                'icon_path',
                'icon_source_url',
                'alt_text',
            ] as $column) {
                if (!Schema::hasColumn('marketplaces', $column)) {
                    $table->string($column)->nullable()->after('name');
                }
            }

            if (!Schema::hasColumn('marketplaces', 'open_in_new_tab')) {
                $table->boolean('open_in_new_tab')->default(true)->after('is_enabled');
            }
            if (!Schema::hasColumn('marketplaces', 'starts_at')) {
                $table->timestamp('starts_at')->nullable()->after('sort_order');
            }
            if (!Schema::hasColumn('marketplaces', 'ends_at')) {
                $table->timestamp('ends_at')->nullable()->after('starts_at');
            }
            if (!Schema::hasColumn('marketplaces', 'created_by')) {
                $table->foreignId('created_by')->nullable()->after('ends_at')->constrained('users')->nullOnDelete();
            }
            if (!Schema::hasColumn('marketplaces', 'updated_by')) {
                $table->foreignId('updated_by')->nullable()->after('created_by')->constrained('users')->nullOnDelete();
            }
            if (!Schema::hasColumn('marketplaces', 'deleted_at')) {
                $table->softDeletes();
            }
        });

        Schema::table('orders', function (Blueprint $table) {
            if (!Schema::hasColumn('orders', 'purchase_readiness')) {
                $table->string('purchase_readiness')->default('not_ready')->after('payment_status');
            }
            if (!Schema::hasColumn('orders', 'payment_method')) {
                $table->string('payment_method')->nullable()->after('payment_status');
            }
            if (!Schema::hasColumn('orders', 'payment_reference')) {
                $table->string('payment_reference')->nullable()->after('payment_method');
            }
            if (!Schema::hasColumn('orders', 'payment_date')) {
                $table->timestamp('payment_date')->nullable()->after('payment_reference');
            }
            if (!Schema::hasColumn('orders', 'payment_note')) {
                $table->text('payment_note')->nullable()->after('payment_date');
            }
        });

        if (Schema::hasTable('orders')) {
            DB::table('orders')->whereIn('payment_status', ['deposit_paid', 'partial', 'partially-paid'])->update(['payment_status' => 'partially_paid']);
            DB::table('orders')->whereIn('payment_status', ['not_recorded', 'none', 'not_paid', 'unpaid'])->update(['payment_status' => 'unpaid']);
            DB::table('orders')->whereNull('payment_status')->update(['payment_status' => 'unpaid']);
        }
    }

    public function down(): void
    {
        // Keep data and columns; these fields are additive and safe for the logistics workflow.
    }
};
