<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Post;

$posts = Post::all();
$count = 0;
foreach ($posts as $post) {
    if (!$post->image) {
        if (!empty($post->images) && count($post->images) > 0) {
            $post->update(['image' => $post->images[0]]);
            $count++;
        } elseif (!empty($post->content)) {
            preg_match('/<img[^>]+src=[\'"]([^\'"]+)[\'"][^>]*>/i', $post->content, $matches);
            if (!empty($matches[1])) {
                $images = $post->images ?? [];
                $images = array_values(array_unique(array_merge([$matches[1]], $images)));
                $post->update([
                    'image' => $matches[1],
                    'images' => $images
                ]);
                $count++;
            }
        }
    }
}
echo "Fixed {$count} posts\n";
