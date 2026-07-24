<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('order_images')) {
            Schema::create('order_images', function (Blueprint $table) {
                $table->id();
                $table->foreignId('order_id')->constrained()->cascadeOnDelete();
                $table->foreignId('order_item_id')->nullable()->constrained()->nullOnDelete();
                $table->foreignId('uploaded_by')->nullable()->constrained('users')->nullOnDelete();
                
                $table->string('original_filename');
                $table->string('stored_filename');
                $table->string('disk')->default('local');
                $table->string('path');
                $table->string('thumbnail_path')->nullable();
                
                $table->string('mime_type');
                $table->string('original_mime_type')->nullable();
                $table->unsignedBigInteger('size_bytes')->default(0);
                $table->integer('width')->nullable();
                $table->integer('height')->nullable();
                
                $table->integer('sort_order')->default(0);
                $table->timestamps();
                $table->softDeletes();
            });
        }

        if (!Schema::hasTable('order_status_histories')) {
            Schema::create('order_status_histories', function (Blueprint $table) {
                $table->id();
                $table->foreignId('order_id')->constrained()->cascadeOnDelete();
                $table->string('from_status')->nullable();
                $table->string('to_status');
                $table->text('public_message')->nullable();
                $table->text('internal_note')->nullable();
                $table->foreignId('changed_by')->nullable()->constrained('users')->nullOnDelete();
                $table->timestamp('estimated_delivery_at')->nullable();
                $table->string('reason_code')->nullable();
                $table->timestamp('customer_notified_at')->nullable();
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('order_messages')) {
            Schema::create('order_messages', function (Blueprint $table) {
                $table->id();
                $table->foreignId('order_id')->constrained()->cascadeOnDelete();
                $table->foreignId('sender_id')->constrained('users')->cascadeOnDelete();
                $table->text('message');
                $table->string('visibility')->default('public'); // public, internal
                $table->timestamp('read_at')->nullable();
                $table->timestamps();
                $table->softDeletes();
            });
        }

        if (!Schema::hasTable('receipts')) {
            Schema::create('receipts', function (Blueprint $table) {
                $table->id();
                $table->string('receipt_number')->unique();
                $table->foreignId('order_id')->constrained()->cascadeOnDelete();
                $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
                
                $table->json('snapshot_json')->nullable();
                $table->decimal('subtotal', 10, 2)->default(0);
                $table->decimal('charges', 10, 2)->default(0);
                $table->decimal('discount', 10, 2)->default(0);
                $table->decimal('total', 10, 2)->default(0);
                
                $table->string('payment_status')->default('unpaid');
                
                $table->foreignId('generated_by')->nullable()->constrained('users')->nullOnDelete();
                $table->string('pdf_path')->nullable();
                $table->integer('version')->default(1);
                
                $table->boolean('is_voided')->default(false);
                $table->text('void_reason')->nullable();
                
                $table->timestamps();
                $table->softDeletes();
            });
        }

        if (!Schema::hasTable('audit_logs')) {
            Schema::create('audit_logs', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
                $table->string('action');
                $table->string('target_type')->nullable();
                $table->unsignedBigInteger('target_id')->nullable();
                $table->json('old_values')->nullable();
                $table->json('new_values')->nullable();
                $table->ipAddress('ip_address')->nullable();
                $table->string('user_agent')->nullable();
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('audit_logs');
        Schema::dropIfExists('receipts');
        Schema::dropIfExists('order_messages');
        Schema::dropIfExists('order_status_histories');
        Schema::dropIfExists('order_images');
    }
};
