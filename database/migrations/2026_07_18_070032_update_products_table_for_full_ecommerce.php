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
        Schema::table('products', function (Blueprint $table) {
            $table->foreignId('brand_id')->nullable()->constrained()->nullOnDelete()->after('category_id');
            $table->foreignId('collection_id')->nullable()->constrained()->nullOnDelete()->after('brand_id');
            $table->decimal('cost_price', 10, 2)->nullable()->after('sale_price');
            $table->string('sku')->nullable()->unique()->after('id');
            $table->string('barcode')->nullable()->after('sku');
            $table->integer('low_stock_threshold')->default(5)->after('stock');
            $table->string('seo_title')->nullable();
            $table->text('seo_description')->nullable();
            $table->boolean('is_active')->default(true);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign(['brand_id']);
            $table->dropForeign(['collection_id']);
            $table->dropColumn([
                'brand_id', 'collection_id', 'cost_price', 'sku', 'barcode', 
                'low_stock_threshold', 'seo_title', 'seo_description', 'is_active'
            ]);
        });
    }
};
