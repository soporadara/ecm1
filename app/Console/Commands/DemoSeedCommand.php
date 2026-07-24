<?php

namespace App\Console\Commands;

use App\Models\Banner;
use App\Models\Media;
use App\Models\Order;
use App\Models\OrderAttachment;
use App\Models\OrderImage;
use App\Models\OrderItem;
use App\Models\OrderItemUrl;
use App\Models\OrderMessage;
use App\Models\OrderStatusHistory;
use App\Models\Popup;
use App\Models\Receipt;
use App\Models\User;
use App\Services\ImageProcessingService;
use Illuminate\Console\Command;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Role;

class DemoSeedCommand extends Command
{
    protected $signature = 'demo:seed {--fresh : Remove existing demo rows before seeding}';

    protected $description = 'Seed development-only demo customers, CMS users, manual orders, assets, banners, and available sites.';

    private string $batchId = 'manual-order-demo-v1';

    public function handle(ImageProcessingService $images): int
    {
        if (app()->environment('production')) {
            $this->error('Production rejected. Demo credentials and records are development-only.');
            return self::FAILURE;
        }

        if ($this->option('fresh')) {
            $this->call('demo:reset');
        }

        $this->call('db:seed', [
            '--class' => \Database\Seeders\RolesAndPermissionsSeeder::class,
            '--force' => true,
        ]);

        DB::transaction(function () use ($images) {
            $customers = $this->seedCustomers();
            $staff = $this->seedStaff();
            $assets = $this->seedAssets($images, $staff['superadmin']);
            $this->seedOrders($customers, $staff['admin'], $assets);
            $this->seedBanners($assets['banner_media']);
            $this->seedPopup($assets['popup_path']);
            $this->seedSettings();
        });

        $this->call('db:seed', [
            '--class' => \Database\Seeders\MarketplaceSeeder::class,
            '--force' => true,
        ]);

        $this->printCredentials();

        return self::SUCCESS;
    }

    private function seedCustomers(): array
    {
        $sokha = User::updateOrCreate(
            ['email' => 'sokha.customer@example.test'],
            [
                'name' => 'Sokha Test Customer',
                'contact_email' => 'sokha.customer@example.test',
                'password' => null,
                'is_admin' => false,
                'role' => 'customer',
                'firebase_uid' => 'demo-sokha-google-uid',
                'firebase_provider' => 'google',
                'customer_code' => 'CUS-TEST-KH-0001',
                'authentication_provider' => 'google',
                'preferred_locale' => 'km',
                'preferred_language' => 'km',
                'preferred_currency' => 'USD',
                'phone_e164' => '+85512345678',
                'telegram_username' => '@sokha_test',
                'address_line_1' => 'No. 25, Street 271',
                'address_line_2' => 'Sangkat Toul Tom Poung 2',
                'city' => 'Phnom Penh',
                'province' => 'Khan Chamkarmon',
                'country_code' => 'KH',
                'address_notes' => 'Cambodia',
                'account_status' => 'active',
                'profile_completed_at' => now(),
                'is_demo' => true,
                'demo_batch_id' => $this->batchId,
            ]
        );

        $nguyen = User::updateOrCreate(
            ['email' => 'nguyen.customer@example.test'],
            [
                'name' => 'Nguyen An Test Customer',
                'contact_email' => 'nguyen.customer@example.test',
                'password' => null,
                'is_admin' => false,
                'role' => 'customer',
                'firebase_uid' => 'demo-nguyen-google-uid',
                'firebase_provider' => 'google',
                'customer_code' => 'CUS-TEST-VN-0002',
                'authentication_provider' => 'google',
                'preferred_locale' => 'vi',
                'preferred_language' => 'vi',
                'preferred_currency' => 'VND',
                'phone_e164' => '+84912345678',
                'telegram_username' => '@nguyen_test',
                'address_line_1' => '125 Nguyen Hue Street',
                'address_line_2' => 'Ben Nghe Ward',
                'city' => 'Ho Chi Minh City',
                'province' => 'District 1',
                'country_code' => 'VN',
                'address_notes' => 'Vietnam',
                'account_status' => 'active',
                'profile_completed_at' => now(),
                'is_demo' => true,
                'demo_batch_id' => $this->batchId,
            ]
        );

        $sokha->syncRoles(['Customer']);
        $nguyen->syncRoles(['Customer']);

        return compact('sokha', 'nguyen');
    }

