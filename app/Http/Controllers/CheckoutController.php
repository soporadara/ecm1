<?php

namespace App\Http\Controllers;

use App\Helpers\FeatureFlags;
use App\Models\Cart;
use App\Models\FeatureFlag;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class CheckoutController extends Controller
{
    protected function checkFlag(): void
    {
        if (FeatureFlag::where('name', 'storefront_checkout_enabled')->exists() && FeatureFlags::disabled('storefront_checkout_enabled')) {
            abort(404, 'Checkout is not currently available.');
        }
    }

    protected function getCart($loadImages = false)
    {
        $sessionId = Session::getId();
        $relations = $loadImages ? ['items.product.images', 'items.productVariant'] : ['items.product', 'items.productVariant'];
        
        if (auth()->check()) {
            $cart = Cart::with($relations)->where('user_id', auth()->id())->first();
            if ($cart) return $cart;
        }
        
        return Cart::with($relations)->where('session_id', $sessionId)->first();
    }

    public function index()
    {
        $this->checkFlag();
        $cart = $this->getCart(true);

        if (!$cart || $cart->items->isEmpty()) {
            return redirect()->route('home')->with('error', 'Your cart is empty');
        }

        return Inertia::render('Checkout/Index', [
            'cart' => $cart
        ]);
    }

    public function store(Request $request)
    {
        $this->checkFlag();
        $request->validate([
            'shipping_address' => 'required|string|max:255',
            'shipping_province' => 'required|string|max:100',
            'shipping_district' => 'required|string|max:100',
            'shipping_commune' => 'required|string|max:100',
            'shipping_phone' => 'required|string|max:20',
            'payment_method' => 'required|string|in:cod,aba,khqr,card',
        ]);

        $cart = $this->getCart();

        if (!$cart || $cart->items->isEmpty()) {
            return redirect()->route('shop.index');
        }

        DB::beginTransaction();

        try {
            $totalAmount = $cart->items->sum(function ($item) {
                $price = $item->productVariant ? $item->productVariant->price : ($item->product->sale_price ?: $item->product->price);
                return $price * $item->quantity;
            });

            $order = Order::create([
                'user_id' => auth()->id(),
                'status' => 'pending',
                'total_amount' => $totalAmount,
                'payment_method' => $request->payment_method,
                'shipping_address' => $request->shipping_address . ', ' . $request->shipping_commune . ', ' . $request->shipping_district . ', ' . $request->shipping_province,
                'shipping_city' => $request->shipping_province,
                'shipping_phone' => $request->shipping_phone,
            ]);

            foreach ($cart->items as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'product_variant_id' => $item->product_variant_id,
                    'product_name' => $item->product->name . ($item->productVariant ? ' (' . $item->productVariant->size . ' / ' . $item->productVariant->color . ')' : ''),
                    'price' => $item->productVariant ? $item->productVariant->price : ($item->product->sale_price ?: $item->product->price),
                    'quantity' => $item->quantity,
                ]);

                // Reduce stock
                if ($item->productVariant) {
                    if ($item->productVariant->stock >= $item->quantity) {
                        $item->productVariant->decrement('stock', $item->quantity);
                    }
                } else if ($item->product->stock >= $item->quantity) {
                    $item->product->decrement('stock', $item->quantity);
                }
            }

            // Clear the cart
            $cart->items()->delete();
            $cart->delete();

            DB::commit();

            return redirect()->route('shop.index')->with('success', 'Order placed successfully! We will contact you soon.');

        } catch (\Exception $e) {
            DB::rollBack();
            \Illuminate\Support\Facades\Log::error('Checkout Error: ' . $e->getMessage() . ' - ' . $e->getTraceAsString());
            return back()->with('error', 'Something went wrong. Please try again.');
        }
    }
}
