<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ManualOrder;
use App\Models\Receipt;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReceiptController extends Controller
{
    public function generate($orderId)
    {
        try {
            $order = \App\Models\Order::with(['user', 'items'])->findOrFail($orderId);

            $subtotal = (float) ($order->subtotal_amount ?? $order->subtotal ?? 0);
            $charges = (float) ($order->logistics_fee_amount ?? $order->logistics_fee ?? 0) + (float) ($order->service_fee_amount ?? $order->service_fee ?? 0) + (float) ($order->delivery_fee_amount ?? $order->delivery_fee ?? 0);
            $discount = (float) ($order->discount_amount ?? $order->discount ?? 0);
            $total = max($subtotal + $charges - $discount, 0);

            $receipt = Receipt::create([
                'receipt_number' => Receipt::generateReceiptNumber(),
                'order_id' => $order->id,
                'user_id' => $order->user_id,
                'snapshot_json' => [
                    'order' => $order->only(['id', 'order_number', 'status']),
                    'items' => $order->items->toArray(),
                ],
                'subtotal' => $subtotal,
                'charges' => $charges,
                'discount' => $discount,
                'total' => $total,
                'payment_status' => $order->payment_status ?? 'unpaid',
                'generated_by' => auth('admin')->id() ?? auth()->id(),
            ]);

            return redirect()->route('admin.receipts.show', $receipt->id);
        } catch (\Exception $e) {
            \Log::error('Receipt Generation Error: ' . $e->getMessage());
            abort(500, 'Error generating receipt: ' . $e->getMessage());
        }
    }

    public function show($receiptId)
    {
        $receipt = Receipt::with(['order', 'user'])->findOrFail($receiptId);

        return Inertia::render('Admin/Logistics/Receipts/Show', [
            'receipt' => $receipt,
        ]);
    }
}
