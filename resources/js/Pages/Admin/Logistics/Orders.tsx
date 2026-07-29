import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

interface Order {
    id: number;
    order_number: string;
    invoice_number: string;
    receipt_number: string;
    status: string;
    payment_status: string;
    total_amount: string;
    budget: string | null;
    created_at: string;
    paid_at: string | null;
    delivered_at: string | null;
    user_id: number;
    user?: {
        name: string;
        customer_code: string;
    };
    items?: Array<{
        product_name: string;
        quantity: number;
    }>;
}

interface Props {
    orders: {
        data: Order[];
        links: any[];
        current_page: number;
        last_page: number;
    };
    filters: any;
    statuses: string[];
    paymentStatuses: string[];
}

export default function Orders({ orders, filters, statuses, paymentStatuses }: Props) {
    const [search, setSearch] = React.useState(filters.search || '');
    const [status, setStatus] = React.useState(filters.status || '');
    const [paymentStatus, setPaymentStatus] = React.useState(filters.payment_status || '');

    const handleFilter = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        router.get('/admin/logistics/orders', { 
            search, status, payment_status: paymentStatus 
        }, { preserveState: true });
    };

    const statusColors: Record<string, string> = {
        pending: 'bg-admin-warning/10 text-admin-warning',
        processing: 'bg-admin-primary/10 text-admin-primary',
        packed: 'bg-indigo-500/10 text-indigo-500',
        shipping: 'bg-admin-secondary/10 text-admin-secondary',
        delivered: 'bg-admin-success/10 text-admin-success',
        cancelled: 'bg-admin-danger/10 text-admin-danger',
    };
    
    const paymentColors: Record<string, string> = {
        unpaid: 'bg-admin-danger/10 text-admin-danger',
        partial: 'bg-admin-warning/10 text-admin-warning',
        paid: 'bg-admin-success/10 text-admin-success',
        refunded: 'bg-admin-surface-muted text-admin-text-muted',
    };

    return (
        <AdminLayout title="All Manual Orders">
            <Head title="Orders — Logistics CRM" />

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-admin-text tracking-tight">All Manual Orders</h1>
                    <p className="text-sm text-admin-text-muted mt-1">Manage and track all logistics orders.</p>
                </div>
            </div>

            <div className="bg-admin-surface rounded-2xl border border-admin-border/50 p-4 mb-6 shadow-sm shadow-admin-border/20">
                <form onSubmit={handleFilter} className="flex flex-wrap gap-4 items-end">
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-xs font-bold text-admin-text-muted uppercase tracking-wider mb-2">Search Order / Customer</label>
                        <input
                            type="text"
                            placeholder="e.g. ORD-001 or John Doe"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full px-4 py-2 border border-admin-border rounded-lg bg-admin-surface text-admin-text text-sm focus:ring-2 focus:ring-admin-primary"
                        />
                    </div>
                    <div className="w-48">
                        <label className="block text-xs font-bold text-admin-text-muted uppercase tracking-wider mb-2">Status</label>
                        <select 
                            value={status} 
                            onChange={e => { setStatus(e.target.value); handleFilter(); }}
                            className="w-full px-4 py-2 border border-admin-border rounded-lg bg-admin-surface text-admin-text text-sm focus:ring-2 focus:ring-admin-primary"
                        >
                            <option value="">All Statuses</option>
                            {statuses.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                        </select>
                    </div>
                    <div className="w-48">
                        <label className="block text-xs font-bold text-admin-text-muted uppercase tracking-wider mb-2">Payment</label>
                        <select 
                            value={paymentStatus} 
                            onChange={e => { setPaymentStatus(e.target.value); handleFilter(); }}
                            className="w-full px-4 py-2 border border-admin-border rounded-lg bg-admin-surface text-admin-text text-sm focus:ring-2 focus:ring-admin-primary"
                        >
                            <option value="">All Payments</option>
                            {paymentStatuses.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                        </select>
                    </div>
                    <button type="submit" className="px-6 py-2 bg-admin-primary text-white text-sm font-semibold rounded-lg hover:bg-admin-primary-hover transition-colors">
                        Filter
                    </button>
                </form>
            </div>

            <div className="bg-admin-surface rounded-2xl border border-admin-border/50 shadow-sm shadow-admin-border/20 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-admin-surface-muted/50 border-b border-admin-border">
                                <th className="text-left px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Order Details</th>
                                <th className="text-left px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Customer</th>
                                <th className="text-left px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Products</th>
                                <th className="text-left px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Budget / Total</th>
                                <th className="text-left px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Statuses</th>
                                <th className="text-left px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Dates</th>
                                <th className="text-right px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-admin-border/50">
                            {orders.data.map(order => (
                                <tr key={order.id} className="hover:bg-admin-surface-muted/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-admin-primary">{order.order_number}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link href={`/admin/logistics/customers/${order.user_id}/orders`} className="font-bold text-admin-text hover:text-admin-primary hover:underline transition-colors block">{order.user?.name || 'Guest'}</Link>
                                        <div className="text-xs text-admin-text-muted mt-1">{order.user?.customer_code}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-admin-text">{order.items?.length || 0} Products</div>
                                        <div className="text-xs text-admin-text-muted mt-1 line-clamp-2">
                                            {order.items?.map(i => i.product_name).join(', ') || 'No items'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-admin-text">${Number(order.total_amount).toFixed(2)}</div>
                                        {order.budget && <div className="text-xs text-admin-text-muted mt-1">Budget: ${Number(order.budget).toFixed(2)}</div>}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-2 items-start">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${statusColors[order.status] || 'bg-admin-surface-muted text-admin-text-muted'}`}>
                                                {order.status}
                                            </span>
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${paymentColors[order.payment_status] || 'bg-admin-surface-muted text-admin-text-muted'}`}>
                                                {order.payment_status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-xs flex flex-col gap-1 text-admin-text-muted">
                                            <div><span className="font-semibold">Ordered:</span> {new Date(order.created_at).toLocaleDateString()}</div>
                                            {order.paid_at && <div><span className="font-semibold">Paid:</span> {new Date(order.paid_at).toLocaleDateString()}</div>}
                                            {order.delivered_at && <div><span className="font-semibold">Delivered:</span> {new Date(order.delivered_at).toLocaleDateString()}</div>}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex flex-col gap-2 items-end">
                                            <Link href={`/admin/logistics/orders/${order.id}`} className="px-3 py-1.5 bg-admin-primary/10 text-admin-primary hover:bg-admin-primary hover:text-white rounded text-xs font-semibold transition-colors">
                                                Edit Order
                                            </Link>
                                            <Link href={`/admin/receipts/generate?manual_order_id=${order.id}`} className="px-3 py-1.5 bg-admin-secondary/10 text-admin-secondary hover:bg-admin-secondary hover:text-white rounded text-xs font-semibold transition-colors">
                                                Generate Receipt
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {orders.data.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-admin-text-muted">
                                        No manual orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {orders.last_page > 1 && (
                    <div className="px-6 py-4 border-t border-admin-border flex items-center justify-between">
                        <span className="text-sm text-admin-text-muted">
                            Showing page {orders.current_page} of {orders.last_page}
                        </span>
                        <div className="flex gap-2">
                            {orders.links.map((link: any, idx: number) => (
                                <Link
                                    key={idx}
                                    href={link.url || '#'}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                        link.active 
                                        ? 'bg-admin-primary text-white' 
                                        : 'bg-admin-surface-muted text-admin-text-muted hover:text-admin-text'
                                    } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
