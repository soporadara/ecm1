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
                    className="inline-flex items-center justify-center bg-admin-primary text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm shadow-admin-primary/30 hover:bg-admin-primary-hover hover:-translate-y-0.5 transition-all duration-200"
                >
                    <svg className="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    New Category
                </Link>
            }
        >
            <Head title="Categories — Rafel CMS" />

            <div className="hidden sm:flex sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-admin-text tracking-tight">Product Categories</h1>
                    <p className="text-sm font-medium text-admin-text-muted mt-1">Organize your products into categories and subcategories.</p>
                </div>
            </div>

            {/* Search */}
            <div className="bg-admin-surface shadow-sm shadow-admin-border/20 rounded-2xl border border-admin-border/50 overflow-hidden mb-4">
                <div className="flex items-center gap-3 px-4 py-3 border-b border-admin-border">
                    <svg className="w-4 h-4 text-admin-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search categories..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="flex-1 outline-none bg-transparent text-sm font-medium text-admin-text placeholder-admin-text-muted border-none ring-0 focus:ring-0"
                    />
                    <span className="text-xs font-bold text-admin-text-muted">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
                </div>
            </div>

                {/* Table */}
                <div className="bg-admin-surface shadow-sm shadow-admin-border/20 rounded-2xl border border-admin-border/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left whitespace-nowrap">
                        <thead className="text-xs text-admin-text-muted uppercase bg-admin-surface-muted/50 border-b border-admin-border">
                            <tr>
                                <th className="px-6 py-4 font-bold tracking-wider">Icon/Image</th>
                                <th className="px-6 py-4 font-bold tracking-wider">Name</th>
                                <th className="px-6 py-4 font-bold tracking-wider">Type</th>
                                <th className="px-6 py-4 font-bold tracking-wider">Products</th>
                                <th className="px-6 py-4 font-bold tracking-wider">Status</th>
                                <th className="px-6 py-4 font-bold tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-admin-border/50">
                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center py-12 text-admin-text-muted font-medium text-sm">
                                        No categories found.
                                        <Link href="/admin/categories/create" className="ml-2 text-admin-primary hover:underline font-bold">Create one →</Link>
                                    </td>
                                </tr>
                            )}
                            {filtered.map(cat => (
                                <tr key={cat.id} className="hover:bg-admin-surface-muted/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {cat.image ? (
                                                <img src={cat.image} alt={cat.name} className="w-8 h-8 rounded-lg object-cover bg-admin-surface-muted border border-admin-border/50 shadow-sm" />
                                            ) : (
                                                <div className="w-8 h-8 rounded-lg bg-admin-surface-muted flex items-center justify-center text-admin-text-muted border border-admin-border/50 shadow-sm">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-admin-text">{cat.name}</td>
                                    <td className="px-6 py-4 text-admin-text-muted font-medium">{cat.parent_name ?? <span className="text-admin-text-muted/50">Root</span>}</td>
                                    <td className="px-6 py-4 font-bold text-admin-text">{cat.products_count}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide uppercase ${
                                            cat.is_active
                                                ? 'bg-admin-success/10 text-admin-success'
                                                : 'bg-admin-surface-muted text-admin-text-muted border border-admin-border/50'
                                        }`}>
                                            {cat.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center gap-3 justify-end">
                                            <Link
                                                href={`/admin/categories/${cat.id}/edit`}
                                                className="text-sm font-semibold text-admin-primary hover:text-admin-primary-hover transition-colors"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(cat.id)}
                                                disabled={deleting === cat.id}
                                                className="text-sm font-semibold text-admin-danger hover:text-red-700 transition-colors disabled:opacity-50"
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
