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

            <div className="hidden sm:block mb-6">
                <h1 className="text-2xl font-bold text-admin-text tracking-tight">Customers</h1>
                <p className="text-sm font-medium text-admin-text-muted mt-1">{customers.total} registered customers</p>
            </div>

            <div className="bg-admin-surface shadow-sm shadow-admin-border/20 rounded-2xl overflow-hidden border border-admin-border/50">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left whitespace-nowrap">
                        <thead className="bg-admin-surface-muted/50 text-admin-text-muted font-bold border-b border-admin-border">
                            <tr>
                                <th className="px-6 py-4 tracking-wider uppercase text-xs">Customer</th>
                                <th className="px-6 py-4 tracking-wider uppercase text-xs">Email</th>
                                <th className="px-6 py-4 tracking-wider uppercase text-xs text-center">Orders</th>
                                <th className="px-6 py-4 tracking-wider uppercase text-xs text-right">Spent</th>
                                <th className="px-6 py-4 tracking-wider uppercase text-xs">Joined</th>
                                <th className="px-6 py-4 tracking-wider uppercase text-xs text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-admin-border/50">
                            {customers.data.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center py-12 text-admin-text-muted font-medium text-sm">No customers yet.</td>
                                </tr>
                            )}
                            {customers.data.map(c => (
                                <tr key={c.id} className="hover:bg-admin-surface-muted/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-admin-primary/10 text-admin-primary flex items-center justify-center font-bold text-sm flex-shrink-0">
                                                {c.name.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="font-semibold text-admin-text">{c.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-admin-text-muted">{c.email}</td>
                                    <td className="px-6 py-4 text-center font-bold text-admin-text">{c.orders_count}</td>
                                    <td className="px-6 py-4 text-right font-bold text-admin-text">${Number(c.total_spent).toFixed(2)}</td>
                                    <td className="px-6 py-4 text-admin-text-muted text-sm">{new Date(c.created_at).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-right">
                                        <Link
                                            href={`/admin/customers/${c.id}`}
                                            className="text-sm font-semibold text-admin-primary hover:text-admin-primary-hover transition-colors"
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
                    <div className="flex items-center justify-between px-6 py-4 border-t border-admin-border/50 bg-admin-surface-muted/30">
                        <p className="text-sm font-medium text-admin-text-muted">
                            Page {customers.current_page} of {customers.last_page}
                        </p>
                        <div className="flex gap-2">
                            {customers.links.filter(l => !l.label.includes('...')).map((link, i) => (
                                link.url ? (
                                    <Link
                                        key={i}
                                        href={link.url}
                                        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                                            link.active
                                                ? 'bg-admin-primary text-white'
                                                : 'text-admin-text border border-admin-border hover:bg-admin-surface-muted'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ) : (
                                    <span key={i} className="px-3 py-1.5 text-xs font-bold text-admin-text-muted border border-admin-border/50 rounded-lg"
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
