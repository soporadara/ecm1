<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Helpers\FeatureFlags;

class CheckStorefrontEnabled
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // If the storefront products feature is disabled, block access
        if (FeatureFlags::disabled('storefront_products_enabled')) {
            // Redirect to home page with an error or just abort with 404
            if ($request->expectsJson()) {
                return response()->json(['message' => 'Storefront is currently disabled.'], 403);
            }
            return redirect('/')->with('error', 'Storefront is currently disabled. Please use the logistics dashboard.');
        }

        return $next($request);
    }
}
