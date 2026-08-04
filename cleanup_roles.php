<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Artisan;

echo "Cleaning up roles...\n";

// Clear cache
app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

// Add missing permissions for logistics
Permission::firstOrCreate(['name' => 'team_notes.view']);
Permission::firstOrCreate(['name' => 'testimonials.view']);

// Migrate users
$users = User::all();
foreach ($users as $user) {
    if ($user->hasRole('Support') || $user->hasRole('Content Manager')) {
        $user->removeRole('Support');
        $user->removeRole('Content Manager');
        $user->assignRole('Logistics');
        $user->forceFill(['role' => 'logistic'])->save();
        echo "Migrated user ID {$user->id} to Logistics\n";
    }
}

// Delete roles
if ($r = Role::where('name', 'Support')->first()) $r->delete();
if ($r = Role::where('name', 'Content Manager')->first()) $r->delete();

// Run seeder to ensure proper permissions are set up
Artisan::call('db:seed', ['--class' => 'RolesAndPermissionsSeeder']);
echo "Seeder run completed.\n";

echo "Done.\n";
