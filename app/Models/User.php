<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'contact_email',
        'password',
        'google_id',
        'avatar',
        'avatar_path',
        'avatar_source_url',
        'is_admin',
        'role',
        // Logistics / Firebase fields
        'firebase_uid',
        'customer_code',
        'phone_e164',
        'telegram_username',
        'whatsapp_number',
        'messenger_contact',
        'address_line_1',
        'address_line_2',
        'city',
        'province',
        'postal_code',
        'country_code',
        'address_notes',
        'profile_completed_at',
        'profile_onboarding_skipped_at',
        'profile_completion_reminder_dismissed_at',
        'phone_verified_at',
        'preferred_locale',
        'preferred_language',
        'preferred_currency',
        'authentication_provider',
        'must_change_password',
        'firebase_provider',
        'account_status',
        'last_login_at',
        'is_demo',
        'demo_batch_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'firebase_uid', // Never expose Firebase UID to the frontend
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'phone_verified_at' => 'datetime',
            'profile_completed_at' => 'datetime',
            'profile_onboarding_skipped_at' => 'datetime',
            'profile_completion_reminder_dismissed_at' => 'datetime',
            'last_login_at'     => 'datetime',
            'password'          => 'hashed',
            'is_admin'          => 'boolean',
            'must_change_password' => 'boolean',
        ];
    }

    // ─── Relationships ───────────────────────────────────────────────

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    // ─── Business Logic Helpers ──────────────────────────────────────

    /**
     * Check if the user has a verified phone number.
     */
    public function hasVerifiedPhone(): bool
    {
        return $this->phone_verified_at !== null && $this->phone_e164 !== null;
    }

    /**
     * Check if the user account is active.
     */
    public function isActive(): bool
    {
        return $this->account_status === 'active';
    }

    /**
     * Generate a unique customer code, e.g. CUS-2026-000001.
     */
    public static function generateCustomerCode(): string
    {
        do {
            $year = date('Y');
            $code = 'CUS-' . $year . '-' . str_pad((string) random_int(1, 999999), 6, '0', STR_PAD_LEFT);
        } while (self::where('customer_code', $code)->exists());

        return $code;
    }
}
