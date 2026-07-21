<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('marketplaces', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('logo')->nullable();
            $table->string('brand_color', 7)->nullable();
            $table->string('website_url')->nullable();
            $table->string('android_app_url')->nullable();
            $table->string('ios_app_url')->nullable();
            $table->string('universal_link')->nullable();
            $table->text('description')->nullable();
            $table->boolean('is_enabled')->default(true);
            $table->boolean('import_enabled')->default(false);
            $table->boolean('manual_fallback_enabled')->default(true);
            $table->string('status')->default('active'); // active, maintenance, disabled
            $table->text('maintenance_message')->nullable();
            $table->json('supported_countries')->nullable();
            $table->integer('sort_order')->default(0);
            $table->integer('cache_lifetime_minutes')->default(60);
            $table->timestamps();
        });

        Schema::create('marketplace_domains', function (Blueprint $table) {
            $table->id();
            $table->foreignId('marketplace_id')->constrained()->cascadeOnDelete();
            $table->string('domain')->unique();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('marketplace_domains');
        Schema::dropIfExists('marketplaces');
    }
};
