<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Post;
use App\Models\PostCategory;
use Carbon\Carbon;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Delete the demo post
        Post::where('title', 'like', '%Fashion Trends%')->delete();
        
        // Create categories if they don't exist
        $cat1 = PostCategory::firstOrCreate(['slug' => 'cross-border-shipping'], ['name' => 'Cross-Border Shipping']);
        $cat2 = PostCategory::firstOrCreate(['slug' => 'warehouse-management'], ['name' => 'Warehouse Management']);
        $cat3 = PostCategory::firstOrCreate(['slug' => 'supply-chain-tech'], ['name' => 'Supply Chain Tech']);
        
        // Create the 3 posts
        Post::updateOrCreate(
            ['slug' => 'mastering-cross-border-logistics-2026'],
            [
                'title' => 'Mastering Cross-Border Logistics in 2026',
                'content' => 'Navigating customs and international shipping regulations can be daunting. With MVM Logistics, we handle the heavy lifting. From automated customs declarations to optimized freight routes, this guide explores how businesses are slashing transit times and reducing cross-border friction.',
                'image' => 'https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&q=80&w=1200',
                'post_category_id' => $cat1->id,
                'is_published' => true,
                'published_at' => Carbon::now(),
                'user_id' => null
            ]
        );
        

        
        Post::updateOrCreate(
            ['slug' => 'real-time-tracking-visibility-matters'],
            [
                'title' => 'Real-Time Tracking: Why Visibility Matters',
                'content' => 'In today\'s fast-paced e-commerce environment, customers expect to know exactly where their packages are. Implementing advanced GPS and warehouse barcode scanning has revolutionized our logistics ecosystem, providing 100% transparency from dispatch to doorstep delivery.',
                'image' => 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=1200',
                'post_category_id' => $cat3->id,
                'is_published' => true,
                'published_at' => Carbon::now(),
                'user_id' => null
            ]
        );
    }
}
