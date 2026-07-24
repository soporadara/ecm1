import { Head, Link } from '@inertiajs/react';
import AdminLayout from '../../../../Layouts/AdminLayout';

export default function CustomerShow({ customer, orders, auditLogs }: any) {
    return (
        <AdminLayout title={`Customer ${customer.name}`}>
            <Head title={`Customer - ${customer.name}`} />

            <div className="flex justify-between items-center mb-6">
                <div>
                    <Link href="/admin/customers" className="text-gray-500 hover:text-gray-800 text-sm font-medium mb-2 inline-block">&larr; Back to Customers</Link>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{customer.name}</h1>
                </div>
                <div className="bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-lg font-bold font-mono">
                    {customer.customer_code}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 360 View - Profile */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 text-center">
                        <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
                            {customer.avatar ? (
                                <img src={customer.avatar} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-3xl font-bold text-gray-500 flex items-center justify-center h-full">
                                    {customer.name?.charAt(0)}
                                </span>
                            )}
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{customer.name}</h2>
                        <p className="text-gray-500 mb-4">{customer.email}</p>
                        
                        <div className="flex gap-2 justify-center mb-6">
                            <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold capitalize">
                                {customer.firebase_provider || 'Email'} User
                            </span>
                            <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-bold">
                                Active
                            </span>
                        </div>

                        <div className="text-left space-y-3 pt-4 border-t border-gray-100 dark:border-gray-800 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Phone:</span>
                                <span className="font-medium">{customer.phone_e164 || 'Not set'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Telegram:</span>
                                <span className="font-medium text-blue-600">{customer.telegram_username || 'Not set'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Joined:</span>
                                <span className="font-medium">{new Date(customer.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
                        <h3 className="font-bold text-lg mb-3">Delivery Address</h3>
                        <p className="text-gray-700 dark:text-gray-300 text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded">
                            {customer.address_line_1 ? (
                                <>
                                    {customer.address_line_1}<br/>
                                    {customer.city}
                                </>
                            ) : 'No address provided yet.'}
                        </p>
                    </div>
                </div>

                {/* 360 View - Orders & Activity */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
                        <h2 className="text-xl font-bold mb-4">Order History</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-100 dark:border-gray-800 text-sm text-gray-500">
                                        <th className="pb-3 font-medium">Order #</th>
                                        <th className="pb-3 font-medium">Date</th>
                                        <th className="pb-3 font-medium">Status</th>
                                        <th className="pb-3 font-medium">Total</th>
                                        <th className="pb-3 font-medium"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                    {orders?.length > 0 ? orders.map((order: any) => (
                                        <tr key={order.id}>
                                            <td className="py-3 text-sm font-medium">{order.order_number}</td>
                                            <td className="py-3 text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</td>
                                            <td className="py-3 text-sm">
                                                <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-xs capitalize">
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="py-3 text-sm font-medium">¥ {order.receipts?.[0]?.total || 0}</td>
                                            <td className="py-3 text-sm text-right">
                                                <Link href={`/admin/orders/${order.id}`} className="text-brand-primary hover:underline">View</Link>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan={5} className="py-4 text-center text-gray-500 text-sm">No orders yet.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
                        <h2 className="text-xl font-bold mb-4">Customer Activity Logs</h2>
                        <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                            {auditLogs?.length > 0 ? auditLogs.map((log: any) => (
                                <div key={log.id} className="text-sm border-l-2 border-brand-primary pl-3">
                                    <p className="font-medium text-gray-900 dark:text-white">{log.action}</p>
                                    <p className="text-xs text-gray-500">{new Date(log.created_at).toLocaleString()}</p>
                                </div>
                            )) : <p className="text-sm text-gray-500">No activity recorded.</p>}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
