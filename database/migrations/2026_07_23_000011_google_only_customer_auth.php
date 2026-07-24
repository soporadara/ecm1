<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'avatar_source_url')) {
                $table->string('avatar_source_url')->nullable()->after('avatar_path');
            }

            if (Schema::hasColumn('users', 'password')) {
                $table->string('password')->nullable()->change();
            }
        });

        if (Schema::hasColumn('users', 'authentication_provider')) {
            DB::table('users')
                ->where('is_admin', false)
                ->whereIn('authentication_provider', ['password', 'google_and_password'])
                ->update(['authentication_provider' => 'google']);
        }
    }

    public function down(): void
    {
        //
    }
};
