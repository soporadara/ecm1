<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'firebase_uid')) {
                $table->string('firebase_uid')->nullable()->unique()->after('id');
            }
            if (!Schema::hasColumn('users', 'customer_code')) {
                $table->string('customer_code')->nullable()->unique()->after('firebase_uid');
            }
            if (!Schema::hasColumn('users', 'phone_e164')) {
                $table->string('phone_e164')->nullable()->after('phone_number');
            }
            if (!Schema::hasColumn('users', 'telegram_username')) {
                $table->string('telegram_username')->nullable()->after('phone_e164');
            }
            if (!Schema::hasColumn('users', 'whatsapp_number')) {
                $table->string('whatsapp_number')->nullable()->after('telegram_username');
            }
            if (!Schema::hasColumn('users', 'profile_completed_at')) {
                $table->timestamp('profile_completed_at')->nullable()->after('whatsapp_number');
            }
            if (!Schema::hasColumn('users', 'account_status')) {
                $table->string('account_status')->default('active')->after('profile_completed_at');
            }
            if (!Schema::hasColumn('users', 'last_login_at')) {
                $table->timestamp('last_login_at')->nullable()->after('account_status');
            }
        });
    }

    public function down(): void
    {
        // Not adding down checks to keep it simple, down isn't usually run in this flow
    }
};
