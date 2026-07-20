import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function Edit({ auth, page }: any) {
    const { data, setData, put, processing, errors } = useForm({
        title: page.title || '',
        slug: page.slug || '',
        content: page.content || '',
        seo_title: page.seo_title || '',
        seo_description: page.seo_description || '',
        is_published: page.is_published,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/pages/${page.id}`);
    };

    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Page: {page.title}</h2>}
        >
            <Head title="Edit Page" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <form onSubmit={handleSubmit} className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 space-y-6">
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring focus:ring-brand-primary focus:ring-opacity-50"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                required
                            />
                            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Slug</label>
                            <input
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring focus:ring-brand-primary focus:ring-opacity-50"
                                value={data.slug}
                                onChange={e => setData('slug', e.target.value)}
                            />
                            {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Content (HTML allowed)</label>
                            <textarea
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring focus:ring-brand-primary focus:ring-opacity-50"
                                rows={10}
                                value={data.content}
                                onChange={e => setData('content', e.target.value)}
                            ></textarea>
                            {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">SEO Title</label>
                            <input
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring focus:ring-brand-primary focus:ring-opacity-50"
                                value={data.seo_title}
                                onChange={e => setData('seo_title', e.target.value)}
                            />
                            {errors.seo_title && <p className="text-red-500 text-xs mt-1">{errors.seo_title}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">SEO Description</label>
                            <textarea
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring focus:ring-brand-primary focus:ring-opacity-50"
                                rows={3}
                                value={data.seo_description}
                                onChange={e => setData('seo_description', e.target.value)}
                            ></textarea>
                            {errors.seo_description && <p className="text-red-500 text-xs mt-1">{errors.seo_description}</p>}
                        </div>

                        <div className="flex items-center">
                            <input
                                id="is_published"
                                type="checkbox"
                                className="rounded border-gray-300 text-brand-primary focus:ring-brand-primary h-4 w-4"
                                checked={data.is_published}
                                onChange={e => setData('is_published', e.target.checked)}
                            />
                            <label htmlFor="is_published" className="ml-2 block text-sm text-gray-900">
                                Publish Page
                            </label>
                        </div>

                        <div className="flex justify-end gap-4">
                            <Link href="/admin/pages" className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-50">Cancel</Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-4 py-2 bg-brand-primary text-white rounded hover:bg-red-600 disabled:opacity-50"
                            >
                                Update Page
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
