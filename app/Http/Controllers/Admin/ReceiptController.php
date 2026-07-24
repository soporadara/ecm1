<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Receipt;
use Inertia\Inertia;

class ReceiptController extends Controller
{
    public function index()
    {
        return redirect()->route('admin.orders.index');
    }

    public function generate(Order $order)
    {
        $order->load(['user', 'items']);

        $subtotal = (float) ($order->subtotal ?: $order->total_amount);
        $charges = (float) ($order->service_charge + $order->delivery_charge);
        $discount = (float) $order->discount;
        $total = max($subtotal + $charges - $discount, 0);

        $receipt = Receipt::create([
            'receipt_number' => Receipt::generateReceiptNumber(),
            'order_id' => $order->id,
            'user_id' => $order->user_id,
            'snapshot_json' => [
                'order' => $order->only(['id', 'order_number', 'title', 'description', 'status']),
                'items' => $order->items->toArray(),
            ],
            'subtotal' => $subtotal,
            'charges' => $charges,
            'discount' => $discount,
            'total' => $total,
            'payment_status' => $order->payment_status ?? 'unpaid',
            'generated_by' => auth('admin')->id(),
        ]);

        return redirect()->route('admin.receipts.show', $receipt);
    }

    public function show(Receipt $receipt)
    {
        $receipt->load(['order', 'user']);

        return Inertia::render('Admin/Logistics/Receipts/Show', [
            'receipt' => $receipt,
        ]);
    }
}
