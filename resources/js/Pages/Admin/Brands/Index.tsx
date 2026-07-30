import { Head, useForm, router } from '@inertiajs/react';
import { confirmAction } from '@/Components/ConfirmModal';
import AdminLayout from '../../../Layouts/AdminLayout';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface Brand {
    id: number;
    name: string;
    slug: string;
    logo: string | null;
    products_count: number;
}

export default function BrandsIndex({ brands }: { brands: Brand[] }) {
    const [editing, setEditing] = useState<Brand | null>(null);
    const [showCreate, setShowCreate] = useState(false);

    const createForm = useForm({ name: '', logo: '' });
    const editForm = useForm({ name: '', logo: '' });

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        createForm.post('/admin/brands', {
            onSuccess: () => {
                toast.success('Brand created successfully');
                createForm.reset();
                setShowCreate(false);
            },
            onError: () => toast.error('Failed to create brand'),
        });
    };

    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editing) return;
        editForm.put(`/admin/brands/${editing.id}`, {
            onSuccess: () => {
                toast.success('Brand updated successfully');
                setEditing(null);
            },
            onError: () => toast.error('Failed to update brand'),
        });
    };

    const handleDelete = async (id: number) => {
        if (!(await confirmAction('Delete this brand?'))) return;
        router.delete(`/admin/brands/${id}`, {
            onSuccess: () => toast.success('Brand deleted successfully'),
            onError: () => toast.error('Failed to delete brand'),
        });
    };

    return (
        <AdminLayout 
            title="Brands"
            actions={
                <button
                    onClick={() => setShowCreate(true)}
                    className="inline-flex items-center justify-center bg-admin-primary text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm shadow-admin-primary/30 hover:bg-admin-primary-hover hover:-translate-y-0.5 transition-all duration-200"
                >
                    + New Brand
                </button>
            }
        >
            <Head title="Brands — Rafel CMS" />

            <div className="hidden sm:flex sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-admin-text tracking-tight">Brands</h1>
                    <p className="text-sm font-medium text-admin-text-muted mt-1">{brands.length} brands in your store</p>
                </div>
            </div>

            {/* Create Modal */}
            {showCreate && (
                <div className="fixed inset-0 bg-admin-surface-muted/80 z-50 flex items-center justify-center px-4 backdrop-blur-sm">
                    <div className="bg-admin-surface rounded-2xl shadow-xl w-full max-w-md p-6 border border-admin-border/50">
                        <h2 className="text-lg font-black text-admin-text mb-4">New Brand</h2>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-admin-text-muted mb-1.5">Brand Name</label>
                                <input type="text" value={createForm.data.name} onChange={e => createForm.setData('name', e.target.value)}
                                    className="h-11 w-full rounded-xl border border-admin-border bg-admin-surface px-3 text-sm font-semibold text-admin-text shadow-sm focus:border-admin-primary focus:outline-none focus:ring-2 focus:ring-admin-primary/20" required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-admin-text-muted mb-1.5">Logo URL</label>
                                <input type="text" value={createForm.data.logo} onChange={e => createForm.setData('logo', e.target.value)}
                                    className="h-11 w-full rounded-xl border border-admin-border bg-admin-surface px-3 text-sm font-semibold text-admin-text shadow-sm focus:border-admin-primary focus:outline-none focus:ring-2 focus:ring-admin-primary/20" placeholder="https://..." />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button type="submit" disabled={createForm.processing}
                                    className="px-5 py-2.5 bg-admin-primary text-white text-sm font-bold rounded-xl shadow-sm shadow-admin-primary/30 hover:bg-admin-primary-hover transition-all disabled:opacity-50">
                                    Create Brand
                                </button>
                                <button type="button" onClick={() => setShowCreate(false)}
                                    className="px-5 py-2.5 text-sm font-bold text-admin-text border border-admin-border rounded-xl hover:bg-admin-surface-muted transition-colors">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="bg-admin-surface shadow-sm shadow-admin-border/20 rounded-2xl overflow-hidden border border-admin-border/50">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left whitespace-nowrap">
                        <thead className="bg-admin-surface-muted/50 text-admin-text-muted font-bold border-b border-admin-border">
                            <tr>
                                <th className="px-6 py-4 tracking-wider uppercase text-xs">Brand</th>
                                <th className="px-6 py-4 tracking-wider uppercase text-xs text-center">Products</th>
                                <th className="px-6 py-4 tracking-wider uppercase text-xs text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-admin-border/50">
                            {brands.length === 0 && (
                                <tr><td colSpan={3} className="text-center py-10 text-admin-text-muted font-medium text-sm">No brands yet.</td></tr>
                            )}
                            {brands.map(b => (
                                <tr key={b.id} className="hover:bg-admin-surface-muted/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {b.logo ? (
                                                <img src={b.logo} alt={b.name} className="w-8 h-8 object-contain rounded-lg bg-admin-surface-muted border border-admin-border/50 shadow-sm p-0.5" />
                                            ) : (
                                                <div className="w-8 h-8 rounded-lg bg-admin-surface-muted flex items-center justify-center text-admin-text-muted text-xs font-bold border border-admin-border/50 shadow-sm">
                                                    {b.name.charAt(0)}
                                                </div>
                                            )}
                                            <span className="font-semibold text-admin-text">{b.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center font-bold text-admin-text">{b.products_count}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            <button onClick={() => { setEditing(b); editForm.setData({ name: b.name, logo: b.logo ?? '' }); }}
                                                className="text-sm font-semibold text-admin-primary hover:text-admin-primary-hover transition-colors">
                                                Edit
                                            </button>
                                            <button onClick={() => handleDelete(b.id)}
                                                className="text-sm font-semibold text-admin-danger hover:text-red-700 transition-colors">
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

            {/* Edit Modal */}
            {editing && (
                <div className="fixed inset-0 bg-admin-surface-muted/80 z-50 flex items-center justify-center px-4 backdrop-blur-sm">
                    <div className="bg-admin-surface rounded-2xl shadow-xl w-full max-w-md p-6 border border-admin-border/50">
                        <h2 className="text-lg font-black text-admin-text mb-4">Edit Brand</h2>
                        <form onSubmit={handleEdit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-admin-text-muted mb-1.5">Brand Name</label>
                                <input type="text" value={editForm.data.name} onChange={e => editForm.setData('name', e.target.value)}
                                    className="h-11 w-full rounded-xl border border-admin-border bg-admin-surface px-3 text-sm font-semibold text-admin-text shadow-sm focus:border-admin-primary focus:outline-none focus:ring-2 focus:ring-admin-primary/20" required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-admin-text-muted mb-1.5">Logo URL</label>
                                <input type="text" value={editForm.data.logo} onChange={e => editForm.setData('logo', e.target.value)}
                                    className="h-11 w-full rounded-xl border border-admin-border bg-admin-surface px-3 text-sm font-semibold text-admin-text shadow-sm focus:border-admin-primary focus:outline-none focus:ring-2 focus:ring-admin-primary/20" />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button type="submit" disabled={editForm.processing}
                                    className="px-5 py-2.5 bg-admin-primary text-white text-sm font-bold rounded-xl shadow-sm shadow-admin-primary/30 hover:bg-admin-primary-hover transition-all disabled:opacity-50">Save</button>
                                <button type="button" onClick={() => setEditing(null)}
                                    className="px-5 py-2.5 text-sm font-bold text-admin-text border border-admin-border rounded-xl hover:bg-admin-surface-muted transition-colors">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
