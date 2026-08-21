<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\CmsSecurityService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class SecurityAccessController extends Controller
{
    public function index(Request $request)
    {
        $this->authorizeSuperAdmin($request);

        return Inertia::render('Admin/Security/AccessControl', [
            'blocks' => DB::table('cms_security_blocks')
                ->whereNull('released_at')
                ->latest('starts_at')
                ->limit(100)
                ->get(),
            'attempts' => DB::table('cms_login_attempts')
                ->latest('attempted_at')
                ->limit(150)
                ->get(),
            'settings' => [
                'cms_max_failed_attempts' => \App\Models\Setting::where('group', 'general')->where('key', 'cms_max_failed_attempts')->value('value') ?? 10,
                'cms_lockout_duration_minutes' => \App\Models\Setting::where('group', 'general')->where('key', 'cms_lockout_duration_minutes')->value('value') ?? 'forever',
            ]
        ]);
    }

    public function storeBlock(Request $request, CmsSecurityService $security)
    {
        $this->authorizeSuperAdmin($request);

        $request->validate([
            'type' => 'required|in:ip,email,device',
            'value' => 'required|string|max:255',
            'reason' => 'required|string|max:255',
            'duration' => 'nullable|string', // "forever" or integer string
        ]);

        $expiresAt = null;
        if (strtolower(trim($request->duration)) !== 'forever' && is_numeric($request->duration)) {
            $expiresAt = now()->addMinutes((int) $request->duration);
        }

        $security->manualBlock($request->type, $request->value, $request->reason, $expiresAt);

        return back()->with('success', 'Manual security block created.');
    }

    public function updateSettings(Request $request)
    {
        $this->authorizeSuperAdmin($request);

        $request->validate([
            'cms_max_failed_attempts' => 'required|integer|min:1',
            'cms_lockout_duration_minutes' => 'required|string',
        ]);

        \App\Models\Setting::updateOrCreate(
            ['group' => 'general', 'key' => 'cms_max_failed_attempts'],
            ['value' => $request->cms_max_failed_attempts]
        );

        \App\Models\Setting::updateOrCreate(
            ['group' => 'general', 'key' => 'cms_lockout_duration_minutes'],
            ['value' => $request->cms_lockout_duration_minutes]
        );

        return back()->with('success', 'Security settings updated.');
    }

    public function destroy(Request $request, int $block, CmsSecurityService $security)
    {
        $this->authorizeSuperAdmin($request);

        DB::table('cms_security_blocks')
            ->where('id', $block)
            ->whereNull('released_at')
            ->update([
                'released_at' => now(),
                'released_by' => $request->user()->id,
                'updated_at' => now(),
            ]);

        return back()->with('success', 'Security block released.');
    }

    private function authorizeSuperAdmin(Request $request): void
    {
        $user = $request->user();

        abort_unless($user && ($user->hasRole('Super Administrator') || in_array($user->role, ['super_admin', 'superadmin'], true)), 403);
    }
}
