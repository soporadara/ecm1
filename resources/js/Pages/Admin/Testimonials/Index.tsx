import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';


export default function Index({ testimonials }: any) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingTestimonial, setEditingTestimonial] = useState<any>(null);

    const { data, setData, post, clearErrors, reset, errors, processing } = useForm({
        customer_name: '',
        content: '',
        rating: 5,
        is_active: true,
        sort_order: 0,
        image: null as File | null,
        remove_image: false,
        product_image_1: null as File | null,
        remove_product_image_1: false,
        product_image_2: null as File | null,
        remove_product_image_2: false,
    });

    const openModal = (testimonial: any = null) => {
        clearErrors();
        setEditingTestimonial(testimonial);
        if (testimonial) {
            setEditingId(testimonial.id);
            setData({
                customer_name: testimonial.customer_name,
                content: testimonial.content,
                rating: testimonial.rating,
                is_active: testimonial.is_active,
                sort_order: testimonial.sort_order,
                image: null,
                remove_image: false,
                product_image_1: null,
                remove_product_image_1: false,
                product_image_2: null,
                remove_product_image_2: false,
            });
        } else {
            setEditingId(null);
            reset();
        }
        setIsModalOpen(true);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (editingId) {
            // Inertia doesn't support PUT with files, so we use POST with _method
            router.post(`/admin/testimonials/${editingId}`, {
                _method: 'put',
                ...data,
            }, {
                preserveScroll: true,
                onSuccess: () => setIsModalOpen(false),
            });
        } else {
            post('/admin/testimonials', {
                preserveScroll: true,
                onSuccess: () => setIsModalOpen(false),
            });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this testimonial?')) {
            router.delete(`/admin/testimonials/${id}`);
        }
    };

    const renderPreview = (file: File | null, existingPath?: string) => {
        if (file) {
            return (
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-admin-border/50 bg-admin-surface-muted relative group">
                    <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover" />
                </div>
            );
        }
        if (existingPath) {
            return (
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-admin-border/50 bg-admin-surface-muted relative group">
                    <img src={`/storage/${existingPath}`} alt="Current" className="w-full h-full object-cover" />
                </div>
            );
        }
        return (
            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-admin-border/50 bg-admin-surface-muted flex items-center justify-center text-admin-text-muted/30 text-xs">
                None
            </div>
        );
    };

    return (
        <AdminLayout>
            <Head title="Testimonials - Admin" />

            <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-admin-text tracking-tight">Customer Reviews (Testimonials)</h1>
                        <p className="text-sm font-medium text-admin-text-muted mt-1">Manage what customers are saying on your homepage.</p>
                    </div>
                    <button onClick={() => openModal()} className="px-4 py-2 bg-admin-primary text-white rounded-xl font-bold text-xs sm:text-sm hover:bg-admin-primary-hover transition-colors">
                        + Add Review
                    </button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-admin-border/40 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-admin-text-muted">
                            <thead className="text-xs uppercase bg-admin-surface/50 text-admin-text/70 border-b border-admin-border/40">
                                <tr>
                                    <th className="px-6 py-4 font-bold tracking-wider">Customer</th>
                                    <th className="px-6 py-4 font-bold tracking-wider">Review</th>
                                    <th className="px-6 py-4 font-bold tracking-wider text-center">Rating</th>
                                    <th className="px-6 py-4 font-bold tracking-wider text-center">Status</th>
                                    <th className="px-6 py-4 font-bold tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-admin-border/40">
                                {testimonials.map((t: any) => (
                                    <tr key={t.id} className="hover:bg-admin-surface/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full overflow-hidden bg-admin-surface-muted shrink-0 border border-admin-border/50">
                                                    {t.image_path ? (
                                                        <img src={`/storage/${t.image_path}`} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-admin-text-muted font-bold text-lg">
                                                            {t.customer_name.charAt(0)}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="font-bold text-admin-text">{t.customer_name}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="line-clamp-2 max-w-md" title={t.content}>{t.content}</div>
                                        </td>
                                        <td className="px-6 py-4 text-center text-yellow-400 font-bold">
                                            {'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${t.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {t.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button onClick={() => openModal(t)} className="text-admin-primary hover:underline font-medium mr-4">Edit</button>
                                            <button onClick={() => handleDelete(t.id)} className="text-red-500 hover:underline font-medium">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                                {testimonials.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-admin-text-muted">
                                            No reviews found. Click "Add Review" to get started.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <form onSubmit={submit} className="p-6 sm:p-8 bg-white text-admin-text">
                            <h2 className="text-2xl font-bold mb-6">{editingId ? 'Edit Review' : 'Add Review'}</h2>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-bold mb-1">Customer Name *</label>
                                    <input type="text" value={data.customer_name} onChange={e => setData('customer_name', e.target.value)} required className="w-full border-admin-border/50 rounded-xl focus:ring-admin-primary focus:border-admin-primary" />
                                    {errors.customer_name && <div className="text-red-500 text-xs mt-1">{errors.customer_name}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-bold mb-1">Review Content *</label>
                                    <textarea value={data.content} onChange={e => setData('content', e.target.value)} required rows={4} className="w-full border-admin-border/50 rounded-xl focus:ring-admin-primary focus:border-admin-primary"></textarea>
                                    {errors.content && <div className="text-red-500 text-xs mt-1">{errors.content}</div>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold mb-1">Rating (1-5)</label>
                                        <select value={data.rating} onChange={e => setData('rating', parseInt(e.target.value))} className="w-full border-admin-border/50 rounded-xl focus:ring-admin-primary focus:border-admin-primary">
                                            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} Stars</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold mb-1">Sort Order</label>
                                        <input type="number" value={data.sort_order} onChange={e => setData('sort_order', parseInt(e.target.value))} className="w-full border-admin-border/50 rounded-xl focus:ring-admin-primary focus:border-admin-primary" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold mb-1">Upload Profile Picture</label>
                                    <div className="flex gap-4 items-center">
                                        {renderPreview(data.image, editingTestimonial?.image_path)}
                                        <input type="file" accept="image/*" onChange={e => setData('image', e.target.files ? e.target.files[0] : null)} className="w-full rounded-xl border border-admin-border/50 text-admin-text text-sm file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-admin-primary/10 file:text-admin-primary hover:file:bg-admin-primary/20 transition-colors cursor-pointer bg-admin-surface-muted" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-admin-border/50">
                                    <div>
                                        <label className="block text-sm font-bold mb-1">Product Image 1 (Optional)</label>
                                        <div className="flex gap-4 items-center">
                                            {renderPreview(data.product_image_1, editingTestimonial?.product_image_1)}
                                            <input type="file" accept="image/*" onChange={e => setData('product_image_1', e.target.files ? e.target.files[0] : null)} className="w-full rounded-xl border border-admin-border/50 text-admin-text text-sm file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-admin-primary/10 file:text-admin-primary hover:file:bg-admin-primary/20 transition-colors cursor-pointer bg-admin-surface-muted" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold mb-1">Product Image 2 (Optional)</label>
                                        <div className="flex gap-4 items-center">
                                            {renderPreview(data.product_image_2, editingTestimonial?.product_image_2)}
                                            <input type="file" accept="image/*" onChange={e => setData('product_image_2', e.target.files ? e.target.files[0] : null)} className="w-full rounded-xl border border-admin-border/50 text-admin-text text-sm file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-admin-primary/10 file:text-admin-primary hover:file:bg-admin-primary/20 transition-colors cursor-pointer bg-admin-surface-muted" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="flex items-center gap-2">
                                        <input type="checkbox" checked={data.is_active} onChange={e => setData('is_active', e.target.checked)} className="rounded border-admin-border text-admin-primary focus:ring-admin-primary" />
                                        <span className="text-sm font-bold">Active (Visible on Homepage)</span>
                                    </label>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end gap-3">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-admin-text-muted hover:bg-admin-surface transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" disabled={processing} className="px-5 py-2.5 bg-admin-primary text-white rounded-xl font-bold hover:bg-admin-primary-hover disabled:opacity-50 transition-colors">
                                    {editingId ? 'Update' : 'Save'} Review
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
