<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Add socialite fields to users
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'provider')) {
                $table->string('provider')->nullable()->after('authentication_provider');
                $table->string('provider_id')->nullable()->after('provider');
            }
        });

        Schema::create('manual_orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('order_number')->unique();
            $table->string('invoice_number')->unique()->nullable();
            $table->string('receipt_number')->unique()->nullable();
            
            $table->string('status')->default('pending'); // pending, processing, packed, shipping, delivered, cancelled
            $table->string('payment_status')->default('unpaid'); // unpaid, partial, paid, refunded
            
            $table->decimal('total_amount', 12, 2)->default(0);
            $table->decimal('budget', 12, 2)->nullable();
            
            $table->timestamp('paid_at')->nullable();
            $table->timestamp('delivered_at')->nullable();
            $table->timestamp('cancelled_at')->nullable();
            
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('manual_order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('manual_order_id')->constrained('manual_orders')->cascadeOnDelete();
            $table->string('product_name');
            $table->integer('quantity')->default(1);
            $table->decimal('unit_price', 12, 2)->default(0);
            $table->decimal('total_price', 12, 2)->default(0);
            $table->timestamps();
        });

        Schema::create('manual_order_files', function (Blueprint $table) {
            $table->id();
            $table->foreignId('manual_order_id')->constrained('manual_orders')->cascadeOnDelete();
            $table->string('file_path');
            $table->string('file_type')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('manual_order_files');
        Schema::dropIfExists('manual_order_items');
        Schema::dropIfExists('manual_orders');
        
        Schema::table('users', function (Blueprint $table) {
            if (Schema::hasColumn('users', 'provider')) {
                $table->dropColumn(['provider', 'provider_id']);
            }
        });
    }
};