    private function seedStaff(): array
    {
        $superRole = Role::firstOrCreate(['name' => 'Super Administrator']);
        $adminRole = Role::firstOrCreate(['name' => 'Administrator']);

        $superadmin = User::updateOrCreate(
            ['email' => 'superadmin@example.test'],
            [
                'name' => 'Demo Super Admin',
                'password' => Hash::make('SuperAdmin@12345'),
                'is_admin' => true,
                'role' => 'super_admin',
                'account_status' => 'active',
                'authentication_provider' => 'password',
                'preferred_locale' => 'km',
                'preferred_language' => 'km',
                'preferred_currency' => 'USD',
                'is_demo' => true,
                'demo_batch_id' => $this->batchId,
            ]
        );

        $admin = User::updateOrCreate(
            ['email' => 'admin@example.test'],
            [
                'name' => 'Demo Logistics Admin',
                'password' => Hash::make('Admin@12345'),
                'is_admin' => true,
                'role' => 'admin',
                'account_status' => 'active',
                'authentication_provider' => 'password',
                'preferred_locale' => 'km',
                'preferred_language' => 'km',
                'preferred_currency' => 'USD',
                'is_demo' => true,
                'demo_batch_id' => $this->batchId,
            ]
        );

        $superadmin->syncRoles([$superRole->name]);
        $admin->syncRoles([$adminRole->name]);

        return compact('superadmin', 'admin');
    }

    private function seedAssets(ImageProcessingService $images, User $uploader): array
    {
        $imageSpecs = [
            'running-shoes' => ['Running shoes demo product', [255, 76, 59]],
            'backpack' => ['Travel backpack demo product', [2, 29, 53]],
            'keyboard' => ['Mechanical keyboard demo product', [39, 174, 96]],
            'water-bottle' => ['Water bottle demo product', [52, 152, 219]],
            'usb-c-cable' => ['USB-C cable demo product', [155, 89, 182]],
            'bluetooth-speaker' => ['Bluetooth speaker demo product', [244, 162, 89]],
            'banner-manual-order' => ['Demo banner manual order', [255, 76, 59]],
            'banner-sourcing' => ['Demo banner sourcing', [2, 29, 53]],
            'banner-tracking' => ['Demo banner tracking', [33, 150, 136]],
            'banner-uploads' => ['Demo banner uploads', [118, 75, 162]],
            'banner-support' => ['Demo banner support', [17, 24, 39]],
            'popup-manual-order' => ['Demo popup manual order', [255, 76, 59]],
        ];

        $processed = [];
        foreach ($imageSpecs as $key => [$label, $rgb]) {
            $png = $this->makeDemoPng($key, $rgb);
            $uploaded = new UploadedFile($png, "{$key}.png", 'image/png', null, true);
            $result = $images->processAndStore($uploaded, str_starts_with($key, 'banner') || str_starts_with($key, 'popup') ? 'demo-banners' : 'demo-order-images');

            $media = Media::updateOrCreate(
                ['path' => $result['path']],
                [
                    'name' => $label,
                    'file_name' => basename($result['path']),
                    'mime_type' => $result['mime_type'],
                    'size' => $result['size_bytes'],
                    'alt' => $label,
                    'user_id' => $uploader->id,
                    'is_demo' => true,
                    'demo_batch_id' => $this->batchId,
                ]
            );

            $processed[$key] = $result + ['media' => $media];
        }

        $pdfs = [
            'demo-size-guide.pdf' => 'Demo Size Guide',
            'demo-product-specification.pdf' => 'Demo Product Specification',
        ];

        foreach ($pdfs as $file => $title) {
            $path = "demo-attachments/{$file}";
            Storage::disk('local')->put($path, $this->makePdf($title));
            $processed[$file] = [
                'path' => $path,
                'filename' => $file,
                'mime_type' => 'application/pdf',
                'size_bytes' => Storage::disk('local')->size($path),
            ];
        }

        return [
            'images' => $processed,
            'banner_media' => [
                $processed['banner-manual-order']['media'],
                $processed['banner-sourcing']['media'],
                $processed['banner-tracking']['media'],
                $processed['banner-uploads']['media'],
                $processed['banner-support']['media'],
            ],
            'popup_path' => $processed['popup-manual-order']['path'],
            'pdfs' => [
                $processed['demo-size-guide.pdf'],
                $processed['demo-product-specification.pdf'],
            ],
        ];
    }

