<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\ContentSetting;
use App\Models\Order;
use App\Services\CustomerProfileCompletionService;
use App\Services\ImageProcessingService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class ManualOrderController extends Controller
{
    private int $maxProducts = 20;
    private int $maxQuantity = 999;
    private int $maxImagesPerProduct = 6;
    private int $maxPdfsPerProduct = 5;

    public function create(CustomerProfileCompletionService $completion)
    {
        $user = auth()->user();

        if (!$completion->canCreateManualOrder($user)) {
            session()->put('profile.redirect_after_completion', '/manual-order');

            return redirect()->route('profile.complete', ['gate' => 'manual-order'])
                ->with('error', 'Complete your contact and delivery information before creating a Manual Order.');
        }

        $user->load('addresses');

        return Inertia::render('Customer/ManualOrderForm', [
            'quoteMessages' => [
                'page_title' => ContentSetting::publicValue('order_messages', 'request_quote_page_title', 'Create Manual Order'),
                'intro' => ContentSetting::publicValue('order_messages', 'request_quote_introduction', 'Send us product details and our team will confirm product and logistics pricing.'),
                'logistics_fee_notice' => ContentSetting::publicValue('order_messages', 'logistics_fee_notice', 'Logistics fee will be confirmed by our team.'),
                'pricing_disclaimer' => ContentSetting::publicValue('order_messages', 'pricing_disclaimer', 'This is a manual order. Final product and logistics prices will be confirmed by our team before processing.'),
                'submit_button_text' => ContentSetting::publicValue('order_messages', 'submit_button_text', 'Submit Manual Order'),
                'success_title' => ContentSetting::publicValue('order_messages', 'submission_success_title', 'Your manual order was submitted successfully.'),
                'success_description' => ContentSetting::publicValue('order_messages', 'submission_success_description', 'Our team will review your product information and logistics requirements. You can follow the status from your order page.'),
                'view_order_button_text' => ContentSetting::publicValue('order_messages', 'view_order_button_text', 'View Your Order'),
                'create_another_button_text' => ContentSetting::publicValue('order_messages', 'create_another_request_button_text', 'Create Another Manual Order'),
            ],
            'limits' => [
                'max_products' => $this->maxProducts,
                'max_quantity' => $this->maxQuantity,
                'max_images_per_product' => $this->maxImagesPerProduct,
                'max_pdfs_per_product' => $this->maxPdfsPerProduct,
            ],
        ]);
    }

    public function store(Request $request, ImageProcessingService $imageProcessor, CustomerProfileCompletionService $completion)
    {
        if (!$completion->canCreateManualOrder($request->user())) {
            throw ValidationException::withMessages([
                'profile' => 'PROFILE_COMPLETION_REQUIRED',
                'redirect' => route('profile.complete', ['gate' => 'manual-order']),
            ]);
        }

        $validated = $request->validate([
            'contact_email' => ['required', 'email', 'max:255'],
            'save_email_to_profile' => ['boolean'],
            'contact_phone' => ['required', 'string', 'max:50'],
            'save_phone_to_profile' => ['boolean'],
            'address_line_1' => ['required', 'string', 'max:1000'],
            'address_line_2' => ['nullable', 'string', 'max:255'],
            'city' => ['nullable', 'string', 'max:255'],
            'province' => ['nullable', 'string', 'max:255'],
            'postal_code' => ['nullable', 'string', 'max:30'],
            'delivery_notes' => ['nullable', 'string', 'max:1000'],
            'save_address_to_profile' => ['boolean'],
            'message' => ['nullable', 'string', 'max:2000'],
            'currency_code' => ['required', 'in:USD,VND'],
            'confirmation' => ['accepted'],
            'products' => ['required', 'array', 'min:1', 'max:' . $this->maxProducts],
            'products.*.name' => ['required', 'string', 'max:255'],
            'products.*.description' => ['nullable', 'string', 'max:2000'],
            'products.*.quantity' => ['required', 'integer', 'min:1', 'max:' . $this->maxQuantity],
            'products.*.type' => ['nullable', 'string', 'max:255'],
            'products.*.color' => ['nullable', 'string', 'max:255'],
            'products.*.size' => ['nullable', 'string', 'max:255'],
            'products.*.customer_note' => ['nullable', 'string', 'max:1000'],
            'products.*.urls' => ['nullable', 'array', 'max:10'],
            'products.*.urls.*' => ['nullable', 'string', 'max:2048'],
            'products.*.images' => ['nullable', 'array', 'max:' . $this->maxImagesPerProduct],
            'products.*.images.*' => ['image', 'mimes:jpg,jpeg,png,webp,heic', 'max:5120'],
            'products.*.pdfs' => ['nullable', 'array', 'max:' . $this->maxPdfsPerProduct],
            'products.*.pdfs.*' => ['file', 'mimetypes:application/pdf', 'max:10240'],
        ]);

        foreach ($validated['products'] as $productIndex => $product) {
            foreach ($product['urls'] ?? [] as $urlIndex => $url) {
                if ($url !== null && trim($url) !== '') {
                    $this->assertSafeUrl($url, "products.$productIndex.urls.$urlIndex");
                }
            }
        }

        foreach ($request->file('products', []) as $productIndex => $productFiles) {
            foreach ($productFiles['pdfs'] ?? [] as $pdfIndex => $pdf) {
                if (!$this->hasPdfSignature($pdf->getRealPath())) {
                    throw ValidationException::withMessages([
                        "products.$productIndex.pdfs.$pdfIndex" => 'The uploaded document is not a valid PDF.',
                    ]);
                }
            }
        }

        $user = $request->user();

        $order = DB::transaction(function () use ($validated, $request, $user, $imageProcessor) {
            if ($validated['save_email_to_profile'] ?? false) {
                $user->contact_email = $validated['contact_email'];
            }
            if ($validated['save_phone_to_profile'] ?? false) {
                $user->phone_e164 = $this->normalizePhone($validated['contact_phone']);
            }
            if ($validated['save_address_to_profile'] ?? false) {
                $user->addresses()->create([
                    'address_line_1' => $validated['address_line_1'],
                    'address_line_2' => $validated['address_line_2'] ?? null,
                    'city' => $validated['city'] ?? null,
                    'province' => $validated['province'] ?? null,
                    'postal_code' => $validated['postal_code'] ?? null,
                    'address_notes' => $validated['delivery_notes'] ?? null,
                    'is_default' => $user->addresses()->count() === 0,
                ]);
                // Keep backwards compatibility for primary address
                $user->address_line_1 = $validated['address_line_1'];
                $user->address_line_2 = $validated['address_line_2'] ?? null;
                $user->city = $validated['city'] ?? null;
                $user->province = $validated['province'] ?? null;
                $user->postal_code = $validated['postal_code'] ?? null;
                $user->address_notes = $validated['delivery_notes'] ?? null;
            }
            if ($user->isDirty()) {
                $user->save();
            }

            $subtotalAmount = 0;
            $subtotal = 0;

            $addressSnapshot = collect([
                $validated['address_line_1'],
                $validated['address_line_2'] ?? null,
                $validated['city'] ?? null,
                $validated['province'] ?? null,
                $validated['postal_code'] ?? null,
                $validated['delivery_notes'] ?? null,
            ])->filter()->join("\n");

            $firstProduct = $validated['products'][0];
            $order = Order::create([
                'order_number' => Order::generateOrderNumber(),
                'user_id' => $user->id,
                'customer_code_snapshot' => $user->customer_code,
                'customer_name_snapshot' => $user->name,
                'customer_email_snapshot' => $validated['contact_email'],
                'customer_phone_snapshot' => $this->normalizePhone($validated['contact_phone']),
                'delivery_address_snapshot' => $addressSnapshot,
                'title' => count($validated['products']) === 1 ? $firstProduct['name'] : count($validated['products']) . ' requested products',
                'description' => $validated['message'] ?? null,
                'status' => 'submitted',
                'pricing_status' => $subtotalAmount > 0 ? 'estimated' : 'not_calculated',
                'currency_code' => $validated['currency_code'],
                'payment_status' => 'unpaid',
                'purchase_readiness' => 'not_ready',
                'subtotal' => $subtotal,
                'estimated_total' => $subtotalAmount > 0 ? $subtotal : null,
                'total_amount' => $subtotal,
                'subtotal_amount' => $subtotalAmount,
                'estimated_total_amount' => $subtotalAmount > 0 ? $subtotalAmount : null,
                'final_total_amount' => null,
                'amount_paid' => 0,
                'outstanding_amount' => 0,
                'shipping_address' => $validated['address_line_1'],
                'shipping_city' => $validated['city'] ?? 'Not provided',
                'shipping_phone' => $this->normalizePhone($validated['contact_phone']),
                'customer_notes' => $validated['message'] ?? null,
                'submitted_at' => now(),
                'created_by' => $user->id,
            ]);

            $order->statusHistories()->create([
                'from_status' => null,
                'to_status' => 'submitted',
                'public_message' => 'Quotation request submitted.',
                'changed_by' => $user->id,
                'customer_notified_at' => now(),
            ]);

            foreach ($validated['products'] as $productIndex => $product) {
                $item = $order->items()->create([
                    'product_name' => $product['name'],
                    'description' => $product['description'] ?? null,
                    'quantity' => $product['quantity'],
                    'type' => $product['type'] ?? null,
                    'color' => $product['color'] ?? null,
                    'size' => $product['size'] ?? null,
                    'price' => 0,
                    'estimated_unit_price' => null,
                    'line_total' => null,
                    'customer_notes' => $product['customer_note'] ?? null,
                    'sort_order' => $productIndex + 1,
                ]);

                foreach ($product['urls'] ?? [] as $urlIndex => $url) {
                    if ($url === null || trim($url) === '') {
                        continue;
                    }

                    $item->urls()->create([
                        'url' => trim($url),
                        'domain' => parse_url(trim($url), PHP_URL_HOST),
                        'sort_order' => $urlIndex + 1,
                    ]);
                }

                foreach ($request->file("products.$productIndex.images", []) as $imageIndex => $image) {
                    $stored = $imageProcessor->processAndStore($image);
                    $order->images()->create([
                        ...$stored,
                        'order_item_id' => $item->id,
                        'uploaded_by' => $user->id,
                        'stored_filename' => basename($stored['path']),
                        'disk' => 'public',
                        'sort_order' => $imageIndex + 1,
                    ]);
                }

                foreach ($request->file("products.$productIndex.pdfs", []) as $pdfIndex => $pdf) {
                    $path = $pdf->store('order-attachments', 'local');
                    $order->attachments()->create([
                        'order_item_id' => $item->id,
                        'uploaded_by' => $user->id,
                        'attachment_type' => 'pdf',
                        'original_filename' => $pdf->getClientOriginalName(),
                        'stored_filename' => basename($path),
                        'disk' => 'local',
                        'path' => $path,
                        'mime_type' => $pdf->getMimeType(),
                        'size_bytes' => $pdf->getSize(),
                    ]);
                }
            }

            return $order;
        });

        return redirect()->route('my-orders.show', $order)->with([
            'success' => 'Manual order submitted successfully.',
            'submitted_order' => [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'status' => $order->status,
                'currency_code' => $order->currency_code,
            ],
        ]);
    }

    private function normalizePhone(string $phone): string
    {
        return preg_replace('/[^\d+]/', '', $phone) ?: $phone;
    }

    private function assertSafeUrl(string $url, string $field): void
    {
        $url = trim($url);
        if (!filter_var($url, FILTER_VALIDATE_URL) || parse_url($url, PHP_URL_SCHEME) !== 'https') {
            throw ValidationException::withMessages([$field => 'Only valid HTTPS product URLs are allowed.']);
        }

        $host = parse_url($url, PHP_URL_HOST);
        if (!$host || in_array(strtolower($host), ['localhost', '127.0.0.1', '0.0.0.0'], true)) {
            throw ValidationException::withMessages([$field => 'Local or private product URLs are not allowed.']);
        }

        if (filter_var($host, FILTER_VALIDATE_IP) && !filter_var($host, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
            throw ValidationException::withMessages([$field => 'Private network product URLs are not allowed.']);
        }
    }

    private function hasPdfSignature(string $path): bool
    {
        $handle = fopen($path, 'rb');
        if (!$handle) {
            return false;
        }

        $signature = fread($handle, 4);
        fclose($handle);

        return $signature === '%PDF';
    }
}
