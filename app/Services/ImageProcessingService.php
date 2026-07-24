<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver; // or Imagick depending on server
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageProcessingService
{
    protected $manager;

    public function __construct()
    {
        $this->manager = new ImageManager(new Driver());
    }

    /**
     * Process an uploaded image, convert to webp and store it.
     */
    public function processAndStore(UploadedFile $file, string $directory = 'order-images'): array
    {
        // Limit dimensions
        $maxWidth = 1920;
        $maxHeight = 1080;
        $quality = 80;

        $image = $this->manager->read($file->getRealPath());

        // Resize proportionally if larger than max dimensions
        $image->scaleDown(width: $maxWidth, height: $maxHeight);

        $filename = Str::random(40) . '.webp';
        $path = $directory . '/' . $filename;

        // Encode as WebP
        $encoded = $image->toWebp($quality);

        // Store
        Storage::disk('public')->put($path, $encoded->toString());

        // Create Thumbnail
        $thumb = clone $image;
        $thumb->scaleDown(width: 300, height: 300);
        $thumbPath = $directory . '/thumbnails/' . $filename;
        Storage::disk('public')->put($thumbPath, $thumb->toWebp($quality)->toString());

        return [
            'path' => $path,
            'thumbnail_path' => $thumbPath,
            'mime_type' => 'image/webp',
            'size_bytes' => strlen($encoded->toString()),
            'width' => $image->width(),
            'height' => $image->height(),
            'original_filename' => $file->getClientOriginalName(),
            'original_mime_type' => $file->getMimeType(),
        ];
    }
}
