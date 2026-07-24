import { Head, useForm, router } from '@inertiajs/react';
import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import toast from 'react-hot-toast';
import { Edit2, Plus, Trash2, X } from 'lucide-react';

interface Category {
    id: number;
    name: string;
    slug: string;
    posts_count: number;
}

export default function Index({ categories }: { categories: Category[] }) {
    const [isCreating, setIsCreating] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    const { data, setData, post, put, delete: destroy, processing, reset, errors } = useForm({
        name: '',
        slug: '',
    });

    const openCreate = () => {
        reset();
        setIsCreating(true);
    };

    const openEdit = (category: Category) => {
        setData({ name: category.name, slug: category.slug });
        setEditingCategory(category);
    };

    const closeForm = () => {
        setIsCreating(false);
        setEditingCategory(null);
        reset();
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingCategory) {
            put(`/admin/post-categories/${editingCategory.id}`, {
                onSuccess: () => {
                    closeForm();
                    toast.success('Category updated successfully');
                }
            });
        } else {
            post('/admin/post-categories', {
                onSuccess: () => {
                    closeForm();
                    toast.success('Category created successfully');
                }
            });
        }
    };

    const handleDelete = (category: Category) => {
        if (!confirm(`Are you sure you want to delete ${category.name}?`)) return;
        destroy(`/admin/post-categories/${category.id}`, {
            onSuccess: () => toast.success('Category deleted successfully')
        });
    };

    return (
        <AdminLayout title="Blog Categories">
            <Head title="Blog Categories - Admin" />

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-admin-text tracking-tight">Blog Categories</h1>
                    <p className="text-sm font-medium text-admin-text-muted mt-1">Organize your blog posts into topics.</p>
                </div>
                <button onClick={openCreate} className="inline-flex items-center gap-2 bg-admin-primary text-white px-4 py-2 rounded-xl font-bold hover:bg-admin-primary/90 transition-colors shadow-sm">
                    <Plus className="w-5 h-5" />
                    Add Category
                </button>
            </div>

            <div className="bg-admin-surface shadow-sm shadow-admin-border/20 rounded-2xl border border-admin-border/50 overflow-hidden">
                <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-admin-surface-muted border-b border-admin-border/50 text-admin-text-muted">
                        <tr>
                            <th className="px-6 py-4 font-bold">Category Name</th>
                            <th className="px-6 py-4 font-bold">Slug</th>
                            <th className="px-6 py-4 font-bold text-center">Posts</th>
                            <th className="px-6 py-4 font-bold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-admin-border/50">
                        {categories.map((category) => (
                            <tr key={category.id} className="hover:bg-admin-surface-muted/50 transition-colors">
                                <td className="px-6 py-4 font-bold text-admin-text">{category.name}</td>
                                <td className="px-6 py-4 text-admin-text-muted">{category.slug}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className="inline-flex items-center justify-center min-w-[2rem] h-6 px-2 rounded-full bg-admin-primary/10 text-admin-primary font-bold text-xs">
                                        {category.posts_count}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button onClick={() => openEdit(category)} className="p-2 text-admin-text-muted hover:text-admin-primary hover:bg-admin-primary/10 rounded-lg transition-colors">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => handleDelete(category)} className="p-2 text-admin-text-muted hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {categories.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-admin-text-muted font-medium">
                                    No categories found. Create one to get started.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {(isCreating || editingCategory) && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
                    <div className="bg-admin-surface rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-admin-border/50">
                        <div className="flex items-center justify-between p-6 border-b border-admin-border/50">
                            <h3 className="text-lg font-bold text-admin-text">
                                {editingCategory ? 'Edit Category' : 'New Category'}
                            </h3>
                            <button onClick={closeForm} className="text-admin-text-muted hover:text-admin-text p-1 rounded-lg hover:bg-admin-surface-muted transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={submit} className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-admin-text-muted mb-1.5">Name</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="w-full bg-admin-surface-muted border-admin-border text-admin-text rounded-xl focus:ring-admin-primary focus:border-admin-primary h-11 px-4 font-medium"
                                        required
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-admin-text-muted mb-1.5">Slug (optional)</label>
                                    <input
                                        type="text"
                                        value={data.slug}
                                        onChange={e => setData('slug', e.target.value)}
                                        placeholder="Auto-generated if empty"
                                        className="w-full bg-admin-surface-muted border-admin-border text-admin-text rounded-xl focus:ring-admin-primary focus:border-admin-primary h-11 px-4 font-medium"
                                    />
                                    {errors.slug && <p className="mt-1 text-sm text-red-500">{errors.slug}</p>}
                                </div>
                            </div>
                            <div className="mt-8 flex justify-end gap-3">
                                <button type="button" onClick={closeForm} className="px-5 py-2.5 rounded-xl font-bold text-admin-text hover:bg-admin-surface-muted transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" disabled={processing} className="px-5 py-2.5 rounded-xl font-bold bg-admin-primary text-white hover:bg-admin-primary/90 disabled:opacity-50 transition-colors shadow-sm">
                                    {processing ? 'Saving...' : 'Save Category'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
