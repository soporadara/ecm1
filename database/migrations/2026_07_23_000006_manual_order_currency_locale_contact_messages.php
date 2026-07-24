<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'contact_email')) {
                $table->string('contact_email')->nullable()->after('email');
            }
            if (!Schema::hasColumn('users', 'country_code')) {
                $table->string('country_code', 2)->nullable()->after('postal_code');
            }
            if (!Schema::hasColumn('users', 'preferred_locale')) {
                $table->string('preferred_locale', 5)->default('km')->after('address_notes');
            }
            if (!Schema::hasColumn('users', 'preferred_currency')) {
                $table->string('preferred_currency', 3)->default('USD')->after('preferred_locale');
            }
            if (!Schema::hasColumn('users', 'authentication_provider')) {
                $table->string('authentication_provider')->default('password')->after('preferred_currency');
            }
            if (!Schema::hasColumn('users', 'must_change_password')) {
                $table->boolean('must_change_password')->default(false)->after('authentication_provider');
            }
            if (!Schema::hasColumn('users', 'avatar_path')) {
                $table->string('avatar_path')->nullable()->after('avatar');
            }
        });

        Schema::table('orders', function (Blueprint $table) {
            if (!Schema::hasColumn('orders', 'currency_code')) {
                $table->string('currency_code', 3)->default('USD')->after('pricing_status');
            }
            foreach ([
                'subtotal_amount',
                'logistics_fee_amount',
                'service_fee_amount',
                'delivery_fee_amount',
                'discount_amount',
                'estimated_total_amount',
                'final_total_amount',
                'amount_paid',
                'outstanding_amount',
            ] as $column) {
                if (!Schema::hasColumn('orders', $column)) {
                    $table->bigInteger($column)->nullable()->after('currency_code');
                }
            }
        });

        if (!Schema::hasTable('contact_messages')) {
            Schema::create('contact_messages', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
                $table->string('customer_code')->nullable();
                $table->string('order_number')->nullable();
                $table->string('name');
                $table->string('email');
                $table->string('phone')->nullable();
                $table->string('subject');
                $table->text('message');
                $table->string('preferred_contact_method')->nullable();
                $table->string('attachment_disk')->nullable();
                $table->string('attachment_path')->nullable();
                $table->string('attachment_original_filename')->nullable();
                $table->string('status')->default('new');
                $table->foreignId('assigned_to')->nullable()->constrained('users')->nullOnDelete();
                $table->text('internal_notes')->nullable();
                $table->timestamp('replied_at')->nullable();
                $table->timestamps();
                $table->softDeletes();
            });
        }

        DB::table('users')->whereNull('preferred_locale')->orWhereNotIn('preferred_locale', ['km', 'en', 'vi'])->update(['preferred_locale' => 'km']);
        DB::table('users')->whereNull('preferred_currency')->orWhereNotIn('preferred_currency', ['USD', 'VND'])->update(['preferred_currency' => 'USD']);
        DB::table('orders')->whereNull('currency_code')->orWhereNotIn('currency_code', ['USD', 'VND'])->update(['currency_code' => 'USD']);
    }

    public function down(): void
    {
        Schema::dropIfExists('contact_messages');
    }
};
