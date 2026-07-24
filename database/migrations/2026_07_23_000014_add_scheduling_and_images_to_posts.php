<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            if (!Schema::hasColumn('posts', 'images')) {
                $table->json('images')->nullable()->after('image');
            }
            if (!Schema::hasColumn('posts', 'scheduled_at')) {
                $table->timestamp('scheduled_at')->nullable()->after('is_published');
            }
        });
    }

    public function down(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            if (Schema::hasColumn('posts', 'images')) {
                $table->dropColumn('images');
            }
            if (Schema::hasColumn('posts', 'scheduled_at')) {
                $table->dropColumn('scheduled_at');
            }
        });
    }
};
