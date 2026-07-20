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
            $table->text('short_description')->nullable()->after('slug');
            $table->foreignId('subcategory_id')->nullable()->constrained('categories')->nullOnDelete()->after('category_id');
            $table->string('material')->nullable()->after('is_active');
            $table->text('care_instructions')->nullable()->after('material');
            $table->string('weight')->nullable()->after('care_instructions');
            $table->string('dimensions')->nullable()->after('weight');
            $table->text('shipping_info')->nullable()->after('dimensions');
            $table->text('return_info')->nullable()->after('shipping_info');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign(['subcategory_id']);
            $table->dropColumn([
                'short_description', 'subcategory_id', 'material', 'care_instructions',
                'weight', 'dimensions', 'shipping_info', 'return_info'
            ]);
        });
    }
};
