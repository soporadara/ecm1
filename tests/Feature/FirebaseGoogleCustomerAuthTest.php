<?php

namespace Tests\Feature;

use App\Models\User;
use App\Services\FirebaseAuthService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Mockery;
use Tests\TestCase;

class FirebaseGoogleCustomerAuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_missing_firebase_token_is_rejected(): void
    {
        $this->postJson('/auth/firebase/session', [])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('id_token');
    }

    public function test_invalid_firebase_token_is_rejected_with_customer_safe_error(): void
    {
        $this->fakeFirebaseService(function () {
            throw ValidationException::withMessages([
                'id_token' => 'We could not verify your account. Please try again.',
            ]);
        });

        $this->postJson('/auth/firebase/session', ['id_token' => 'invalid-token', 'intent' => 'signin'])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('id_token')
            ->assertDontSee('invalid-token');

        $this->assertGuest();
    }

    public function test_expired_firebase_token_is_rejected(): void
    {
        $this->fakeFirebaseService(function () {
            throw ValidationException::withMessages([
                'id_token' => 'We could not verify your account. Please try again.',
            ]);
        });

        $this->postJson('/auth/firebase/session', ['id_token' => 'expired-token', 'intent' => 'signin'])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('id_token');
    }

    public function test_wrong_project_firebase_token_is_rejected(): void
    {
        $this->fakeFirebaseService(function () {
            throw ValidationException::withMessages([
                'id_token' => 'We could not verify your account. Please try again.',
            ]);
        });

        $this->postJson('/auth/firebase/session', ['id_token' => 'wrong-project-token', 'intent' => 'signin'])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('id_token');
    }

    public function test_verified_google_token_logs_in_new_customer_and_redirects_to_profile_completion(): void
    {
        $this->fakeFirebaseService(function () {
            return User::create([
                'firebase_uid' => 'firebase-new-customer-uid',
                'firebase_provider' => 'google',
                'authentication_provider' => 'google',
                'name' => 'Google Customer',
                'email' => 'google.customer@example.test',
                'email_verified_at' => now(),
                'password' => null,
                'customer_code' => 'CUS-2026-000001',
                'account_status' => 'active',
                'role' => 'customer',
                'is_admin' => false,
            ]);
        });

        $response = $this->postJson('/auth/firebase/session', ['id_token' => 'valid-token', 'intent' => 'signup']);

        $response->assertOk()->assertJson(['next_url' => '/profile/complete?onboarding=1']);
        $this->assertAuthenticated();
        $this->assertDatabaseHas('users', [
            'email' => 'google.customer@example.test',
            'firebase_uid' => 'firebase-new-customer-uid',
            'authentication_provider' => 'google',
            'customer_code' => 'CUS-2026-000001',
        ]);
    }

    public function test_verified_google_token_logs_in_existing_completed_customer(): void
    {
        $customer = User::factory()->create([
            'firebase_uid' => 'firebase-existing-uid',
            'authentication_provider' => 'google',
            'firebase_provider' => 'google',
            'customer_code' => 'CUS-2026-000002',
            'profile_completed_at' => now(),
            'account_status' => 'active',
            'role' => 'customer',
            'is_admin' => false,
        ]);

        $this->fakeFirebaseService(fn () => $customer);

        $this->withSession(['url.intended' => '/my-orders'])
            ->postJson('/auth/firebase/google', ['id_token' => 'valid-token'])
            ->assertOk()
            ->assertJson(['next_url' => '/my-orders']);

        $this->assertAuthenticatedAs($customer);
    }

    public function test_external_intended_url_is_rejected(): void
    {
        $customer = User::factory()->create([
            'profile_completed_at' => now(),
            'account_status' => 'active',
            'role' => 'customer',
            'is_admin' => false,
        ]);

        $this->fakeFirebaseService(fn () => $customer);

        $this->withSession(['url.intended' => 'https://evil.example/phishing'])
            ->postJson('/auth/firebase/session', ['id_token' => 'valid-token', 'intent' => 'signin'])
            ->assertOk()
            ->assertJson(['next_url' => '/']);
    }

    public function test_admin_email_cannot_be_linked_as_customer(): void
    {
        User::factory()->create([
            'email' => 'admin@example.test',
            'is_admin' => true,
            'role' => 'admin',
        ]);

        $this->fakeFirebaseService(function () {
            throw ValidationException::withMessages([
                'id_token' => 'We could not verify your account. Please contact support.',
            ]);
        });

        $this->postJson('/auth/firebase/session', ['id_token' => 'admin-email-token', 'intent' => 'signin'])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('id_token');

        $this->assertGuest();
    }

    public function test_disabled_customer_cannot_log_in(): void
    {
        $this->fakeFirebaseService(function () {
            throw ValidationException::withMessages([
                'id_token' => 'Your account is currently disabled. Please contact support.',
            ]);
        });

        $this->postJson('/auth/firebase/session', ['id_token' => 'disabled-token', 'intent' => 'signin'])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('id_token');

        $this->assertGuest();
    }

    public function test_customer_firebase_password_pages_are_available_without_laravel_password_posts(): void
    {
        $this->post('/login', ['email' => 'customer@example.test', 'password' => 'password'])->assertStatus(405);
        $this->get('/register')->assertOk();
        $this->post('/register', [])->assertStatus(405);
        $this->get('/forgot-password')->assertOk();
        $this->post('/forgot-password', [])->assertStatus(405);
        $this->get('/reset-password')->assertOk();
    }

    public function test_cms_password_login_remains_available_for_staff(): void
    {
        $admin = User::factory()->create([
            'email' => 'admin@example.test',
            'password' => Hash::make('Admin@12345'),
            'is_admin' => true,
            'role' => 'admin',
            'authentication_provider' => 'password',
        ]);

        $this->post('/cms/login', [
            'email' => 'admin@example.test',
            'password' => 'Admin@12345',
        ])->assertRedirect('/admin');

        $this->assertAuthenticatedAs($admin);
    }

    public function test_customer_cannot_access_cms_after_google_login(): void
    {
        $customer = User::factory()->create([
            'profile_completed_at' => now(),
            'account_status' => 'active',
            'role' => 'customer',
            'is_admin' => false,
        ]);

        $this->actingAs($customer)->get('/admin')->assertForbidden();
    }

    public function test_logout_invalidates_customer_session_and_writes_audit_log(): void
    {
        $customer = User::factory()->create([
            'role' => 'customer',
            'is_admin' => false,
            'account_status' => 'active',
        ]);

        $this->actingAs($customer)->post('/logout')->assertRedirect('/');

        $this->assertGuest();
        $this->assertDatabaseHas('audit_logs', [
            'user_id' => $customer->id,
            'action' => 'customer.logout',
        ]);
    }

    public function test_login_page_source_contains_google_and_firebase_password_customer_auth_without_facebook(): void
    {
        $loginSource = file_get_contents(resource_path('js/Pages/Auth/Login.tsx'));
        $firebaseSource = file_get_contents(resource_path('js/lib/firebase.ts'));

        $this->assertStringContainsString('Continue with Google', file_get_contents(resource_path('js/locales/en.json')));
        $this->assertStringContainsString('Sign Up with Google', file_get_contents(resource_path('js/locales/en.json')));
        $this->assertStringContainsString('បន្តជាមួយ Google', file_get_contents(resource_path('js/locales/km.json')));
        $this->assertStringContainsString('Tiếp tục với Google', file_get_contents(resource_path('js/locales/vi.json')));
        $this->assertStringContainsString('signInWithGooglePopupOrRedirect', $loginSource);
        $this->assertStringContainsString('signInWithFirebasePassword', $loginSource);
        $this->assertStringContainsString('createFirebasePasswordAccount', $loginSource);
        $this->assertStringContainsString('type="password"', $loginSource);
        $this->assertStringContainsString('type="email"', $loginSource);
        $this->assertStringContainsString('/forgot-password', $loginSource);
        $this->assertStringContainsString('/auth/firebase/session', $loginSource);
        $this->assertStringContainsString('createUserWithEmailAndPassword', $firebaseSource);
        $this->assertStringContainsString('signInWithEmailAndPassword', $firebaseSource);
        $this->assertStringNotContainsString('Facebook', $loginSource);
    }

    private function fakeFirebaseService(callable $callback): void
    {
        $service = Mockery::mock(FirebaseAuthService::class);
        $service->shouldReceive('authenticateCustomer')
            ->with(Mockery::type('string'), Mockery::type(Request::class))
            ->andReturnUsing($callback);

        $this->app->instance(FirebaseAuthService::class, $service);
    }
}
