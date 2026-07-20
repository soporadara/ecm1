import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        heading: '',
        description: '',
        link_url: '',
        is_active: false,
        image: null as File | null,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.popups.store'));
    };

    return (
        <AdminLayout>
            <Head title="Create Popup" />

            <div className="mb-8">
                <Link href={route('admin.popups.index')} className="text-brand-primary hover:text-brand-secondary text-sm font-medium">
                    &larr; Back to Popups
                </Link>
                <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">Create New Popup</h1>
            </div>

            <form onSubmit={submit} className="space-y-6 max-w-2xl bg-white dark:bg-gray-900 p-6 shadow sm:rounded-md">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Internal Title (e.g. Summer Sale)
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        />
                        {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title}</p>}
                    </div>
                </div>

                <div>
                    <label htmlFor="heading" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Public Heading (e.g. Get 40% Off!)
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            name="heading"
                            id="heading"
                            value={data.heading}
                            onChange={e => setData('heading', e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        />
                        {errors.heading && <p className="mt-2 text-sm text-red-600">{errors.heading}</p>}
                    </div>
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Description / Subtext
                    </label>
                    <div className="mt-1">
                        <textarea
                            id="description"
                            name="description"
                            rows={3}
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        />
                        {errors.description && <p className="mt-2 text-sm text-red-600">{errors.description}</p>}
                    </div>
                </div>

                <div>
                    <label htmlFor="link_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Redirect Link URL (Optional)
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            name="link_url"
                            id="link_url"
                            placeholder="https://..."
                            value={data.link_url}
                            onChange={e => setData('link_url', e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        />
                        {errors.link_url && <p className="mt-2 text-sm text-red-600">{errors.link_url}</p>}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Promo Image Banner (Optional)
                    </label>
                    <div className="mt-1 flex items-center">
                        <input
                            type="file"
                            onChange={e => setData('image', e.target.files ? e.target.files[0] : null)}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-brand-primary file:text-white hover:file:bg-brand-secondary dark:text-gray-400"
                        />
                    </div>
                    {errors.image && <p className="mt-2 text-sm text-red-600">{errors.image}</p>}
                </div>

                <div className="flex items-start">
                    <div className="flex h-5 items-center">
                        <input
                            id="is_active"
                            name="is_active"
                            type="checkbox"
                            checked={data.is_active}
                            onChange={e => setData('is_active', e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary dark:border-gray-700 dark:bg-gray-800"
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="is_active" className="font-medium text-gray-700 dark:text-gray-300">
                            Set as Active
                        </label>
                        <p className="text-gray-500 dark:text-gray-400">If active, this will immediately be shown to users.</p>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex justify-center rounded-md border border-transparent bg-brand-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 disabled:opacity-50"
                    >
                        Create Popup
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
