<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'address_line_2')) {
                $table->string('address_line_2')->nullable()->after('address_line_1');
            }
            if (!Schema::hasColumn('users', 'province')) {
                $table->string('province')->nullable()->after('city');
            }
            if (!Schema::hasColumn('users', 'postal_code')) {
                $table->string('postal_code')->nullable()->after('province');
            }
            if (!Schema::hasColumn('users', 'address_notes')) {
                $table->text('address_notes')->nullable()->after('postal_code');
            }
            if (!Schema::hasColumn('users', 'messenger_contact')) {
                $table->string('messenger_contact')->nullable()->after('whatsapp_number');
            }
        });

        Schema::table('orders', function (Blueprint $table) {
            if (!Schema::hasColumn('orders', 'customer_code_snapshot')) {
                $table->string('customer_code_snapshot')->nullable()->after('user_id');
            }
            if (!Schema::hasColumn('orders', 'pricing_status')) {
                $table->string('pricing_status')->default('not_calculated')->after('status');
            }
            if (!Schema::hasColumn('orders', 'logistics_fee')) {
                $table->decimal('logistics_fee', 10, 2)->nullable()->after('subtotal');
            }
            if (!Schema::hasColumn('orders', 'estimated_total')) {
                $table->decimal('estimated_total', 10, 2)->nullable()->after('discount');
            }
            if (!Schema::hasColumn('orders', 'final_total')) {
                $table->decimal('final_total', 10, 2)->nullable()->after('estimated_total');
            }
            if (!Schema::hasColumn('orders', 'pricing_notes')) {
                $table->text('pricing_notes')->nullable()->after('final_total');
            }
            if (!Schema::hasColumn('orders', 'customer_visible_note')) {
                $table->text('customer_visible_note')->nullable()->after('pricing_notes');
            }
            if (!Schema::hasColumn('orders', 'submitted_at')) {
                $table->timestamp('submitted_at')->nullable()->after('estimated_delivery_at');
            }
        });

        Schema::table('order_items', function (Blueprint $table) {
            if (!Schema::hasColumn('order_items', 'type')) {
                $table->string('type')->nullable()->after('quantity');
            }
            if (!Schema::hasColumn('order_items', 'color')) {
                $table->string('color')->nullable()->after('type');
            }
            if (!Schema::hasColumn('order_items', 'size')) {
                $table->string('size')->nullable()->after('color');
            }
        });

        if (!Schema::hasTable('order_item_urls')) {
            Schema::create('order_item_urls', function (Blueprint $table) {
                $table->id();
                $table->foreignId('order_item_id')->constrained()->cascadeOnDelete();
                $table->string('url', 2048);
                $table->string('domain');
                $table->integer('sort_order')->default(0);
                $table->timestamps();
                $table->softDeletes();
            });
        }

        if (!Schema::hasTable('order_attachments')) {
            Schema::create('order_attachments', function (Blueprint $table) {
                $table->id();
                $table->foreignId('order_id')->constrained()->cascadeOnDelete();
                $table->foreignId('order_item_id')->nullable()->constrained()->nullOnDelete();
                $table->foreignId('uploaded_by')->nullable()->constrained('users')->nullOnDelete();
                $table->string('attachment_type')->default('pdf');
                $table->string('original_filename');
                $table->string('stored_filename');
                $table->string('disk')->default('local');
                $table->string('path');
                $table->string('mime_type');
                $table->unsignedBigInteger('size_bytes')->default(0);
                $table->timestamps();
                $table->softDeletes();
            });
        }

        if (!Schema::hasTable('content_settings')) {
            Schema::create('content_settings', function (Blueprint $table) {
                $table->id();
                $table->string('group');
                $table->string('key');
                $table->longText('value')->nullable();
                $table->string('value_type')->default('text');
                $table->string('locale')->default('en');
                $table->boolean('is_public')->default(true);
                $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete();
                $table->timestamps();
                $table->unique(['group', 'key', 'locale']);
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('content_settings');
        Schema::dropIfExists('order_attachments');
        Schema::dropIfExists('order_item_urls');
    }
};
