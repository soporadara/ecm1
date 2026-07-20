import { Head, useForm, router } from '@inertiajs/react';
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

    const handleDelete = (id: number) => {
        if (!confirm('Delete this brand?')) return;
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
                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    + New Brand
                </button>
            }
        >
            <Head title="Brands — Rafel CMS" />

            <div className="mb-6">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Brands</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{brands.length} brands in your store</p>
            </div>

            {/* Create Modal */}
            {showCreate && (
                <div className="fixed inset-0 bg-black/40 dark:bg-black/60 z-50 flex items-center justify-center px-4 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6 border border-gray-100 dark:border-gray-700">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">New Brand</h2>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Brand Name</label>
                                <input type="text" value={createForm.data.name} onChange={e => createForm.setData('name', e.target.value)}
                                    className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Logo URL</label>
                                <input type="text" value={createForm.data.logo} onChange={e => createForm.setData('logo', e.target.value)}
                                    className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="https://..." />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="submit" disabled={createForm.processing}
                                    className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50">
                                    Create Brand
                                </button>
                                <button type="button" onClick={() => setShowCreate(false)}
                                    className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
                        <tr>
                            <th className="px-5 py-3 font-semibold">Brand</th>
                            <th className="px-5 py-3 font-semibold text-center">Products</th>
                            <th className="px-5 py-3 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {brands.length === 0 && (
                            <tr><td colSpan={3} className="text-center py-10 text-gray-400 dark:text-gray-500 text-sm">No brands yet.</td></tr>
                        )}
                        {brands.map(b => (
                            <tr key={b.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                <td className="px-5 py-3">
                                    <div className="flex items-center gap-3">
                                        {b.logo ? (
                                            <img src={b.logo} alt={b.name} className="w-8 h-8 object-contain rounded bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-0.5" />
                                        ) : (
                                            <div className="w-8 h-8 rounded bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500 text-xs font-bold">
                                                {b.name.charAt(0)}
                                            </div>
                                        )}
                                        <span className="font-medium text-gray-900 dark:text-white">{b.name}</span>
                                    </div>
                                </td>
                                <td className="px-5 py-3 text-center text-gray-600 dark:text-gray-300">{b.products_count}</td>
                                <td className="px-5 py-3 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button onClick={() => { setEditing(b); editForm.setData({ name: b.name, logo: b.logo ?? '' }); }}
                                            className="px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(b.id)}
                                            className="px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {editing && (
                <div className="fixed inset-0 bg-black/40 dark:bg-black/60 z-50 flex items-center justify-center px-4 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6 border border-gray-100 dark:border-gray-700">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Edit Brand</h2>
                        <form onSubmit={handleEdit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Brand Name</label>
                                <input type="text" value={editForm.data.name} onChange={e => editForm.setData('name', e.target.value)}
                                    className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Logo URL</label>
                                <input type="text" value={editForm.data.logo} onChange={e => editForm.setData('logo', e.target.value)}
                                    className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="submit" disabled={editForm.processing}
                                    className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 disabled:opacity-50">Save</button>
                                <button type="button" onClick={() => setEditing(null)}
                                    className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
