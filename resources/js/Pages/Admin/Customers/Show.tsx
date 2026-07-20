import { Head, Link } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

interface Order {
    id: number;
    number: string;
    total: number;
    status: string;
    created_at: string;
}

interface Customer {
    id: number;
    name: string;
    email: string;
    created_at: string;
}

const statusColors: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    processing: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    shipped: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
    completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

export default function CustomerShow({ customer, orders }: { customer: Customer; orders: Order[] }) {
    return (
        <AdminLayout title={customer.name}>
            <Head title={`${customer.name} — Rafel CMS`} />

            <div className="mb-6 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Link href="/admin/customers" className="hover:text-indigo-600 dark:hover:text-indigo-400">Customers</Link>
                <span>/</span>
                <span className="text-gray-900 dark:text-gray-200 font-medium">{customer.name}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Info */}
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                    <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-2xl mb-4">
                        {customer.name.charAt(0).toUpperCase()}
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">{customer.name}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{customer.email}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">Joined {customer.created_at}</p>
                </div>

                {/* Orders */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
                    <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
                        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Order History</h2>
                    </div>
                    {orders.length === 0 ? (
                        <div className="text-center py-10 text-gray-400 dark:text-gray-500 text-sm">No orders from this customer yet.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
                                    <tr>
                                        <th className="px-5 py-3 font-semibold">Order</th>
                                        <th className="px-5 py-3 font-semibold">Status</th>
                                        <th className="px-5 py-3 font-semibold text-right">Total</th>
                                        <th className="px-5 py-3 font-semibold hidden sm:table-cell">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                    {orders.map(o => (
                                        <tr key={o.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                            <td className="px-5 py-3 font-medium text-indigo-600 dark:text-indigo-400">{o.number}</td>
                                            <td className="px-5 py-3">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[o.status] || 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'}`}>
                                                    {o.status}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3 text-right font-semibold text-gray-900 dark:text-white">${Number(o.total).toFixed(2)}</td>
                                            <td className="px-5 py-3 text-gray-400 dark:text-gray-500 text-xs hidden sm:table-cell">{o.created_at}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
