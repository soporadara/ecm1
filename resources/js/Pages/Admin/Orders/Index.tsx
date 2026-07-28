import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import toast from 'react-hot-toast';

const label = (value: string) => {
    if (value === 'in_progress') return 'Progress';
    return String(value || '').replace(/_/g, ' ');
};
const money = (value: any, currency = 'USD') => {
    if (value === null || value === undefined || value === '') return 'Pending';
    if (currency === 'VND') return `₫${Math.round(Number(value || 0)).toLocaleString('en-US')}`;
    return `$${(Math.round(Number(value || 0)) / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export default function Index({ orders, filters = {}, statuses = [], paymentStatuses = [] }: any) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const [paymentStatus, setPaymentStatus] = useState(filters.payment_status || '');

    const updateStatus = (orderId: number, nextStatus: string, nextPaymentStatus: string) => {
        router.put(`/admin/orders/${orderId}`, { status: nextStatus, payment_status: nextPaymentStatus }, {
            preserveScroll: true,
            onSuccess: () => toast.success('Order updated.'),
        });
    };

    const applyFilters = (event: FormEvent) => {
        event.preventDefault();
        router.get('/admin/orders', { search, status, payment_status: paymentStatus }, { preserveState: true, replace: true });
    };

    return (
        <AdminLayout title="Logistics Orders">
            <Head title="Logistics Orders - Admin" />

            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="hidden lg:block">
                    <h1 className="text-2xl font-bold text-admin-text tracking-tight">Logistics Orders</h1>
                    <p className="text-sm font-medium text-admin-text-muted mt-1">Manage Manual Orders, pricing, customer IDs, and fulfillment status.</p>
                </div>
                <form onSubmit={applyFilters} className="flex flex-col gap-3 sm:flex-row">
                    <input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Order, customer ID, name, phone, product"
                        className="min-w-[280px] rounded-xl border border-admin-border bg-admin-surface px-4 py-2.5 text-sm font-medium"
                    />
                    <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-xl border border-admin-border bg-admin-surface px-4 py-2.5 text-sm font-medium capitalize">
                        <option value="">All order statuses</option>
                        {statuses.map((item: string) => <option key={item} value={item}>{label(item)}</option>)}
                    </select>
                    <select value={paymentStatus} onChange={(event) => setPaymentStatus(event.target.value)} className="rounded-xl border border-admin-border bg-admin-surface px-4 py-2.5 text-sm font-medium capitalize">
                        <option value="">All budget statuses</option>
                        {paymentStatuses.map((item: string) => <option key={item} value={item}>{label(item)}</option>)}
                    </select>
                    <button className="rounded-xl bg-admin-primary px-5 py-2.5 text-sm font-black uppercase tracking-wider text-white">Filter</button>
                </form>
            </div>

            <div className="bg-admin-surface shadow-sm shadow-admin-border/20 rounded-2xl overflow-hidden border border-admin-border/50">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left whitespace-nowrap">
                        <thead className="bg-admin-surface-muted/50 text-admin-text-muted font-bold border-b border-admin-border">
                            <tr>
                                <th className="px-6 py-4 tracking-wider uppercase text-xs">Order</th>
                                <th className="px-6 py-4 tracking-wider uppercase text-xs">Customer</th>
                                <th className="px-6 py-4 tracking-wider uppercase text-xs">Items</th>
                                <th className="px-6 py-4 tracking-wider uppercase text-xs">Budget</th>
                                <th className="px-6 py-4 tracking-wider uppercase text-xs">Order Status</th>
                                <th className="px-6 py-4 tracking-wider uppercase text-xs text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-admin-border/50">
                            {orders.data.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-admin-text-muted font-medium">No orders found.</td>
                                </tr>
                            ) : orders.data.map((order: any) => (
                                <tr key={order.id} className="hover:bg-admin-surface-muted/30 transition-colors align-top">
                                    <td className="px-6 py-4">
                                        <Link href={`/admin/orders/${order.id}`} className="font-semibold text-admin-primary hover:underline">
                                            {order.order_number || `#${String(order.id).padStart(5, '0')}`}
                                        </Link>
                                        <p className="text-xs font-medium text-admin-text-muted mt-1">{new Date(order.created_at).toLocaleString()}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="font-semibold text-admin-text">{order.customer_name_snapshot || order.user?.name || 'Customer'}</p>
                                        <p className="text-xs font-medium text-admin-text-muted mt-0.5">{order.customer_code_snapshot || order.user?.customer_code}</p>
                                        <p className="text-xs font-medium text-admin-text-muted">{order.customer_phone_snapshot || order.shipping_phone}</p>
                                    </td>
                                    <td className="px-6 py-4 text-admin-text-muted font-medium">
                                        <p>{order.items_count || 0} products</p>
                                        <p className="text-xs">{order.items_sum_quantity || 0} quantity</p>
                                        <p className="text-xs">{order.attachments_count || 0} PDFs, {order.images_count || 0} images</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-admin-text">{money(order.final_total_amount || order.estimated_total_amount || order.subtotal_amount, order.currency_code || 'USD')}</p>
                                        <select
                                            value={order.payment_status || 'unpaid'}
                                            onChange={(event) => updateStatus(order.id, order.status, event.target.value)}
                                            className="mt-2 rounded-full border border-admin-border bg-admin-surface px-3 py-1 text-xs font-bold uppercase tracking-wide"
                                        >
                                            {paymentStatuses.map((item: string) => <option key={item} value={item}>{label(item)}</option>)}
                                        </select>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={order.status}
                                            onChange={(event) => updateStatus(order.id, event.target.value, order.payment_status || 'unpaid')}
                                            className="rounded-full border border-admin-border bg-admin-surface px-3 py-1 text-xs font-bold uppercase tracking-wide"
                                        >
                                            {statuses.map((item: string) => <option key={item} value={item}>{label(item)}</option>)}
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Link href={`/admin/orders/${order.id}`} className="font-bold text-admin-primary hover:underline">View</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {orders.total > orders.per_page && (
                <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="text-sm font-medium text-admin-text-muted">Showing {orders.from} to {orders.to} of {orders.total} results</div>
                    <div className="flex flex-wrap gap-2">
                        {orders.links.map((link: any, idx: number) => (
                            <Link
                                key={idx}
                                href={link.url || '#'}
                                className={`px-4 py-2 border rounded-xl text-sm font-semibold transition-all duration-200 ${link.active ? 'bg-admin-primary text-white border-admin-primary shadow-sm shadow-admin-primary/20' : 'bg-admin-surface text-admin-text-muted border-admin-border hover:bg-admin-surface-muted hover:text-admin-text'}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
