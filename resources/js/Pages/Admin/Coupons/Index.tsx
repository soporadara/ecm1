import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import toast from 'react-hot-toast';

interface Coupon {
    id: number;
    code: string;
    type: string;
    value: number;
    min_order: number;
    max_uses: number | null;
    used_count: number;
    expires_at: string | null;
    is_active: boolean;
}

export default function CouponsIndex({ coupons }: { coupons: Coupon[] }) {
    const handleDelete = (id: number) => {
        if (!confirm('Delete this coupon?')) return;
        router.delete(`/admin/coupons/${id}`, {
            onSuccess: () => toast.success('Coupon deleted successfully'),
            onError: () => toast.error('Failed to delete coupon'),
        });
    };

    return (
        <AdminLayout title="Coupons">
            <Head title="Coupons — Rafel CMS" />

            <div className="mb-6 flex justify-between items-end">
                <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Coupons & Discounts</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{coupons.length} coupon{coupons.length !== 1 ? 's' : ''} available</p>
                </div>
                <Link href="/admin/coupons/create"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                    + New Coupon
                </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700/50 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Code</th>
                            <th className="px-6 py-4 font-semibold hidden sm:table-cell">Discount</th>
                            <th className="px-6 py-4 font-semibold text-center hidden md:table-cell">Uses</th>
                            <th className="px-6 py-4 font-semibold hidden lg:table-cell">Expires</th>
                            <th className="px-6 py-4 font-semibold text-center">Status</th>
                            <th className="px-6 py-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {coupons.length === 0 && (
                            <tr>
                                <td colSpan={6} className="text-center py-12 text-gray-400 dark:text-gray-500 text-sm">
                                    No coupons yet. <Link href="/admin/coupons/create" className="text-indigo-600 dark:text-indigo-400 hover:underline">Create one →</Link>
                                </td>
                            </tr>
                        )}
                        {coupons.map(c => (
                            <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                    <span className="font-mono font-bold text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 px-2 py-0.5 rounded">{c.code}</span>
                                </td>
                                <td className="px-6 py-4 hidden sm:table-cell">
                                    {c.type === 'percent' ? `${c.value}% off` : `$${c.value.toFixed(2)} off`}
                                    {c.min_order > 0 && <span className="text-gray-400 dark:text-gray-500 text-xs ml-1">(min ${c.min_order})</span>}
                                </td>
                                <td className="px-6 py-4 text-center hidden md:table-cell">
                                    {c.used_count}{c.max_uses ? `/${c.max_uses}` : ''}
                                </td>
                                <td className="px-6 py-4 hidden lg:table-cell">
                                    {c.expires_at ?? <span className="text-gray-400 dark:text-gray-500 italic">No expiry</span>}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${c.is_active ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}>
                                        {c.is_active ? 'Active' : 'Disabled'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-3">
                                        <Link href={`/admin/coupons/${c.id}/edit`}
                                            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 font-medium">
                                            Edit
                                        </Link>
                                        <button onClick={() => handleDelete(c.id)}
                                            className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 font-medium">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
