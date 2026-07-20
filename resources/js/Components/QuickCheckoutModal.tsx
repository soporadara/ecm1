import React, { useState, useCallback } from 'react';
import { useForm, usePage } from '@inertiajs/react';

// NOTE: Since the Google Maps API requires a valid API key with billing enabled to function, 
// this component handles it gracefully. If a key is provided in .env (VITE_GOOGLE_MAPS_API_KEY),
// the Google Maps library can be loaded. Otherwise, we provide a clean manual input fallback.

export default function QuickCheckoutModal({ isOpen, onClose, product, variant, quantity }: any) {
    const { auth } = usePage().props as any;
    const [couponCode, setCouponCode] = useState('');
    const [couponDiscount, setCouponDiscount] = useState<{type: string, value: number} | null>(null);
    const [couponError, setCouponError] = useState('');
    const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

    const unitPrice = variant ? variant.price : (product.sale_price || product.price);
    const subtotal = unitPrice * quantity;
    
    let discountAmount = 0;
    if (couponDiscount) {
        if (couponDiscount.type === 'percent') {
            discountAmount = subtotal * (couponDiscount.value / 100);
        } else {
            discountAmount = couponDiscount.value;
        }
    }
    const total = Math.max(0, subtotal - discountAmount);

    const { data, setData, post, processing, errors, reset } = useForm({
        product_id: product.id,
        product_variant_id: variant ? variant.id : null,
        quantity: quantity,
        shipping_address: '',
        shipping_phone: auth?.user?.phone || '',
        payment_method: 'cod',
        map_coordinates: '',
        coupon_code: ''
    });

    const applyCoupon = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (!couponCode) return;
        setIsApplyingCoupon(true);
        setCouponError('');
        
        try {
            const res = await fetch('/api/coupons/validate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ code: couponCode })
            });
            const result = await res.json();
            if (result.valid) {
                setCouponDiscount(result.coupon);
                setData('coupon_code', result.coupon.code);
            } else {
                setCouponError(result.message);
                setCouponDiscount(null);
                setData('coupon_code', '');
            }
        } catch (err) {
            setCouponError('Error validating coupon');
        }
        setIsApplyingCoupon(false);
    };

    const submitOrder = (e: React.FormEvent) => {
        e.preventDefault();
        post('/checkout/quick', {
            preserveScroll: true,
            onSuccess: () => {
                onClose();
            }
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 flex flex-col md:flex-row">
                
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 dark:hover:text-white z-20">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                {/* Left Side: Product Summary & Form */}
                <div className="w-full md:w-1/2 p-6 md:p-8 border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-800">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 font-serif">Quick Checkout</h2>
                    
                    {/* Item summary */}
                    <div className="flex gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
                        <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                            <img src={product.images?.[0]?.path} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 dark:text-gray-200">{product.name}</h3>
                            {variant && <p className="text-sm text-gray-500">{variant.size} / {variant.color}</p>}
                            <p className="text-sm font-medium mt-1">${unitPrice} x {quantity}</p>
                        </div>
                    </div>

                    <form id="quick-checkout-form" onSubmit={submitOrder} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Delivery Address</label>
                            <textarea 
                                required
                                rows={2}
                                className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded shadow-sm focus:border-brand-primary focus:ring-brand-primary"
                                placeholder="Street name, Building, Apartment No."
                                value={data.shipping_address}
                                onChange={e => setData('shipping_address', e.target.value)}
                            />
                            {errors.shipping_address && <p className="text-red-500 text-xs mt-1">{errors.shipping_address}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                            <input 
                                type="tel"
                                required
                                className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded shadow-sm focus:border-brand-primary focus:ring-brand-primary"
                                placeholder="+855 12 345 678"
                                value={data.shipping_phone}
                                onChange={e => setData('shipping_phone', e.target.value)}
                            />
                            {errors.shipping_phone && <p className="text-red-500 text-xs mt-1">{errors.shipping_phone}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Payment Method</label>
                            <select 
                                className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded shadow-sm focus:border-brand-primary focus:ring-brand-primary"
                                value={data.payment_method}
                                onChange={e => setData('payment_method', e.target.value)}
                            >
                                <option value="cod">Cash on Delivery</option>
                                <option value="aba">ABA Pay</option>
                                <option value="card">Credit Card</option>
                            </select>
                        </div>
                    </form>
                </div>

                {/* Right Side: Map & Totals */}
                <div className="w-full md:w-1/2 p-6 md:p-8 bg-gray-50 dark:bg-gray-800/50 flex flex-col">
                    
                    {/* Fake Map UI / Coordinates Capture */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pin Your Location (Optional)</label>
                        <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden relative flex items-center justify-center group cursor-pointer border border-gray-300 dark:border-gray-600">
                            {/* Google Map Mock/Placeholder */}
                            <div className="text-center p-4">
                                <svg className="w-8 h-8 text-red-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Map UI requires <code className="font-bold">VITE_GOOGLE_MAPS_API_KEY</code> in .env</p>
                            </div>
                            
                            {/* Simulator button */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                <button 
                                    type="button"
                                    onClick={() => setData('map_coordinates', '11.5564, 104.9282')}
                                    className="px-4 py-2 bg-white text-gray-900 font-bold rounded shadow-lg text-sm hover:bg-gray-100 transition-colors"
                                >
                                    Drop Pin Here
                                </button>
                            </div>
                        </div>
                        {data.map_coordinates && <p className="text-xs text-green-600 mt-2 font-medium">✓ Location pinned: {data.map_coordinates}</p>}
                    </div>

                    {/* Coupon System */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Have a coupon?</label>
                        <div className="flex gap-2">
                            <input 
                                type="text"
                                className="flex-1 border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded shadow-sm focus:border-brand-primary focus:ring-brand-primary uppercase text-sm"
                                placeholder="ENTER CODE"
                                value={couponCode}
                                onChange={e => setCouponCode(e.target.value.toUpperCase())}
                                disabled={couponDiscount !== null}
                            />
                            <button 
                                type="button"
                                onClick={applyCoupon}
                                disabled={!couponCode || couponDiscount !== null || isApplyingCoupon}
                                className="px-4 bg-gray-900 dark:bg-gray-700 text-white font-bold rounded hover:bg-gray-800 disabled:opacity-50 text-sm"
                            >
                                {isApplyingCoupon ? '...' : couponDiscount ? 'Applied' : 'Apply'}
                            </button>
                        </div>
                        {couponError && <p className="text-red-500 text-xs mt-1">{couponError}</p>}
                    </div>

                    {/* Totals */}
                    <div className="mt-auto space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        {couponDiscount && (
                            <div className="flex justify-between text-sm text-green-600 dark:text-green-400 font-medium">
                                <span>Discount ({couponDiscount.code})</span>
                                <span>-${discountAmount.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-gray-700">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>

                    <button 
                        form="quick-checkout-form"
                        type="submit"
                        disabled={processing}
                        className="w-full mt-6 h-14 bg-brand-primary text-white font-bold uppercase tracking-widest hover:bg-brand-secondary transition-colors rounded shadow-lg shadow-red-500/30 disabled:opacity-50"
                    >
                        {processing ? 'Processing...' : 'Place Order Now'}
                    </button>
                </div>
            </div>
        </div>
    );
}
