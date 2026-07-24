<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth('admin')->user();

        if (
            !$user ||
            !(
                $user->is_admin === true ||
                $user->is_admin === 1 ||
                in_array($user->role, ['super_admin', 'admin', 'logistics', 'content', 'support'], true) ||
                $user->can('dashboard.view')
            )
        ) {
            abort(403, 'Unauthorized access. Only authorized staff can view this page.');
        }

        return $next($request);
    }
}
