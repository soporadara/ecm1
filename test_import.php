<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

$request = Illuminate\Http\Request::create('/logistics/import', 'POST', [
    'url' => 'https://item.taobao.com/item.htm?id=12345'
]);
$request->headers->set('X-Inertia', 'true');
$request->headers->set('Accept', 'application/json');

$response = $kernel->handle($request);

echo "Status: " . $response->getStatusCode() . "\n";
echo "Content: \n" . substr($response->getContent(), 0, 500) . "\n";
