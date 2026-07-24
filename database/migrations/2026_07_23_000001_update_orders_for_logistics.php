<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            if (!Schema::hasColumn('orders', 'order_number')) {
                $table->string('order_number')->nullable()->unique()->after('id');
            }
            if (!Schema::hasColumn('orders', 'customer_name_snapshot')) {
                $table->string('customer_name_snapshot')->nullable()->after('user_id');
            }
            if (!Schema::hasColumn('orders', 'customer_email_snapshot')) {
                $table->string('customer_email_snapshot')->nullable()->after('customer_name_snapshot');
            }
            if (!Schema::hasColumn('orders', 'customer_phone_snapshot')) {
                $table->string('customer_phone_snapshot')->nullable()->after('customer_email_snapshot');
            }
            if (!Schema::hasColumn('orders', 'delivery_address_snapshot')) {
                $table->text('delivery_address_snapshot')->nullable()->after('customer_phone_snapshot');
            }
            
            if (!Schema::hasColumn('orders', 'title')) {
                $table->string('title')->nullable()->after('delivery_address_snapshot');
            }
            if (!Schema::hasColumn('orders', 'description')) {
                $table->text('description')->nullable()->after('title');
            }
            
            if (!Schema::hasColumn('orders', 'payment_status')) {
                $table->string('payment_status')->default('unpaid')->after('status');
            }
            if (!Schema::hasColumn('orders', 'subtotal')) {
                $table->decimal('subtotal', 10, 2)->default(0)->after('payment_status');
            }
            if (!Schema::hasColumn('orders', 'service_charge')) {
                $table->decimal('service_charge', 10, 2)->default(0)->after('subtotal');
            }
            if (!Schema::hasColumn('orders', 'delivery_charge')) {
                $table->decimal('delivery_charge', 10, 2)->default(0)->after('service_charge');
            }
            if (!Schema::hasColumn('orders', 'discount')) {
                $table->decimal('discount', 10, 2)->default(0)->after('delivery_charge');
            }
            
            if (!Schema::hasColumn('orders', 'amount_paid')) {
                $table->decimal('amount_paid', 10, 2)->default(0)->after('total_amount');
            }
            if (!Schema::hasColumn('orders', 'outstanding_amount')) {
                $table->decimal('outstanding_amount', 10, 2)->default(0)->after('amount_paid');
            }
            
            if (!Schema::hasColumn('orders', 'preferred_contact_method')) {
                $table->string('preferred_contact_method')->nullable()->after('outstanding_amount');
            }
            if (!Schema::hasColumn('orders', 'assigned_to')) {
                $table->foreignId('assigned_to')->nullable()->constrained('users')->nullOnDelete()->after('preferred_contact_method');
            }
            
            if (!Schema::hasColumn('orders', 'estimated_delivery_at')) {
                $table->timestamp('estimated_delivery_at')->nullable()->after('assigned_to');
            }
            if (!Schema::hasColumn('orders', 'delivered_at')) {
                $table->timestamp('delivered_at')->nullable()->after('estimated_delivery_at');
            }
            if (!Schema::hasColumn('orders', 'completed_at')) {
                $table->timestamp('completed_at')->nullable()->after('delivered_at');
            }
            if (!Schema::hasColumn('orders', 'cancelled_at')) {
                $table->timestamp('cancelled_at')->nullable()->after('completed_at');
            }
            if (!Schema::hasColumn('orders', 'cancellation_reason')) {
                $table->text('cancellation_reason')->nullable()->after('cancelled_at');
            }
            if (!Schema::hasColumn('orders', 'customer_notes')) {
                $table->text('customer_notes')->nullable()->after('cancellation_reason');
            }
            
            if (!Schema::hasColumn('orders', 'created_by')) {
                $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete()->after('customer_notes');
            }
            if (!Schema::hasColumn('orders', 'updated_by')) {
                $table->foreignId('updated_by')->nullable()->constrained('users')->nullOnDelete()->after('created_by');
            }
            
            if (!Schema::hasColumn('orders', 'deleted_at')) {
                $table->softDeletes();
            }
        });
    }

    public function down(): void
    {
    }
};
