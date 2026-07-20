import { Head, useForm, Link } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';
import { useState } from 'react';

export default function Index({ cart, auth }: any) {
    const { data, setData, post, processing, errors } = useForm({
        shipping_address: '',
        shipping_province: '',
        shipping_district: '',
        shipping_commune: '',
        shipping_phone: '',
        payment_method: 'cod',
    });

    const [paymentModal, setPaymentModal] = useState(false);

    const subtotal = cart.items.reduce((total: number, item: any) => {
        const itemPrice = parseFloat(item.product_variant?.price || item.product.sale_price || item.product.price);
        return total + (itemPrice * item.quantity);
    }, 0);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (data.payment_method !== 'cod' && !paymentModal) {
            setPaymentModal(true);
            return;
        }

        post('/checkout');
    };

    const confirmMockPayment = () => {
        setPaymentModal(false);
        post('/checkout');
    };

    return (
        <MainLayout>
            <Head title="Checkout" />
            
            <div className="bg-gray-100 py-12">
                <div className="container mx-auto px-4 lg:px-8">
                    <h1 className="text-4xl font-bold text-brand-secondary mb-8 text-center font-serif">Checkout</h1>
                    
                    <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
                        
                        {/* Billing & Shipping Details Form */}
                        <div className="w-full lg:w-2/3 bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                            <h2 className="text-2xl font-bold text-brand-secondary mb-6 border-b pb-4">Shipping Details (Cambodia)</h2>
                            
                            {!auth.user && (
                                <div className="mb-6 p-4 bg-blue-50 text-blue-800 rounded">
                                    Returning customer? <Link href="/login" className="font-bold underline">Click here to login</Link>
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                                        <input 
                                            type="tel" 
                                            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-brand-primary"
                                            value={data.shipping_phone} 
                                            onChange={e => setData('shipping_phone', e.target.value)} 
                                        />
                                        {errors.shipping_phone && <p className="text-red-500 text-sm mt-1">{errors.shipping_phone}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Province / City *</label>
                                        <select 
                                            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-brand-primary bg-white"
                                            value={data.shipping_province} 
                                            onChange={e => setData('shipping_province', e.target.value)} 
                                        >
                                            <option value="">Select Province</option>
                                            <option value="Phnom Penh">Phnom Penh</option>
                                            <option value="Siem Reap">Siem Reap</option>
                                            <option value="Battambang">Battambang</option>
                                            <option value="Sihanoukville">Sihanoukville</option>
                                            <option value="Kandal">Kandal</option>
                                        </select>
                                        {errors.shipping_province && <p className="text-red-500 text-sm mt-1">{errors.shipping_province}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">District / Khan *</label>
                                        <input 
                                            type="text" 
                                            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-brand-primary"
                                            value={data.shipping_district} 
                                            onChange={e => setData('shipping_district', e.target.value)} 
                                        />
                                        {errors.shipping_district && <p className="text-red-500 text-sm mt-1">{errors.shipping_district}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Commune / Sangkat *</label>
                                        <input 
                                            type="text" 
                                            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-brand-primary"
                                            value={data.shipping_commune} 
                                            onChange={e => setData('shipping_commune', e.target.value)} 
                                        />
                                        {errors.shipping_commune && <p className="text-red-500 text-sm mt-1">{errors.shipping_commune}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Street Address (House No, Street) *</label>
                                    <input 
                                        type="text" 
                                        placeholder="House number and street name"
                                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-brand-primary"
                                        value={data.shipping_address} 
                                        onChange={e => setData('shipping_address', e.target.value)} 
                                    />
                                    {errors.shipping_address && <p className="text-red-500 text-sm mt-1">{errors.shipping_address}</p>}
                                </div>
                            </form>
                        </div>
                        
                        {/* Order Summary & Payment */}
                        <div className="w-full lg:w-1/3">
                            <div className="bg-gray-50 border-2 border-brand-primary p-6 rounded-lg sticky top-24">
                                <h3 className="text-xl font-bold text-brand-secondary mb-6 uppercase tracking-wider">Your Order</h3>
                                
                                <div className="space-y-4 mb-6 border-b border-gray-200 pb-6">
                                    {cart.items.map((item: any) => (
                                        <div key={item.id} className="flex justify-between text-sm">
                                            <span className="text-gray-600">
                                                {item.product.name} 
                                                {item.product_variant && <span className="text-xs ml-1 text-gray-400">({item.product_variant.size} / {item.product_variant.color})</span>}
                                                <strong className="text-gray-900 ml-1">× {item.quantity}</strong>
                                            </span>
                                            <span className="font-bold text-gray-900">
                                                ${(parseFloat(item.product_variant?.price || item.product.sale_price || item.product.price) * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-lg font-bold text-brand-secondary">Total</span>
                                    <span className="text-2xl font-bold text-brand-primary">${subtotal.toFixed(2)}</span>
                                </div>
                                
                                <h3 className="text-md font-bold text-brand-secondary mb-3">Payment Method</h3>
                                <div className="space-y-3 mb-6">
                                    <label className={`block p-4 border rounded cursor-pointer transition-colors ${data.payment_method === 'cod' ? 'border-brand-primary bg-red-50' : 'border-gray-200 bg-white hover:border-brand-primary'}`}>
                                        <div className="flex items-center space-x-3">
                                            <input type="radio" name="payment" value="cod" checked={data.payment_method === 'cod'} onChange={() => setData('payment_method', 'cod')} className="w-4 h-4 text-brand-primary focus:ring-brand-primary" />
                                            <span className="font-medium text-gray-900">Cash on Delivery</span>
                                        </div>
                                    </label>
                                    <label className={`block p-4 border rounded cursor-pointer transition-colors ${data.payment_method === 'aba' ? 'border-brand-primary bg-red-50' : 'border-gray-200 bg-white hover:border-brand-primary'}`}>
                                        <div className="flex items-center space-x-3">
                                            <input type="radio" name="payment" value="aba" checked={data.payment_method === 'aba'} onChange={() => setData('payment_method', 'aba')} className="w-4 h-4 text-brand-primary focus:ring-brand-primary" />
                                            <span className="font-medium text-gray-900">ABA PayWay (Mock)</span>
                                        </div>
                                    </label>
                                    <label className={`block p-4 border rounded cursor-pointer transition-colors ${data.payment_method === 'khqr' ? 'border-brand-primary bg-red-50' : 'border-gray-200 bg-white hover:border-brand-primary'}`}>
                                        <div className="flex items-center space-x-3">
                                            <input type="radio" name="payment" value="khqr" checked={data.payment_method === 'khqr'} onChange={() => setData('payment_method', 'khqr')} className="w-4 h-4 text-brand-primary focus:ring-brand-primary" />
                                            <span className="font-medium text-gray-900">KHQR Scan (Mock)</span>
                                        </div>
                                    </label>
                                    <label className={`block p-4 border rounded cursor-pointer transition-colors ${data.payment_method === 'card' ? 'border-brand-primary bg-red-50' : 'border-gray-200 bg-white hover:border-brand-primary'}`}>
                                        <div className="flex items-center space-x-3">
                                            <input type="radio" name="payment" value="card" checked={data.payment_method === 'card'} onChange={() => setData('payment_method', 'card')} className="w-4 h-4 text-brand-primary focus:ring-brand-primary" />
                                            <span className="font-medium text-gray-900">Credit Card (Mock)</span>
                                        </div>
                                    </label>
                                </div>
                                
                                <button 
                                    onClick={submit}
                                    disabled={processing}
                                    className="w-full bg-brand-primary text-white font-bold uppercase tracking-wider py-4 rounded hover:bg-red-600 transition-colors shadow-lg shadow-red-500/30 disabled:opacity-50"
                                >
                                    {processing ? 'Processing...' : 'Place Order'}
                                </button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>

            {/* Mock Payment Modal */}
            {paymentModal && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Simulated Payment Gateway</h2>
                        <p className="text-gray-500 mb-6">This is a mock checkout interface for staging. No real transactions will occur. Amount: <strong>${subtotal.toFixed(2)}</strong> via <strong>{data.payment_method.toUpperCase()}</strong>.</p>
                        
                        <div className="flex gap-4 justify-center">
                            <button onClick={() => setPaymentModal(false)} className="px-6 py-3 border border-gray-300 rounded font-bold text-gray-600 hover:bg-gray-50 transition-colors">Cancel</button>
                            <button onClick={confirmMockPayment} disabled={processing} className="px-6 py-3 bg-green-500 text-white rounded font-bold hover:bg-green-600 transition-colors">Simulate Success</button>
                        </div>
                    </div>
                </div>
            )}
        </MainLayout>
    );
}
