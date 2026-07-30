import React, { useState } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import toast from 'react-hot-toast';

export default function Comments({ post, comments }: any) {
    const [replyingTo, setReplyingTo] = useState<any>(null);
    const { data, setData, post: submitReply, processing, reset } = useForm({
        admin_reply: ''
    });

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this comment?')) {
            router.delete(`/admin/comments/${id}`, {
                onSuccess: () => toast.success('Comment deleted successfully'),
            });
        }
    };

    const handleReplyClick = (comment: any) => {
        setReplyingTo(comment);
        setData('admin_reply', comment.admin_reply || '');
    };

    const handleReplySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!replyingTo) return;
        
        submitReply(`/admin/comments/${replyingTo.id}/reply`, {
            onSuccess: () => {
                setReplyingTo(null);
                reset();
                toast.success('Reply saved successfully!');
            }
        });
    };

    return (
        <AdminLayout title={`Comments - ${post.title}`}>
            <Head title={`Comments for ${post.title}`} />

            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/posts" className="text-gray-500 hover:text-brand-primary transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white line-clamp-1">
                            Comments: {post.title}
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">Manage customer comments on this blog post.</p>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Author</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Review Title</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Comment</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
                            {comments.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                        No comments found for this post.
                                    </td>
                                </tr>
                            ) : (
                                comments.map((comment: any) => (
                                    <tr key={comment.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">{comment.name}</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">{comment.email}</div>
                                            {comment.website && (
                                                <a href={comment.website} target="_blank" rel="noopener noreferrer" className="text-xs text-brand-primary hover:underline">
                                                    {comment.website}
                                                </a>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-300 font-medium">
                                            {comment.review_title || <span className="text-gray-400 italic">None</span>}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs whitespace-pre-wrap">
                                            {comment.content}
                                            {comment.admin_reply && (
                                                <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                                                    <span className="font-bold text-brand-primary text-xs uppercase block mb-1">Your Reply:</span>
                                                    {comment.admin_reply}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                            {new Date(comment.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-3 whitespace-nowrap">
                                            <button onClick={() => handleReplyClick(comment)} className="text-brand-primary hover:text-brand-secondary font-medium transition-colors text-sm">
                                                Reply
                                            </button>
                                            <button onClick={() => handleDelete(comment.id)} className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 font-medium transition-colors text-sm">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Reply Modal */}
            {replyingTo && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Reply to {replyingTo.name}</h3>
                            <button onClick={() => setReplyingTo(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto">
                            <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm text-gray-600 dark:text-gray-300">
                                "{replyingTo.content}"
                            </div>
                            <form onSubmit={handleReplySubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Your Reply</label>
                                    <textarea
                                        rows={5}
                                        className="w-full rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:border-brand-primary focus:ring-brand-primary"
                                        placeholder="Type your reply here..."
                                        value={data.admin_reply}
                                        onChange={e => setData('admin_reply', e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                                <div className="flex justify-end gap-3 mt-6">
                                    <button type="button" onClick={() => setReplyingTo(null)} className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium transition-colors">
                                        Cancel
                                    </button>
                                    <button type="submit" disabled={processing} className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-secondary text-sm font-bold transition-colors disabled:opacity-50">
                                        {processing ? 'Saving...' : 'Save Reply'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
