<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Changes the `tags` column from string (VARCHAR 255) to text
     * to prevent SQLSTATE[22001] "Data too long for column" errors.
     */
    public function up(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->text('tags')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->string('tags')->nullable()->change();
        });
    }
};
