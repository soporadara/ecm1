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
        ]);
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
