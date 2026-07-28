<?php

namespace App\Services;

use App\Models\AuditLog;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Kreait\Firebase\Contract\Auth as FirebaseAuth;
use Kreait\Firebase\Exception\Auth\FailedToVerifyToken;

class FirebaseAuthService
{
    public function __construct(private readonly FirebaseAuth $auth)
    {
    }

    public function authenticateCustomer(string $idToken, Request $request): User
    {
        $claims = $this->verifiedClaims($idToken, $request);

        return DB::transaction(function () use ($claims, $request) {
            $uid = (string) $claims['uid'];
            $email = $this->normalizeEmail($claims['email'] ?? null);
            $provider = $this->providerFromClaims($claims['provider'] ?? null);
            $name = trim((string) ($request->input('name') ?: $claims['name'] ?: $this->nameFromEmail($email)));
            $picture = isset($claims['picture']) ? (string) $claims['picture'] : null;

            if (!$email) {
                $this->audit('firebase.login.failed_unverified_email', null, $request, ['uid' => $uid]);
                throw ValidationException::withMessages([
                    'id_token' => 'Your email address could not be verified. Please try again.',
                ]);
            }

            if ($provider === 'google' && !($claims['email_verified'] ?? false)) {
                $this->audit('firebase.login.failed_unverified_email', null, $request, ['uid' => $uid, 'provider' => $provider]);
                throw ValidationException::withMessages([
                    'id_token' => 'Your Google email must be verified before you can sign in.',
                ]);
            }

            $firebaseUser = $this->auth->getUser($uid);
            if ($firebaseUser->disabled) {
                $this->audit('firebase.login.disabled_account', null, $request, ['uid' => $uid]);
                throw ValidationException::withMessages([
                    'id_token' => 'Your account is currently disabled. Please contact support.',
                ]);
            }

            $user = User::where('firebase_uid', $uid)->lockForUpdate()->first();

            if ($user) {
                $this->ensureCustomerCanLogin($user, $request);
                $this->updateFirebaseProfile($user, $email, $name, $picture, $provider, (bool) ($claims['email_verified'] ?? false));
                $this->audit('firebase.login.success', $user, $request);

                return $user;
            }

            $matchingUser = User::whereRaw('LOWER(email) = ?', [$email])->lockForUpdate()->first();

            if ($matchingUser) {
                if ($this->isPrivileged($matchingUser) || ($matchingUser->firebase_uid && $matchingUser->firebase_uid !== $uid)) {
                    $this->audit('firebase.login.failed_unsafe_link', null, $request, ['email' => $email]);
                    throw ValidationException::withMessages([
                        'id_token' => 'We could not verify your account. Please contact support.',
                    ]);
                }

                $this->ensureCustomerCanLogin($matchingUser, $request);
                $matchingUser->firebase_uid = $uid;
                $matchingUser->firebase_provider = $provider;
                $matchingUser->authentication_provider = $this->combinedProvider($matchingUser->authentication_provider, $provider);
                if (!$matchingUser->customer_code) {
                    $matchingUser->customer_code = User::generateCustomerCode();
                }
                $this->updateFirebaseProfile($matchingUser, $email, $name, $picture, $provider, (bool) ($claims['email_verified'] ?? false));
                $this->audit('firebase.account.linked', $matchingUser, $request, ['provider' => $provider]);
                $this->audit('firebase.login.success', $matchingUser, $request);

                return $matchingUser;
            }

            $user = User::create([
                'firebase_uid' => $uid,
                'firebase_provider' => $provider,
                'authentication_provider' => $provider,
                'email' => $email,
                'email_verified_at' => ($claims['email_verified'] ?? false) ? now() : null,
                'name' => $name,
                'avatar' => $picture,
                'avatar_source_url' => $picture,
                'password' => null,
                'customer_code' => User::generateCustomerCode(),
                'preferred_locale' => $this->preferredLocale($request),
                'preferred_language' => $this->preferredLocale($request),
                'preferred_currency' => 'USD',
                'account_status' => 'active',
                'last_login_at' => now(),
                'is_admin' => false,
                'role' => 'customer',
            ]);

            if (class_exists(\Spatie\Permission\Models\Role::class)) {
                $user->assignRole('customer');
            }

            $this->audit('firebase.customer.created', $user, $request, ['provider' => $provider]);
            $this->audit('firebase.login.success', $user, $request);

            return $user;
        });
    }

    public function authenticateCmsStaff(string $idToken, Request $request): User
    {
        $claims = $this->verifiedClaims($idToken, $request);
        $uid = (string) $claims['uid'];
        $email = $this->normalizeEmail($claims['email'] ?? null);

        if (!$email || !($claims['email_verified'] ?? false) || ($claims['provider'] ?? null) !== 'google.com') {
            $this->audit('cms.firebase.login.failed_token', null, $request, ['uid' => $uid]);
            throw ValidationException::withMessages([
                'id_token' => 'We could not verify your staff account.',
            ]);
        }

        $provider = DB::table('staff_login_providers')
            ->where('provider', 'google')
            ->where('authorized_email', $email)
            ->where('is_enabled', true)
            ->first();

        if (!$provider) {
            $this->audit('cms.firebase.login.failed_unauthorized_email', null, $request, ['email' => $email]);
            throw ValidationException::withMessages([
                'id_token' => 'We could not verify your staff account.',
            ]);
        }

        $user = User::find($provider->user_id);
        if (!$user || !$this->isPrivileged($user) || !$user->isActive()) {
            $this->audit('cms.firebase.login.failed_invalid_staff', $user, $request, ['email' => $email]);
            throw ValidationException::withMessages([
                'id_token' => 'We could not verify your staff account.',
            ]);
        }

        DB::table('staff_login_providers')
            ->where('id', $provider->id)
            ->update(['last_used_at' => now(), 'updated_at' => now()]);

        $user->forceFill(['last_login_at' => now()])->save();
        $this->audit('cms.firebase.login.success', $user, $request);

        return $user;
    }

