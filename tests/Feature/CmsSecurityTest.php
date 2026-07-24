<?php

namespace Tests\Feature;

use App\Models\User;
use App\Services\FirebaseAuthService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Mockery;
use Tests\TestCase;

class CmsSecurityTest extends TestCase
{
    use RefreshDatabase;

    public function test_failed_cms_password_login_records_attempt_and_threshold_block(): void
    {
        User::factory()->create([
            'email' => 'admin@example.test',
            'password' => Hash::make('Correct@12345'),
            'is_admin' => true,
            'role' => 'admin',
            'account_status' => 'active',
        ]);

        for ($i = 0; $i < 5; $i++) {
            $this->from('/cms/login')->post('/cms/login', [
                'email' => 'admin@example.test',
                'password' => 'wrong-password',
            ])->assertRedirect('/cms/login');
        }

        $this->assertDatabaseCount('cms_login_attempts', 5);
        $this->assertDatabaseHas('cms_security_blocks', [
            'masked_email' => 'a****@example.test',
            'reason' => 'five_failed_attempts',
            'released_at' => null,
        ]);

        $this->from('/cms/login')->post('/cms/login', [
            'email' => 'admin@example.test',
            'password' => 'Correct@12345',
        ])->assertRedirect('/cms/login');

        Artisan::call('cms:security:unblock', ['--email' => 'admin@example.test']);

        $this->assertSame(0, DB::table('cms_security_blocks')->whereNull('released_at')->count());
    }

    public function test_cms_login_page_does_not_render_public_customer_header_source(): void
    {
        $source = file_get_contents(resource_path('js/Pages/Auth/CmsLogin.tsx'));

        $this->assertStringNotContainsString('MainLayout', $source);
        $this->assertStringContainsString('/cms/login', $source);
        $this->assertStringContainsString('Sign in to CMS', $source);
    }

    public function test_unknown_google_staff_account_is_rejected(): void
    {
        $service = Mockery::mock(FirebaseAuthService::class);
        $service->shouldReceive('authenticateCmsStaff')
            ->with(Mockery::type('string'), Mockery::type(Request::class))
            ->andThrow(ValidationException::withMessages([
                'id_token' => 'We could not verify your staff account.',
            ]));

        $this->app->instance(FirebaseAuthService::class, $service);

        $this->postJson('/auth/firebase/cms', ['id_token' => 'unknown-staff-token'])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('id_token');

        $this->assertGuest();
    }
}
