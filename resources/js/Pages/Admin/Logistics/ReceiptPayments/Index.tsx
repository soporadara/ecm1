import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Edit2, Trash2, X, Check, Search, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Index({ methods }: { methods: any[] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMethod, setEditingMethod] = useState<any>(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset, clearErrors, transform } = useForm({
        bank_name: '',
        account_name: '',
        account_number: '',
        logo: null as File | null,
        qr_code: null as File | null,
        is_active: true,
        sort_order: 0,
    });

    const openModal = (method = null) => {
        clearErrors();
        if (method) {
            setEditingMethod(method);
            setData({
                bank_name: method.bank_name,
                account_name: method.account_name,
                account_number: method.account_number,
                logo: null,
                qr_code: null,
                is_active: method.is_active,
                sort_order: method.sort_order,
            });
        } else {
            setEditingMethod(null);
            reset();
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingMethod(null);
        reset();
        clearErrors();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const options = {
            onSuccess: () => {
                closeModal();
                toast.success(`Payment method ${editingMethod ? 'updated' : 'created'} successfully`);
            },
            onError: (err: any) => {
                console.error("Form error:", err);
                toast.error("Failed to save. Check console for details.");
            },
            preserveScroll: true
        };

        transform((data) => ({
            ...data,
            is_active: data.is_active ? 1 : 0
        }));

        if (editingMethod) {
            // Need to handle files in PUT requests specifically in inertia/laravel by using POST with _method=PUT
            post(route('admin.receipt-payments.update', editingMethod.id) + '?_method=PUT', { ...options, forceFormData: true });
        } else {
            post(route('admin.receipt-payments.store'), { ...options, forceFormData: true });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this payment method?')) {
            destroy(route('admin.receipt-payments.destroy', id), {
                onSuccess: () => toast.success('Payment method deleted successfully'),
                preserveScroll: true
            });
        }
    };

    return (
        <AdminLayout
            title="Receipt Payment Methods"
            actions={
                <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 bg-admin-primary text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-admin-primary/90 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Add Method</span>
                </button>
            }
        >
            <Head title="Receipt Payment Methods" />

            <div className="bg-white rounded-2xl shadow-sm border border-admin-border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-admin-surface/50 border-b border-admin-border">
                                <th className="py-3 px-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Bank/Method</th>
                                <th className="py-3 px-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Account Details</th>
                                <th className="py-3 px-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider text-center">Status</th>
                                <th className="py-3 px-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-admin-border">
                            {methods.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="py-8 text-center text-admin-text-muted">
                                        No payment methods found. Add one to get started.
                                    </td>
                                </tr>
                            ) : (
                                methods.map((method) => (
                                    <tr key={method.id} className="hover:bg-admin-surface/30 transition-colors">
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg border border-admin-border bg-white flex items-center justify-center overflow-hidden">
                                                    {method.logo_url ? (
                                                        <img src={method.logo_url} alt={method.bank_name} className="w-full h-full object-contain p-1" />
                                                    ) : (
                                                        <ImageIcon className="w-5 h-5 text-admin-text-muted" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-admin-text text-sm">{method.bank_name}</p>
                                                    <p className="text-xs text-admin-text-muted">Order: {method.sort_order}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <p className="font-semibold text-admin-text text-sm">{method.account_name}</p>
                                            <p className="text-sm font-mono text-admin-text-muted mt-0.5">{method.account_number}</p>
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                                                method.is_active 
                                                    ? 'bg-green-100 text-green-800 border border-green-200' 
                                                    : 'bg-gray-100 text-gray-800 border border-gray-200'
                                            }`}>
                                                {method.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => openModal(method)}
                                                    className="p-1.5 text-admin-text-muted hover:text-admin-primary bg-admin-surface hover:bg-admin-primary/10 rounded-lg transition-colors border border-transparent hover:border-admin-primary/20"
                                                    title="Edit"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(method.id)}
                                                    className="p-1.5 text-admin-text-muted hover:text-red-600 bg-admin-surface hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} />
                    <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-admin-border bg-admin-surface/50">
                            <h2 className="text-lg font-black text-admin-text">
                                {editingMethod ? 'Edit Payment Method' : 'Add Payment Method'}
                            </h2>
                            <button
                                onClick={closeModal}
                                className="p-2 text-admin-text-muted hover:text-admin-text hover:bg-admin-surface rounded-xl transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-1.5 md:col-span-2">
                                    <label className="text-sm font-bold text-admin-text">Bank / Method Name <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        value={data.bank_name}
                                        onChange={e => setData('bank_name', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-admin-border bg-white focus:ring-2 focus:ring-admin-primary/20 focus:border-admin-primary transition-all text-sm outline-none"
                                        placeholder="e.g. ABA Bank"
                                        required
                                    />
                                    {errors.bank_name && <p className="text-red-500 text-xs mt-1">{errors.bank_name}</p>}
                                </div>
                                
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-admin-text">Account Name <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        value={data.account_name}
                                        onChange={e => setData('account_name', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-admin-border bg-white focus:ring-2 focus:ring-admin-primary/20 focus:border-admin-primary transition-all text-sm outline-none"
                                        placeholder="e.g. MVM Logistics"
                                        required
                                    />
                                    {errors.account_name && <p className="text-red-500 text-xs mt-1">{errors.account_name}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-admin-text">Account Number <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        value={data.account_number}
                                        onChange={e => setData('account_number', e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-admin-border bg-white focus:ring-2 focus:ring-admin-primary/20 focus:border-admin-primary transition-all text-sm outline-none font-mono"
                                        placeholder="e.g. 001 234 567"
                                        required
                                    />
                                    {errors.account_number && <p className="text-red-500 text-xs mt-1">{errors.account_number}</p>}
                                </div>

                                <div className="space-y-1.5 md:col-span-2">
                                    <label className="text-sm font-bold text-admin-text">Bank Logo / Icon</label>
                                    <div className="flex items-center gap-4">
                                        {(data.logo || editingMethod?.logo_url) && (
                                            <div className="w-12 h-12 rounded-lg border border-admin-border bg-white flex items-center justify-center overflow-hidden shrink-0">
                                                <img 
                                                    src={data.logo ? URL.createObjectURL(data.logo) : editingMethod.logo_url} 
                                                    alt="Preview" 
                                                    className="w-full h-full object-contain p-1" 
                                                />
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={e => setData('logo', e.target.files?.[0] || null)}
                                                className="w-full text-sm text-admin-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-admin-surface file:text-admin-text hover:file:bg-admin-border/50 transition-colors cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                    {errors.logo && <p className="text-red-500 text-xs mt-1">{errors.logo}</p>}
                                </div>

                                <div className="space-y-1.5 md:col-span-2 border-t border-admin-border pt-4">
                                    <label className="text-sm font-bold text-admin-text flex items-center gap-2">
                                        KHQR Code Image
                                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-[10px] uppercase font-black tracking-wider">Recommended</span>
                                    </label>
                                    <p className="text-xs text-admin-text-muted mb-2">Upload the KHQR code image to display on receipts.</p>
                                    <div className="flex items-center gap-4">
                                        {(data.qr_code || editingMethod?.qr_code_url) && (
                                            <div className="w-16 h-16 rounded-lg border border-admin-border bg-white flex items-center justify-center overflow-hidden shrink-0">
                                                <img 
                                                    src={data.qr_code ? URL.createObjectURL(data.qr_code) : editingMethod.qr_code_url} 
                                                    alt="Preview" 
                                                    className="w-full h-full object-contain p-1" 
                                                />
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={e => setData('qr_code', e.target.files?.[0] || null)}
                                                className="w-full text-sm text-admin-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-admin-surface file:text-admin-text hover:file:bg-admin-border/50 transition-colors cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                    {errors.qr_code && <p className="text-red-500 text-xs mt-1">{errors.qr_code}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-admin-text">Sort Order</label>
                                    <input
                                        type="number"
                                        value={data.sort_order}
                                        onChange={e => setData('sort_order', parseInt(e.target.value) || 0)}
                                        className="w-full px-4 py-2.5 rounded-xl border border-admin-border bg-white focus:ring-2 focus:ring-admin-primary/20 focus:border-admin-primary transition-all text-sm outline-none"
                                    />
                                    {errors.sort_order && <p className="text-red-500 text-xs mt-1">{errors.sort_order}</p>}
                                </div>

                                <div className="flex items-center mt-7">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <div className="relative flex items-center justify-center">
                                            <input
                                                type="checkbox"
                                                checked={data.is_active}
                                                onChange={e => setData('is_active', e.target.checked)}
                                                className="peer sr-only"
                                            />
                                            <div className="w-6 h-6 rounded-lg border-2 border-admin-border bg-admin-surface peer-checked:bg-admin-primary peer-checked:border-admin-primary transition-colors group-hover:border-admin-primary/50" />
                                            <Check className="w-3.5 h-3.5 text-white absolute opacity-0 peer-checked:opacity-100 transition-opacity" />
                                        </div>
                                        <span className="text-sm font-bold text-admin-text group-hover:text-admin-primary transition-colors select-none">Active (Show on receipts)</span>
                                    </label>
                                </div>
                            </div>
                        </form>

                        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-admin-border bg-admin-surface/50">
                            <button
                                type="button"
                                onClick={closeModal}
                                className="px-5 py-2.5 text-sm font-bold text-admin-text hover:bg-admin-border/50 rounded-xl transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={processing}
                                className="flex items-center gap-2 px-6 py-2.5 bg-admin-primary text-white text-sm font-bold rounded-xl shadow-sm hover:bg-admin-primary/90 transition-colors disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : 'Save Method'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
