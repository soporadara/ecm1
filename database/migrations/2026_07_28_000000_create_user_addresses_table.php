<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_addresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('address_line_1', 1000);
            $table->string('address_line_2')->nullable();
            $table->string('city')->nullable();
            $table->string('province')->nullable();
            $table->string('postal_code')->nullable();
            $table->text('address_notes')->nullable();
            $table->boolean('is_default')->default(false);
            $table->timestamps();
        });

        // Migrate existing address data from users table
        DB::table('users')->whereNotNull('address_line_1')->where('address_line_1', '!=', '')->orderBy('id')->chunk(100, function ($users) {
            $addresses = [];
            foreach ($users as $user) {
                $addresses[] = [
                    'user_id' => $user->id,
                    'address_line_1' => $user->address_line_1,
                    'address_line_2' => $user->address_line_2,
                    'city' => $user->city,
                    'province' => $user->province,
                    'postal_code' => $user->postal_code,
                    'address_notes' => $user->address_notes,
                    'is_default' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
            DB::table('user_addresses')->insert($addresses);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_addresses');
    }
};
