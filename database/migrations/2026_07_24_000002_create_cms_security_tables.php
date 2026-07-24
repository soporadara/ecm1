<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cms_login_attempts', function (Blueprint $table) {
            $table->id();
            $table->string('email_hash', 64)->nullable()->index();
            $table->string('masked_email')->nullable();
            $table->string('ip_address', 45)->nullable()->index();
            $table->string('device_hash', 64)->nullable()->index();
            $table->string('user_agent_summary')->nullable();
            $table->string('failure_category')->default('invalid_credentials');
            $table->timestamp('attempted_at')->useCurrent()->index();
            $table->timestamps();
        });

        Schema::create('cms_security_blocks', function (Blueprint $table) {
            $table->id();
            $table->string('email_hash', 64)->nullable()->index();
            $table->string('masked_email')->nullable();
            $table->string('ip_address', 45)->nullable()->index();
            $table->string('device_hash', 64)->nullable()->index();
            $table->string('reason')->default('failed_login_threshold');
            $table->text('internal_note')->nullable();
            $table->timestamp('starts_at')->useCurrent();
            $table->timestamp('expires_at')->nullable()->index();
            $table->timestamp('released_at')->nullable()->index();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('released_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });

        Schema::create('staff_login_providers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('provider')->default('google');
            $table->string('authorized_email')->index();
            $table->boolean('is_enabled')->default(false);
            $table->timestamp('last_used_at')->nullable();
            $table->timestamps();
            $table->unique(['provider', 'authorized_email']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('staff_login_providers');
        Schema::dropIfExists('cms_security_blocks');
        Schema::dropIfExists('cms_login_attempts');
    }
};
