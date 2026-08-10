<?php

require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$token = config('services.telegram.bot_token');

if (!$token) {
    echo "Error: TELEGRAM_BOT_TOKEN is not configured in your .env file.\n";
    exit(1);
}

echo "=== Setting up Telegram Bot Commands Menu ===\n";
echo "Connecting to Telegram API...\n";

$url = "https://api.telegram.org/bot{$token}/setMyCommands";

$commands = [
    [
        'command' => 'start',
        'description' => 'Start the bot and log in'
    ],
    [
        'command' => 'faq',
        'description' => 'View Frequently Asked Questions'
    ],
    [
        'command' => 'help',
        'description' => 'Get help'
    ]
];

$response = \Illuminate\Support\Facades\Http::post($url, [
    'commands' => $commands
]);

if ($response->successful()) {
    echo "SUCCESS: Bot commands menu has been set successfully!\n";
    echo "Now users will see a 'Menu' button next to the chat input in Telegram.\n";
} else {
    echo "ERROR: Failed to set bot commands.\n";
    echo "HTTP Status      : " . $response->status() . "\n";
    echo "Telegram Response: " . $response->body() . "\n";
}
echo "=============================================\n";
