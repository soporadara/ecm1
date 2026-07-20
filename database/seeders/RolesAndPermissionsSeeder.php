<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // 1. Create Permissions
        $permissions = [
            // Dashboard
            'dashboard.view',

            // Products
            'products.view',
            'products.create',
            'products.update',
            'products.publish',
            'products.archive',
            'products.delete',

            // Categories
            'categories.view',
            'categories.create',
            'categories.update',
            'categories.delete',

            // Inventory
            'inventory.view',
            'inventory.adjust',
            'inventory.export',

            // Orders
            'orders.view',
            'orders.update',
            'orders.update_status',
            'orders.cancel',
            'orders.refund_request',
            'orders.refund_execute',

            // Payments
            'payments.view',
            'payments.configure',
            'payments.reconcile',

            // Customers
            'customers.view',
            'customers.update',
            'customers.disable',

            // Pages
            'pages.view',
            'pages.create',
            'pages.update',
            'pages.publish',
            'pages.delete',

            // Posts
            'posts.view',
            'posts.create',
            'posts.update',
            'posts.publish',
            'posts.delete',

            // Menus
            'menus.view',
            'menus.manage',

            // Media
            'media.view',
            'media.upload',
            'media.update',
            'media.delete',

            // Themes
            'themes.view',
            'themes.customize',
            'themes.activate',

            // Promotions
            'promotions.view',
            'promotions.manage',

            // Reports
            'reports.view',
            'reports.view_financial',
            'reports.export',

            // Staff & Roles
            'staff.view',
            'staff.create',
            'staff.update',
            'staff.disable',
            'roles.view',
            'roles.create',
            'roles.update',
            'roles.delete',
            'permissions.manage',

            // Settings & Security
            'settings.view',
            'settings.update',
            'audit_logs.view',
            'backups.manage',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // 2. Create Roles and Assign Permissions

        // Super Administrator
        $superAdmin = Role::firstOrCreate(['name' => 'Super Administrator']);
        // Gets all permissions via Gate::before rule in AuthServiceProvider, but we can assign all as well:
        $superAdmin->syncPermissions(Permission::all());

        // Administrator
        $admin = Role::firstOrCreate(['name' => 'Administrator']);
        $admin->syncPermissions(Permission::whereNotIn('name', [
            'roles.delete',
            'permissions.manage',
            'backups.manage',
        ])->get());

        // Store Manager
        $storeManager = Role::firstOrCreate(['name' => 'Store Manager']);
        $storeManager->syncPermissions([
            'dashboard.view',
            'products.view', 'products.create', 'products.update', 'products.publish',
            'categories.view', 'categories.create', 'categories.update',
            'inventory.view', 'inventory.adjust',
            'orders.view', 'orders.update', 'orders.update_status', 'orders.cancel',
            'customers.view', 'customers.update',
            'promotions.view', 'promotions.manage',
            'reports.view', 'reports.export'
        ]);

        // Product Manager
        $productManager = Role::firstOrCreate(['name' => 'Product Manager']);
        $productManager->syncPermissions([
            'dashboard.view',
            'products.view', 'products.create', 'products.update', 'products.publish',
            'categories.view', 'categories.create', 'categories.update',
            'media.view', 'media.upload'
        ]);

        // Inventory Manager
        $inventoryManager = Role::firstOrCreate(['name' => 'Inventory Manager']);
        $inventoryManager->syncPermissions([
            'dashboard.view',
            'inventory.view', 'inventory.adjust', 'inventory.export'
        ]);

        // Order Manager
        $orderManager = Role::firstOrCreate(['name' => 'Order Manager']);
        $orderManager->syncPermissions([
            'dashboard.view',
            'orders.view', 'orders.update', 'orders.update_status', 'orders.cancel', 'orders.refund_request'
        ]);

        // Customer Support
        $customerSupport = Role::firstOrCreate(['name' => 'Customer Support']);
        $customerSupport->syncPermissions([
            'dashboard.view',
            'customers.view',
            'orders.view'
        ]);

        // Content Editor
        $contentEditor = Role::firstOrCreate(['name' => 'Content Editor']);
        $contentEditor->syncPermissions([
            'dashboard.view',
            'pages.view', 'pages.create', 'pages.update', 'pages.publish',
            'posts.view', 'posts.create', 'posts.update', 'posts.publish',
            'media.view', 'media.upload', 'media.update',
            'menus.view', 'menus.manage'
        ]);

        // Marketing Manager
        $marketingManager = Role::firstOrCreate(['name' => 'Marketing Manager']);
        $marketingManager->syncPermissions([
            'dashboard.view',
            'promotions.view', 'promotions.manage'
        ]);

        // Finance Manager
        $financeManager = Role::firstOrCreate(['name' => 'Finance Manager']);
        $financeManager->syncPermissions([
            'dashboard.view',
            'payments.view', 'payments.reconcile',
            'orders.refund_execute',
            'reports.view', 'reports.view_financial', 'reports.export'
        ]);

        // Analyst
        $analyst = Role::firstOrCreate(['name' => 'Analyst']);
        $analyst->syncPermissions([
            'dashboard.view',
            'reports.view', 'reports.export'
        ]);

        // Customer
        Role::firstOrCreate(['name' => 'Customer']);

        // 3. Assign Super Administrator to existing admin users
        $adminUsers = \App\Models\User::where('is_admin', true)->orWhere('role', 'superadmin')->get();
        foreach ($adminUsers as $user) {
            $user->assignRole('Super Administrator');
        }
    }
}
