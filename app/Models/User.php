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

    protected $guard_name = 'web';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'email_verified_at',
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
        'telegram_id',
        'telegram_otp_code',
        'telegram_otp_expires_at',
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
            'telegram_otp_expires_at' => 'datetime',
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

    public function manualOrders(): HasMany
    {
        return $this->hasMany(ManualOrder::class, 'user_id');
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
     * Generate a unique customer code, e.g. MVM-000, MVM-001, MVM-002.
     */
    public static function generateCustomerCode(): string
    {
        // Fetch all existing numeric parts of MVM- codes and sort them
        $existingCodes = self::where('customer_code', 'like', 'MVM-%')
            ->lockForUpdate()
            ->pluck('customer_code')
            ->map(function ($code) {
                if (preg_match('/MVM-(\d+)$/', $code, $matches)) {
                    return (int) $matches[1];
                }
                return -1;
            })
            ->filter(fn($num) => $num >= 0)
            ->sort()
            ->values()
            ->toArray();

        $next = 1; // Start from MVM-001 by default

        // If we want to start from 0 if there are no users, we can, but starting from 1 is more standard for customers.
        // Let's use 0 if it was the previous default, but usually 1 is better. We will stick to the previous base: 0.
        // Wait, looking at the previous logic, if no users existed, $next was 0.
        $next = 0;

        foreach ($existingCodes as $codeNum) {
            if ($codeNum == $next) {
                $next++;
            } elseif ($codeNum > $next) {
                // We found a gap!
                break;
            }
        }

        return 'MVM-' . str_pad((string) $next, 3, '0', STR_PAD_LEFT);
    }

    public function addresses(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(UserAddress::class);
    }

    public static function notifyAdmins($notification)
    {
        $admins = self::where('is_admin', true)->get();
        \Illuminate\Support\Facades\Notification::send($admins, $notification);
    }
}
