import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import toast from 'react-hot-toast';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        slug: '',
        content: '',
        image: '',
        seo_title: '',
        seo_description: '',
        is_published: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/posts', {
            onSuccess: () => toast.success('Post created successfully!')
        });
    };

    return (
        <AdminLayout title="Create Blog Post">
            <Head title="Create Post - Admin" />

            <div className="mb-6 flex items-center gap-4">
                <Link href="/admin/posts" className="text-gray-500 hover:text-brand-primary transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Post</h1>
                    <p className="text-sm text-gray-500 mt-1">Publish a new article to your blog.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
                
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-100 dark:border-gray-700 overflow-hidden p-6 space-y-6">
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
                        <input
                            type="text"
                            className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary"
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                            required
                        />
                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Slug (optional)</label>
                        <input
                            type="text"
                            className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary"
                            value={data.slug}
                            onChange={e => setData('slug', e.target.value)}
                        />
                        {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cover Image URL</label>
                        <input
                            type="url"
                            className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary"
                            value={data.image}
                            onChange={e => setData('image', e.target.value)}
                            placeholder="https://example.com/image.jpg"
                        />
                        {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                        
                        {data.image && (
                            <div className="mt-4">
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Image Preview</p>
                                <img src={data.image} alt="Preview" className="h-48 w-full object-cover rounded-lg border border-gray-200 dark:border-gray-700" onError={(e) => (e.currentTarget.style.display = 'none')} />
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Content (HTML allowed)</label>
                        <textarea
                            className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary"
                            rows={10}
                            value={data.content}
                            onChange={e => setData('content', e.target.value)}
                        ></textarea>
                        {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
                    </div>

                    <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">SEO Optimization</h3>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">SEO Title</label>
                                <input
                                    type="text"
                                    className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary"
                                    value={data.seo_title}
                                    onChange={e => setData('seo_title', e.target.value)}
                                />
                                {errors.seo_title && <p className="text-red-500 text-xs mt-1">{errors.seo_title}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">SEO Description</label>
                                <textarea
                                    className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary"
                                    rows={3}
                                    value={data.seo_description}
                                    onChange={e => setData('seo_description', e.target.value)}
                                ></textarea>
                                {errors.seo_description && <p className="text-red-500 text-xs mt-1">{errors.seo_description}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100 dark:border-gray-700 flex items-center">
                        <input
                            id="is_published"
                            type="checkbox"
                            className="rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-brand-primary focus:ring-brand-primary h-5 w-5"
                            checked={data.is_published}
                            onChange={e => setData('is_published', e.target.checked)}
                        />
                        <label htmlFor="is_published" className="ml-3 block text-sm font-medium text-gray-900 dark:text-white">
                            Publish Post immediately
                        </label>
                    </div>

                </div>

                <div className="flex justify-end gap-3 pb-8">
                    <Link href="/admin/posts" className="px-6 py-2.5 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-6 py-2.5 rounded-lg font-medium bg-brand-primary text-white hover:bg-brand-secondary transition-colors shadow-sm disabled:opacity-50"
                    >
                        {processing ? 'Saving...' : 'Create Post'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
