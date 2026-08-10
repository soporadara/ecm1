<?php

require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$token = config('services.telegram.bot_token');
$username = config('services.telegram.bot_username');
$secret = config('services.telegram.webhook_secret');
$appUrl = env('APP_URL', 'https://mvmlogistics.asia');

if (!$token) {
    echo "Error: TELEGRAM_BOT_TOKEN is not configured in your .env file.\n";
    exit(1);
}

$webhookUrl = rtrim($appUrl, '/') . '/api/telegram/webhook';

echo "=== Telegram Bot Webhook Registration ===\n";
echo "Bot Username : @{$username}\n";
echo "Webhook URL  : {$webhookUrl}\n";
echo "Secret Token : " . ($secret ? "[CONFIGURED]" : "[NOT CONFIGURED]") . "\n";
echo "Connecting to Telegram API...\n";

$url = "https://api.telegram.org/bot{$token}/setWebhook";
$response = \Illuminate\Support\Facades\Http::post($url, [
    'url' => $webhookUrl,
    'secret_token' => $secret,
]);

if ($response->successful()) {
    echo "SUCCESS: Webhook has been registered successfully!\n";
    echo "Telegram Response: " . json_encode($response->json(), JSON_PRETTY_PRINT) . "\n";
} else {
    echo "ERROR: Webhook registration failed.\n";
    echo "HTTP Status      : " . $response->status() . "\n";
    echo "Telegram Response: " . $response->body() . "\n";
}
echo "=========================================\n";
