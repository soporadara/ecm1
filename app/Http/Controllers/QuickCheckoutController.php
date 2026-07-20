<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\Coupon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class QuickCheckoutController extends Controller
{
    public function validateCoupon(Request $request)
    {
        $request->validate(['code' => 'required|string']);

        $coupon = Coupon::where('code', $request->code)->first();

        if (!$coupon) {
            return response()->json(['valid' => false, 'message' => 'Invalid coupon code.']);
        }

        if (!$coupon->isValid()) {
            return response()->json(['valid' => false, 'message' => 'Coupon is expired or usage limit reached.']);
        }

        return response()->json([
            'valid' => true,
            'coupon' => [
                'code' => $coupon->code,
                'type' => $coupon->type,
                'value' => $coupon->value
            ]
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'product_variant_id' => 'nullable|exists:product_variants,id',
            'quantity' => 'required|integer|min:1',
            'shipping_address' => 'required|string|max:500',
            'shipping_phone' => 'required|string|max:20',
            'payment_method' => 'required|string',
            'map_coordinates' => 'nullable|string',
            'coupon_code' => 'nullable|string'
        ]);

        $product = Product::findOrFail($request->product_id);
        $variant = $request->product_variant_id ? ProductVariant::find($request->product_variant_id) : null;

        DB::beginTransaction();

        try {
            $unitPrice = $variant ? $variant->price : ($product->sale_price ?: $product->price);
            $subtotal = $unitPrice * $request->quantity;
            $discountAmount = 0;

            if ($request->coupon_code) {
                $coupon = Coupon::where('code', $request->coupon_code)->first();
                if ($coupon && $coupon->isValid()) {
                    if ($coupon->type === 'percent') {
                        $discountAmount = $subtotal * ($coupon->value / 100);
                    } else {
                        $discountAmount = $coupon->value;
                    }
                    $coupon->increment('used');
                }
            }

            $totalAmount = max(0, $subtotal - $discountAmount);

            $order = Order::create([
                'user_id' => auth()->id(), // Can be null if guest checkout is allowed
                'status' => 'pending',
                'total_amount' => $totalAmount,
                'payment_method' => $request->payment_method,
                'shipping_address' => $request->shipping_address,
                'shipping_phone' => $request->shipping_phone,
                'shipping_city' => 'Map GPS: ' . $request->map_coordinates, // Storing GPS here temporarily
            ]);

            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'product_variant_id' => $variant ? $variant->id : null,
                'product_name' => $product->name . ($variant ? ' (' . $variant->size . ' / ' . $variant->color . ')' : ''),
                'price' => $unitPrice,
                'quantity' => $request->quantity,
            ]);

            // Reduce stock
            if ($variant) {
                if ($variant->stock >= $request->quantity) {
                    $variant->decrement('stock', $request->quantity);
                }
            } else if ($product->stock >= $request->quantity) {
                $product->decrement('stock', $request->quantity);
            }

            DB::commit();

            if ($request->payment_method === 'card') {
                return redirect()->route('checkout.stripe', ['order_id' => $order->id]);
            }

            return redirect()->route('shop.index')->with('success', 'Order placed successfully! We will contact you soon.');

        } catch (\Exception $e) {
            DB::rollBack();
            \Illuminate\Support\Facades\Log::error('Quick Checkout Error: ' . $e->getMessage() . ' - ' . $e->getTraceAsString());
            return back()->with('error', 'Something went wrong. Please try again.');
        }
    }
}
