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
            'receipts.view',

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

            // Logistics CMS content modules
            'banners.view',
            'banners.manage',
            'available_sites.view',
            'available_sites.manage',
            'popups.view',
            'popups.manage',

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

            // Team Notes & Testimonials
            'team_notes.view',
            'testimonials.view',

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

        // Administrator: broad daily control, but no staff/role/security ownership.
        $admin = Role::firstOrCreate(['name' => 'Administrator']);
        $admin->syncPermissions(Permission::whereNotIn('name', [
            'staff.view',
            'staff.create',
            'staff.update',
            'staff.disable',
            'roles.view',
            'roles.create',
            'roles.update',
            'roles.delete',
            'permissions.manage',
            'backups.manage',
            'audit_logs.view',
        ])->get());

        // Logistics
        $orderManager = Role::firstOrCreate(['name' => 'Logistics']);
        $orderManager->syncPermissions([
            'dashboard.view',
            'customers.view',
            'orders.view', 'orders.update', 'orders.update_status',
            'reports.view',
            'team_notes.view',
            'banners.view', 'banners.manage',
            'testimonials.view',
            'popups.view', 'popups.manage',
            'receipts.view',
        ]);

        // Customer
        Role::firstOrCreate(['name' => 'Customer']);

        // 3. Assign Super Administrator to existing admin users
        $adminUsers = \App\Models\User::where('is_admin', true)->orWhere('role', 'superadmin')->get();
        foreach ($adminUsers as $user) {
            if ($user->hasRole('Super Administrator')) {
                $user->forceFill(['role' => 'super_admin', 'is_admin' => true])->save();
                continue;
            }

            $user->assignRole('Administrator');
            $user->forceFill(['role' => 'admin', 'is_admin' => true])->save();
        }

        $roleAliases = [
            'Store Manager' => 'Administrator',
            'Product Manager' => 'Content Manager',
            'Inventory Manager' => 'Logistics',
            'Order Manager' => 'Logistics',
            'Customer Support' => 'Support',
            'Content Editor' => 'Content Manager',
            'Marketing Manager' => 'Content Manager',
            'Finance Manager' => 'Administrator',
            'Analyst' => 'Support',
        ];

        foreach ($roleAliases as $oldRole => $newRole) {
            $role = Role::where('name', $oldRole)->first();
            if (!$role) {
                continue;
            }

            foreach ($role->users as $user) {
                $user->removeRole($oldRole);
                $user->assignRole($newRole);
            }

            $role->delete();
        }
    }
}
