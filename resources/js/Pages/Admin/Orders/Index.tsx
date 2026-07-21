import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import toast from 'react-hot-toast';

export default function Index({ orders }: any) {

    const updateStatus = (orderId: number, status: string) => {
        router.put(`/admin/orders/${orderId}`, { status }, { 
            preserveScroll: true,
            onSuccess: () => toast.success('Order status updated.')
        });
    };

    const statusColors: any = {
        'pending': 'bg-admin-warning/10 text-admin-warning',
        'processing': 'bg-admin-primary/10 text-admin-primary',
        'shipped': 'bg-admin-secondary/10 text-admin-secondary',
        'delivered': 'bg-admin-success/10 text-admin-success',
        'cancelled': 'bg-admin-danger/10 text-admin-danger',
    };

    return (
        <AdminLayout title="Orders">
            <Head title="Orders - Admin" />

            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-admin-text tracking-tight">Orders Management</h1>
                    <p className="text-sm font-medium text-admin-text-muted mt-1">View and manage customer orders.</p>
                </div>
            </div>

            <div className="bg-admin-surface shadow-sm shadow-admin-border/20 rounded-2xl overflow-hidden border border-admin-border/50">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-admin-surface-muted/50 text-admin-text-muted font-bold border-b border-admin-border">
                            <tr>
                                <th className="px-6 py-4 tracking-wider uppercase text-xs">Order ID</th>
                                <th className="px-6 py-4 tracking-wider uppercase text-xs">Date</th>
                                <th className="px-6 py-4 tracking-wider uppercase text-xs">Customer</th>
                                <th className="px-6 py-4 tracking-wider uppercase text-xs">Total</th>
                                <th className="px-6 py-4 tracking-wider uppercase text-xs">Payment</th>
                                <th className="px-6 py-4 tracking-wider uppercase text-xs">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-admin-border/50">
                            {orders.data.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-admin-text-muted font-medium">
                                        No orders found.
                                    </td>
                                </tr>
                            ) : (
                                orders.data.map((order: any) => (
                                    <tr key={order.id} className="hover:bg-admin-surface-muted/30 transition-colors">
                                        <td className="px-6 py-4 font-semibold text-admin-primary">
                                            #{order.id.toString().padStart(5, '0')}
                                        </td>
                                        <td className="px-6 py-4 text-admin-text-muted font-medium whitespace-nowrap">
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-semibold text-admin-text">{order.user?.name || 'Guest'}</p>
                                            <p className="text-xs font-medium text-admin-text-muted mt-0.5">{order.shipping_phone}</p>
                                        </td>
                                        <td className="px-6 py-4 text-admin-text font-bold tracking-tight">
                                            ${parseFloat(order.total_amount).toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 text-admin-text-muted font-medium uppercase text-xs tracking-wider">
                                            {order.payment_method}
                                        </td>
                                        <td className="px-6 py-4">
                                            <select 
                                                value={order.status}
                                                onChange={(e) => updateStatus(order.id, e.target.value)}
                                                className={`text-xs font-bold rounded-full border-none focus:ring-2 focus:ring-admin-primary focus:outline-none px-3 py-1 uppercase tracking-wide cursor-pointer ${statusColors[order.status]}`}
                                            >
                                                <option value="pending" className="text-admin-text bg-admin-surface">Pending</option>
                                                <option value="processing" className="text-admin-text bg-admin-surface">Processing</option>
                                                <option value="shipped" className="text-admin-text bg-admin-surface">Shipped</option>
                                                <option value="delivered" className="text-admin-text bg-admin-surface">Delivered</option>
                                                <option value="cancelled" className="text-admin-text bg-admin-surface">Cancelled</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {orders.total > orders.per_page && (
                <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="text-sm font-medium text-admin-text-muted">
                        Showing {orders.from} to {orders.to} of {orders.total} results
                    </div>
                    <div className="flex gap-2">
                        {orders.links.map((link: any, idx: number) => (
                            <Link
                                key={idx}
                                href={link.url || '#'}
                                className={`px-4 py-2 border rounded-xl text-sm font-semibold transition-all duration-200 ${
                                    link.active 
                                        ? 'bg-admin-primary text-white border-admin-primary shadow-sm shadow-admin-primary/20' 
                                        : 'bg-admin-surface text-admin-text-muted border-admin-border hover:bg-admin-surface-muted hover:text-admin-text'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
