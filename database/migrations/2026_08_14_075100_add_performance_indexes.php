<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->index('status');
            $table->index('payment_status');
            $table->index('created_at');
            $table->index('user_id');
        });

        Schema::table('posts', function (Blueprint $table) {
            $table->index('is_published');
            $table->index('published_at');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->index('role');
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropIndex(['status']);
            $table->dropIndex(['payment_status']);
            $table->dropIndex(['created_at']);
            $table->dropIndex(['user_id']);
        });

        Schema::table('posts', function (Blueprint $table) {
            $table->dropIndex(['is_published']);
            $table->dropIndex(['published_at']);
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex(['role']);
        });
    }
};