    private function seedOrders(array $customers, User $admin, array $assets): void
    {
        $this->createOrder($customers['sokha'], $admin, $assets, [
            'order_number' => 'ORD-TEST-KH-0001',
            'currency' => 'USD',
            'status' => 'processing',
            'payment_status' => 'partially_paid',
            'purchase_readiness' => 'purchased',
            'subtotal' => 7800,
            'logistics_fee' => 1100,
            'service_fee' => 300,
            'delivery_fee' => 400,
            'discount' => 200,
            'final_total' => 9400,
            'amount_paid' => 2500,
            'outstanding' => 6900,
            'note' => 'Deposit received. Products are being purchased and consolidated.',
            'items' => [
                ['name' => "Women's Running Shoes", 'qty' => 2, 'price' => 3000, 'image' => 'running-shoes', 'url' => 'https://example.test/products/running-shoes', 'variant' => 'White / Size 38'],
                ['name' => 'Travel Backpack', 'qty' => 1, 'price' => 1800, 'image' => 'backpack', 'url' => 'https://example.test/products/travel-backpack', 'variant' => 'Black / 35L'],
            ],
        ]);

        $completed = $this->createOrder($customers['sokha'], $admin, $assets, [
            'order_number' => 'ORD-TEST-KH-0002',
            'currency' => 'USD',
            'status' => 'delivered',
            'payment_status' => 'paid',
            'purchase_readiness' => 'purchased',
            'subtotal' => 5200,
            'logistics_fee' => 800,
            'service_fee' => 0,
            'delivery_fee' => 300,
            'discount' => 0,
            'final_total' => 6300,
            'amount_paid' => 6300,
            'outstanding' => 0,
            'note' => 'Completed and receipt generated.',
            'items' => [
                ['name' => 'Wireless Mechanical Keyboard', 'qty' => 1, 'price' => 5200, 'image' => 'keyboard', 'url' => 'https://example.test/products/mechanical-keyboard', 'variant' => 'Brown switch'],
            ],
        ]);

        Receipt::updateOrCreate(
            ['receipt_number' => 'RCP-TEST-KH-0001'],
            [
                'order_id' => $completed->id,
                'user_id' => $customers['sokha']->id,
                'snapshot_json' => ['order_number' => 'ORD-TEST-KH-0002', 'currency' => 'USD'],
                'subtotal' => 5200,
                'charges' => 1100,
                'discount' => 0,
                'total' => 6300,
                'payment_status' => 'paid',
                'generated_by' => $admin->id,
                'pdf_path' => $assets['pdfs'][1]['path'],
                'is_demo' => true,
                'demo_batch_id' => $this->batchId,
            ]
        );

        $this->createOrder($customers['nguyen'], $admin, $assets, [
            'order_number' => 'ORD-TEST-VN-0001',
            'currency' => 'VND',
            'status' => 'pending_review',
            'payment_status' => 'unpaid',
            'purchase_readiness' => 'not_ready',
            'subtotal' => null,
            'logistics_fee' => null,
            'service_fee' => null,
            'delivery_fee' => null,
            'discount' => null,
            'final_total' => null,
            'amount_paid' => 0,
            'outstanding' => null,
            'note' => 'Pricing and logistics fee are pending confirmation.',
            'items' => [
                ['name' => 'Stainless Steel Water Bottle', 'qty' => 3, 'price' => null, 'image' => 'water-bottle', 'url' => 'https://example.test/products/water-bottle', 'variant' => '750ml'],
                ['name' => 'USB-C Charging Cable', 'qty' => 5, 'price' => null, 'image' => 'usb-c-cable', 'url' => 'https://example.test/products/usb-c-cable', 'variant' => '1m'],
            ],
        ]);

        $this->createOrder($customers['nguyen'], $admin, $assets, [
            'order_number' => 'ORD-TEST-VN-0002',
            'currency' => 'VND',
            'status' => 'delayed',
            'payment_status' => 'unpaid',
            'purchase_readiness' => 'ready',
            'subtotal' => 1200000,
            'logistics_fee' => 180000,
            'service_fee' => 100000,
            'delivery_fee' => 50000,
            'discount' => 0,
            'final_total' => 1530000,
            'amount_paid' => 0,
            'outstanding' => 1530000,
            'note' => 'Supplier shipment was delayed. Updated delivery date has been added.',
            'items' => [
                ['name' => 'Portable Bluetooth Speaker', 'qty' => 2, 'price' => 600000, 'image' => 'bluetooth-speaker', 'url' => 'https://example.test/products/bluetooth-speaker', 'variant' => 'Blue'],
            ],
            'estimated_delivery_at' => now()->addDays(12),
        ]);
    }

