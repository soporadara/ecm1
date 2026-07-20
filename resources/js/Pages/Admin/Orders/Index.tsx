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
        'pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500',
        'processing': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
        'shipped': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
        'delivered': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
        'cancelled': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    };

    return (
        <AdminLayout title="Orders">
            <Head title="Orders - Admin" />

            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Orders Management</h1>
                    <p className="text-sm text-gray-500 mt-1">View and manage customer orders.</p>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 font-medium border-b border-gray-200 dark:border-gray-700">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Total</th>
                                <th className="px-6 py-4">Payment</th>
                                <th className="px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {orders.data.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                                        No orders found.
                                    </td>
                                </tr>
                            ) : (
                                orders.data.map((order: any) => (
                                    <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/25 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                            #{order.id.toString().padStart(5, '0')}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-gray-900 dark:text-white">{order.user?.name || 'Guest'}</p>
                                            <p className="text-xs text-gray-500">{order.shipping_phone}</p>
                                        </td>
                                        <td className="px-6 py-4 text-gray-900 dark:text-white font-bold">
                                            ${parseFloat(order.total_amount).toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 uppercase">
                                            {order.payment_method}
                                        </td>
                                        <td className="px-6 py-4">
                                            <select 
                                                value={order.status}
                                                onChange={(e) => updateStatus(order.id, e.target.value)}
                                                className={`text-xs font-bold rounded-full border-gray-300 dark:border-gray-600 focus:ring-0 ${statusColors[order.status]} bg-transparent`}
                                            >
                                                <option value="pending" className="text-gray-900">Pending</option>
                                                <option value="processing" className="text-gray-900">Processing</option>
                                                <option value="shipped" className="text-gray-900">Shipped</option>
                                                <option value="delivered" className="text-gray-900">Delivered</option>
                                                <option value="cancelled" className="text-gray-900">Cancelled</option>
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
                <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="text-sm text-gray-500">
                        Showing {orders.from} to {orders.to} of {orders.total} results
                    </div>
                    <div className="flex gap-2">
                        {orders.links.map((link: any, idx: number) => (
                            <Link
                                key={idx}
                                href={link.url || '#'}
                                className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${link.active ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
