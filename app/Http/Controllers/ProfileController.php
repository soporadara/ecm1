<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use App\Services\CustomerProfileCompletionService;

class ProfileController extends Controller
{
    /**
     * Display the Admin Profile page.
     */
    public function editAdmin(Request $request)
    {
        return Inertia::render('Admin/Profile', [
            'mustVerifyEmail' => $request->user() instanceof \Illuminate\Contracts\Auth\MustVerifyEmail,
            'status' => session('status'),
            'isGoogleOnly' => ($request->user()->authentication_provider ?? $request->user()->firebase_provider) === 'google' && blank($request->user()->password),
        ]);
    }

    /**
     * Display the Customer Profile page.
     */
    public function editCustomer(Request $request)
    {
        return Inertia::render('Profile', [
            'mustVerifyEmail' => $request->user() instanceof \Illuminate\Contracts\Auth\MustVerifyEmail,
            'status' => session('status'),
            'isGoogleOnly' => true,
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(Request $request)
    {
        $user = $request->user();
        $request->merge([
            'phone_e164' => $this->normalizePhone($request->input('phone_e164')),
        ]);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'contact_email' => ['nullable', 'string', 'email', 'max:255'],
            'phone_e164' => [
                'nullable',
                'string',
                'max:20',
                Rule::unique('users', 'phone_e164')->ignore($user->id),
            ],
            'address_line_1' => ['nullable', 'string', 'max:1000'],
            'address_line_2' => ['nullable', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:255'],
            'province' => ['nullable', 'string', 'max:255'],
            'postal_code' => ['nullable', 'string', 'max:30'],
            'country_code' => ['nullable', 'string', 'size:2'],
            'address_notes' => ['nullable', 'string', 'max:1000'],
            'preferred_locale' => ['nullable', 'in:km,en,vi'],
            'preferred_currency' => ['nullable', 'in:USD,VND'],
            'telegram_username' => ['nullable', 'string', 'max:255'],
            'whatsapp_number' => ['nullable', 'string', 'max:50'],
            'messenger_contact' => ['nullable', 'string', 'max:255'],
        ]);

        $user->fill([
            'name' => $validated['name'],
            'contact_email' => $validated['contact_email'] ?? null,
            'phone_e164' => $validated['phone_e164'] ?? null,
            'address_line_1' => $validated['address_line_1'] ?? $user->address_line_1,
            'address_line_2' => $validated['address_line_2'] ?? $user->address_line_2,
            'city' => $validated['city'] ?? $user->city,
            'province' => $validated['province'] ?? $user->province,
            'postal_code' => $validated['postal_code'] ?? $user->postal_code,
            'country_code' => isset($validated['country_code']) ? strtoupper($validated['country_code']) : $user->country_code,
            'address_notes' => $validated['address_notes'] ?? $user->address_notes,
            'preferred_locale' => $validated['preferred_locale'] ?? $user->preferred_locale ?? 'km',
            'preferred_language' => $validated['preferred_locale'] ?? $user->preferred_language ?? 'km',
            'preferred_currency' => $validated['preferred_currency'] ?? $user->preferred_currency ?? 'USD',
            'telegram_username' => $validated['telegram_username'] ?? $user->telegram_username,
            'whatsapp_number' => $validated['whatsapp_number'] ?? $user->whatsapp_number,
            'messenger_contact' => $validated['messenger_contact'] ?? $user->messenger_contact,
        ]);

        if ($user->isDirty('phone_e164')) {
            $user->phone_verified_at = null;
        }

        $user->save();

        return back()->with('success', 'Profile updated successfully.');
    }

    public function showComplete(Request $request, CustomerProfileCompletionService $completion)
    {
        return Inertia::render('Customer/CompleteProfile', [
            'missingFields' => $completion->missingFields($request->user()),
            'isManualOrderGate' => $request->query('gate') === 'manual-order' || $request->session()->get('profile.redirect_after_completion') === '/manual-order',
            'canSkip' => $request->query('gate') !== 'manual-order' && $request->session()->get('profile.redirect_after_completion') !== '/manual-order',
        ]);
    }

    public function storeComplete(Request $request, CustomerProfileCompletionService $completion)
    {
        $request->merge([
            'phone_e164' => $this->normalizePhone($request->input('phone_e164')),
        ]);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'phone_e164' => [
                'required',
                'string',
                'max:20',
                Rule::unique('users', 'phone_e164')->ignore($request->user()->id),
            ],
            'address_line_1' => ['required', 'string', 'max:1000'],
            'address_line_2' => ['nullable', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:255'],
            'province' => ['nullable', 'string', 'max:255'],
            'postal_code' => ['nullable', 'string', 'max:30'],
            'country_code' => ['nullable', 'string', 'size:2'],
            'address_notes' => ['nullable', 'string', 'max:1000'],
            'preferred_locale' => ['nullable', 'in:km,en,vi'],
            'preferred_currency' => ['nullable', 'in:USD,VND'],
            'telegram_username' => ['nullable', 'string', 'max:255'],
            'whatsapp_number' => ['nullable', 'string', 'max:50'],
            'messenger_contact' => ['nullable', 'string', 'max:255'],
        ]);

        $request->user()->update([
            ...$validated,
            'country_code' => isset($validated['country_code']) ? strtoupper($validated['country_code']) : null,
            'preferred_locale' => $validated['preferred_locale'] ?? 'km',
            'preferred_language' => $validated['preferred_locale'] ?? 'km',
            'preferred_currency' => $validated['preferred_currency'] ?? 'USD',
        ]);

        $completion->markCompleted($request->user()->fresh());

        if (class_exists(\App\Models\AuditLog::class)) {
            \App\Models\AuditLog::create([
                'user_id' => $request->user()->id,
                'action' => 'customer.profile.completed',
                'target_type' => \App\Models\User::class,
                'target_id' => $request->user()->id,
                'ip_address' => $request->ip(),
                'user_agent' => substr((string) $request->userAgent(), 0, 255),
            ]);
        }

        $redirect = $request->session()->pull('profile.redirect_after_completion');

        return redirect($redirect ?: '/')->with('success', $redirect === '/manual-order'
            ? 'Profile completed successfully. You can create a Manual Order now.'
            : 'Your profile has been updated successfully.'
        );
    }

    public function skipComplete(Request $request)
    {
        $request->user()->forceFill([
            'profile_onboarding_skipped_at' => now(),
        ])->save();

        if (class_exists(\App\Models\AuditLog::class)) {
            \App\Models\AuditLog::create([
                'user_id' => $request->user()->id,
                'action' => 'customer.profile.onboarding_skipped',
                'target_type' => \App\Models\User::class,
                'target_id' => $request->user()->id,
                'ip_address' => $request->ip(),
                'user_agent' => substr((string) $request->userAgent(), 0, 255),
            ]);
        }

        return redirect('/')->with('success', 'Your account was created. Complete your profile before creating a Manual Order.');
    }

    private function normalizePhone(?string $phone): ?string
    {
        $phone = trim((string) $phone);

        if ($phone === '') {
            return null;
        }

        $phone = preg_replace('/[\s().-]+/', '', $phone) ?: $phone;

        if (str_starts_with($phone, '00')) {
            $phone = '+'.substr($phone, 2);
        }

        return $phone;
    }

    /**
     * Update the user's password.
     */
    public function updatePassword(Request $request)
    {
        if (!$request->user()?->is_admin && !in_array($request->user()?->role, ['admin', 'super_admin', 'logistics', 'content', 'support'], true)) {
            abort(404);
        }

        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        $request->user()->update([
            'password' => Hash::make($validated['password']),
        ]);

        return back()->with('success', 'Password updated successfully.');
    }

    /**
     * Update the user's avatar.
     */
    public function updateAvatar(Request $request)
    {
        $request->validate([
            'avatar' => ['required', 'image', 'max:5120'], // max 5MB
        ]);

        $user = $request->user();

        if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');
            $path = $file->store('avatars', 'public');

            // Delete old avatar if it's local
            if ($user->avatar && str_starts_with($user->avatar, 'avatars/')) {
                Storage::disk('public')->delete($user->avatar);
            }

            $user->update([
                'avatar' => '/storage/' . $path,
                'avatar_path' => $path,
            ]);
        }

        return back()->with('success', 'Profile picture updated successfully.');
    }
}
