import { Head, Link, router } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';
import { useTranslation } from '../../hooks/useTranslation';
import { ClipboardList, HelpCircle, PackageCheck, ReceiptText } from 'lucide-react';

export default function Dashboard({ auth, stats, recentOrders }: any) {
    const { t } = useTranslation();
    const shortcuts = [
        {
            title: 'Create Manual Order',
            description: 'Submit products you would like our team to purchase.',
            href: '/manual-order',
            icon: ClipboardList,
        },
        {
            title: 'My Orders',
            description: 'View active, completed, delayed, and cancelled orders.',
            href: '/my-orders',
            icon: PackageCheck,
        },
        {
            title: 'Receipts',
            description: 'View and download your completed order receipts.',
            href: '/receipts',
            icon: ReceiptText,
        },
        {
            title: 'Contact Support',
            description: 'Ask our logistics team for help.',
            href: '/contact',
            icon: HelpCircle,
        },
    ];

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <MainLayout title="Dashboard">
            <Head title="My Dashboard" />
            
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-serif">Customer Dashboard</h1>
                        <p className="text-gray-500 mt-2">Customer ID: <span className="font-mono font-bold bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{auth.user.customer_code}</span></p>
                    </div>
                    <div className="flex gap-4">
                        <Link href="/manual-order" className="bg-brand-primary text-white px-6 py-3 rounded-lg font-bold uppercase tracking-wide text-sm hover:bg-brand-secondary transition-colors">
                            + Create Manual Order
                        </Link>
                        <button onClick={handleLogout} className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-6 py-3 rounded-lg font-bold uppercase tracking-wide text-sm hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
                            Logout
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: 'Total Orders', value: stats?.total || 0, icon: '📦', color: 'bg-blue-50 text-blue-600' },
                        { label: 'Pending Review', value: stats?.pending || 0, icon: '⏳', color: 'bg-orange-50 text-orange-600' },
                        { label: 'Out for Delivery', value: stats?.delivering || 0, icon: '🚚', color: 'bg-indigo-50 text-indigo-600' },
                        { label: 'Completed', value: stats?.completed || 0, icon: '✅', color: 'bg-green-50 text-green-600' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4">
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${stat.color}`}>
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <section className="mb-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" aria-label="Customer shortcuts">
                    {shortcuts.map((shortcut) => (
                        <Link
                            key={shortcut.href}
                            href={shortcut.href}
                            className="group flex min-h-48 cursor-pointer flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-px hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60 active:translate-y-0 dark:border-gray-800 dark:bg-gray-900"
                        >
                            <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary transition group-hover:scale-105">
                                <shortcut.icon className="h-6 w-6" aria-hidden="true" />
                            </span>
                            <h2 className="text-lg font-black text-gray-950 dark:text-white">{shortcut.title}</h2>
                            <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">{shortcut.description}</p>
                        </Link>
                    ))}
                </section>

                {/* Recent Orders */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Orders</h2>
                        <Link href="/my-orders" className="text-brand-primary text-sm font-bold hover:underline">View All &gt;</Link>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-sm">
                                    <th className="p-4 font-medium">Order Number</th>
                                    <th className="p-4 font-medium">Date</th>
                                    <th className="p-4 font-medium">Items</th>
                                    <th className="p-4 font-medium">Status</th>
                                    <th className="p-4 font-medium text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {recentOrders && recentOrders.length > 0 ? recentOrders.map((order: any) => (
                                    <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        <td className="p-4 font-medium text-gray-900 dark:text-white">
                                            {order.order_number}
                                        </td>
                                        <td className="p-4 text-gray-500">
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 text-gray-500">
                                            {order.title || `${order.items_count} items`}
                                        </td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                                                {order.status.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <Link href={`/my-orders/${order.id}`} className="text-brand-primary font-medium hover:underline text-sm">View Details</Link>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-gray-500">
                                            No orders found. <Link href="/manual-order" className="text-brand-primary hover:underline">Create your first order</Link>.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