    private function createOrder(User $customer, User $admin, array $assets, array $data): Order
    {
        $final = $data['final_total'];
        $order = Order::updateOrCreate(
            ['order_number' => $data['order_number']],
            [
                'user_id' => $customer->id,
                'customer_code_snapshot' => $customer->customer_code,
                'customer_name_snapshot' => $customer->name,
                'customer_email_snapshot' => $customer->email,
                'customer_phone_snapshot' => $customer->phone_e164,
                'delivery_address_snapshot' => trim(implode("\n", array_filter([$customer->address_line_1, $customer->address_line_2, $customer->province, $customer->city, $customer->address_notes]))),
                'status' => $data['status'],
                'pricing_status' => $final === null ? 'pricing_review' : 'pricing_ready',
                'currency_code' => $data['currency'],
                'payment_status' => $data['payment_status'],
                'purchase_readiness' => $data['purchase_readiness'] ?? 'not_ready',
                'subtotal' => $data['subtotal'] ?? 0,
                'logistics_fee' => $data['logistics_fee'],
                'service_charge' => $data['service_fee'] ?? 0,
                'delivery_charge' => $data['delivery_fee'] ?? 0,
                'discount' => $data['discount'] ?? 0,
                'estimated_total' => $final,
                'final_total' => $final,
                'total_amount' => $final ?? 0,
                'subtotal_amount' => $data['subtotal'],
                'logistics_fee_amount' => $data['logistics_fee'],
                'service_fee_amount' => $data['service_fee'],
                'delivery_fee_amount' => $data['delivery_fee'],
                'discount_amount' => $data['discount'],
                'estimated_total_amount' => $final,
                'final_total_amount' => $final,
                'amount_paid' => $data['amount_paid'],
                'outstanding_amount' => $data['outstanding'] ?? 0,
                'shipping_address' => $customer->address_line_1 ?: 'Demo address',
                'shipping_city' => $customer->city ?: 'Demo city',
                'shipping_phone' => $customer->phone_e164 ?: '+85512345678',
                'preferred_contact_method' => 'telegram',
                'customer_visible_note' => $data['note'],
                'pricing_notes' => 'Demo internal pricing snapshot.',
                'assigned_to' => $admin->id,
                'created_by' => $customer->id,
                'updated_by' => $admin->id,
                'submitted_at' => now()->subDays(7),
                'estimated_delivery_at' => $data['estimated_delivery_at'] ?? now()->addDays(7),
                'is_demo' => true,
                'demo_batch_id' => $this->batchId,
            ]
        );

        $order->items()->delete();
        $order->images()->delete();
        $order->attachments()->delete();
        $order->statusHistories()->delete();
        $order->messages()->delete();

        foreach ($data['items'] as $index => $itemData) {
            $unit = $itemData['price'];
            $item = OrderItem::create([
                'order_id' => $order->id,
                'product_name' => $itemData['name'],
                'description' => "Demo {$itemData['name']} with customer-selected attributes.",
                'variant' => $itemData['variant'],
                'quantity' => $itemData['qty'],
                'price' => $unit ?? 0,
                'estimated_unit_price' => $unit,
                'final_unit_price' => $unit,
                'line_total' => $unit === null ? null : $unit * $itemData['qty'],
                'customer_notes' => 'Demo customer note for product sourcing.',
                'admin_notes' => 'Demo internal product note.',
                'sort_order' => $index,
                'is_demo' => true,
                'demo_batch_id' => $this->batchId,
            ]);

            OrderItemUrl::create([
                'order_item_id' => $item->id,
                'url' => $itemData['url'],
                'domain' => parse_url($itemData['url'], PHP_URL_HOST) ?: 'example.test',
                'sort_order' => 0,
                'is_demo' => true,
                'demo_batch_id' => $this->batchId,
            ]);

            $processed = $assets['images'][$itemData['image']];
            OrderImage::create([
                'order_id' => $order->id,
                'order_item_id' => $item->id,
                'uploaded_by' => $customer->id,
                'original_filename' => $processed['original_filename'],
                'stored_filename' => basename($processed['path']),
                'disk' => 'public',
                'path' => $processed['path'],
                'thumbnail_path' => $processed['thumbnail_path'],
                'mime_type' => $processed['mime_type'],
                'original_mime_type' => $processed['original_mime_type'],
                'size_bytes' => $processed['size_bytes'],
                'width' => $processed['width'],
                'height' => $processed['height'],
                'sort_order' => $index,
                'is_demo' => true,
                'demo_batch_id' => $this->batchId,
            ]);
        }

        foreach ($assets['pdfs'] as $pdf) {
            OrderAttachment::create([
                'order_id' => $order->id,
                'uploaded_by' => $customer->id,
                'attachment_type' => 'pdf',
                'original_filename' => $pdf['filename'],
                'stored_filename' => $pdf['filename'],
                'disk' => 'local',
                'path' => $pdf['path'],
                'mime_type' => $pdf['mime_type'],
                'size_bytes' => $pdf['size_bytes'],
                'is_demo' => true,
                'demo_batch_id' => $this->batchId,
            ]);
        }

        foreach (['pending_review', 'pricing_ready', $data['status']] as $status) {
            OrderStatusHistory::create([
                'order_id' => $order->id,
                'to_status' => $status,
                'public_message' => $status === $data['status'] ? $data['note'] : "Demo order moved to {$status}.",
                'internal_note' => $status === 'delayed' ? 'Supplier shipment was delayed.' : 'Demo internal status history note.',
                'changed_by' => $admin->id,
                'estimated_delivery_at' => $data['estimated_delivery_at'] ?? null,
                'customer_notified_at' => now(),
                'is_demo' => true,
                'demo_batch_id' => $this->batchId,
            ]);
        }

        OrderMessage::create([
            'order_id' => $order->id,
            'sender_id' => $admin->id,
            'message' => $data['note'],
            'visibility' => 'public',
            'is_demo' => true,
            'demo_batch_id' => $this->batchId,
        ]);

        OrderMessage::create([
            'order_id' => $order->id,
            'sender_id' => $admin->id,
            'message' => 'Private internal demo note for CMS staff only.',
            'visibility' => 'internal',
            'is_demo' => true,
            'demo_batch_id' => $this->batchId,
        ]);

        return $order;
    }

