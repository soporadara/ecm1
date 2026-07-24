<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    public function definition(): array
    {
        $name = fake()->unique()->words(3, true);
        $category = Category::query()->first() ?: Category::create([
            'name' => 'Test Category',
            'slug' => 'test-category',
        ]);

        return [
            'name' => $name,
            'slug' => Str::slug($name).'-'.fake()->unique()->numberBetween(1000, 9999),
            'description' => fake()->paragraph(),
            'short_description' => fake()->sentence(),
            'price' => fake()->randomFloat(2, 10, 300),
            'sale_price' => null,
            'stock' => fake()->numberBetween(1, 50),
            'category_id' => $category->id,
            'is_active' => true,
            'is_featured' => false,
        ];
    }
}
