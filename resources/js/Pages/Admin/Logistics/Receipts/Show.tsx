import { Head, Link } from '@inertiajs/react';

export default function ReceiptShow({ receipt }: any) {
    // Print styling is handled via CSS
    return (
        <div className="min-h-screen bg-gray-100 py-8 print:py-0 print:bg-white">
            <Head title={`Receipt - ${receipt.receipt_number}`} />

            <div className="max-w-2xl mx-auto mb-4 print:hidden flex justify-between items-center px-4">
                <Link href={`/admin/orders/${receipt.order_id}`} className="text-gray-600 hover:text-black">
                    &larr; Back to Order
                </Link>
                <button 
                    onClick={() => window.print()}
                    className="bg-brand-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-brand-secondary shadow"
                >
                    🖨️ Print Receipt
                </button>
            </div>

            <div className="max-w-2xl mx-auto bg-white p-12 shadow-xl print:shadow-none print:p-0">
                {/* Receipt Header */}
                <div className="flex justify-between items-start mb-12 border-b-2 border-gray-900 pb-8">
                    <div>
                        <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">RECEIPT</h1>
                        <p className="text-sm text-gray-500 font-mono">#{receipt.receipt_number}</p>
                        <p className="text-sm text-gray-500 font-mono">Date: {new Date(receipt.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                        <h2 className="text-xl font-bold font-serif mb-1">Rafel Logistics</h2>
                        <p className="text-sm text-gray-500">Phnom Penh, Cambodia</p>
                        <p className="text-sm text-gray-500">contact@rafel.com</p>
                    </div>
                </div>

                {/* Customer Details */}
                <div className="mb-12">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2 border-b border-gray-200 pb-1">Billed To</h3>
                    <p className="font-bold text-lg">{receipt.user?.name}</p>
                    <p className="text-sm text-gray-600">Code: <span className="font-mono">{receipt.user?.customer_code}</span></p>
                    <p className="text-sm text-gray-600">{receipt.user?.phone_e164}</p>
                </div>

                {/* Order Line Items (from Snapshot) */}
                <table className="w-full mb-12 text-left border-collapse">
                    <thead>
                        <tr className="border-b-2 border-gray-900">
                            <th className="py-3 font-bold text-sm uppercase">Item Description</th>
                            <th className="py-3 font-bold text-sm uppercase text-center">Qty</th>
                            <th className="py-3 font-bold text-sm uppercase text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {/* Use snapshot data if available, else fallback */}
                        <tr>
                            <td className="py-4">
                                <p className="font-bold">{receipt.order?.title || 'Order Items'}</p>
                                <p className="text-sm text-gray-500">{receipt.order?.variant}</p>
                            </td>
                            <td className="py-4 text-center">{receipt.order?.quantity || 1}</td>
                            <td className="py-4 text-right font-medium">¥ {receipt.subtotal}</td>
                        </tr>
                    </tbody>
                </table>

                {/* Totals */}
                <div className="flex justify-end mb-16">
                    <div className="w-64 space-y-3">
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Subtotal</span>
                            <span>¥ {receipt.subtotal}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Charges/Shipping</span>
                            <span>¥ {receipt.charges}</span>
                        </div>
                        {parseFloat(receipt.discount) > 0 && (
                            <div className="flex justify-between text-sm text-red-600">
                                <span>Discount</span>
                                <span>- ¥ {receipt.discount}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-xl font-black border-t-2 border-gray-900 pt-3">
                            <span>TOTAL</span>
                            <span>¥ {receipt.total}</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold pt-1">
                            <span>Status</span>
                            <span className={`uppercase ${receipt.payment_status === 'paid' ? 'text-green-600' : 'text-red-600'}`}>
                                {receipt.payment_status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center text-sm text-gray-500 border-t border-gray-200 pt-8 mt-auto">
                    <p>Thank you for choosing Rafel Logistics.</p>
                    <p className="mt-1">For support, please contact us on Telegram with your receipt number.</p>
                </div>
            </div>
        </div>
    );
}
