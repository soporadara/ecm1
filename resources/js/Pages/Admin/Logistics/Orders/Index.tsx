import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../../Layouts/AdminLayout';
import { useState } from 'react';

export default function OrdersIndex({ orders, filters }: any) {
    const [search, setSearch] = useState(filters?.search || '');
    const [status, setStatus] = useState(filters?.status || '');

    const handleFilter = () => {
        router.get('/admin/orders', { search, status }, { preserveState: true });
    };

    return (
        <AdminLayout title="Logistics Orders">
            <Head title="Orders Management" />
            
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Orders Management</h1>
                    <p className="text-gray-500 mt-1">Manage manual orders, purchases, and deliveries.</p>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden mb-6">
                <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex flex-wrap gap-4 items-center bg-gray-50 dark:bg-gray-800/50">
                    <input 
                        type="text" 
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search by Order Number or Customer Code..." 
                        className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 w-full md:w-80"
                    />
                    <select 
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                        className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                    >
                        <option value="">All Statuses</option>
                        <option value="pending_review">Pending Review</option>
                        <option value="quote_provided">Quote Provided</option>
                        <option value="approved">Approved & Paid</option>
                        <option value="purchased">Purchased</option>
                        <option value="warehouse_received">Warehouse Received</option>
                        <option value="shipped">Shipped</option>
                        <option value="arrived_destination">Arrived at Destination</option>
                        <option value="delivered">Delivered</option>
                    </select>
                    <button onClick={handleFilter} className="bg-brand-primary text-white px-6 py-2 rounded-lg font-bold hover:bg-brand-secondary">
                        Filter
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-800/30 text-gray-500 text-sm">
                                <th className="p-4 font-medium">Order #</th>
                                <th className="p-4 font-medium">Customer</th>
                                <th className="p-4 font-medium">Items/Description</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {orders?.data?.length > 0 ? orders.data.map((order: any) => (
                                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                    <td className="p-4 font-medium">{order.order_number}</td>
                                    <td className="p-4">
                                        <Link href={`/admin/customers/${order.user_id}`} className="text-brand-primary hover:underline">
                                            {order.user?.name} ({order.user?.customer_code})
                                        </Link>
                                    </td>
                                    <td className="p-4 text-gray-500 max-w-xs truncate">{order.title}</td>
                                    <td className="p-4">
                                        <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <Link href={`/admin/orders/${order.id}`} className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-lg text-sm font-medium">
                                            Manage
                                        </Link>
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan={5} className="p-8 text-center text-gray-500">No orders found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
