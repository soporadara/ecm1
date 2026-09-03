<?php

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$response = $kernel->handle(
    $request = Illuminate\Http\Request::create('/sitemap.xml', 'GET')
);

file_put_contents('test-sitemap-output.html', $response->getContent());
echo "Saved to test-sitemap-output.html";
