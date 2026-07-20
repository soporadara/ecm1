import { Head, useForm, Link } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import toast from 'react-hot-toast';

export default function CouponCreate() {
    const { data, setData, post, processing, errors } = useForm({
        code: '',
        type: 'percent',
        value: '',
        min_order: '',
        max_uses: '',
        expires_at: '',
        is_active: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/coupons', {
            onSuccess: () => toast.success('Coupon created successfully'),
            onError: () => toast.error('Failed to create coupon'),
        });
    };

    return (
        <AdminLayout title="New Coupon">
            <Head title="New Coupon — Rafel CMS" />

            <div className="max-w-lg">
                <div className="mb-6 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Link href="/admin/coupons" className="hover:text-indigo-600 dark:hover:text-indigo-400">Coupons</Link>
                    <span>/</span>
                    <span className="text-gray-800 dark:text-gray-200 font-medium">New</span>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Coupon Code *</label>
                            <input type="text" value={data.code} onChange={e => setData('code', e.target.value.toUpperCase())}
                                className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white font-mono uppercase focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="SAVE20" required />
                            {errors.code && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.code}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Discount Type</label>
                                <select value={data.type} onChange={e => setData('type', e.target.value)}
                                    className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500">
                                    <option value="percent">Percentage (%)</option>
                                    <option value="fixed">Fixed Amount ($)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Value *</label>
                                <input type="number" value={data.value} onChange={e => setData('value', e.target.value)}
                                    className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder={data.type === 'percent' ? '20' : '5.00'} step="0.01" min="0" required />
                                {errors.value && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.value}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Min. Order ($)</label>
                                <input type="number" value={data.min_order} onChange={e => setData('min_order', e.target.value)}
                                    className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" step="0.01" min="0" placeholder="0.00" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Max Uses</label>
                                <input type="number" value={data.max_uses} onChange={e => setData('max_uses', e.target.value)}
                                    className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" min="1" placeholder="Unlimited" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Expiry Date</label>
                            <input type="date" value={data.expires_at} onChange={e => setData('expires_at', e.target.value)}
                                className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>

                        <div className="flex items-center gap-3">
                            <input type="checkbox" id="is_active" checked={data.is_active} onChange={e => setData('is_active', e.target.checked)}
                                className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500 dark:bg-gray-900" />
                            <label htmlFor="is_active" className="text-sm text-gray-700 dark:text-gray-300">Active immediately</label>
                        </div>

                        <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                            <button type="submit" disabled={processing}
                                className="px-5 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50">
                                {processing ? 'Creating...' : 'Create Coupon'}
                            </button>
                            <Link href="/admin/coupons" className="px-5 py-2 text-sm text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
