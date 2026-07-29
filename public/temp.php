<?php

require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$response = $kernel->handle(
    $request = Illuminate\Http\Request::capture()
);

$exists = \Illuminate\Support\Facades\Schema::hasTable('user_addresses');
echo "Has table user_addresses: " . ($exists ? 'Yes' : 'No') . "\n";
echo "Migrations:\n";
print_r(\Illuminate\Support\Facades\DB::table('migrations')->pluck('migration')->toArray());
