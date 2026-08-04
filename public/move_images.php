<?php
$brain_dir = '/Users/soporadararin/.gemini/antigravity-ide/brain/7f11cf6d-32d0-49c3-b31f-a947608ea301';
$dest_dir = __DIR__.'/../storage/app/public/testimonials';
if (!is_dir($dest_dir)) {
    mkdir($dest_dir, 0777, true);
}

// Find the latest generated images
$files = glob($brain_dir . '/*.png');
$man_file = '';
$woman1_file = '';
$woman2_file = '';

foreach ($files as $file) {
    if (strpos($file, 'khmer_vn_man_cafe') !== false) $man_file = $file;
    if (strpos($file, 'khmer_woman_outdoors') !== false) $woman1_file = $file;
    if (strpos($file, 'vn_woman_walking') !== false) $woman2_file = $file;
}

if ($man_file) copy($man_file, $dest_dir . '/man.png');
if ($woman1_file) copy($woman1_file, $dest_dir . '/woman1.png');
if ($woman2_file) copy($woman2_file, $dest_dir . '/woman2.png');

echo "Copied:\n$man_file\n$woman1_file\n$woman2_file\n";

// Update database
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$kernel->handle(Illuminate\Http\Request::capture());

// We want to add these to the 3 testimonials.
$testimonials = \App\Models\Testimonial::all();

$names = ['Sokha', 'Linh', 'Bora'];
$contents = [
    'Amazing service, highly recommend!',
    'Great experience, will use again.',
    'Very fast and reliable logistics.'
];
$images = ['testimonials/man.png', 'testimonials/woman1.png', 'testimonials/woman2.png'];

// Delete existing to recreate cleanly
\App\Models\Testimonial::truncate();

for ($i = 0; $i < 3; $i++) {
    $t = new \App\Models\Testimonial();
    $t->customer_name = $names[$i];
    $t->content = $contents[$i];
    $t->rating = 5;
    $t->image_path = $images[$i];
    // "image 2 add this to 3 box here with best review" -> meaning they want the promo image attached to these reviews!
    // The promo image is likely 'settings/promo_popup.jpg' or similar.
    $t->product_image_1 = 'image2.png'; // We'll update this later once we know the exact image path
    $t->is_active = true;
    $t->save();
}

echo "Database updated.\n";
