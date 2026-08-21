<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\Setting;

$links = [
    [
        'id' => uniqid(),
        'name' => 'Telegram',
        'type' => 'telegram',
        'url' => '855317669555',
        'icon_url' => 'https://cdn-icons-png.flaticon.com/512/3488/3488463.png',
    ],
    [
        'id' => uniqid(),
        'name' => 'Facebook',
        'type' => 'facebook',
        'url' => 'https://m.me/MVMLogistics',
        'icon_url' => 'https://cdn-icons-png.flaticon.com/512/124/124010.png',
    ],
    [
        'id' => uniqid(),
        'name' => 'Zalo',
        'type' => 'zalo',
        'url' => '84813308055',
        'icon_url' => 'https://hidosport.vn/wp-content/uploads/2023/09/zalo-icon.png',
    ]
];

Setting::updateOrCreate(
    ['group' => 'general', 'key' => 'fab_links'],
    ['value' => json_encode($links)]
);

echo "Updated fab_links\n";
