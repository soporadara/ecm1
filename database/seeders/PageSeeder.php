<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Page;

class PageSeeder extends Seeder
{
    public function run()
    {
        $pages = [
            ['title' => 'Home', 'slug' => 'home'],
            ['title' => 'Blog', 'slug' => 'blog'],
        ];

        foreach ($pages as $p) {
            if (!Page::where('slug', $p['slug'])->exists()) {
                Page::create([
                    'title' => $p['title'],
                    'slug' => $p['slug'],
                    'content' => '',
                    'is_active' => true,
                    'seo_title' => $p['title'],
                    'seo_description' => ''
                ]);
            }
        }
    }
}
