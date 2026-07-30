import { Head, Link, useForm, router } from '@inertiajs/react';
import { confirmAction } from '@/Components/ConfirmModal';
import React, { useState } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import toast from 'react-hot-toast';

interface Review {
    id: number;
    rating: number;
    comment: string;
    created_at: string;
    user: {
        name: string;
        email: string;
    };
    product: {
        name: string;
        slug: string;
    };
}

interface Props {
    reviews: {
        data: Review[];
        links: any[];
    };
}

export default function Reviews({ reviews }: Props) {
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const deleteReview = async (id: number) => {
        if (await confirmAction('Are you sure you want to delete this review?')) {
            setDeletingId(id);
            router.delete(`/admin/reviews/${id}`, {
                preserveScroll: true,
                onSuccess: () => toast.success('Review deleted successfully.'),
                onError: () => toast.error('Failed to delete review.'),
                onFinish: () => setDeletingId(null),
            });
        }
    };

    return (
        <AdminLayout title="Product Reviews">
            <Head title="Reviews - Admin" />

            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Product Reviews</h1>
                    <p className="text-sm text-gray-500 mt-1">Manage customer feedback and ratings.</p>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 font-medium border-b border-gray-200 dark:border-gray-700">
                            <tr>
                                <th className="px-6 py-4">Rating</th>
                                <th className="px-6 py-4">Product</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4 w-1/3">Comment</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {reviews.data.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                        No reviews found.
                                    </td>
                                </tr>
                            ) : (
                                reviews.data.map((review) => (
                                    <tr key={review.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/25 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center text-yellow-400">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-300 dark:text-gray-600 fill-current'}`} viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                            {review.product?.name || 'Unknown Product'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-gray-900 dark:text-white">{review.user?.name || 'Guest'}</p>
                                            <p className="text-xs text-gray-500">{review.user?.email}</p>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-400 whitespace-normal">
                                            {review.comment}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                                            {new Date(review.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => deleteReview(review.id)}
                                                disabled={deletingId === review.id}
                                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors disabled:opacity-50"
                                            >
                                                {deletingId === review.id ? 'Deleting...' : 'Delete'}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
