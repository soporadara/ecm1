import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import toast from 'react-hot-toast';

export default function Index({ posts, filters = {} }: any) {
    const { delete: destroy } = useForm();
    const [from, setFrom] = useState(filters.from || '');
    const [to, setTo] = useState(filters.to || '');

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this post?')) {
            destroy(`/admin/posts/${id}`, {
                preserveScroll: true,
                onSuccess: () => toast.success('Post deleted successfully.')
            });
        }
    };
    const applyFilters = (event: React.FormEvent) => {
        event.preventDefault();
        router.get('/admin/posts', { from, to }, { preserveState: true, replace: true });
    };

    return (
        <AdminLayout title="Blog Posts">
            <Head title="Blog Posts - Admin" />

            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Blog Posts</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage your storefront blog articles.</p>
                </div>
                <Link 
                    href="/admin/posts/create" 
                    className="inline-flex items-center justify-center bg-brand-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-secondary transition-colors"
                >
                    <svg className="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    New Post
                </Link>
            </div>

            <form onSubmit={applyFilters} className="mb-6 flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:flex-row sm:items-end">
                <label className="text-sm font-bold text-gray-600 dark:text-gray-300">
                    From
                    <input type="date" value={from} onChange={(event) => setFrom(event.target.value)} className="mt-1 block rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white" />
                </label>
                <label className="text-sm font-bold text-gray-600 dark:text-gray-300">
                    To
                    <input type="date" value={to} onChange={(event) => setTo(event.target.value)} className="mt-1 block rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white" />
                </label>
                <button className="min-h-11 rounded-xl bg-brand-primary px-5 text-sm font-black uppercase tracking-wider text-white transition hover:-translate-y-0.5 hover:bg-brand-secondary">Filter Dates</button>
            </form>

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 font-medium border-b border-gray-200 dark:border-gray-700">
                            <tr>
                                <th className="px-6 py-4 w-16 text-center">Nº</th>
                                <th className="px-6 py-4">Image</th>
                                <th className="px-6 py-4">Title</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Author</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {posts.data.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                                        No posts found.
                                    </td>
                                </tr>
                            ) : (
                                posts.data.map((post: any, idx: number) => (
                                    <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/25 transition-colors">
                                        <td className="px-6 py-4 font-semibold text-gray-500 text-center">
                                            {(posts.current_page - 1) * posts.per_page + idx + 1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {post.image ? (
                                                <img src={post.image} alt={post.title} className="h-10 w-10 rounded-lg object-cover border border-gray-200 dark:border-gray-700" />
                                            ) : (
                                                <div className="h-10 w-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-600">
                                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900 dark:text-white">{post.title}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">{post.slug}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {post.category ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400">
                                                    {post.category.name}
                                                </span>
                                            ) : (
                                                <span className="text-gray-400 text-xs italic">Uncategorized</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                                            {post.user ? post.user.name : '-'}
                                        </td>
                                        <td className="px-6 py-4">
                                            {post.is_published ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                                    {post.scheduled_at && new Date(post.scheduled_at) > new Date() ? 'Scheduled' : 'Published'}
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                                                    Draft
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-3">
                                            <Link href={`/admin/posts/${post.id}/comments`} className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300 font-medium transition-colors">Comments</Link>
                                            <Link href={`/admin/posts/${post.id}/edit`} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 font-medium transition-colors">Edit</Link>
                                            <button onClick={() => handleDelete(post.id)} className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 font-medium transition-colors">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {posts.total > posts.per_page && (
                <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="text-sm text-gray-500">
                        Showing {posts.from} to {posts.to} of {posts.total} results
                    </div>
                    <div className="flex gap-2">
                        {posts.links.map((link: any, idx: number) => (
                            <Link
                                key={idx}
                                href={link.url || '#'}
                                className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${link.active ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
