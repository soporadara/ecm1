<?php

namespace Tests\Feature;

use App\Models\Popup;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class PopupAdminTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_create_popup_with_large_landscape_image_and_size_preset(): void
    {
        Storage::fake('public');
        $admin = User::factory()->create([
            'is_admin' => true,
            'role' => 'superadmin',
        ]);

        $image = UploadedFile::fake()->image('promo.jpg', 1920, 1080)->size(6000);

        $response = $this->actingAs($admin)->post('/admin/popups', [
            'title' => 'July discount popup',
            'badge_text' => '20% OFF',
            'heading' => 'Save on manual orders',
            'description' => 'Send links, images, and notes.',
            'creative_size' => 'landscape_1920x1080',
            'link_url' => '/manual-order',
            'button_label' => 'Order Now',
            'accent_color' => '#ff4c3b',
            'is_active' => '1',
            'image' => $image,
        ]);

        $response->assertRedirect('/admin/popups');

        $popup = Popup::firstOrFail();
        $this->assertSame('landscape_1920x1080', $popup->creative_size);
        $this->assertNotNull($popup->image_path);
        Storage::disk('public')->assertExists($popup->image_path);
    }

    public function test_admin_can_update_popup_to_portrait_size(): void
    {
        $admin = User::factory()->create([
            'is_admin' => true,
            'role' => 'superadmin',
        ]);

        $popup = Popup::create([
            'title' => 'Existing popup',
            'heading' => 'Old heading',
            'description' => 'Old description',
            'creative_size' => 'square_1280x1280',
            'button_label' => 'Open',
            'accent_color' => '#ff4c3b',
            'is_active' => false,
        ]);

        $response = $this->actingAs($admin)->put("/admin/popups/{$popup->id}", [
            'title' => 'Existing popup',
            'badge_text' => 'NEW',
            'heading' => 'Portrait promotion',
            'description' => 'Tall mobile promotion.',
            'creative_size' => 'portrait_1080x1920',
            'link_url' => '/manual-order',
            'button_label' => 'Start',
            'accent_color' => '#00a183',
            'is_active' => '1',
        ]);

        $response->assertRedirect('/admin/popups');

        $this->assertDatabaseHas('popups', [
            'id' => $popup->id,
            'creative_size' => 'portrait_1080x1920',
            'is_active' => true,
        ]);
    }
}

