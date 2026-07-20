import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import toast from 'react-hot-toast';

export default function SeoSettings({ seoSettings }: any) {
    const { data, setData, post, processing, errors } = useForm({
        meta_title: seoSettings.meta_title || '',
        meta_description: seoSettings.meta_description || '',
        meta_keywords: seoSettings.meta_keywords || '',
        og_image: seoSettings.og_image || '',
        twitter_handle: seoSettings.twitter_handle || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/seo', {
            preserveScroll: true,
            onSuccess: () => toast.success('SEO settings updated successfully!'),
            onError: () => toast.error('Failed to update SEO settings.'),
        });
    };

    return (
        <AdminLayout title="SEO Settings">
            <Head title="SEO Settings — Rafel CMS" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">SEO & Meta Data</h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Configure global search engine optimization settings for the storefront.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <form onSubmit={submit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Global Meta Title
                                </label>
                                <input
                                    type="text"
                                    value={data.meta_title}
                                    onChange={e => setData('meta_title', e.target.value)}
                                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="e.g., Pengu Store - Premium Products"
                                    required
                                />
                                {errors.meta_title && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.meta_title}</p>}
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Appears in search engine results and browser tabs.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Global Meta Description
                                </label>
                                <textarea
                                    value={data.meta_description}
                                    onChange={e => setData('meta_description', e.target.value)}
                                    rows={4}
                                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Discover the best premium products..."
                                    required
                                />
                                {errors.meta_description && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.meta_description}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Meta Keywords
                                </label>
                                <input
                                    type="text"
                                    value={data.meta_keywords}
                                    onChange={e => setData('meta_keywords', e.target.value)}
                                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="ecommerce, premium, fashion"
                                />
                                {errors.meta_keywords && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.meta_keywords}</p>}
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Separate keywords with commas.</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    OpenGraph Image URL (Social Sharing)
                                </label>
                                <input
                                    type="text"
                                    value={data.og_image}
                                    onChange={e => setData('og_image', e.target.value)}
                                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="https://example.com/social-share.jpg"
                                />
                                {errors.og_image && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.og_image}</p>}
                                {data.og_image && (
                                    <div className="mt-3 relative w-full h-40 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                                        <img src={data.og_image} alt="OG Preview" className="w-full h-full object-cover" onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://placehold.co/600x315?text=Invalid+Image+URL';
                                        }} />
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Twitter Handle
                                </label>
                                <input
                                    type="text"
                                    value={data.twitter_handle}
                                    onChange={e => setData('twitter_handle', e.target.value)}
                                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="@pengustore"
                                />
                                {errors.twitter_handle && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.twitter_handle}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : 'Save SEO Settings'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