    private function seedBanners(array $media): void
    {
        $data = [
            ['Create a Manual Order', 'Upload links, images, PDFs, sizes, colors, and delivery details.', 'dark'],
            ['Product Sourcing Made Simple', 'Our team reviews your request and confirms product and logistics costs.', 'light'],
            ['Professional Logistics Support', 'Follow pending review, pricing, purchasing, shipping, delayed, and completed statuses.', 'dark'],
            ['Track Your Order Progress', 'Send exactly what you need and follow updates inside My Orders.', 'light'],
        ];

        Banner::where('demo_batch_id', $this->batchId)
            ->whereNotIn('internal_name', collect($data)->keys()->map(fn ($index) => "demo-banner-{$index}")->all())
            ->delete();

        foreach ($data as $index => [$title, $description, $headerTheme]) {
            Banner::updateOrCreate(
                ['internal_name' => "demo-banner-{$index}"],
                [
                    'title_en' => $title,
                    'title_km' => $title,
                    'description_en' => $description,
                    'description_km' => $description,
                    'primary_button_label' => 'Create Manual Order',
                    'primary_button_url' => '/manual-order',
                    'secondary_button_label' => 'Contact',
                    'secondary_button_url' => '/contact',
                    'desktop_media_id' => $media[$index]->id,
                    'mobile_media_id' => $media[$index]->id,
                    'fallback_color' => $headerTheme === 'light' ? '#f8fafc' : '#021d35',
                    'text_position' => $index % 2 === 0 ? 'left' : 'center',
                    'content_alignment' => 'center',
                    'theme_variant' => $headerTheme === 'light' ? 'dark' : 'light',
                    'header_theme' => $headerTheme,
                    'is_active' => true,
                    'sort_order' => $index + 1,
                    'is_demo' => true,
                    'demo_batch_id' => $this->batchId,
                ]
            );
        }
    }

