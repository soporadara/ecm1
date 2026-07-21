import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import toast from 'react-hot-toast';

export default function Index({ pages }: any) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this page?')) {
            destroy(`/admin/pages/${id}`, {
                preserveScroll: true,
                onSuccess: () => toast.success('Page deleted successfully.')
            });
        }
    };

    return (
        <AdminLayout title="Pages">
            <Head title="Pages - Admin" />

            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-admin-text tracking-tight">Pages</h1>
                    <p className="text-sm font-medium text-admin-text-muted mt-1">Manage your storefront static pages.</p>
                </div>
                <Link 
                    href="/admin/pages/create" 
                    className="inline-flex items-center justify-center bg-admin-primary text-white px-5 py-2.5 rounded-xl font-semibold shadow-sm shadow-admin-primary/30 hover:bg-admin-primary-hover hover:-translate-y-0.5 transition-all duration-200"
                >
                    <svg className="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    New Page
                </Link>
            </div>

            <div className="bg-admin-surface shadow-sm shadow-admin-border/20 rounded-2xl overflow-hidden border border-admin-border/50">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-admin-surface-muted/50 text-admin-text-muted font-bold border-b border-admin-border">
                            <tr>
                                <th className="px-6 py-4 tracking-wider uppercase text-xs">Title</th>
                                <th className="px-6 py-4 tracking-wider uppercase text-xs">Slug</th>
                                <th className="px-6 py-4 tracking-wider uppercase text-xs">Status</th>
                                <th className="px-6 py-4 tracking-wider uppercase text-xs text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-admin-border/50">
                            {pages.data.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-admin-text-muted font-medium">
                                        No pages found.
                                    </td>
                                </tr>
                            ) : (
                                pages.data.map((page: any) => (
                                    <tr key={page.id} className="hover:bg-admin-surface-muted/30 transition-colors">
                                        <td className="px-6 py-4 font-semibold text-admin-text">
                                            <div className="flex items-center gap-2">
                                                <span>{page.title}</span>
                                                {page.is_system && (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-admin-primary/10 text-admin-primary">
                                                        System
                                                    </span>
                                                )}
                                                {page.is_private && (
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-admin-danger/10 text-admin-danger border border-admin-danger/20">
                                                        Private
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-admin-text-muted font-medium">
                                            {page.slug}
                                        </td>
                                        <td className="px-6 py-4">
                                            {page.is_published ? (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-admin-success/10 text-admin-success">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-admin-success"></span>
                                                    Published
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-admin-surface-muted text-admin-text-muted">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-admin-text-muted/50"></span>
                                                    Draft
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-4">
                                            <Link href={`/admin/pages/${page.id}/edit`} className="text-sm font-semibold text-admin-primary hover:text-admin-primary-hover transition-colors">Edit</Link>
                                            {page.is_deletable ? (
                                                <button onClick={() => handleDelete(page.id)} className="text-sm font-semibold text-admin-danger hover:text-red-700 transition-colors">Delete</button>
                                            ) : (
                                                <button disabled className="text-sm font-semibold text-admin-text-muted/50 cursor-not-allowed transition-colors" title="System page cannot be deleted">Delete</button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {pages.total > pages.per_page && (
                <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="text-sm font-medium text-admin-text-muted">
                        Showing {pages.from} to {pages.to} of {pages.total} results
                    </div>
                    <div className="flex gap-2">
                        {pages.links.map((link: any, idx: number) => (
                            <Link
                                key={idx}
                                href={link.url || '#'}
                                className={`px-4 py-2 border rounded-xl text-sm font-semibold transition-all duration-200 ${
                                    link.active 
                                        ? 'bg-admin-primary text-white border-admin-primary shadow-sm shadow-admin-primary/20' 
                                        : 'bg-admin-surface text-admin-text-muted border-admin-border hover:bg-admin-surface-muted hover:text-admin-text'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
