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
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'telegram_id')) {
                $table->string('telegram_id')->nullable()->unique()->after('telegram_username');
            }
            if (!Schema::hasColumn('users', 'telegram_otp_code')) {
                $table->string('telegram_otp_code')->nullable()->after('telegram_id');
            }
            if (!Schema::hasColumn('users', 'telegram_otp_expires_at')) {
                $table->timestamp('telegram_otp_expires_at')->nullable()->after('telegram_otp_code');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['telegram_id', 'telegram_otp_code', 'telegram_otp_expires_at']);
        });
    }
};
