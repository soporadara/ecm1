<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://mvmlogistics.asia/sitemap.xml");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)');
$output = curl_exec($ch);
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);
echo "HTTP Status: $httpcode\n";
echo "Response:\n$output\n";
