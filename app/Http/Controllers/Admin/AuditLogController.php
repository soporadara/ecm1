<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use Inertia\Inertia;

class AuditLogController extends Controller
{
    public function index()
    {
        $logs = AuditLog::with('user')
            ->latest()
            ->paginate(25)
            ->through(fn (AuditLog $log) => [
                'id' => $log->id,
                'action' => $log->action,
                'target_type' => $log->target_type ? class_basename($log->target_type) : null,
                'target_id' => $log->target_id,
                'user' => $log->user?->only(['id', 'name', 'email']),
                'ip_address' => $log->ip_address,
                'created_at' => $log->created_at?->timezone('Asia/Phnom_Penh')->format('d M Y, H:i'),
            ]);

        return Inertia::render('Admin/AuditLogs/Index', [
            'logs' => $logs,
        ]);
    }

    public function clear()
    {
        $user = auth()->user();
        abort_unless($user->role === 'super_admin' || $user->role === 'superadmin' || $user->hasRole('Super Administrator'), 403, 'Only super admins can clear logs.');

        AuditLog::truncate();

        return back()->with('success', 'Audit logs cleared successfully.');
    }
}
