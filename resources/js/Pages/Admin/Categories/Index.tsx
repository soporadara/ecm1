import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface Category {
    id: number;
    name: string;
    slug: string;
    parent_id: number | null;
    parent_name: string | null;
    products_count: number;
    is_active: boolean;
    image: string | null;
}

export default function CategoriesIndex({ categories }: { categories: Category[] }) {
    const [search, setSearch] = useState('');
    const [deleting, setDeleting] = useState<number | null>(null);

    const filtered = categories.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = (id: number) => {
        if (!confirm('Delete this category? This cannot be undone.')) return;
        setDeleting(id);
        router.delete(`/admin/categories/${id}`, {
            onSuccess: () => {
                toast.success('Category deleted successfully');
                setDeleting(null);
            },
            onError: (errors: any) => {
                if (errors.error) toast.error(errors.error);
                else toast.error('Failed to delete category');
                setDeleting(null);
            },
            onFinish: () => setDeleting(null),
        });
    };

    return (
        <AdminLayout
            title="Categories"
            actions={
                <Link
                    href="/admin/categories/create"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    New Category
                </Link>
            }
        >
            <Head title="Categories — Rafel CMS" />

            <div className="mb-6">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Product Categories</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Organize your products into hierarchical categories.</p>
            </div>

            {/* Search */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700 mb-4">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                    <svg className="w-4 h-4 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search categories..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="flex-1 outline-none bg-transparent text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 border-none ring-0 focus:ring-0"
                    />
                    <span className="text-xs text-gray-400 dark:text-gray-500">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
                            <tr>
                                <th className="px-5 py-3 font-semibold">Name</th>
                                <th className="px-5 py-3 font-semibold hidden md:table-cell">Parent</th>
                                <th className="px-5 py-3 font-semibold hidden sm:table-cell">Slug</th>
                                <th className="px-5 py-3 font-semibold text-center">Products</th>
                                <th className="px-5 py-3 font-semibold text-center">Status</th>
                                <th className="px-5 py-3 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center py-12 text-gray-400 text-sm">
                                        No categories found.
                                        <Link href="/admin/categories/create" className="ml-2 text-indigo-600 dark:text-indigo-400 hover:underline">Create one →</Link>
                                    </td>
                                </tr>
                            )}
                            {filtered.map(cat => (
                                <tr key={cat.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-3">
                                            {cat.image ? (
                                                <img src={cat.image} alt={cat.name} className="w-8 h-8 rounded object-cover bg-gray-100 dark:bg-gray-700" />
                                            ) : (
                                                <div className="w-8 h-8 rounded bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                    </svg>
                                                </div>
                                            )}
                                            <span className="font-medium text-gray-900 dark:text-white">{cat.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 text-gray-500 dark:text-gray-400 hidden md:table-cell">
                                        {cat.parent_name ?? <span className="text-gray-300 dark:text-gray-600">—</span>}
                                    </td>
                                    <td className="px-5 py-3 text-gray-400 dark:text-gray-500 font-mono text-xs hidden sm:table-cell">{cat.slug}</td>
                                    <td className="px-5 py-3 text-center">
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{cat.products_count}</span>
                                    </td>
                                    <td className="px-5 py-3 text-center">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            cat.is_active
                                                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                                        }`}>
                                            {cat.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3 text-right">
                                        <div className="flex items-center gap-2 justify-end">
                                            <Link
                                                href={`/admin/categories/${cat.id}/edit`}
                                                className="px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(cat.id)}
                                                disabled={deleting === cat.id}
                                                className="px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50"
                                            >
                                                {deleting === cat.id ? '...' : 'Delete'}
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
