<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'key' => env('POSTMARK_API_KEY'),
    ],

    'resend' => [
        'key' => env('RESEND_API_KEY'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    'google' => [
        'client_id' => env('GOOGLE_CLIENT_ID'),
        'client_secret' => env('GOOGLE_CLIENT_SECRET'),
        'redirect' => env('GOOGLE_REDIRECT_URI', '/auth/google/callback'),
    ],

    'firebase' => [
        'credentials_file' => env('FIREBASE_CREDENTIALS'),
    ],

    'marketplace' => [
        'import_enabled' => env('MARKETPLACE_IMPORT_ENABLED', true),
        'taobao_provider' => env('TAOBAO_PROVIDER', 'rapidapi_tmapi'),
    ],

    'rapidapi' => [
        'key' => env('RAPIDAPI_KEY'),
        'host' => env('RAPIDAPI_HOST'),
        'item_detail_url' => env('RAPIDAPI_ITEM_DETAIL_URL'),
        'item_description_url' => env('RAPIDAPI_ITEM_DESCRIPTION_URL'),
        'timeout_seconds' => env('RAPIDAPI_TIMEOUT_SECONDS', 20),
        'connect_timeout_seconds' => env('RAPIDAPI_CONNECT_TIMEOUT_SECONDS', 8),
        'retry_times' => env('RAPIDAPI_RETRY_TIMES', 2),
        'cache_minutes' => env('RAPIDAPI_CACHE_MINUTES', 60),
    ],

];
