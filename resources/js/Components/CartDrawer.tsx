import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { useCurrency } from '../Contexts/CurrencyContext';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    cart: any;
}

export default function CartDrawer({ isOpen, onClose, cart }: CartDrawerProps) {
    const { formatPrice } = useCurrency();
    const [isLoading, setIsLoading] = useState<string | null>(null);

    const updateQuantity = (itemId: number, quantity: number) => {
        if (quantity < 1) return;
        setIsLoading(itemId.toString());
        router.patch(`/cart/${itemId}`, { quantity }, {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => setIsLoading(null)
        });
    };

    const removeItem = (itemId: number) => {
        setIsLoading(itemId.toString());
        router.delete(`/cart/${itemId}`, {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => setIsLoading(null)
        });
    };

    const subtotal = cart?.items?.reduce((acc: number, item: any) => {
        return acc + (item.price * item.quantity);
    }, 0) || 0;

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-[100] transition-opacity"
                    onClick={onClose}
                />
            )}

            {/* Drawer */}
            <div className={`fixed inset-y-0 right-0 w-full max-w-md bg-white z-[110] shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold font-serif text-brand-secondary">Shopping Cart</h2>
                    <button 
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-brand-primary transition-colors rounded-full hover:bg-gray-50"
                        aria-label="Close cart"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6">
                    {!cart || !cart.items || cart.items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-gray-500">
                            <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <p>Your cart is currently empty.</p>
                            <button 
                                onClick={onClose}
                                className="px-6 py-2 bg-brand-primary text-white font-medium rounded hover:bg-red-600 transition-colors"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {cart.items.map((item: any) => {
                                const mainImage = item.product.images?.find((img: any) => img.is_hover_image === 0)?.image_path || item.product.images?.[0]?.image_path;
                                
                                return (
                                    <div key={item.id} className={`flex gap-4 group ${isLoading === item.id.toString() ? 'opacity-50 pointer-events-none' : ''}`}>
                                        <div className="w-20 h-24 flex-shrink-0 bg-gray-50 rounded overflow-hidden">
                                            {mainImage ? (
                                                <img src={mainImage} alt={item.product.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start gap-2">
                                                    <Link href={`/shop/${item.product.slug}`} className="font-medium text-brand-dark hover:text-brand-primary transition-colors line-clamp-2 text-sm" onClick={onClose}>
                                                        {item.product.name}
                                                    </Link>
                                                    <button 
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-gray-50"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                    </button>
                                                </div>
                                                {item.productVariant && (
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {item.productVariant.size && `Size: ${item.productVariant.size}`}
                                                        {item.productVariant.color && ` | Color: ${item.productVariant.color}`}
                                                    </p>
                                                )}
                                                <p className="text-sm font-bold text-brand-secondary mt-1">{formatPrice(item.price)}</p>
                                            </div>
                                            
                                            <div className="flex items-center gap-3 mt-2">
                                                <div className="flex items-center border border-gray-200 rounded">
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                        className="px-2 py-1 text-gray-500 hover:text-brand-primary disabled:opacity-50"
                                                    >-</button>
                                                    <span className="px-2 text-sm w-8 text-center">{item.quantity}</span>
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="px-2 py-1 text-gray-500 hover:text-brand-primary"
                                                    >+</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cart && cart.items && cart.items.length > 0 && (
                    <div className="border-t border-gray-100 p-6 bg-gray-50">
                        <div className="flex justify-between items-center mb-4 text-brand-secondary font-bold">
                            <span>Subtotal</span>
                            <span>{formatPrice(subtotal)}</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-6 text-center">Shipping, taxes, and discount codes calculated at checkout.</p>
                        
                        <div className="space-y-3">
                            <Link 
                                href="/checkout" 
                                className="block w-full py-3 bg-brand-primary text-white text-center font-bold rounded hover:bg-red-600 transition-colors"
                                onClick={onClose}
                            >
                                Checkout
                            </Link>
                            <Link 
                                href="/cart" 
                                className="block w-full py-3 bg-white text-brand-dark text-center font-bold border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                                onClick={onClose}
                            >
                                View Cart
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
