<?php
require __DIR__ . '/vendor/autoload.php';
file_put_contents('.env.test', 'TELEGRAM_WEBHOOK_SECRET="mvm_nheww_dara_nvmvm_ngawwy_grape"' . "\n");
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__, '.env.test');
$dotenv->load();
echo "Parsed: " . $_ENV['TELEGRAM_WEBHOOK_SECRET'] . "\n";
