<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$token = config('services.telegram.bot_token');
$url = "https://api.telegram.org/bot{$token}/deleteMyCommands";

$response = \Illuminate\Support\Facades\Http::post($url);
if ($response->successful()) {
    echo "SUCCESS: Bot commands menu has been removed.\n";
} else {
    echo "ERROR: " . $response->body() . "\n";
}
