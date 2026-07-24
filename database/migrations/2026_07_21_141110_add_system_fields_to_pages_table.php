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
        Schema::table('pages', function (Blueprint $table) {
            if (!Schema::hasColumn('pages', 'is_system')) {
                $table->boolean('is_system')->default(false)->after('is_published');
            }
            if (!Schema::hasColumn('pages', 'is_private')) {
                $table->boolean('is_private')->default(false)->after('is_system');
            }
            if (!Schema::hasColumn('pages', 'show_in_navigation')) {
                $table->boolean('show_in_navigation')->default(true)->after('is_private');
            }
            if (!Schema::hasColumn('pages', 'is_deletable')) {
                $table->boolean('is_deletable')->default(true)->after('show_in_navigation');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pages', function (Blueprint $table) {
            $table->dropColumn(['is_system', 'is_private', 'show_in_navigation', 'is_deletable']);
        });
    }
};
