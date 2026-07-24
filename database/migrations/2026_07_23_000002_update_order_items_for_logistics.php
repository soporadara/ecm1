<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('order_items', function (Blueprint $table) {
            if (!Schema::hasColumn('order_items', 'description')) {
                $table->text('description')->nullable()->after('product_name');
            }
            if (!Schema::hasColumn('order_items', 'variant')) {
                $table->string('variant')->nullable()->after('description');
            }
            if (!Schema::hasColumn('order_items', 'estimated_unit_price')) {
                $table->decimal('estimated_unit_price', 10, 2)->nullable()->after('quantity');
            }
            if (!Schema::hasColumn('order_items', 'final_unit_price')) {
                $table->decimal('final_unit_price', 10, 2)->nullable()->after('estimated_unit_price');
            }
            if (!Schema::hasColumn('order_items', 'line_total')) {
                $table->decimal('line_total', 10, 2)->nullable()->after('final_unit_price');
            }
            if (!Schema::hasColumn('order_items', 'customer_notes')) {
                $table->text('customer_notes')->nullable()->after('line_total');
            }
            if (!Schema::hasColumn('order_items', 'admin_notes')) {
                $table->text('admin_notes')->nullable()->after('customer_notes');
            }
            if (!Schema::hasColumn('order_items', 'sort_order')) {
                $table->integer('sort_order')->default(0)->after('admin_notes');
            }
            if (!Schema::hasColumn('order_items', 'deleted_at')) {
                $table->softDeletes();
            }
        });
    }

    public function down(): void
    {
    }
};
