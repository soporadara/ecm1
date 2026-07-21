<?php

namespace App\Http\Controllers;

use App\Helpers\FeatureFlags;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class CartController extends Controller
{
    protected function checkFlag(): void
    {
        if (FeatureFlags::disabled('storefront_cart_enabled')) {
            abort(404, 'The shopping cart is not currently available.');
        }
    }

    protected function getCart()
    {
        $sessionId = Session::getId();
        
        if (auth()->check()) {
            $cart = Cart::with(['items.product.images', 'items.productVariant'])->where('user_id', auth()->id())->first();
            if ($cart) {
                if ($cart->session_id !== $sessionId) {
                    $cart->update(['session_id' => $sessionId]);
                }
                return $cart;
            }
        }

        return Cart::with(['items.product.images', 'items.productVariant'])->firstOrCreate(
            ['session_id' => $sessionId],
            ['user_id' => auth()->check() ? auth()->id() : null]
        );
    }

    public function index()
    {
        $this->checkFlag();
        return Inertia::render('Cart/Index', [
            'cart' => $this->getCart()
        ]);
    }

    public function store(Request $request)
    {
        $this->checkFlag();
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'product_variant_id' => 'nullable|exists:product_variants,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $cart = $this->getCart();
        $product = Product::findOrFail($request->product_id);

        $cartItem = $cart->items()
            ->where('product_id', $product->id)
            ->where('product_variant_id', $request->product_variant_id)
            ->first();

        if ($cartItem) {
            $cartItem->increment('quantity', $request->quantity);
        } else {
            $cart->items()->create([
                'product_id' => $product->id,
                'product_variant_id' => $request->product_variant_id,
                'quantity' => $request->quantity,
                'price' => $product->price
            ]);
        }

        return redirect()->back()->with('success', 'Product added to cart');
    }

    public function update(Request $request, CartItem $item)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);

        // Ensure the item belongs to current cart
        if ($item->cart_id !== $this->getCart()->id) {
            abort(403);
        }

        $item->update(['quantity' => $request->quantity]);

        return redirect()->back();
    }

    public function destroy(CartItem $item)
    {
        if ($item->cart_id !== $this->getCart()->id) {
            abort(403);
        }

        $item->delete();

        return redirect()->back();
    }
}
