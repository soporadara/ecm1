import React from 'react';
import { Head } from '@inertiajs/react';

export default function Receipt({ receipt, settings }: any) {
    const receiptDate = new Date(receipt.created_at);
    const dateFormatted = receiptDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const timeFormatted = receiptDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    // Hardcoded Logo as requested
    const logoUrl = '/logo.png';

    // Determine currency symbol
    const currencyCode = receipt.snapshot_json?.order?.currency_code || receipt.order?.currency_code || 'USD';
    const sym = currencyCode === 'VND' ? '₫' : currencyCode === 'KHR' ? '៛' : '$';

    return (
        <div className="min-h-screen bg-gray-50 py-8 print:py-0 print:bg-white text-gray-900 font-sans px-4">
            <Head title={`Receipt - ${receipt.receipt_number}`} />

            {/* Print Button */}
            <div className="max-w-3xl mx-auto mb-6 print:hidden flex justify-end items-center">
                <button 
                    onClick={() => window.print()}
                    className="bg-gray-800 text-white px-5 py-2.5 rounded shadow hover:bg-gray-700 transition-colors flex items-center gap-2 font-medium text-sm"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                    Print / Save PDF
                </button>
            </div>

            {/* Receipt Container */}
            <div className="max-w-3xl mx-auto bg-white p-10 md:p-14 shadow-lg border border-gray-200 print:border-none print:shadow-none print:p-0 relative">
                
                {receipt.payment_status === 'paid' && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 opacity-[0.05] pointer-events-none">
                        <span className="text-[12rem] font-black text-gray-900 uppercase tracking-tighter border-8 border-gray-900 p-8 rounded-3xl">PAID</span>
                    </div>
                )}
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start mb-12 border-b-2 border-gray-800 pb-8">
                    <div className="mb-6 md:mb-0 flex-1">
                        <img src={logoUrl} alt="Logo" className="h-16 md:h-20 object-contain mb-4" />
                        <div className="text-sm text-gray-600 leading-relaxed">
                            <p className="font-bold text-gray-900 text-lg">{settings?.site_name || 'MVM Logistics'}</p>
                            <p>{settings?.store_address || settings?.address || 'Phnom Penh, Cambodia'}</p>
                            <p>{settings?.support_email || settings?.email || 'info@mvmlogistics.asia'}</p>
                            <p>{settings?.support_phone || settings?.phone || '+855 31 766 9555'}</p>
                        </div>
                    </div>
                    
                    <div className="text-left md:text-right w-full md:w-auto mt-4 md:mt-0 flex-1">
                        <h1 className="text-4xl font-black tracking-tighter uppercase text-gray-900 mb-2">RECEIPT</h1>
                        <div className="text-sm text-gray-600 space-y-1">
                            <p className="flex justify-start md:justify-end gap-3"><span className="font-bold uppercase text-gray-500 w-24 md:w-auto">Receipt No:</span> <span className="font-mono text-gray-900 font-bold">#{receipt.receipt_number}</span></p>
                            <p className="flex justify-start md:justify-end gap-3"><span className="font-bold uppercase text-gray-500 w-24 md:w-auto">Date:</span> <span className="font-medium text-gray-900">{dateFormatted}</span></p>
                            <p className="flex justify-start md:justify-end gap-3">
                                <span className="font-bold uppercase text-gray-500 w-24 md:w-auto">Status:</span> 
                                <span className={`font-bold uppercase tracking-wider ${receipt.payment_status === 'paid' ? 'text-green-600' : 'text-red-600'}`}>
                                    {receipt.payment_status}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Billing Info */}
                <div className="mb-10 flex flex-col md:flex-row justify-between gap-6">
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Billed To</h3>
                        <p className="font-bold text-xl text-gray-900 mb-1">{receipt.user?.name}</p>
                        <div className="text-sm text-gray-600 space-y-1">
                            <p>Customer Code: <span className="font-mono font-medium">{receipt.user?.customer_code}</span></p>
                            <p>{receipt.user?.phone_e164 || receipt.user?.phone || 'N/A'}</p>
                            {receipt.user?.email && <p>{receipt.user.email}</p>}
                        </div>
                    </div>
                </div>

                {/* Order Line Items */}
                <div className="mb-10 relative z-10">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-y-2 border-gray-800 text-gray-900 bg-gray-50">
                                <th className="py-3 px-2 font-bold text-xs uppercase tracking-wider">Description</th>
                                <th className="py-3 px-2 font-bold text-xs uppercase tracking-wider text-center w-20">Qty</th>
                                <th className="py-3 px-2 font-bold text-xs uppercase tracking-wider text-right w-32">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {receipt.snapshot_json?.items?.map((item: any, idx: number) => (
                                <tr key={idx}>
                                    <td className="py-4 px-2">
                                        <p className="font-bold text-gray-900">{item.name || item.product_name || 'Service Item'}</p>
                                        <p className="text-sm text-gray-500 mt-0.5">
                                            {item.description || item.type || (item.order_number ? `Order REF: ${item.order_number}` : '')}
                                        </p>
                                    </td>
                                    <td className="py-4 px-2 text-center font-medium text-gray-700">{item.quantity || 1}</td>
                                    <td className="py-4 px-2 text-right text-gray-400 font-mono text-sm">--</td>
                                </tr>
                            )) || (
                                <tr>
                                    <td className="py-8 text-center text-gray-400 italic text-sm" colSpan={3}>
                                        No items recorded for this receipt.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Financial Totals */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16">
                    <div className="w-full md:w-1/2 text-sm text-gray-500">
                        <h4 className="font-bold text-gray-900 mb-2 uppercase text-xs tracking-wider">Payment Information</h4>
                        <p>All transactions are final.</p>
                        <p className="mt-1">For questions concerning this receipt, please contact our support team.</p>
                    </div>
                    
                    <div className="w-full md:w-72 relative z-10">
                        <div className="space-y-3">
                            <div className="flex justify-between text-gray-600 text-sm">
                                <span>Subtotal</span>
                                <span>{sym} {Number(receipt.subtotal).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600 text-sm">
                                <span>Service & Shipping Fees</span>
                                <span>{sym} {Number(receipt.charges).toFixed(2)}</span>
                            </div>
                            {parseFloat(receipt.discount) > 0 && (
                                <div className="flex justify-between text-gray-600 text-sm">
                                    <span>Discount</span>
                                    <span>- {sym} {Number(receipt.discount).toFixed(2)}</span>
                                </div>
                            )}
                            <div className="flex justify-between items-center border-t-2 border-gray-800 pt-3 mt-3">
                                <span className="text-lg font-bold text-gray-900">Total</span>
                                <span className="text-xl font-bold text-gray-900">{sym} {Number(receipt.total).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Notes */}
                <div className="text-center text-sm text-gray-500 border-t border-gray-200 pt-8">
                    <p className="font-bold text-gray-900 mb-1">{settings?.site_name || 'MVM Logistics'}</p>
                    <p>Thank you for choosing us for your logistics needs.</p>
                </div>
            </div>
        </div>
    );
}
