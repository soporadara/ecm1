<?php

return [
    'enabled' => env('TELEGRAM_BOT_ENABLED', true),
    'bot_token' => env('TELEGRAM_BOT_TOKEN', ''),
    'bot_username' => env('TELEGRAM_BOT_USERNAME', ''),
    'webhook_secret' => env('TELEGRAM_WEBHOOK_SECRET', ''),
    'admin_notifications_enabled' => env('TELEGRAM_ADMIN_NOTIFICATIONS', true),
    'admin_chat_id' => env('TELEGRAM_ADMIN_CHAT_ID', null),
    'customer_notifications_enabled' => env('TELEGRAM_CUSTOMER_NOTIFICATIONS', true),
];
