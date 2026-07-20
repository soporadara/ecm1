import { Head, Link } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

interface Customer {
    id: number;
    name: string;
    email: string;
    orders_count: number;
    total_spent: number;
    created_at: string;
}

interface Paginated {
    data: Customer[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
}

export default function CustomersIndex({ customers }: { customers: Paginated }) {
    return (
        <AdminLayout title="Customers">
            <Head title="Customers — Rafel CMS" />

            <div className="mb-6">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Customers</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{customers.total} registered customers</p>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
                            <tr>
                                <th className="px-5 py-3 font-semibold">Customer</th>
                                <th className="px-5 py-3 font-semibold hidden sm:table-cell">Email</th>
                                <th className="px-5 py-3 font-semibold text-center">Orders</th>
                                <th className="px-5 py-3 font-semibold text-right">Spent</th>
                                <th className="px-5 py-3 font-semibold hidden md:table-cell">Joined</th>
                                <th className="px-5 py-3 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {customers.data.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center py-12 text-gray-400 dark:text-gray-500 text-sm">No customers yet.</td>
                                </tr>
                            )}
                            {customers.data.map(c => (
                                <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm flex-shrink-0">
                                                {c.name.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="font-medium text-gray-900 dark:text-white">{c.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 text-gray-500 dark:text-gray-400 hidden sm:table-cell">{c.email}</td>
                                    <td className="px-5 py-3 text-center text-gray-700 dark:text-gray-300 font-medium">{c.orders_count}</td>
                                    <td className="px-5 py-3 text-right font-semibold text-gray-900 dark:text-white">${Number(c.total_spent).toFixed(2)}</td>
                                    <td className="px-5 py-3 text-gray-400 dark:text-gray-500 text-sm hidden md:table-cell">{c.created_at}</td>
                                    <td className="px-5 py-3 text-right">
                                        <Link
                                            href={`/admin/customers/${c.id}`}
                                            className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                                        >
                                            View →
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {customers.last_page > 1 && (
                    <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Page {customers.current_page} of {customers.last_page}
                        </p>
                        <div className="flex gap-2">
                            {customers.links.filter(l => !l.label.includes('...')).map((link, i) => (
                                link.url ? (
                                    <Link
                                        key={i}
                                        href={link.url}
                                        className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                                            link.active
                                                ? 'bg-indigo-600 text-white border-indigo-600'
                                                : 'text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ) : (
                                    <span key={i} className="px-3 py-1.5 text-xs text-gray-300 dark:text-gray-600 border border-gray-100 dark:border-gray-700 rounded-lg"
                                        dangerouslySetInnerHTML={{ __html: link.label }} />
                                )
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
