<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\CmsSecurityService;
use App\Services\FirebaseAuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function showLogin()
    {
        return Inertia::render('Auth/Login', [
            'initialMode' => 'signin',
        ]);
    }

    public function showRegister()
    {
        return Inertia::render('Auth/Login', [
            'initialMode' => 'signup',
        ]);
    }

    public function showForgotPassword()
    {
        return Inertia::render('Auth/ForgotPassword', [
            'mode' => 'forgot',
        ]);
    }

    public function showResetPassword()
    {
        return Inertia::render('Auth/ForgotPassword', [
            'mode' => 'reset',
        ]);
    }

    public function showCmsLogin()
    {
        return Inertia::render('Auth/CmsLogin');
    }

    public function cmsLogin(Request $request, CmsSecurityService $cmsSecurity)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if ($cmsSecurity->isBlocked($request, $credentials['email'])) {
            return back()->withErrors(['email' => 'This staff login is temporarily blocked. Please contact an administrator.'])->onlyInput('email');
        }

        if (!Auth::guard('admin')->attempt($credentials, $request->boolean('remember'))) {
            $cmsSecurity->recordFailure($request, $credentials['email']);
            return back()->withErrors(['email' => 'The provided CMS credentials do not match our records.'])->onlyInput('email');
        }

        $request->session()->regenerate();
        $user = Auth::guard('admin')->user();

        if (!$user || !($user->is_admin || in_array($user->role, ['admin', 'super_admin', 'logistics', 'content', 'support'], true) || $user->can('dashboard.view'))) {
            $cmsSecurity->recordFailure($request, $credentials['email'], 'invalid_role');
            Auth::guard('admin')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return redirect('/cms/login')->withErrors(['email' => 'This login is for CMS staff only.']);
        }

        if (!$user->isActive()) {
            $cmsSecurity->recordFailure($request, $credentials['email'], 'disabled_staff');
            Auth::guard('admin')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return redirect('/cms/login')->withErrors(['email' => 'This login is for CMS staff only.']);
        }

        $cmsSecurity->recordSuccess($request, $credentials['email']);
        $user->forceFill(['last_login_at' => now()])->save();

        return redirect()->intended('/admin');
    }

    public function cmsLogout(Request $request)
    {
        Auth::guard('admin')->logout();
        // Do not invalidate entire session as they might still be logged into the storefront
        return redirect('/cms/login')->with('success', 'You have been logged out of the CMS.');
    }

    public function logout(Request $request)
    {
        if ($request->user('web')) {
            $this->audit('customer.logout', $request->user('web'), $request);
        }

        Auth::guard('web')->logout();
        // Do not invalidate entire session as they might still be logged into the CMS
        return redirect('/')->with('success', 'You have been logged out.');
    }

    public function firebaseGoogle(Request $request)
    {
        return $this->firebaseSession($request);
    }

    public function firebaseSession(Request $request)
    {
        $validated = $request->validate([
            'id_token' => ['required', 'string'],
            'intent' => ['nullable', 'in:signin,signup,link'],
            'name' => ['nullable', 'string', 'max:120'],
        ]);

        try {
            $firebaseAuth = app(FirebaseAuthService::class);
            $user = $firebaseAuth->authenticateCustomer($validated['id_token'], $request);
        } catch (ValidationException $exception) {
            throw $exception;
        } catch (\Throwable $exception) {
            Log::warning('Firebase customer login failed', [
                'error_class' => $exception::class,
                'ip' => $request->ip(),
            ]);

            throw ValidationException::withMessages([
                'id_token' => 'We could not verify your account. Please try again.',
            ]);
        }

        Auth::login($user);
        $request->session()->regenerate();

        return response()->json([
            'next_url' => $this->nextCustomerUrl($request, $user, $validated['intent'] ?? 'signin'),
        ]);
    }

    public function cmsFirebase(Request $request)
    {
        $validated = $request->validate([
            'id_token' => ['required', 'string'],
        ]);

        try {
            $user = app(FirebaseAuthService::class)->authenticateCmsStaff($validated['id_token'], $request);
        } catch (ValidationException $exception) {
            throw $exception;
        } catch (\Throwable $exception) {
            Log::warning('CMS Firebase staff login failed', [
                'error_class' => $exception::class,
                'ip' => $request->ip(),
            ]);

            throw ValidationException::withMessages([
                'id_token' => 'We could not verify your staff account.',
            ]);
        }

        Auth::login($user);
        $request->session()->regenerate();

        return response()->json(['next_url' => '/admin']);
    }

    private function nextCustomerUrl(Request $request, User $user, string $intent = 'signin'): string
    {
        $intended = $request->session()->pull('url.intended');
        $local = $this->safeLocalIntendedUrl($intended);

        if ($local && str_starts_with($local, '/manual-order') && !$user->profile_completed_at) {
            $request->session()->put('profile.redirect_after_completion', '/manual-order');
            return '/profile/complete?gate=manual-order';
        }

        if ($local) {
            return $local;
        }

        if ($intent === 'signup' && !$user->profile_completed_at) {
            return '/profile/complete?onboarding=1';
        }

        return '/';
    }

    private function safeLocalIntendedUrl(mixed $intended): ?string
    {
        if (!is_string($intended) || $intended === '') {
            return null;
        }

        if (parse_url($intended, PHP_URL_SCHEME) || parse_url($intended, PHP_URL_HOST)) {
            return null;
        }

        $path = parse_url($intended, PHP_URL_PATH) ?: '/';
        $query = parse_url($intended, PHP_URL_QUERY);
        $local = $query ? "{$path}?{$query}" : $path;

        if (!str_starts_with($local, '/') || str_starts_with($local, '//') || str_starts_with($local, '/admin') || str_starts_with($local, '/cms')) {
            return null;
        }

        return $local;
    }

    private function audit(string $action, ?User $user, Request $request, array $newValues = []): void
    {
        if (!class_exists(\App\Models\AuditLog::class)) {
            return;
        }

        \App\Models\AuditLog::create([
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
