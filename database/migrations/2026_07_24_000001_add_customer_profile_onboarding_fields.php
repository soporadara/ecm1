<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'profile_onboarding_skipped_at')) {
                $table->timestamp('profile_onboarding_skipped_at')->nullable()->after('profile_completed_at');
            }

            if (!Schema::hasColumn('users', 'profile_completion_reminder_dismissed_at')) {
                $table->timestamp('profile_completion_reminder_dismissed_at')->nullable()->after('profile_onboarding_skipped_at');
            }
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (Schema::hasColumn('users', 'profile_completion_reminder_dismissed_at')) {
                $table->dropColumn('profile_completion_reminder_dismissed_at');
            }

            if (Schema::hasColumn('users', 'profile_onboarding_skipped_at')) {
                $table->dropColumn('profile_onboarding_skipped_at');
            }
        });
    }
};
