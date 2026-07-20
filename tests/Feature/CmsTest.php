<?php

namespace Tests\Feature;

use App\Models\Page;
use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CmsTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_manage_pages()
    {
        $admin = User::factory()->create(['is_admin' => true]);

        // Create Page
        $response = $this->actingAs($admin)->post('/admin/pages', [
            'title' => 'About Us',
            'slug' => 'about-us',
            'content' => '<p>About us content</p>',
            'is_published' => true
        ]);
        
        $response->assertRedirect('/admin/pages');
        $this->assertDatabaseHas('pages', ['slug' => 'about-us']);

        // View Page on Storefront
        $response = $this->get('/pages/about-us');
        $response->assertStatus(200);
        $response->assertSee('About Us');
    }

    public function test_admin_can_manage_blog_posts()
    {
        $admin = User::factory()->create(['is_admin' => true]);

        // Create Post
        $response = $this->actingAs($admin)->post('/admin/posts', [
            'title' => 'My First Blog Post',
            'slug' => 'my-first-blog-post',
            'content' => '<p>Hello world!</p>',
            'is_published' => true
        ]);
        
        $response->assertRedirect('/admin/posts');
        $this->assertDatabaseHas('posts', ['slug' => 'my-first-blog-post']);

        // View Blog List
        $response = $this->get('/blog');
        $response->assertStatus(200);
        $response->assertSee('My First Blog Post');

        // View Single Post
        $response = $this->get('/blog/my-first-blog-post');
        $response->assertStatus(200);
        $response->assertSee('My First Blog Post');
    }
}
