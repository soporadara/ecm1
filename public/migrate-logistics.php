<?php
/**
 * Web-accessible migration runner for XAMPP local development.
 * Visit: http://localhost/eco1/public/migrate-logistics.php
 * DELETE THIS FILE after running — never deploy to production.
 */

// Basic secret to prevent accidental public access
$secret = $_GET['key'] ?? '';
if ($secret !== 'logistics2026') {
    http_response_code(403);
    echo '<h2>Forbidden</h2><p>Pass ?key=logistics2026 to run.</p>';
    exit;
}

// Bootstrap Laravel
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$pdo = null;

try {
    $capsule = new \Illuminate\Database\Capsule\Manager;
    $config  = $app->make('config')->get('database.connections.mysql');
    $capsule->addConnection($config);
    $capsule->setAsGlobal();
    $capsule->bootEloquent();

    // Use Artisan to run migrations and seeders
    $artisan = $app->make(Illuminate\Contracts\Console\Kernel::class);
    $app->instance('request', \Illuminate\Http\Request::capture());
    $artisan->bootstrap();

    echo '<pre style="font-family:monospace;background:#111;color:#0f0;padding:2rem;border-radius:8px;">';
    echo "=== Logistics Platform Migration Runner ===\n\n";

    // Run migrations
    echo "Running: php artisan migrate --force\n";
    $exitCode = Artisan::call('migrate', ['--force' => true]);
    echo Artisan::output();
    echo "Exit code: $exitCode\n\n";

    // Run seeders
    echo "Running: php artisan db:seed --class=FeatureFlagSeeder --force\n";
    Artisan::call('db:seed', ['--class' => 'Database\\Seeders\\FeatureFlagSeeder', '--force' => true]);
    echo Artisan::output();

    echo "Running: php artisan db:seed --class=MarketplaceSeeder --force\n";
    Artisan::call('db:seed', ['--class' => 'Database\\Seeders\\MarketplaceSeeder', '--force' => true]);
    echo Artisan::output();

    // Clear caches
    echo "Running: php artisan optimize:clear\n";
    Artisan::call('optimize:clear');
    echo Artisan::output();

    echo "\n✅ Done! You can now delete this file.\n";
    echo '</pre>';

} catch (\Exception $e) {
    echo '<pre style="color:red;background:#1a0000;padding:2rem;border-radius:8px;">';
    echo "❌ Error: " . htmlspecialchars($e->getMessage()) . "\n\n";
    echo htmlspecialchars($e->getTraceAsString());
    echo '</pre>';
}
