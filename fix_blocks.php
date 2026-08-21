<?php

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

DB::table('cms_security_blocks')->update(['released_at' => now(), 'released_by' => 1]);
DB::table('cms_login_attempts')->delete();

$superAdmin = User::updateOrCreate(
    ['email' => 'superadmin@mvmlogistics.asia'],
    [
        'name' => 'Super Admin',
        'password' => Hash::make('password123'),
        'is_admin' => true,
        'role' => 'super_admin',
        'account_status' => 'active',
        'must_change_password' => false,
    ]
);

echo "Cleared blocks. Super admin created: superadmin@mvmlogistics.asia / password123\n";
