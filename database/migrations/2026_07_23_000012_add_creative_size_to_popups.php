<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('popups', function (Blueprint $table) {
            if (!Schema::hasColumn('popups', 'creative_size')) {
                $table->string('creative_size')->default('landscape_1920x1080')->after('image_path');
            }
        });
    }

    public function down(): void
    {
        if (Schema::hasColumn('popups', 'creative_size')) {
            Schema::table('popups', fn (Blueprint $table) => $table->dropColumn('creative_size'));
        }
    }
};

