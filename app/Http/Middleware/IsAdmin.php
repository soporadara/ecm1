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
        $allowedRoles = ['superadmin', 'admin', 'supervisor', 'editor', 'support'];
        
        if (!auth()->check() || !in_array(auth()->user()->role, $allowedRoles)) {
            abort(403, 'Unauthorized access. Only authorized staff can view this page.');
        }

        return $next($request);
    }
}
