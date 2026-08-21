<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
$request = Illuminate\Http\Request::create('/api/telegram/webhook', 'POST', [], [], [], [
    'HTTP_X-Telegram-Bot-Api-Secret-Token' => config('telegram.webhook_secret')
], json_encode([
    'update_id' => 124,
    'message' => [
        'message_id' => 1,
        'from' => ['id' => 123456],
        'chat' => ['id' => 123456],
        'text' => '/start'
    ]
]));
$request->headers->set('Content-Type', 'application/json');
$response = $app->handle($request);
echo "Status: " . $response->getStatusCode() . "\n";
echo "Content: " . $response->getContent() . "\n";
