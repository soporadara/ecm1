<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'Long Sleeve Tops',
                'slug' => 'long-sleeve-tops',
                'description' => 'Beautiful long sleeve tops for everyday wear.',
                'price' => 85.50,
                'sale_price' => 70.30,
                'stock' => 10,
                'images' => json_encode(['https://images.unsplash.com/photo-1434389673669-e08b4cac3105?w=500&q=80']),
            ],
            [
                'name' => 'White Wedding Shoe',
                'slug' => 'white-wedding-shoe',
                'description' => 'Elegant white shoes perfect for weddings.',
                'price' => 150.20,
                'sale_price' => 120.50,
                'stock' => 5,
                'images' => json_encode(['https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80']),
            ],
            [
                'name' => 'Long Chain With Locket',
                'slug' => 'long-chain-with-locket',
                'description' => 'A stylish golden chain with a locket.',
                'price' => 85.50,
                'sale_price' => 70.30,
                'stock' => 15,
                'images' => json_encode(['https://images.unsplash.com/photo-1599643478524-fb66f7cae625?w=500&q=80']),
            ],
            [
                'name' => 'Winter Jacket',
                'slug' => 'winter-jacket',
                'description' => 'Keep warm with this premium winter jacket.',
                'price' => 100.50,
                'sale_price' => 80.30,
                'stock' => 20,
                'images' => json_encode(['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80']),
            ],
        ];

        foreach ($products as $product) {
            \App\Models\Product::create($product);
        }
    }
}
