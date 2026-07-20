import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import toast from 'react-hot-toast';

interface Popup {
    id: number;
    title: string;
    heading: string | null;
    is_active: boolean;
    created_at: string;
}

interface Props {
    popups: {
        data: Popup[];
        links: any[];
    };
}

export default function Index({ popups }: Props) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this popup?')) {
            router.delete(route('admin.popups.destroy', id), {
                onSuccess: () => toast.success('Popup deleted successfully'),
                onError: () => toast.error('Failed to delete popup'),
            });
        }
    };

    return (
        <AdminLayout title="Popups & Ads">
            <Head title="Popups & Ads — Rafel CMS" />

            <div className="mb-6 flex justify-between items-end">
                <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Popups & Ads</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Manage promotional popups, sales, and announcements.</p>
                </div>
                <Link
                    href={route('admin.popups.create')}
                    className="inline-flex items-center justify-center rounded-lg border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition-colors"
                >
                    Add Popup
                </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700/50 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-4 font-semibold">Internal Title</th>
                                <th scope="col" className="px-6 py-4 font-semibold">Heading</th>
                                <th scope="col" className="px-6 py-4 font-semibold text-center">Status</th>
                                <th scope="col" className="px-6 py-4 font-semibold">Created</th>
                                <th scope="col" className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {popups.data.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="text-center py-12 text-gray-400 dark:text-gray-500 text-sm">No popups found.</td>
                                </tr>
                            )}
                            {popups.data.map((popup) => (
                                <tr key={popup.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                        {popup.title}
                                    </td>
                                    <td className="px-6 py-4">
                                        {popup.heading || '-'}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${popup.is_active ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}`}>
                                            {popup.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                                        {new Date(popup.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-3">
                                            <Link href={route('admin.popups.edit', popup.id)} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 font-medium">
                                                Edit
                                            </Link>
                                            <button onClick={() => handleDelete(popup.id)} className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 font-medium">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
