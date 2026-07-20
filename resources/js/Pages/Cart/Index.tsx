import { Head, Link, router } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';

export default function Index({ cart }: any) {
    const updateQuantity = (itemId: number, quantity: number) => {
        if (quantity < 1) return;
        router.patch(`/cart/${itemId}`, { quantity }, { preserveScroll: true });
    };

    const removeItem = (itemId: number) => {
        router.delete(`/cart/${itemId}`, { preserveScroll: true });
    };

    const subtotal = cart?.items?.reduce((total: number, item: any) => {
        const itemPrice = parseFloat(item.product_variant?.price || item.product.sale_price || item.product.price);
        return total + (itemPrice * item.quantity);
    }, 0) || 0;

    return (
        <MainLayout>
            <Head title="Shopping Cart" />
            
            <div className="bg-gray-100 py-16">
                <div className="container mx-auto px-4 lg:px-8 text-center">
                    <h1 className="text-4xl lg:text-5xl font-bold text-brand-secondary font-serif mb-4">Cart</h1>
                    <div className="flex justify-center space-x-2 text-sm">
                        <Link href="/" className="text-gray-500 hover:text-brand-primary">Home</Link>
                        <span className="text-gray-400">•</span>
                        <span className="text-brand-primary">Cart</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 py-16">
                {!cart || cart.items.length === 0 ? (
                    <div className="text-center py-20 bg-white border border-gray-100 rounded-lg shadow-sm">
                        <svg className="w-20 h-20 mx-auto text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        <h2 className="text-2xl font-bold text-brand-secondary mb-4">Your cart is currently empty.</h2>
                        <p className="text-gray-500 mb-8">Before proceed to checkout you must add some products to your shopping cart.</p>
                        <Link href="/shop" className="inline-block px-8 py-4 bg-brand-primary text-white font-bold rounded hover:bg-red-600 transition-colors">
                            Return To Shop
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Cart Table */}
                        <div className="w-full lg:w-2/3">
                            <div className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 text-brand-secondary uppercase text-sm tracking-wider">
                                            <th className="p-6 font-bold" colSpan={2}>Product</th>
                                            <th className="p-6 font-bold">Price</th>
                                            <th className="p-6 font-bold">Quantity</th>
                                            <th className="p-6 font-bold">Total</th>
                                            <th className="p-6 font-bold text-right">Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {cart.items.map((item: any) => (
                                            <tr key={item.id}>
                                                <td className="p-6 w-24">
                                                    <img 
                                                        src={item.product_variant?.image || item.product.images?.[0]?.path || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80'} 
                                                        alt={item.product.name} 
                                                        className="w-20 h-24 object-cover rounded bg-gray-50"
                                                    />
                                                </td>
                                                <td className="p-6">
                                                    <Link href={`/shop/${item.product.slug}`} className="font-bold text-brand-secondary hover:text-brand-primary transition-colors text-lg font-serif">
                                                        {item.product.name}
                                                    </Link>
                                                    {item.product_variant && (
                                                        <div className="text-sm text-gray-500 mt-1">
                                                            {item.product_variant.size && <span>Size: {item.product_variant.size}</span>}
                                                            {item.product_variant.size && item.product_variant.color && <span className="mx-2">|</span>}
                                                            {item.product_variant.color && <span>Color: {item.product_variant.color}</span>}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="p-6 font-medium text-gray-600">
                                                    ${parseFloat(item.product_variant?.price || item.product.sale_price || item.product.price).toFixed(2)}
                                                </td>
                                                <td className="p-6">
                                                    <div className="flex border border-gray-300 rounded overflow-hidden h-10 w-28">
                                                        <button 
                                                            className="px-3 bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        >-</button>
                                                        <input 
                                                            type="text" 
                                                            readOnly 
                                                            className="w-full text-center focus:outline-none font-bold bg-white"
                                                            value={item.quantity}
                                                        />
                                                        <button 
                                                            className="px-3 bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        >+</button>
                                                    </div>
                                                </td>
                                                <td className="p-6 font-bold text-brand-secondary">
                                                    ${(parseFloat(item.product_variant?.price || item.product.sale_price || item.product.price) * item.quantity).toFixed(2)}
                                                </td>
                                                <td className="p-6 text-right">
                                                    <button 
                                                        onClick={() => removeItem(item.id)}
                                                        className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-brand-primary hover:text-white transition-colors"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            
                            <div className="mt-6 flex justify-between items-center">
                                <Link href="/shop" className="px-6 py-3 border-2 border-brand-secondary text-brand-secondary font-bold rounded hover:bg-brand-secondary hover:text-white transition-colors">
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>

                        {/* Cart Totals */}
                        <div className="w-full lg:w-1/3">
                            <div className="bg-gray-50 p-8 rounded-lg border-2 border-brand-primary sticky top-24">
                                <h3 className="text-2xl font-bold text-brand-secondary mb-6 font-serif">Cart Totals</h3>
                                
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                                        <span className="text-gray-600 font-medium">Subtotal</span>
                                        <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2">
                                        <span className="text-lg font-bold text-brand-secondary">Total</span>
                                        <span className="text-3xl font-bold text-brand-primary">${subtotal.toFixed(2)}</span>
                                    </div>
                                </div>
                                
                                <Link 
                                    href="/checkout" 
                                    className="block text-center w-full bg-brand-primary text-white font-bold uppercase tracking-wider py-4 rounded hover:bg-red-600 transition-colors shadow-lg shadow-red-500/30"
                                >
                                    Proceed To Checkout
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