    public function verifiedClaims(string $idToken, Request $request): array
    {
        try {
            $token = $this->auth->verifyIdToken($idToken, true);
        } catch (FailedToVerifyToken $exception) {
            $this->audit('firebase.login.failed_token', null, $request, ['reason' => 'verification_failed']);
            Log::warning('Firebase token verification failed', [
                'error_class' => $exception::class,
                'ip' => $request->ip(),
            ]);
            throw ValidationException::withMessages([
                'id_token' => 'We could not verify your account. Please try again.',
            ]);
        }

        $claims = $token->claims();

        return [
            'uid' => $claims->get('sub'),
            'email' => $claims->get('email'),
            'email_verified' => (bool) $claims->get('email_verified'),
            'name' => $claims->get('name'),
            'picture' => $claims->get('picture'),
            'provider' => data_get($claims->get('firebase'), 'sign_in_provider'),
        ];
    }

    private function updateFirebaseProfile(User $user, string $email, string $name, ?string $picture, string $provider, bool $emailVerified): void
    {
        $user->forceFill([
            'email' => $email,
            'email_verified_at' => $emailVerified ? ($user->email_verified_at ?? now()) : $user->email_verified_at,
            'name' => $user->name ?: $name,
            'avatar' => $user->avatar ?: $picture,
            'avatar_source_url' => $picture ?: $user->avatar_source_url,
            'authentication_provider' => $this->combinedProvider($user->authentication_provider, $provider),
            'firebase_provider' => $provider,
            'last_login_at' => now(),
            'preferred_locale' => $user->preferred_locale ?: 'km',
            'preferred_language' => $user->preferred_language ?: ($user->preferred_locale ?: 'km'),
            'preferred_currency' => in_array($user->preferred_currency, ['USD', 'VND'], true) ? $user->preferred_currency : 'USD',
            'role' => $user->role ?: 'customer',
            'is_admin' => false,
        ])->save();
    }

    private function ensureCustomerCanLogin(User $user, Request $request): void
    {
        if ($this->isPrivileged($user)) {
            $this->audit('firebase.login.failed_privileged_account', null, $request, ['user_id' => $user->id]);
            throw ValidationException::withMessages([
                'id_token' => 'We could not verify your account. Please contact support.',
            ]);
        }

        if (!$user->isActive()) {
            $this->audit('firebase.login.disabled_account', $user, $request);
            throw ValidationException::withMessages([
                'id_token' => 'Your account is currently disabled. Please contact support.',
            ]);
        }
    }

    private function isPrivileged(User $user): bool
    {
        return (bool) $user->is_admin || in_array($user->role, ['admin', 'super_admin', 'logistics', 'content', 'support'], true);
    }



    private function normalizeEmail(?string $email): ?string
    {
        $email = trim((string) $email);

        return $email === '' ? null : mb_strtolower($email);
    }

    private function providerFromClaims(?string $provider): string
    {
        return match ($provider) {
            'password' => 'password',
            'google.com' => 'google',
            default => 'google',
        };
    }

    private function combinedProvider(?string $current, string $incoming): string
    {
        $current = $current ?: $incoming;

        if ($current === $incoming) {
            return $incoming;
        }

        if (in_array($current, ['google', 'password'], true) && in_array($incoming, ['google', 'password'], true)) {
            return 'google_and_password';
        }

        if ($current === 'google_and_password') {
            return $current;
        }

        return $incoming;
    }

    private function nameFromEmail(?string $email): string
    {
        $localPart = $email ? strtok($email, '@') : false;
        $name = $localPart ? str_replace(['.', '_', '-'], ' ', $localPart) : 'Customer';

        return trim(ucwords($name)) ?: 'Customer';
    }

    private function preferredLocale(Request $request): string
    {
        $locale = $request->header('X-App-Locale') ?: $request->input('locale') ?: 'km';

        return in_array($locale, ['km', 'en', 'vi'], true) ? $locale : 'km';
    }

    private function audit(string $action, ?User $user, Request $request, array $newValues = []): void
    {
        if (!class_exists(AuditLog::class)) {
            return;
        }

        AuditLog::create([
            'user_id' => $user?->id,
            'action' => $action,
            'target_type' => $user ? User::class : null,
            'target_id' => $user?->id,
            'new_values' => $newValues ?: null,
            'ip_address' => $request->ip(),
            'user_agent' => substr((string) $request->userAgent(), 0, 255),
        ]);
    }
}
