import { Head, Link, useForm } from '@inertiajs/react';
import React, { useState, type FormEvent } from 'react';
import toast from 'react-hot-toast';
import AdminLayout from '../../../../Layouts/AdminLayout';

const money = (value: any, currency = 'USD') => {
    if (value === null || value === undefined || value === '') return 'Pending';
    if (currency === 'VND') return `₫${Math.round(Number(value || 0)).toLocaleString('en-US')}`;
    return `$${Number(value || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};
const label = (value: any) => {
    if (value === 'in_progress') return 'Progress';
    return String(value || 'not set').replace(/_/g, ' ');
};

export default function OrderShow({ order, statuses, paymentStatuses = [], auditLogs }: any) {
    const initVal = (val: any) => (!val || Number(val) === 0 ? '' : val);

    const { data, setData, put, processing, recentlySuccessful } = useForm({
        status: order.status,
        payment_status: order.payment_status || 'unpaid',
        internal_note: '',
        public_message: order.customer_visible_note || '',
        currency_code: order.currency_code || 'USD',
        subtotal: initVal(order.subtotal_amount || order.subtotal),
        logistics_fee: initVal(order.logistics_fee_amount || order.logistics_fee),
        service_fee: initVal(order.service_fee_amount || order.service_fee || order.service_charge),
        delivery_fee: initVal(order.delivery_fee_amount || order.delivery_fee || order.delivery_charge),
        discount: initVal(order.discount_amount || order.discount),
        pricing_notes: order.pricing_notes || '',
    });

    const updateStatus = (event: FormEvent) => {
        event.preventDefault();
        put(`/admin/logistics/orders/${order.id}`, { preserveScroll: true });
    };

    const allImages = order.items?.flatMap((item: any) => item.images || []) || [];
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const openLightbox = (image: any) => {
        const index = allImages.findIndex((img: any) => img.id === image.id);
        if (index !== -1) setLightboxIndex(index);
    };

    const handleExport = async (type: 'pdf' | 'csv') => {
        try {
            if (type === 'pdf') {
                window.open(`/admin/receipts/generate/${order.id}`, '_blank');
                return;
            }

            const toastId = toast.loading(`Exporting CSV...`);
            const url = `/admin/logistics/orders/${order.id}/export?type=csv`;
            
            const response = await fetch(url);
            if (!response.ok) throw new Error('Export failed');
            
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = `order_${order.order_number}.csv`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            
            toast.success(`Exported CSV successfully!`, { id: toastId });
        } catch (error) {
            toast.error(`Failed to export CSV`);
        }
    };

    const hasAnyPricing = data.subtotal !== '' || data.logistics_fee !== '' || data.service_fee !== '' || data.delivery_fee !== '' || data.discount !== '';
    const total = hasAnyPricing ? Number(data.subtotal || 0) + Number(data.logistics_fee || 0) + Number(data.service_fee || 0) + Number(data.delivery_fee || 0) - Number(data.discount || 0) : '';

    return (
        <>
        <AdminLayout title={`Order ${order.order_number}`}>
            <Head title={`Order ${order.order_number}`} />

            <div className="flex flex-col gap-4 mb-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <Link href="/admin/logistics/orders" className="text-admin-text-muted hover:text-admin-text text-sm font-medium mb-2 inline-block">Back to Orders</Link>
                    <h1 className="text-3xl font-bold text-admin-text">Order {order.order_number}</h1>
                    <p className="text-sm font-medium text-admin-text-muted">{label(order.status)} · {order.items?.length || 0} product request(s) · {new Date(order.created_at).toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                    <div className="relative group">
                        <button className="rounded-xl bg-admin-surface border border-admin-border px-5 py-3 text-sm font-black uppercase tracking-wider text-admin-text hover:bg-admin-surface-muted transition-colors flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            Export
                            <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                        </button>
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-admin-surface border border-admin-border rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[100] overflow-hidden">
                            <button onClick={() => handleExport('pdf')} className="block w-full text-left px-4 py-3 text-sm font-bold text-admin-text hover:bg-admin-surface-muted transition-colors">Export as PDF</button>
                            <button onClick={() => handleExport('csv')} className="block w-full text-left px-4 py-3 text-sm font-bold text-admin-text hover:bg-admin-surface-muted transition-colors">Export as CSV</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <section className="rounded-2xl border border-admin-border/50 bg-admin-surface p-6 shadow-sm">
                        <h2 className="text-xl font-bold text-admin-text mb-4">Customer Snapshot</h2>
                        <div className="grid gap-4 sm:grid-cols-2 text-sm">
                            <div>
                                <p className="text-admin-text-muted font-bold uppercase text-xs">Customer</p>
                                <Link href={`/admin/customers/${order.user_id}`} className="font-bold text-admin-primary hover:underline">
                                    {order.customer_name_snapshot || order.user?.name} ({order.customer_code_snapshot || order.user?.customer_code})
                                </Link>
                            </div>
                            <div>
                                <p className="text-admin-text-muted font-bold uppercase text-xs">Contact</p>
                                <p className="font-medium text-admin-text">{order.customer_email_snapshot}</p>
                                <p className="font-medium text-admin-text">{order.customer_phone_snapshot}</p>
                            </div>
                            <div className="sm:col-span-2">
                                <p className="text-admin-text-muted font-bold uppercase text-xs">Delivery Address</p>
                                <p className="whitespace-pre-line font-medium text-admin-text">{order.delivery_address_snapshot || order.shipping_address}</p>
                            </div>
                            {order.customer_notes && (
                                <div className="sm:col-span-2">
                                    <p className="text-admin-text-muted font-bold uppercase text-xs">Customer Message</p>
                                    <p className="rounded-xl bg-admin-surface-muted p-3 font-medium text-admin-text">{order.customer_notes}</p>
                                </div>
                            )}
                        </div>
                    </section>

                    <section className="rounded-2xl border border-admin-border/50 bg-admin-surface p-0 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-admin-border/50">
                            <h2 className="text-xl font-bold text-admin-text">Requested Products</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead className="bg-admin-surface-muted/50 text-admin-text-muted uppercase text-[10px] font-black tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">Product Details</th>
                                        <th className="px-6 py-4">Attributes</th>
                                        <th className="px-6 py-4">Pricing</th>
                                        <th className="px-6 py-4">References</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-admin-border/50">
                                    {order.items?.map((item: any, index: number) => (
                                        <tr key={item.id} className="hover:bg-admin-surface-muted/30 transition-colors">
                                            <td className="px-6 py-4 align-top whitespace-normal min-w-[250px]">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[10px] font-black uppercase text-admin-text-muted">Item {index + 1}</span>
                                                    <strong className="text-admin-text text-base">{item.product_name}</strong>
                                                    {item.description && <p className="text-xs text-admin-text-muted mt-1">{item.description}</p>}
                                                    {item.customer_notes && (
                                                        <div className="mt-2 rounded-lg bg-admin-surface-muted p-2 text-xs text-admin-text">
                                                            <span className="font-bold block mb-1">Note:</span>
                                                            {item.customer_notes}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 align-top">
                                                {(item.type || item.color || item.size) ? (
                                                    <div className="flex flex-col gap-1 text-xs text-admin-text font-medium">
                                                        {item.type && <span>Type: {item.type}</span>}
                                                        {item.color && <span>Color: {item.color}</span>}
                                                        {item.size && <span>Size: {item.size}</span>}
                                                    </div>
                                                ) : <span className="text-admin-text-muted text-xs italic">N/A</span>}
                                            </td>
                                            <td className="px-6 py-4 align-top">
                                                <div className="flex flex-col gap-1 text-sm">
                                                    <span className="text-admin-text-muted text-xs">Qty: <strong className="text-admin-text">{item.quantity}</strong></span>
                                                    <span className="text-admin-text-muted text-xs">Unit: <strong className="text-admin-text">{money(item.price || item.estimated_unit_price, order.currency_code || 'USD')}</strong></span>
                                                    <span className="mt-1 font-black text-admin-primary">{money(item.line_total || Number(item.price || 0) * Number(item.quantity || 0), order.currency_code || 'USD')}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 align-top min-w-[200px] whitespace-normal">
                                                <div className="flex flex-col gap-3">
                                                    {item.urls?.length > 0 && (
                                                        <div className="flex flex-col gap-1">
                                                            {item.urls.map((url: any) => {
                                                                const ensureHttp = (u: string) => (!u.startsWith('http://') && !u.startsWith('https://') ? `https://${u}` : u);
                                                                return (
                                                                    <a key={url.id} href={ensureHttp(url.url)} target="_blank" rel="noreferrer" className="text-xs font-semibold text-admin-primary hover:underline break-all">
                                                                        {url.domain || url.url}
                                                                    </a>
                                                                );
                                                            })}
                                                        </div>
                                                    )}
                                                    {item.images?.length > 0 && (
                                                        <div className="flex flex-wrap gap-2">
                                                            {item.images.map((image: any) => (
                                                                <button
                                                                    key={image.id}
                                                                    type="button"
                                                                    onClick={() => openLightbox(image)}
                                                                    className="block w-12 h-12 shrink-0 overflow-hidden rounded bg-admin-surface-muted border border-admin-border hover:border-admin-primary transition-colors cursor-zoom-in"
                                                                >
                                                                    <img
                                                                        src={image.thumbnail_url || image.url}
                                                                        alt={image.original_filename || 'Reference'}
                                                                        className="h-full w-full object-cover"
                                                                        onError={(e) => {
                                                                            e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%2394a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>';
                                                                            e.currentTarget.className = 'h-full w-full object-cover p-2 opacity-50';
                                                                        }}
                                                                    />
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                    {item.attachments?.length > 0 && (
                                                        <div className="flex flex-wrap gap-1 mt-1">
                                                            {item.attachments.map((file: any) => (
                                                                <a key={file.id} href={file.download_url} className="inline-flex items-center gap-1 rounded bg-admin-surface-muted px-2 py-1 text-[10px] font-bold text-admin-text hover:text-admin-primary border border-admin-border">
                                                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                                                                    {file.original_filename || 'File'}
                                                                </a>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className="rounded-2xl border border-admin-border/50 bg-admin-surface p-6 shadow-sm">
                        <h2 className="text-xl font-bold text-admin-text mb-4">Status History</h2>
                        <div className="space-y-4">
                            {order.status_histories?.length > 0 ? order.status_histories.map((history: any) => (
                                <div key={history.id} className="border-l-2 border-admin-primary pl-4">
                                    <p className="font-bold capitalize text-admin-text">{label(history.to_status)}</p>
                                    {history.public_message && <p className="text-sm text-admin-text-muted">{history.public_message}</p>}
                                    {history.internal_note && <p className="text-xs text-admin-text-muted">Internal: {history.internal_note}</p>}
                                    <p className="text-xs text-admin-text-muted">{new Date(history.created_at).toLocaleString()}</p>
                                </div>
                            )) : <p className="text-sm text-admin-text-muted">No status history yet.</p>}
                        </div>
                    </section>
                </div>

                <div className="space-y-6">
                    <section className="rounded-2xl border border-admin-border/50 bg-admin-surface p-6 shadow-sm">
                        <h2 className="text-xl font-bold text-admin-text mb-4">Status & Pricing</h2>
                        <form onSubmit={updateStatus} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-admin-text-muted mb-1">Status</label>
                                <select value={data.status} onChange={event => setData('status', event.target.value)} className="w-full rounded-xl border border-admin-border bg-admin-surface px-4 py-2 font-medium capitalize">
                                    {statuses?.map((status: string) => <option key={status} value={status}>{label(status)}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-admin-text-muted mb-1">Budget Status</label>
                                <select value={data.payment_status} onChange={event => setData('payment_status', event.target.value)} className="w-full rounded-xl border border-admin-border bg-admin-surface px-4 py-2 font-medium capitalize">
                                    {paymentStatuses?.map((status: string) => <option key={status} value={status}>{label(status)}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-admin-text-muted mb-1">Order Currency</label>
                                <select value={data.currency_code} onChange={event => setData('currency_code', event.target.value)} className="w-full rounded-xl border border-admin-border bg-admin-surface px-4 py-2 font-medium">
                                    <option value="USD">USD - United States Dollar</option>
                                    <option value="VND">VND - Vietnamese Dong</option>
                                </select>
                                <p className="mt-1 text-xs font-medium text-admin-text-muted">Changing currency after pricing requires re-entering or converting all amounts.</p>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <label className="text-sm font-bold text-admin-text-muted">Subtotal
                                    <input type="number" step="any" placeholder="0.00" value={data.subtotal} onChange={event => setData('subtotal', event.target.value)} className="mt-1 w-full rounded-xl border border-admin-border bg-admin-surface px-3 py-2 text-admin-text" />
                                </label>
                                <label className="text-sm font-bold text-admin-text-muted">Logistics Fee
                                    <input type="number" step="any" placeholder="0.00" value={data.logistics_fee} onChange={event => setData('logistics_fee', event.target.value)} className="mt-1 w-full rounded-xl border border-admin-border bg-admin-surface px-3 py-2 text-admin-text" />
                                </label>
                                <label className="text-sm font-bold text-admin-text-muted">Service Fee
                                    <input type="number" step="any" placeholder="0.00" value={data.service_fee} onChange={event => setData('service_fee', event.target.value)} className="mt-1 w-full rounded-xl border border-admin-border bg-admin-surface px-3 py-2 text-admin-text" />
                                </label>
                                <label className="text-sm font-bold text-admin-text-muted">Delivery Fee
                                    <input type="number" step="any" placeholder="0.00" value={data.delivery_fee} onChange={event => setData('delivery_fee', event.target.value)} className="mt-1 w-full rounded-xl border border-admin-border bg-admin-surface px-3 py-2 text-admin-text" />
                                </label>
                                <label className="text-sm font-bold text-admin-text-muted col-span-2">Discount
                                    <input type="number" step="any" placeholder="0.00" value={data.discount} onChange={event => setData('discount', event.target.value)} className="mt-1 w-full rounded-xl border border-admin-border bg-admin-surface px-3 py-2 text-admin-text" />
                                </label>
                            </div>

                            <div className="rounded-xl bg-admin-surface-muted p-4 text-sm">
                                <div className="flex justify-between font-black text-admin-text">
                                    <span>Calculated Total</span>
                                    <span>{total === '' ? money('') : money(Math.max(Number(total), 0), data.currency_code)}</span>
                                </div>
                                <p className="mt-1 text-xs font-bold uppercase text-admin-text-muted">{label(order.pricing_status)}</p>
                            </div>

                            <label className="block text-sm font-bold text-admin-text-muted">Customer Note
                                <textarea value={data.public_message} onChange={event => setData('public_message', event.target.value)} className="mt-1 w-full rounded-xl border border-admin-border bg-admin-surface px-3 py-2 text-admin-text" rows={3} />
                            </label>
                            <label className="block text-sm font-bold text-admin-text-muted">Pricing Notes
                                <textarea value={data.pricing_notes} onChange={event => setData('pricing_notes', event.target.value)} className="mt-1 w-full rounded-xl border border-admin-border bg-admin-surface px-3 py-2 text-admin-text" rows={3} />
                            </label>
                            <label className="block text-sm font-bold text-admin-text-muted">Internal Note
                                <textarea value={data.internal_note} onChange={event => setData('internal_note', event.target.value)} className="mt-1 w-full rounded-xl border border-admin-border bg-admin-surface px-3 py-2 text-admin-text" rows={2} />
                            </label>

                            <div className="flex flex-col gap-3">
                                <button type="submit" disabled={processing} className="w-full rounded-xl bg-admin-primary py-3 text-sm font-black uppercase tracking-wider text-white hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2">
                                    Save Changes
                                    {recentlySuccessful && <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">Saved Successfully!</span>}
                                </button>
                                <Link href="/admin/logistics/orders" className="w-full rounded-xl bg-admin-surface-muted border border-admin-border py-3 text-sm font-black uppercase tracking-wider text-admin-text hover:bg-admin-border/50 text-center flex items-center justify-center transition-colors">
                                    Exit
                                </Link>
                            </div>
                        </form>
                    </section>

                    <section className="rounded-2xl border border-admin-border/50 bg-admin-surface p-6 shadow-sm">
                        <h2 className="text-xl font-bold text-admin-text mb-4">Audit Logs</h2>
                        <div className="space-y-4 max-h-72 overflow-y-auto">
                            {auditLogs?.length > 0 ? auditLogs.map((log: any) => (
                                <div key={log.id} className="text-sm">
                                    <p className="font-medium text-admin-text">{log.action}</p>
                                    <p className="text-xs text-admin-text-muted">{new Date(log.created_at).toLocaleString()} by {log.user?.name || 'System'}</p>
                                </div>
                            )) : <p className="text-sm text-admin-text-muted">No audit logs found.</p>}
                        </div>
                    </section>
                </div>
            </div>
        </AdminLayout>
        
        {
        lightboxIndex !== null && allImages[lightboxIndex] && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4">
                <button onClick={() => setLightboxIndex(null)} className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-[110]">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="absolute top-6 left-6 flex gap-4 z-[110]">
                    <a href={allImages[lightboxIndex].url} download target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors backdrop-blur-md">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        Download
                    </a>
                </div>

                {allImages.length > 1 && (
                    <>
                        <button onClick={() => setLightboxIndex(prev => (prev && prev > 0 ? prev - 1 : allImages.length - 1))} className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-[110] bg-black/40 hover:bg-black/60 p-3 rounded-full backdrop-blur-md">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <button onClick={() => setLightboxIndex(prev => (prev !== null && prev < allImages.length - 1 ? prev + 1 : 0))} className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-[110] bg-black/40 hover:bg-black/60 p-3 rounded-full backdrop-blur-md">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </button>
                    </>
                )}

                <img
                    src={allImages[lightboxIndex].url}
                    alt="Preview"
                    className="max-h-full max-w-full object-contain pointer-events-none shadow-2xl"
                />
            </div>
        )
    }
        </>
    );
}
