<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('firebase_uid')->nullable()->unique()->after('id');
            $table->string('member_code', 12)->nullable()->unique()->after('firebase_uid');
            $table->string('phone_e164', 20)->nullable()->unique()->after('member_code');
            $table->timestamp('phone_verified_at')->nullable()->after('phone_e164');
            $table->string('preferred_language', 5)->default('en')->after('phone_verified_at');
            $table->string('preferred_currency', 3)->default('USD')->after('preferred_language');
            $table->string('firebase_provider')->nullable()->after('preferred_currency');
            $table->string('account_status')->default('active')->after('firebase_provider'); // active, suspended, banned
            $table->timestamp('last_login_at')->nullable()->after('account_status');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'firebase_uid',
                'member_code',
                'phone_e164',
                'phone_verified_at',
                'preferred_language',
                'preferred_currency',
                'firebase_provider',
                'account_status',
                'last_login_at',
            ]);
        });
    }
};
