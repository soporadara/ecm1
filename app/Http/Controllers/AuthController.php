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
    public function showLogin(Request $request)
    {
        return redirect('/')->with('open_login_modal', 'signin');
    }

    public function showRegister(Request $request)
    {
        return redirect('/')->with('open_login_modal', 'signup');
    }

    public function storeLogin(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::guard('web')->attempt($credentials, $request->boolean('remember'))) {
            $request->session()->regenerate();
            $user = Auth::guard('web')->user();
            $user->forceFill(['last_login_at' => now()])->save();
            return redirect()->intended('/manual-order');
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }

    public function storeRegister(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => \Illuminate\Support\Facades\Hash::make($validated['password']),
            'role' => 'customer',
        ]);

        Auth::guard('web')->login($user);
        $request->session()->regenerate();

        return redirect()->intended('/manual-order');
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

    public function sendResetPin(Request $request)
    {
        $request->validate(['email' => 'required|email|exists:users,email']);
        $email = $request->input('email');
        
        $pin = (string) random_int(100000, 999999);
        
        \Illuminate\Support\Facades\DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $email],
            ['token' => $pin, 'created_at' => now()]
        );
        
        \Illuminate\Support\Facades\Mail::to($email)->send(new \App\Mail\PasswordResetPinMail($pin));
        
        return response()->json(['message' => 'PIN sent successfully']);
    }

    public function verifyResetPin(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'pin' => 'required|string|size:6'
        ]);
        
        $record = \Illuminate\Support\Facades\DB::table('password_reset_tokens')
            ->where('email', $request->input('email'))
            ->where('token', $request->input('pin'))
            ->first();
            
        if (!$record || \Carbon\Carbon::parse($record->created_at)->addMinutes(15)->isPast()) {
            throw ValidationException::withMessages(['pin' => 'The verification code is invalid or has expired.']);
        }
        
        return response()->json(['message' => 'PIN verified successfully']);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'pin' => 'required|string|size:6',
            'password' => ['required', 'string', 'min:8', 'confirmed']
        ]);
        
        $record = \Illuminate\Support\Facades\DB::table('password_reset_tokens')
            ->where('email', $request->input('email'))
            ->where('token', $request->input('pin'))
            ->first();
            
        if (!$record || \Carbon\Carbon::parse($record->created_at)->addMinutes(15)->isPast()) {
            throw ValidationException::withMessages(['pin' => 'The verification code is invalid or has expired.']);
        }
        
        $user = User::where('email', $request->input('email'))->first();
        if ($user) {
            $user->forceFill([
                'password' => \Illuminate\Support\Facades\Hash::make($request->input('password'))
            ])->save();
        }
        
        \Illuminate\Support\Facades\DB::table('password_reset_tokens')->where('email', $request->input('email'))->delete();
        
        return response()->json(['message' => 'Password reset successfully']);
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

        Auth::guard('admin')->login($user);
        $request->session()->regenerate();

        return response()->json(['next_url' => '/admin']);
    }

    public function socialiteRedirect()
    {
        return \Laravel\Socialite\Facades\Socialite::driver('google')->redirect();
    }

    public function socialiteCallback(Request $request)
    {
        try {
            $googleUser = \Laravel\Socialite\Facades\Socialite::driver('google')->user();
        } catch (\Exception $e) {
            return redirect('/cms/login')->withErrors(['email' => 'Google login failed.']);
        }

        $user = User::where('email', $googleUser->getEmail())->first();

        if ($user) {
            $user->update([
                'authentication_provider' => 'google',
                'google_id' => $googleUser->getId(),
                'avatar' => $googleUser->getAvatar(),
                'email_verified_at' => $user->email_verified_at ?? now(),
            ]);
        } else {
            $user = User::create([
                'name' => $googleUser->getName(),
                'email' => $googleUser->getEmail(),
                'authentication_provider' => 'google',
                'google_id' => $googleUser->getId(),
                'avatar' => $googleUser->getAvatar(),
                'email_verified_at' => now(),
                'password' => null,
                'is_admin' => false,
                'role' => 'customer',
            ]);
        }

        if ($user->is_admin || in_array($user->role, ['admin', 'super_admin', 'logistics', 'content', 'support'], true)) {
            Auth::guard('admin')->login($user, true);
            $request->session()->regenerate();
            return redirect()->intended('/admin');
        } else {
            Auth::guard('web')->login($user, true);
            $request->session()->regenerate();
            return redirect()->intended('/');
        }
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
