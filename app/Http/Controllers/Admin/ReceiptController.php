<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ManualOrder;
use App\Models\Receipt;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReceiptController extends Controller
{
    public function generate(Request $request)
    {
        $request->validate([
            'manual_order_id' => 'required|exists:manual_orders,id'
        ]);

        $order = ManualOrder::with(['user', 'items'])->findOrFail($request->manual_order_id);

        $subtotal = (float) $order->total_amount;
        $charges = 0;
        $discount = 0;
        $total = max($subtotal + $charges - $discount, 0);

        $receipt = Receipt::create([
            'receipt_number' => Receipt::generateReceiptNumber(),
            'manual_order_id' => $order->id,
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

        return redirect()->route('admin.receipts.show', $receipt);
    }

    public function show(Receipt $receipt)
    {
        $receipt->load(['manualOrder', 'user']);

        return Inertia::render('Admin/Logistics/Receipts/Show', [
            'receipt' => $receipt,
        ]);
    }
}
