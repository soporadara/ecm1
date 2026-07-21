<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RolesAndPermissionsSeeder::class,
        ]);

        // Create an Admin user
        $admin = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'),
            'is_admin' => true,
            'role' => 'superadmin',
        ]);
        $admin->assignRole('Super Administrator');

        // Create a regular user
        $customer = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
            'is_admin' => false,
            'role' => 'customer',
        ]);
        $customer->assignRole('Customer');

        $this->call([
            StoreSeeder::class,
            FeatureFlagSeeder::class,
            MarketplaceSeeder::class,
        ]);
    }
}
