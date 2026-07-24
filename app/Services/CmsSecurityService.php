<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CmsSecurityService
{
    public function isBlocked(Request $request, string $email): bool
    {
        $identity = $this->identity($request, $email);

        return DB::table('cms_security_blocks')
            ->whereNull('released_at')
            ->where(fn ($query) => $query
                ->where('ip_address', $identity['ip_address'])
                ->orWhere('email_hash', $identity['email_hash'])
                ->orWhere('device_hash', $identity['device_hash'])
            )
            ->where(fn ($query) => $query->whereNull('expires_at')->orWhere('expires_at', '>', now()))
            ->exists();
    }

    public function recordFailure(Request $request, string $email, string $category = 'invalid_credentials'): void
    {
        $identity = $this->identity($request, $email);

        DB::table('cms_login_attempts')->insert([
            ...$identity,
            'failure_category' => $category,
            'attempted_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->applyThresholdBlocks($identity);
    }

    public function recordSuccess(Request $request, string $email): void
    {
        $identity = $this->identity($request, $email);

        DB::table('cms_login_attempts')
            ->where('attempted_at', '>=', now()->subMinutes(30))
            ->where(fn ($query) => $query
                ->where('ip_address', $identity['ip_address'])
                ->orWhere('email_hash', $identity['email_hash'])
                ->orWhere('device_hash', $identity['device_hash'])
            )
            ->delete();
    }

    public function unblock(array $criteria, ?int $releasedBy = null): int
    {
        $query = DB::table('cms_security_blocks')->whereNull('released_at');

        if ($criteria['all_temporary'] ?? false) {
            $query->whereNotNull('expires_at');
        } else {
            if (!empty($criteria['ip'])) {
                $query->where('ip_address', $criteria['ip']);
            }
            if (!empty($criteria['email'])) {
                $query->where('email_hash', $this->emailHash($criteria['email']));
            }
            if (!empty($criteria['device'])) {
                $query->where('device_hash', $criteria['device']);
            }
        }

        return $query->update([
            'released_at' => now(),
            'released_by' => $releasedBy,
            'updated_at' => now(),
        ]);
    }

    /**
     * @return array<string, string|null>
     */
    private function identity(Request $request, string $email): array
    {
        $email = Str::lower(trim($email));
        $userAgent = substr((string) $request->userAgent(), 0, 180);

        return [
            'email_hash' => $this->emailHash($email),
            'masked_email' => $this->maskEmail($email),
            'ip_address' => $request->ip(),
            'device_hash' => hash('sha256', implode('|', [$request->ip(), $userAgent, config('app.key')])),
            'user_agent_summary' => $userAgent,
        ];
    }

    private function applyThresholdBlocks(array $identity): void
    {
        $recent15 = DB::table('cms_login_attempts')
            ->where('attempted_at', '>=', now()->subMinutes(15))
            ->where(fn ($query) => $query
                ->where('ip_address', $identity['ip_address'])
                ->orWhere('email_hash', $identity['email_hash'])
                ->orWhere('device_hash', $identity['device_hash'])
            )
            ->count();

        $recent30 = DB::table('cms_login_attempts')
            ->where('attempted_at', '>=', now()->subMinutes(30))
            ->where(fn ($query) => $query
                ->where('ip_address', $identity['ip_address'])
                ->orWhere('email_hash', $identity['email_hash'])
                ->orWhere('device_hash', $identity['device_hash'])
            )
            ->count();

        if ($recent30 >= 10) {
            $this->createBlock($identity, 'ten_failed_attempts', now()->addDay());
            return;
        }

        if ($recent15 >= 5) {
            $this->createBlock($identity, 'five_failed_attempts', now()->addMinutes(15));
        }
    }

    private function createBlock(array $identity, string $reason, \Carbon\CarbonInterface $expiresAt): void
    {
        $exists = DB::table('cms_security_blocks')
            ->whereNull('released_at')
            ->where('reason', $reason)
            ->where('email_hash', $identity['email_hash'])
            ->where('ip_address', $identity['ip_address'])
            ->where('device_hash', $identity['device_hash'])
            ->where(fn ($query) => $query->whereNull('expires_at')->orWhere('expires_at', '>', now()))
            ->exists();

        if ($exists) {
            return;
        }

        DB::table('cms_security_blocks')->insert([
            'email_hash' => $identity['email_hash'],
            'masked_email' => $identity['masked_email'],
            'ip_address' => $identity['ip_address'],
            'device_hash' => $identity['device_hash'],
            'reason' => $reason,
            'starts_at' => now(),
            'expires_at' => $expiresAt,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    private function emailHash(string $email): string
    {
        return hash_hmac('sha256', Str::lower(trim($email)), config('app.key'));
    }

    private function maskEmail(string $email): string
    {
        if (!str_contains($email, '@')) {
            return 'unknown';
        }

        [$local, $domain] = explode('@', $email, 2);

        return Str::substr($local, 0, 1).str_repeat('*', max(1, min(6, strlen($local) - 1))).'@'.$domain;
    }
}
