<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\Category;
use App\Models\Brand;
use App\Models\Collection;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\ProductImage;
use App\Models\HomePageSection;
use App\Models\Page;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class StoreSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Clear existing data safely
        \Illuminate\Support\Facades\Schema::disableForeignKeyConstraints();
        HomePageSection::truncate();
        ProductVariant::truncate();
        ProductImage::truncate();
        Product::truncate();
        Collection::truncate();
        Brand::truncate();
        Category::truncate();
        Page::truncate();
        Post::truncate();
        \Illuminate\Support\Facades\Schema::enableForeignKeyConstraints();

        // 2. Create Brands
        $brands = ['Northline', 'Veloura', 'Kroma', 'Urban Step', 'Lumière', 'NovaTech'];
        $brandIds = [];
        foreach ($brands as $brand) {
            $b = Brand::create(['name' => $brand, 'slug' => Str::slug($brand)]);
            $brandIds[$brand] = $b->id;
        }

        // 3. Create Categories
        $categories = ['Men', 'Women', 'Kids', 'Shoes', 'Accessories', 'Beauty', 'Electronics'];
        $catIds = [];
        foreach ($categories as $cat) {
            $c = Category::create(['name' => $cat, 'slug' => Str::slug($cat)]);
            $catIds[$cat] = $c->id;
        }

        // 4. Create Collections
        $collections = ['New Arrivals', 'Summer Essentials', 'Weekend Style', 'Office Edit', 'Best Sellers', 'Flash Sale'];
        $colIds = [];
        foreach ($collections as $col) {
            $c = Collection::create(['name' => $col, 'slug' => Str::slug($col)]);
            $colIds[$col] = $c->id;
        }

        // 5. Product Generation Data
        $fullDescTemplate = function($name) {
            return "<p>This $name is designed for everyday wear and exceptional comfort. Crafted with premium materials, it ensures durability without compromising on style.</p>
            <p><strong>Highlights:</strong></p>
            <ul>
                <li>Premium breathable fabric</li>
                <li>Modern tailored fit</li>
                <li>Durable reinforced stitching</li>
                <li>Versatile for multiple occasions</li>
            </ul>";
        };

        $productsData = [
            // MEN (5)
            ['Men', 'Classic Oxford Shirt', 45.00, 'A breathable cotton shirt with a clean tailored fit, designed for office wear, events, and relaxed everyday styling.', '100% Cotton', 'Machine wash cold with similar colors. Do not bleach.', 4],
            ['Men', 'Relaxed Linen Shirt', 55.00, 'Lightweight and airy, this relaxed linen shirt offers the perfect blend of casual comfort and sophisticated weekend style.', '100% Linen', 'Hand wash cold or dry clean. Hang dry.', 4],
            ['Men', 'Tailored Cotton Trousers', 65.00, 'Sharp tailored trousers with a slight stretch for all-day comfort, transitioning seamlessly from the boardroom to evening dinners.', '98% Cotton, 2% Elastane', 'Machine wash cold. Tumble dry low.', 4],
            ['Men', 'Everyday Polo', 35.00, 'A staple wardrobe piece made from soft, moisture-wicking pique cotton, perfect for a round of golf or casual Fridays.', '100% Pique Cotton', 'Machine wash warm. Iron on medium.', 4],
            ['Men', 'Lightweight Bomber Jacket', 110.00, 'A modern take on the classic bomber, featuring a water-resistant shell and lightweight lining for unpredictable weather.', '100% Polyester Shell', 'Dry clean only.', 4],
            
            // WOMEN (5)
            ['Women', 'Satin Midi Dress', 120.00, 'An elegant slip dress crafted from lustrous satin, featuring a flattering bias cut that drapes beautifully for evening events.', '100% Silk Satin', 'Dry clean only. Do not iron directly.', 4],
            ['Women', 'Pleated Wide-Leg Trousers', 85.00, 'High-waisted wide-leg trousers with fluid pleats that elongate the silhouette, offering a sophisticated and comfortable fit.', 'Polyester Blend', 'Machine wash cold on gentle cycle.', 4],
            ['Women', 'Cropped Knit Cardigan', 60.00, 'A cozy, textured knit cardigan with an oversized fit and tortoiseshell buttons, perfect for layering during transitional seasons.', 'Wool and Acrylic Blend', 'Hand wash cold. Dry flat.', 4],
            ['Women', 'Everyday Blazer', 140.00, 'A sharply tailored single-breasted blazer that instantly elevates any outfit, designed with lightly padded shoulders and flap pockets.', 'Wool Blend', 'Dry clean only.', 4],
            ['Women', 'Soft Cotton Blouse', 50.00, 'A feminine cotton blouse featuring subtle puffed sleeves and a delicate button front, ideal for both work and weekends.', '100% Cotton', 'Machine wash cold. Line dry.', 4],
            
            // SHOES (5)
            ['Shoes', 'Urban Runner Sneakers', 130.00, 'High-performance urban sneakers with responsive cushioning and a breathable mesh upper, designed for active city living.', 'Mesh Upper, Rubber Sole', 'Wipe clean with a damp cloth.', 4],
            ['Shoes', 'Classic White Sneakers', 90.00, 'Minimalist white leather sneakers that pair perfectly with everything from tailored suits to casual denim.', 'Genuine Leather', 'Use leather cleaner and conditioner regularly.', 4],
            ['Shoes', 'Leather Loafers', 150.00, 'Timeless penny loafers crafted from supple leather, featuring a cushioned footbed for exceptional all-day comfort.', 'Full Grain Leather', 'Polish regularly with matching shoe cream.', 4],
            ['Shoes', 'Platform Sneakers', 95.00, 'Elevate your everyday look with these chunky platform sneakers, combining retro aesthetics with modern comfort technology.', 'Canvas and Rubber', 'Spot clean with mild soap.', 4],
            ['Shoes', 'Minimal Slide Sandals', 45.00, 'Sleek and comfortable slide sandals with a contoured footbed, essential for warm weather and beachside vacations.', 'EVA Foam', 'Rinse with water and air dry.', 4],
            
            // ACCESSORIES (5)
            ['Accessories', 'Leather Crossbody Bag', 120.00, 'A compact yet spacious crossbody bag made from premium pebble leather, featuring secure compartments for daily essentials.', 'Pebble Leather', 'Keep away from direct heat. Use leather protector.', 4],
            ['Accessories', 'Stainless Steel Watch', 195.00, 'A sophisticated timepiece featuring a brushed stainless steel case, minimalist dial, and precise quartz movement.', 'Stainless Steel', 'Wipe with microfiber cloth. Water resistant to 30m.', 4],
            ['Accessories', 'Polarized Sunglasses', 85.00, 'Classic sunglasses updated with polarized lenses that reduce glare and provide 100% UV protection for your eyes.', 'Acetate Frame, Polycarbonate Lenses', 'Clean with provided microfiber cloth.', 4],
            ['Accessories', 'Canvas Everyday Tote', 55.00, 'A durable heavyweight canvas tote bag with reinforced handles, spacious enough for your laptop and daily necessities.', '100% Cotton Canvas', 'Spot clean only.', 4],
            ['Accessories', 'Classic Leather Belt', 40.00, 'An essential everyday belt crafted from vegetable-tanned leather, finished with a subtle brushed metal buckle.', 'Genuine Leather', 'Condition occasionally to prevent cracking.', 4],
            
            // BEAUTY (4)
            ['Beauty', 'Hydrating Face Cream', 45.00, 'A rich, deeply nourishing face cream infused with hyaluronic acid and ceramides to lock in moisture and plump the skin.', 'Water, Glycerin, Hyaluronic Acid', 'Apply daily to clean face and neck.', 3],
            ['Beauty', 'Velvet Matte Lip Color', 28.00, 'A highly pigmented liquid lipstick that delivers a comfortable, long-lasting matte finish without drying your lips.', 'Isododecane, Dimethicone', 'Store in a cool, dry place.', 3],
            ['Beauty', 'Daily Sunscreen SPF 50', 35.00, 'A lightweight, invisible broad-spectrum sunscreen that protects against UVA/UVB rays without leaving a white cast.', 'Zinc Oxide, Titanium Dioxide', 'Apply liberally 15 minutes before sun exposure.', 3],
            ['Beauty', 'Gentle Facial Cleanser', 24.00, 'A pH-balanced gel cleanser that effectively removes makeup and impurities while respecting your skin\'s natural barrier.', 'Aloe Vera, Chamomile Extract', 'Massage onto damp skin and rinse thoroughly.', 3],
            
            // ELECTRONICS (4)
            ['Electronics', 'Wireless Earbuds', 149.00, 'True wireless earbuds delivering immersive sound, active noise cancellation, and all-day battery life in a compact case.', 'Plastic and Silicone', 'Keep charging contacts clean and dry.', 3],
            ['Electronics', 'Compact Bluetooth Speaker', 89.00, 'A rugged, waterproof portable speaker that packs surprisingly powerful, room-filling sound and deep bass.', 'Rubberized Housing', 'Rinse with fresh water after exposure to chlorine.', 3],
            ['Electronics', 'Smart Fitness Band', 69.00, 'A sleek activity tracker that monitors your heart rate, sleep patterns, and daily steps to help you reach your goals.', 'Silicone Strap', 'Wipe strap with mild soap and water.', 3],
            ['Electronics', 'USB-C Fast Charger', 29.00, 'A high-speed 65W wall adapter capable of rapidly charging your laptop, tablet, or smartphone simultaneously.', 'Fire-resistant PC', 'Do not expose to liquids.', 3],
            
            // KIDS (2)
            ['Kids', 'Kids Graphic T-Shirt', 25.00, 'A soft and durable cotton t-shirt featuring a playful, vibrant graphic print that kids will love wearing every day.', '100% Organic Cotton', 'Machine wash cold. Tumble dry low.', 4],
            ['Kids', 'Kids Everyday Sneakers', 45.00, 'Comfortable and supportive sneakers with easy hook-and-loop closures, designed for active kids on the playground.', 'Synthetic Upper', 'Wipe clean with a damp cloth.', 4],
        ];

        $createdProducts = [];

        foreach ($productsData as $index => $data) {
            $catId = $catIds[$data[0]];
            
            // Randomly assign sale price for ~30% of items
            $price = $data[2];
            $salePrice = (rand(1, 10) > 7) ? round($price * 0.8, 2) : null;
            
            $product = Product::create([
                'name' => $data[1],
                'slug' => Str::slug($data[1]) . '-' . rand(100, 999),
                'short_description' => $data[3],
                'description' => $fullDescTemplate($data[1]),
                'seo_title' => $data[1] . ' | Premium Quality',
                'seo_description' => $data[3],
                'price' => $price,
                'sale_price' => $salePrice,
                'cost_price' => round($price * 0.4, 2),
                'stock' => rand(15, 120),
                'material' => $data[4],
                'care_instructions' => $data[5],
                'shipping_info' => 'Available for delivery across supported Cambodian zones. Usually ships within 1-2 business days.',
                'return_info' => 'Eligible for return within 14 days if unworn and in original condition.',
                'weight' => '0.' . rand(2, 9) . ' kg',
                'dimensions' => '30 x 20 x 5 cm',
                'category_id' => $catId,
                'brand_id' => $brandIds[array_rand($brandIds)],
                'collection_id' => $colIds[array_rand($colIds)],
                'sku' => 'SKU-' . strtoupper(Str::random(8)),
                'barcode' => '890' . rand(100000000, 999999999),
                'is_active' => true,
                'is_featured' => (rand(1, 10) > 8),
            ]);

            $createdProducts[] = $product;

            // Gallery Images (Legal Unsplash Placeholders)
            $imageCount = $data[6]; // 3 or 4
            
            $images = [
                'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80', // Watch
                'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80', // Headphones
                'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80', // Red Shoe
                'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800&q=80', // Perfume
                'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80', // White Sneaker
                'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80', // T-shirt
                'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80', // Bag
                'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80', // Graphic Tee
                'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80', // Hoodie
            ];

            shuffle($images);

            for ($i = 0; $i < $imageCount; $i++) {
                ProductImage::create([
                    'product_id' => $product->id,
                    'path' => $images[$i],
                    'alt_text' => $product->name . ' - View ' . ($i + 1),
                    'sort_order' => $i + 1,
                    'is_hover_image' => ($i === 1) // Second image is hover
                ]);
            }

            // Variants (for fashion/shoes)
            if (in_array($data[0], ['Men', 'Women', 'Shoes', 'Kids'])) {
                $sizes = ['S', 'M', 'L'];
                foreach ($sizes as $size) {
                    ProductVariant::create([
                        'product_id' => $product->id,
                        'size' => $size,
                        'color' => 'Default',
                        'stock' => rand(5, 30),
                        'sku' => $product->sku . '-' . $size,
                    ]);
                }
            }
        }

        // 6. HOMEPAGE SECTIONS
        
        $pIds = collect($createdProducts)->pluck('id')->toArray();
        shuffle($pIds);

        // 1. Hero
        HomePageSection::create([
            'type' => 'hero',
            'title' => 'Spring Collection 2026',
            'subtitle' => 'Elevate Your Everyday Style',
            'content' => json_encode([
                'discount' => 'Up to 40% Off', 
                'button_text' => 'Shop Now', 
                'link' => '/shop',
                'image' => 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80'
            ]),
            'sort_order' => 1
        ]);

        // 2. Featured Categories
        HomePageSection::create([
            'type' => 'featured_categories',
            'title' => 'Shop by Category',
            'subtitle' => 'Explore our wide range of premium collections',
            'content' => json_encode([]),
            'sort_order' => 2
        ]);

        // 3. New Arrivals (8 products)
        HomePageSection::create([
            'type' => 'new_arrivals',
            'title' => 'New Arrivals',
            'subtitle' => 'Discover the latest additions to our store',
            'content' => json_encode([
                'product_ids' => array_slice($pIds, 0, 8)
            ]),
            'sort_order' => 3
        ]);

        // 4. Shop By Gender (Banners)
        HomePageSection::create([
            'type' => 'shop_by_gender',
            'content' => json_encode([
                'men' => 'https://images.unsplash.com/photo-1516826957135-7331811a5ebf?w=800&q=80',
                'women' => 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
                'kids' => 'https://images.unsplash.com/photo-1519241047957-be31d7379a5d?w=800&q=80'
            ]),
            'sort_order' => 4
        ]);

        // 5. Promotional Split Banner
        HomePageSection::create([
            'type' => 'promo_split',
            'content' => json_encode([
                'left' => ['title' => 'Summer Sale', 'subtitle' => 'Up to 50% Off', 'image' => 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80'],
                'right' => ['title' => 'Accessories', 'subtitle' => 'Complete your look', 'image' => 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&q=80']
            ]),
            'sort_order' => 5
        ]);

        // 6. Popular Products (Tabs)
        HomePageSection::create([
            'type' => 'popular_tabs',
            'title' => 'Popular Right Now',
            'subtitle' => 'Trending styles across all categories',
            'sort_order' => 6
        ]);

        // 7. Flash Sale
        HomePageSection::create([
            'type' => 'flash_sale',
            'title' => 'Deal of the Day',
            'subtitle' => 'Hurry, offers end soon!',
            'content' => json_encode([
                'end_time' => now()->addDays(2)->toIso8601String(),
                'product_ids' => array_slice($pIds, 8, 4)
            ]),
            'sort_order' => 7
        ]);

        // 8. Featured Collection
        HomePageSection::create([
            'type' => 'featured_collection',
            'title' => 'The Office Edit',
            'subtitle' => 'Professional essentials for the modern workplace',
            'content' => json_encode([
                'image' => 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=1200&q=80',
                'product_ids' => array_slice($pIds, 12, 4)
            ]),
            'sort_order' => 8
        ]);

        // 9. Editorial Lookbook
        HomePageSection::create([
            'type' => 'lookbook',
            'title' => 'Get The Look',
            'subtitle' => 'Styled by our experts',
            'content' => json_encode([
                'image' => 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80',
                'product_ids' => array_slice($pIds, 16, 2)
            ]),
            'sort_order' => 9
        ]);

        // 10. Best Sellers
        HomePageSection::create([
            'type' => 'best_sellers',
            'title' => 'Best Sellers',
            'subtitle' => 'Our most loved items',
            'content' => json_encode([
                'product_ids' => array_slice($pIds, 18, 8)
            ]),
            'sort_order' => 10
        ]);

        // 11. Trending Products
        HomePageSection::create([
            'type' => 'trending',
            'title' => 'Trending Now',
            'sort_order' => 11
        ]);

        // 12. Recommended Products
        HomePageSection::create([
            'type' => 'recommended',
            'title' => 'Recommended For You',
            'sort_order' => 12
        ]);

        // 13. Shop by Brand
        HomePageSection::create([
            'type' => 'brands',
            'title' => 'Our Trusted Brands',
            'sort_order' => 13
        ]);

        // 14. Seasonal Promotion
        HomePageSection::create([
            'type' => 'seasonal_promo',
            'content' => json_encode([
                'title' => 'Mid-Season Clearance',
                'subtitle' => 'Extra 20% off sale items',
                'image' => 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&q=80'
            ]),
            'sort_order' => 14
        ]);

        // 15. Customer Favorites
        HomePageSection::create([
            'type' => 'customer_favorites',
            'title' => 'Customer Favorites',
            'sort_order' => 15
        ]);

        // 16. Limited Stock
        HomePageSection::create([
            'type' => 'limited_stock',
            'title' => 'Almost Gone',
            'subtitle' => 'Grab them before they sell out',
            'sort_order' => 16
        ]);

        // 17. Store Benefits
        HomePageSection::create([
            'type' => 'benefits',
            'sort_order' => 17
        ]);

        // 18. Customer Testimonials
        HomePageSection::create([
            'type' => 'testimonials',
            'title' => 'What Our Customers Say',
            'sort_order' => 18
        ]);

        // 19. Latest Blog Posts
        HomePageSection::create([
            'type' => 'blog_posts',
            'title' => 'From The Journal',
            'sort_order' => 19
        ]);

        // 20. Newsletter
        HomePageSection::create([
            'type' => 'newsletter',
            'sort_order' => 20
        ]);

        // 7. Create Static Pages
        Page::create([
            'title' => 'About Us',
            'slug' => 'about-us',
            'content' => '<p>Welcome to Pengu, your ultimate destination for premium lifestyle products.</p><p>Founded in 2026, we are dedicated to bringing you the finest selection of fashion, accessories, and electronics.</p>',
            'seo_title' => 'About Us | Pengu',
            'seo_description' => 'Learn more about Pengu and our mission.',
            'is_published' => true,
        ]);

        Page::create([
            'title' => 'Contact Us',
            'slug' => 'contact-us',
            'content' => '<p>Have a question? We are here to help!</p><p>Email: support@pengu.com<br>Phone: +855 12 345 678</p>',
            'seo_title' => 'Contact Us | Pengu',
            'seo_description' => 'Get in touch with the Pengu team.',
            'is_published' => true,
        ]);

        $postAuthor = User::firstOrCreate(
            ['email' => 'store-seeder@example.test'],
            [
                'name' => 'Store Seeder',
                'password' => null,
                'email_verified_at' => now(),
                'role' => 'admin',
                'is_admin' => true,
            ]
        );

        // 8. Create Demo Blog Posts
        for ($i = 1; $i <= 5; $i++) {
            Post::create([
                'title' => 'Fashion Trends for ' . (2025 + $i),
                'slug' => 'fashion-trends-' . (2025 + $i),
                'content' => '<p>Discover the upcoming trends that will define the next season of fashion. We explore materials, silhouettes, and must-have accessories.</p>',
                'image' => 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
                'seo_title' => 'Fashion Trends ' . (2025 + $i),
                'seo_description' => 'A deep dive into upcoming fashion trends.',
                'is_published' => true,
                'published_at' => now()->subDays($i * 2),
                'user_id' => $postAuthor->id,
            ]);
        }
    }
}
