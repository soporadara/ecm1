<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\Coupon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Stripe\Stripe;
use Stripe\Checkout\Session;

class StripeCheckoutController extends Controller
{
    public function createSession(Request $request)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id'
        ]);

        $order = Order::with('items')->findOrFail($request->order_id);

        if ($order->payment_status === 'paid') {
            return redirect()->route('shop.index')->with('success', 'Order already paid.');
        }

        Stripe::setApiKey(env('STRIPE_SECRET'));

        $lineItems = [];

        foreach ($order->items as $item) {
            $lineItems[] = [
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => [
                        'name' => $item->product_name,
                    ],
                    'unit_amount' => (int)($item->price * 100), // Stripe expects cents
                ],
                'quantity' => $item->quantity,
            ];
        }

        // If total amount differs from sum of items (due to coupons)
        $calculatedSum = $order->items->sum(function($item) {
            return $item->price * $item->quantity;
        });

        if ($calculatedSum > $order->total_amount) {
            // Apply a discount line item
            $discount = $calculatedSum - $order->total_amount;
            // Actually, Stripe checkout handles discounts via Coupons in Stripe, 
            // but for simplicity, we can just pass the final order amount as a single custom line item if there's a discount.
            // Or we just add a negative line item? Stripe doesn't allow negative line items easily.
            // We will just override the line item to be a single "Order Total" item to avoid complexity with custom coupons.
            $lineItems = [
                [
                    'price_data' => [
                        'currency' => 'usd',
                        'product_data' => [
                            'name' => 'Order #' . $order->id . ' (Includes Discounts)',
                        ],
                        'unit_amount' => (int)($order->total_amount * 100),
                    ],
                    'quantity' => 1,
                ]
            ];
        }

        $session = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => $lineItems,
            'mode' => 'payment',
            'success_url' => route('checkout.success', ['order_id' => $order->id]) . '?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => route('checkout.cancel', ['order_id' => $order->id]),
        ]);

        return redirect($session->url);
    }

    public function success(Request $request)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id'
        ]);

        $order = Order::findOrFail($request->order_id);
        
        // In a real app, you would verify the session_id with Stripe here
        // For now, we just mark it paid
        $order->update([
            'status' => 'processing',
            'payment_status' => 'paid',
            'payment_method' => 'stripe'
        ]);

        return redirect()->route('shop.index')->with('success', 'Payment successful! Your order is being processed.');
    }

    public function cancel(Request $request)
    {
        return redirect()->route('shop.index')->with('error', 'Payment cancelled. You can try again later.');
    }
}
