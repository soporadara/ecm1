<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('quote_requests', function (Blueprint $table) {
            $table->dropColumn([
                'origin',
                'destination',
                'product_type',
                'quantity',
                'weight',
                'dimensions',
                'shipping_method'
            ]);
            
            $table->text('description')->after('id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('quote_requests', function (Blueprint $table) {
            $table->dropColumn('description');
            $table->string('origin')->nullable();
            $table->string('destination')->nullable();
            $table->string('product_type')->nullable();
            $table->integer('quantity')->nullable();
            $table->string('weight')->nullable();
            $table->string('dimensions')->nullable();
            $table->string('shipping_method')->nullable();
        });
    }
};
