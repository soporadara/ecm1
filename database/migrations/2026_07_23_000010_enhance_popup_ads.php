<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('popups', function (Blueprint $table) {
            if (!Schema::hasColumn('popups', 'badge_text')) {
                $table->string('badge_text')->nullable()->after('title');
            }
            if (!Schema::hasColumn('popups', 'button_label')) {
                $table->string('button_label')->nullable()->after('link_url');
            }
            if (!Schema::hasColumn('popups', 'accent_color')) {
                $table->string('accent_color', 7)->nullable()->after('button_label');
            }
            if (!Schema::hasColumn('popups', 'starts_at')) {
                $table->timestamp('starts_at')->nullable()->after('is_active');
            }
            if (!Schema::hasColumn('popups', 'ends_at')) {
                $table->timestamp('ends_at')->nullable()->after('starts_at');
            }
        });
    }

    public function down(): void
    {
        //
    }
};
