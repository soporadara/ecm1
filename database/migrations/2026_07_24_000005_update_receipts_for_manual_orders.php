<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('receipts', function (Blueprint $table) {
            $table->foreignId('manual_order_id')->nullable()->after('order_id')->constrained('manual_orders')->cascadeOnDelete();
            // Make order_id nullable so it can be either order_id or manual_order_id
            $table->unsignedBigInteger('order_id')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('receipts', function (Blueprint $table) {
            $table->dropForeign(['manual_order_id']);
            $table->dropColumn('manual_order_id');
            $table->unsignedBigInteger('order_id')->nullable(false)->change();
        });
    }
};
