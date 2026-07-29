import { Head, Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import AdminLayout from '../../../../Layouts/AdminLayout';

const money = (value: any, currency = 'USD') => {
    if (value === null || value === undefined || value === '') return 'Pending';
    if (currency === 'VND') return `₫${Math.round(Number(value || 0)).toLocaleString('en-US')}`;
    return `$${(Math.round(Number(value || 0)) / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};
const label = (value: any) => {
    if (value === 'in_progress') return 'Progress';
    return String(value || 'not set').replace(/_/g, ' ');
};

export default function OrderShow({ order, statuses, paymentStatuses = [], auditLogs }: any) {
    const { data, setData, put, processing, recentlySuccessful } = useForm({
        status: order.status,
        payment_status: order.payment_status || 'unpaid',
        internal_note: '',
        public_message: order.customer_visible_note || '',
        currency_code: order.currency_code || 'USD',
        subtotal: order.subtotal_amount || order.subtotal || 0,
        logistics_fee: order.logistics_fee_amount || order.logistics_fee || 0,
        service_fee: order.service_fee_amount || order.service_fee || order.service_charge || 0,
        delivery_fee: order.delivery_fee_amount || order.delivery_fee || order.delivery_charge || 0,
        discount: order.discount_amount || order.discount || 0,
        pricing_notes: order.pricing_notes || '',
    });

    const updateStatus = (event: FormEvent) => {
        event.preventDefault();
        put(`/admin/logistics/orders/${order.id}`, { preserveScroll: true });
    };

    const total = Number(data.subtotal || 0) + Number(data.logistics_fee || 0) + Number(data.service_fee || 0) + Number(data.delivery_fee || 0) - Number(data.discount || 0);

    return (
        <AdminLayout title={`Order ${order.order_number}`}>
            <Head title={`Order ${order.order_number}`} />

            <div className="flex flex-col gap-4 mb-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <Link href="/admin/logistics/orders" className="text-admin-text-muted hover:text-admin-text text-sm font-medium mb-2 inline-block">Back to Orders</Link>
                    <h1 className="text-3xl font-bold text-admin-text">Order {order.order_number}</h1>
                    <p className="text-sm font-medium text-admin-text-muted">{label(order.status)} · {order.items?.length || 0} product request(s)</p>
                </div>
                <Link href={`/admin/receipts/generate/${order.id}`} className="rounded-xl bg-admin-primary px-5 py-3 text-sm font-black uppercase tracking-wider text-white hover:opacity-90">
                    Generate Receipt
                </Link>
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

                    <section className="rounded-2xl border border-admin-border/50 bg-admin-surface p-6 shadow-sm">
                        <h2 className="text-xl font-bold text-admin-text mb-4">Requested Products</h2>
                        <div className="space-y-5">
                            {order.items?.map((item: any, index: number) => (
                                <article key={item.id} className="rounded-xl border border-admin-border/60 p-4">
                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                        <div>
                                            <p className="text-xs font-black uppercase tracking-wider text-admin-text-muted">Product {index + 1}</p>
                                            <h3 className="text-lg font-bold text-admin-text">{item.product_name}</h3>
                                        <p className="text-sm text-admin-text-muted">Qty {item.quantity} · Unit {money(item.price || item.estimated_unit_price, order.currency_code || 'USD')}</p>
                                        </div>
                                        <p className="font-black text-admin-text">{money(item.line_total || Number(item.price || 0) * Number(item.quantity || 0), order.currency_code || 'USD')}</p>
                                    </div>
                                    {(item.type || item.color || item.size) && <p className="mt-3 text-sm font-medium text-admin-text">{[item.type, item.color, item.size].filter(Boolean).join(' / ')}</p>}
                                    {item.description && <p className="mt-3 text-sm text-admin-text-muted">{item.description}</p>}
                                    {item.customer_notes && <p className="mt-3 rounded-lg bg-admin-surface-muted p-3 text-sm text-admin-text">{item.customer_notes}</p>}

                                    {item.urls?.length > 0 && (
                                        <div className="mt-4 space-y-2">
                                            {item.urls.map((url: any) => (
                                                <a key={url.id} href={url.url} target="_blank" rel="noreferrer" className="block truncate text-sm font-semibold text-admin-primary hover:underline">
                                                    {url.domain || url.url}
                                                </a>
                                            ))}
                                        </div>
                                    )}

                                    {item.images?.length > 0 && (
                                        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
                                            {item.images.map((image: any) => (
                                                <a key={image.id} href={image.url} target="_blank" rel="noreferrer" className="aspect-square overflow-hidden rounded-lg border border-admin-border">
                                                    <img src={image.thumbnail_url || image.url} alt={image.original_filename || 'Reference'} className="h-full w-full object-cover" />
                                                </a>
                                            ))}
                                        </div>
                                    )}

                                    {item.attachments?.length > 0 && (
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {item.attachments.map((file: any) => (
                                                <a key={file.id} href={file.download_url} className="rounded-lg border border-admin-border px-3 py-2 text-xs font-bold text-admin-text hover:text-admin-primary">
                                                    {file.original_filename}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </article>
                            ))}
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
                                    <input type="number" step="0.01" value={data.subtotal} onChange={event => setData('subtotal', event.target.value)} className="mt-1 w-full rounded-xl border border-admin-border bg-admin-surface px-3 py-2 text-admin-text" />
                                </label>
                                <label className="text-sm font-bold text-admin-text-muted">Logistics Fee
                                    <input type="number" step="0.01" value={data.logistics_fee} onChange={event => setData('logistics_fee', event.target.value)} className="mt-1 w-full rounded-xl border border-admin-border bg-admin-surface px-3 py-2 text-admin-text" />
                                </label>
                                <label className="text-sm font-bold text-admin-text-muted">Service Fee
                                    <input type="number" step="0.01" value={data.service_fee} onChange={event => setData('service_fee', event.target.value)} className="mt-1 w-full rounded-xl border border-admin-border bg-admin-surface px-3 py-2 text-admin-text" />
                                </label>
                                <label className="text-sm font-bold text-admin-text-muted">Delivery Fee
                                    <input type="number" step="0.01" value={data.delivery_fee} onChange={event => setData('delivery_fee', event.target.value)} className="mt-1 w-full rounded-xl border border-admin-border bg-admin-surface px-3 py-2 text-admin-text" />
                                </label>
                                <label className="text-sm font-bold text-admin-text-muted col-span-2">Discount
                                    <input type="number" step="0.01" value={data.discount} onChange={event => setData('discount', event.target.value)} className="mt-1 w-full rounded-xl border border-admin-border bg-admin-surface px-3 py-2 text-admin-text" />
                                </label>
                            </div>

                            <div className="rounded-xl bg-admin-surface-muted p-4 text-sm">
                                <div className="flex justify-between font-black text-admin-text">
                                    <span>Calculated Total</span>
                                    <span>{money(Math.max(total, 0), data.currency_code)}</span>
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
    );
}
