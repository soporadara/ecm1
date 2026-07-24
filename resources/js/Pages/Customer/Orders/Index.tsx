import { Head, Link } from '@inertiajs/react';
import MainLayout from '../../../Layouts/MainLayout';
import { useCurrency } from '../../../Contexts/CurrencyContext';

const statusToneClass: Record<string, string> = {
    green: 'bg-green-50 text-green-700',
    red: 'bg-red-50 text-red-700',
    amber: 'bg-amber-50 text-amber-700',
    gray: 'bg-gray-100 text-gray-700',
    blue: 'bg-blue-50 text-blue-700',
};

export default function CustomerOrdersIndex({ orders }: any) {
    const { formatAmount } = useCurrency();

    return (
        <MainLayout title="My Orders">
            <Head title="My Orders" />

            <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 w-full">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <Link href="/dashboard" className="text-sm font-bold text-brand-primary hover:underline">Back to dashboard</Link>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-serif mt-2">My Orders</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Track Manual Orders, logistics progress, receipts, and uploaded files.</p>
                    </div>
                    <Link href="/manual-order" className="inline-flex justify-center rounded-xl bg-brand-primary px-5 py-3 text-sm font-black uppercase tracking-wider text-white hover:bg-brand-secondary">
                        Create Manual Order
                    </Link>
                </div>

                <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-500 dark:bg-gray-800">
                                <tr>
                                    <th className="p-4">Order</th>
                                    <th className="p-4">Items</th>
                                    <th className="p-4">Pricing</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {orders.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-10 text-center text-gray-500">
                                            No Manual Orders yet. Create your first Manual Order and it will appear here.
                                        </td>
                                    </tr>
                                ) : orders.data.map((order: any) => (
                                    <tr key={order.id} className="align-top">
                                        <td className="p-4">
                                            <p className="font-bold text-gray-900 dark:text-white">{order.order_number || `#${String(order.id).padStart(5, '0')}`}</p>
                                            <p className="text-xs text-gray-500">{new Date(order.created_at).toLocaleString()}</p>
                                        </td>
                                        <td className="p-4 text-gray-600 dark:text-gray-300">
                                            <p className="font-semibold">{order.items_count || 0} product request(s)</p>
                                            <p className="text-xs text-gray-500">{order.items_sum_quantity || 0} total quantity</p>
                                        </td>
                                        <td className="p-4">
                                            <p className="font-bold text-gray-900 dark:text-white">{formatAmount(order.final_total_amount || order.estimated_total_amount || order.subtotal_amount, order.currency_code || 'USD')}</p>
                                            <p className="text-xs font-bold uppercase text-gray-500">{order.payment_status_label || 'Unpaid'}</p>
                                        </td>
                                        <td className="p-4">
                                            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-black uppercase tracking-wider ${statusToneClass[order.customer_status_tone] || statusToneClass.blue}`}>
                                                {order.customer_status_label || 'In Progress'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <Link href={`/my-orders/${order.id}`} className="font-bold text-brand-primary hover:underline">View</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