    private function seedPopup(string $imagePath): void
    {
        Popup::updateOrCreate(
            ['title' => 'Demo Manual Order Promotion'],
            [
                'heading' => 'Create Manual Order',
                'description' => 'Send product links, images, and PDFs. Our team confirms pricing and logistics.',
                'image_path' => $imagePath,
                'link_url' => '/manual-order',
                'is_active' => true,
                'is_demo' => true,
                'demo_batch_id' => $this->batchId,
            ]
        );
    }

    private function seedSettings(): void
    {
        DB::table('settings')->updateOrInsert(['group' => 'general', 'key' => 'default_currency'], ['value' => 'USD', 'updated_at' => now(), 'created_at' => now()]);
        DB::table('settings')->updateOrInsert(['group' => 'general', 'key' => 'currency'], ['value' => 'USD', 'updated_at' => now(), 'created_at' => now()]);
    }

    private function makeDemoPng(string $label, array $rgb): string
    {
        $path = storage_path("app/demo-source-{$label}.png");
        $image = imagecreatetruecolor(1200, 760);
        $background = imagecolorallocate($image, $rgb[0], $rgb[1], $rgb[2]);
        $foreground = imagecolorallocate($image, 255, 255, 255);
        imagefilledrectangle($image, 0, 0, 1200, 760, $background);
        imagestring($image, 5, 64, 64, strtoupper(str_replace('-', ' ', $label)), $foreground);
        imagestring($image, 5, 64, 110, 'Manual Order Demo Asset', $foreground);
        imagepng($image, $path);
        imagedestroy($image);
        return $path;
    }

    private function makePdf(string $title): string
    {
        $content = "BT /F1 18 Tf 72 720 Td ({$title}) Tj ET";
        return "%PDF-1.4\n1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj\n2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj\n3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >> endobj\n4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj\n5 0 obj << /Length ".strlen($content)." >> stream\n{$content}\nendstream endobj\nxref\n0 6\n0000000000 65535 f \ntrailer << /Root 1 0 R /Size 6 >>\nstartxref\n0\n%%EOF\n";
    }

    private function printCredentials(): void
    {
        $this->line('');
        $this->info('CUSTOMER WEBSITE ACCOUNTS');
        $this->line('Customer login uses Firebase Google or Firebase email/password. These demo rows are for UI and database testing.');
        $this->line('Customer 1');
        $this->line('Email: sokha.customer@example.test');
        $this->line('Customer ID: CUS-TEST-KH-0001');
        $this->line('Language: Khmer');
        $this->line('Currency: USD');
        $this->line('');
        $this->line('Customer 2');
        $this->line('Email: nguyen.customer@example.test');
        $this->line('Customer ID: CUS-TEST-VN-0002');
        $this->line('Language: Vietnamese');
        $this->line('Currency: VND');
        $this->line('');
        $this->info('CMS ACCOUNTS');
        $this->line('Super Admin');
        $this->line('Email: superadmin@example.test');
        $this->line('Password: SuperAdmin@12345');
        $this->line('Role: Super Admin');
        $this->line('');
        $this->line('Admin');
        $this->line('Email: admin@example.test');
        $this->line('Password: Admin@12345');
        $this->line('Role: Admin');
        $this->line('');
        $this->line('Customer login: /login');
        $this->line('CMS login: /cms/login');
        $this->warn('These are development-only credentials. Never use them in production.');
    }
}
