<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class OrderController extends Controller
{
    private array $statuses = [
        'in_progress',
        'paid',
        'shipping',
        'delivered',
        'canceled',
        'refund'
    ];

    private array $paymentStatuses = [
        'unpaid',
        'paid',
    ];

    public function index(Request $request)
    {
        $orders = Order::with('user')
            ->withCount(['items', 'images', 'attachments'])
            ->withSum('items', 'quantity')
            ->when($request->filled('search'), function ($query) use ($request) {
                $search = '%' . $request->input('search') . '%';
                $query->where(function ($q) use ($search) {
                    $q->where('order_number', 'like', $search)
                        ->orWhere('customer_code_snapshot', 'like', $search)
                        ->orWhere('customer_name_snapshot', 'like', $search)
                        ->orWhere('customer_phone_snapshot', 'like', $search)
                        ->orWhereHas('items', fn ($itemQuery) => $itemQuery->where('product_name', 'like', $search))
                        ->orWhereHas('receipts', fn ($receiptQuery) => $receiptQuery->where('receipt_number', 'like', $search));
                });
            })
            ->when($request->filled('status'), fn ($query) => $query->where('status', $request->input('status')))
            ->when($request->filled('payment_status'), fn ($query) => $query->where('payment_status', $request->input('payment_status')))
            ->latest()
            ->paginate(15)
            ->through(function (Order $order) {
                $order->status = $this->simpleStatus($order->status);
                $order->payment_status = $order->payment_status === 'paid' ? 'paid' : 'unpaid';

                return $order;
            })
            ->withQueryString();
        
        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders,
            'filters' => $request->only(['search', 'status', 'payment_status']),
            'statuses' => $this->statuses,
            'paymentStatuses' => $this->paymentStatuses,
        ]);
    }

    public function show(Order $order)
    {
        $order->load([
            'user',
            'items.urls',
            'items.images',
            'items.attachments',
            'images',
            'attachments',
            'receipts',
            'statusHistories' => fn ($query) => $query->oldest(),
        ]);

        $orderData = $order->toArray();
        $orderData['status'] = $this->simpleStatus($order->status);
        $orderData['payment_status'] = $order->payment_status === 'paid' ? 'paid' : 'unpaid';
        $orderData['quantity'] = $order->items->sum('quantity') ?: 1;
        $orderData['variant'] = $order->items->map(fn ($item) => collect([$item->type, $item->color, $item->size])->filter()->join(' / '))->filter()->join(', ');
        $orderData['images'] = $order->images->map(fn ($image) => [
            'id' => $image->id,
            'url' => '/storage/' . $image->path,
            'thumbnail_url' => $image->thumbnail_path ? '/storage/' . $image->thumbnail_path : null,
        ]);
        $orderData['attachments'] = $order->attachments->map(fn ($attachment) => [
            ...$attachment->toArray(),
            'download_url' => route('attachments.download', $attachment),
        ])->values();
        $orderData['items'] = $order->items->map(function ($item) {
            $itemData = $item->toArray();
            $itemData['images'] = $item->images->map(fn ($image) => [
                ...$image->toArray(),
                'url' => '/storage/' . $image->path,
                'thumbnail_url' => $image->thumbnail_path ? '/storage/' . $image->thumbnail_path : null,
            ])->values();
            $itemData['attachments'] = $item->attachments->map(fn ($attachment) => [
                ...$attachment->toArray(),
                'download_url' => route('attachments.download', $attachment),
            ])->values();

            return $itemData;
        })->values();

        $auditLogs = class_exists(AuditLog::class)
            ? AuditLog::with('user')
                ->where('target_type', Order::class)
                ->where('target_id', $order->id)
                ->latest()
                ->take(20)
                ->get()
            : [];

        return Inertia::render('Admin/Logistics/Orders/Show', [
            'order' => $orderData,
            'statuses' => $this->statuses,
            'paymentStatuses' => $this->paymentStatuses,
            'auditLogs' => $auditLogs,
        ]);
    }

    public function updateStatus(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => 'required|in:' . implode(',', $this->statuses),
            'payment_status' => 'nullable|in:' . implode(',', $this->paymentStatuses),
            'currency_code' => 'nullable|in:USD,VND',
            'subtotal' => 'nullable|numeric|min:0',
            'charges' => 'nullable|numeric|min:0',
            'discount' => 'nullable|numeric|min:0',
            'public_message' => 'nullable|string|max:1000',
            'internal_note' => 'nullable|string|max:1000',
            'logistics_fee' => 'nullable|numeric|min:0',
            'service_fee' => 'nullable|numeric|min:0',
            'delivery_fee' => 'nullable|numeric|min:0',
            'pricing_notes' => 'nullable|string|max:2000',
        ]);

        $oldStatus = $order->status;
        $statusOnlyKeys = collect($request->except(['_token', '_method']))->keys()->values()->all();

        $statusUpdateKeys = collect($statusOnlyKeys)->sort()->values()->all();

        if ($statusUpdateKeys === ['status'] || $statusUpdateKeys === ['payment_status', 'status']) {
            $order->forceFill([
                'status' => $validated['status'],
                'payment_status' => $validated['payment_status'] ?? $order->payment_status ?? 'unpaid',
                'updated_by' => auth('admin')->id(),
            ])->save();

            if ($oldStatus !== $order->status) {
                $order->statusHistories()->create([
                    'from_status' => $oldStatus,
                    'to_status' => $order->status,
                    'changed_by' => auth('admin')->id(),
                    'customer_notified_at' => now(),
                ]);
                
                \App\Jobs\SendTelegramStatusNotification::dispatchSync($order, $oldStatus, $order->status);
            }

            return back()->with('success', 'Order status updated.');
        }

        $subtotal = $this->parseAmount($validated['subtotal'] ?? $order->subtotal_amount ?? $order->subtotal ?? $order->total_amount ?? 0);
        $logisticsFee = $this->parseAmount($validated['logistics_fee'] ?? $order->logistics_fee_amount ?? $order->logistics_fee ?? 0);
        $serviceFee = $this->parseAmount($validated['service_fee'] ?? $validated['charges'] ?? $order->service_fee_amount ?? $order->service_fee ?? $order->service_charge ?? 0);
        $deliveryFee = $this->parseAmount($validated['delivery_fee'] ?? $order->delivery_fee_amount ?? $order->delivery_fee ?? $order->delivery_charge ?? 0);
        $discount = $this->parseAmount($validated['discount'] ?? $order->discount_amount ?? $order->discount ?? 0);
        $finalTotal = max($subtotal + $logisticsFee + $serviceFee + $deliveryFee - $discount, 0.0);

        $order->fill([
            'status' => $validated['status'],
            'payment_status' => $validated['payment_status'] ?? $order->payment_status ?? 'unpaid',
            'currency_code' => $validated['currency_code'] ?? $order->currency_code ?? 'USD',
            'subtotal' => $subtotal,
            'logistics_fee' => $logisticsFee,
            'service_charge' => $serviceFee,
            'delivery_charge' => $deliveryFee,
            'discount' => $discount,
            'estimated_total' => $order->pricing_status === 'not_calculated' ? $finalTotal : $order->estimated_total,
            'final_total' => $finalTotal,
            'total_amount' => $finalTotal,
            'subtotal_amount' => $subtotal,
            'logistics_fee_amount' => $logisticsFee,
            'service_fee_amount' => $serviceFee,
            'delivery_fee_amount' => $deliveryFee,
            'discount_amount' => $discount,
            'estimated_total_amount' => $order->pricing_status === 'not_calculated' ? $finalTotal : ($order->estimated_total_amount ?? $finalTotal),
            'final_total_amount' => $finalTotal,
            'amount_paid' => $order->amount_paid ?? 0,
            'outstanding_amount' => max($finalTotal - (int) ($order->amount_paid ?? 0), 0),
            'pricing_status' => $validated['status'] === 'delivered' ? 'final' : 'quoted',
            'pricing_notes' => $validated['pricing_notes'] ?? $order->pricing_notes,
            'customer_visible_note' => $validated['public_message'] ?? $order->customer_visible_note,
            'updated_by' => auth('admin')->id(),
        ])->save();

        $oldTotal = $order->getOriginal('final_total_amount');

        if ($oldStatus !== $order->status || (float)$oldTotal !== (float)$finalTotal) {
            if ($oldStatus !== $order->status) {
                $order->statusHistories()->create([
                    'from_status' => $oldStatus,
                    'to_status' => $order->status,
                    'public_message' => $validated['public_message'] ?? null,
                    'internal_note' => $validated['internal_note'] ?? null,
                    'changed_by' => auth('admin')->id(),
                    'customer_notified_at' => now(),
                ]);
            }
            
            \App\Jobs\SendTelegramStatusNotification::dispatchSync($order, $oldStatus, $order->status);
        }

        if (class_exists(AuditLog::class)) {
            AuditLog::create([
                'user_id' => auth('admin')->id(),
                'action' => 'Updated order status',
                'target_type' => Order::class,
                'target_id' => $order->id,
                'old_values' => ['status' => $oldStatus],
                'new_values' => ['status' => $order->status],
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);
        }

        return back()->with('success', 'Order status updated.');
    }

    public function update(Request $request, Order $order)
    {
        return $this->updateStatus($request, $order);
    }

    private function parseAmount(string|int|float|null $value): float
    {
        if ($value === null || $value === '') {
            return 0.0;
        }

        return max((float) preg_replace('/[^\d.-]/', '', (string) $value), 0.0);
    }

    private function simpleStatus(?string $status): string
    {
        return match ($status) {
            'draft' => 'in_progress',
            'delivered', 'completed' => 'delivered',
            'paid' => 'paid',
            'shipping' => 'shipping',
            'canceled' => 'canceled',
            'refund' => 'refund',
            default => 'in_progress',
        };
    }

    /**
     * Export a specific order to CSV.
     */
    public function exportOrderCsv(Order $order)
    {
        $order->load(['user', 'items.urls']);
        $columns = ['Item Name', 'Product URLs', 'Description', 'Quantity', 'Type', 'Color', 'Size', 'Customer Note'];
        
        $headers = [
            "Content-type"        => "text/csv",
            "Content-Disposition" => "attachment; filename=order_" . $order->order_number . ".csv",
            "Pragma"              => "no-cache",
            "Cache-Control"       => "must-revalidate, post-check=0, pre-check=0",
            "Expires"             => "0"
        ];
        
        $callback = function() use($order, $columns) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $columns);
            
            foreach ($order->items as $item) {
                $urls = $item->urls->pluck('url')->join("\n");
                fputcsv($file, [
                    $item->name ?? $item->product_name,
                    $urls,
                    $item->description,
                    $item->quantity,
                    $item->type,
                    $item->color,
                    $item->size,
                    $item->customer_notes
                ]);
            }
            fclose($file);
        };
        
        return response()->stream($callback, 200, $headers);
    }

    /**
     * Export all images for a specific order as a ZIP file.
     */
    public function exportOrderImages(Order $order)
    {
        $order->load('images');
        
        $zipFileName = 'order_' . $order->order_number . '_images.zip';
        $zipFilePath = storage_path('app/public/' . $zipFileName);

        $zip = new \ZipArchive();
        
        if ($zip->open($zipFilePath, \ZipArchive::CREATE | \ZipArchive::OVERWRITE) === TRUE) {
            $hasFiles = false;
            
            foreach ($order->images as $image) {
                $imagePath = storage_path('app/public/' . $image->path);
                if (file_exists($imagePath)) {
                    $zip->addFile($imagePath, basename($imagePath));
                    $hasFiles = true;
                }
            }
            
            $zip->close();
            
            if ($hasFiles) {
                return response()->download($zipFilePath)->deleteFileAfterSend(true);
            } else {
                @unlink($zipFilePath);
                return back()->with('error', 'No images found for this order.');
            }
        }
        
        return back()->with('error', 'Could not create ZIP file.');
    }
}
