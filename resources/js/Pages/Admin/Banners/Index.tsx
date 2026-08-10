import React, { FormEvent, useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { confirmAction } from '@/Components/ConfirmModal';
import AdminLayout from '../../../Layouts/AdminLayout';
import toast from 'react-hot-toast';
import axios from 'axios';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

function SortableTableRow({ banner, handleDelete }: any) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: banner.id });
    
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: isDragging ? 'var(--admin-surface-muted)' : undefined,
        zIndex: isDragging ? 1 : 0,
        position: isDragging ? 'relative' as const : undefined,
    };

    return (
        <tr ref={setNodeRef} style={style} className="hover:bg-admin-surface-muted/30 transition-colors">
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <button {...attributes} {...listeners} className="cursor-grab text-admin-text-muted hover:text-admin-text">
                        <GripVertical className="h-5 w-5" />
                    </button>
                    {banner.desktop_image_url ? (
                        <img src={banner.desktop_image_url} alt="Preview" className="w-24 h-12 object-cover rounded shadow-sm border border-admin-border" />
                    ) : (
                        <div className="w-24 h-12 bg-admin-surface-muted rounded border border-admin-border flex items-center justify-center text-xs text-admin-text-muted">No Image</div>
                    )}
                </div>
            </td>
            <td className="px-6 py-4">
                <span className="font-bold text-admin-text">{banner.internal_name}</span>
            </td>
            <td className="px-6 py-4 text-admin-text-muted">{banner.title_en || '-'}</td>
            <td className="px-6 py-4 font-medium text-admin-text-muted">{banner.sort_order}</td>
            <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${banner.is_active ? 'bg-admin-success/10 text-admin-success border border-admin-success/20' : 'bg-admin-text-muted/10 text-admin-text-muted border border-admin-text-muted/20'}`}>
                    {banner.is_active ? 'Active' : 'Disabled'}
                </span>
            </td>
            <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/banners/${banner.id}/edit`} className="p-2 text-admin-text-muted hover:text-admin-primary bg-admin-surface-muted hover:bg-admin-primary/10 rounded-lg transition-colors">
                        Edit
                    </Link>
                    <button onClick={() => handleDelete(banner.id)} className="p-2 text-admin-danger/70 hover:text-admin-danger bg-admin-surface-muted hover:bg-admin-danger/10 rounded-lg transition-colors">
                        Delete
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default function Index({ banners: initialBanners, bannerMode = 'slideshow' }: any) {
    const [mode, setMode] = useState(bannerMode);
    const [items, setItems] = useState(initialBanners);

    useEffect(() => {
        setItems(initialBanners);
    }, [initialBanners]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = async (event: any) => {
        const { active, over } = event;
        
        if (active.id !== over.id) {
            setItems((items: any[]) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                const newItems = arrayMove(items, oldIndex, newIndex);
                
                // Update sort_order locally for immediate UI feedback
                const updatedItems = newItems.map((item, index) => ({ ...item, sort_order: index }));
                
                // Sync with server
                axios.post('/admin/banners/reorder', {
                    order: updatedItems.map(i => i.id)
                }).then(() => {
                    toast.success('Banners reordered');
                }).catch(() => {
                    toast.error('Failed to reorder banners');
                    setItems(items); // Revert on failure
                });

                return updatedItems;
            });
        }
    };
    const handleDelete = async (id: number) => {
        if (await confirmAction('Are you sure you want to delete this banner?')) {
            router.delete(`/admin/banners/${id}`, {
                onSuccess: () => toast.success('Banner deleted successfully.')
            });
        }
    };

    const saveMode = (event: FormEvent) => {
        event.preventDefault();
        router.patch('/admin/banners/mode', { home_banner_mode: mode }, {
            preserveScroll: true,
            onSuccess: () => toast.success('Homepage banner mode updated.'),
        });
    };

    return (
        <AdminLayout 
            title="Hero Banners"
            actions={
                <Link href="/admin/banners/create" className="px-4 py-2 bg-admin-primary text-white rounded-xl font-bold text-xs sm:text-sm hover:bg-admin-primary-hover shadow-sm transition-all duration-200">
                    + Create
                </Link>
            }
        >
            <Head title="Hero Banners - Admin" />
            
            <div className="hidden sm:flex sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-admin-text tracking-tight">Hero Banners</h1>
                    <p className="text-sm font-medium text-admin-text-muted mt-1">Manage the four storefront homepage hero banners.</p>
                </div>
            </div>

            <form onSubmit={saveMode} className="mb-6 flex flex-col gap-4 rounded-2xl border border-admin-border/50 bg-admin-surface p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-base font-black text-admin-text">Homepage banner behavior</h2>
                    <p className="mt-1 text-sm font-semibold text-admin-text-muted">Slideshow auto-plays. Normal keeps the image still and lets customers click previous or next.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <select value={mode} onChange={(event) => setMode(event.target.value)} className="min-h-11 rounded-xl border border-admin-border bg-admin-surface px-4 text-sm font-bold text-admin-text">
                        <option value="slideshow">Slideshow</option>
                        <option value="normal">Normal with arrows</option>
                    </select>
                    <button className="min-h-11 rounded-xl bg-admin-primary px-5 text-sm font-black text-white shadow-sm shadow-admin-primary/20 transition hover:-translate-y-0.5 hover:bg-admin-primary-hover">
                        Save Mode
                    </button>
                </div>
            </form>

            <div className="bg-admin-surface shadow-sm shadow-admin-border/20 rounded-2xl border border-admin-border/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead>
                            <tr className="border-b border-admin-border bg-admin-surface-muted/50">
                                <th className="px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Preview</th>
                                <th className="px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Internal Name</th>
                                <th className="px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Title (EN)</th>
                                <th className="px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Order</th>
                                <th className="px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-admin-text-muted uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={items.map((i: any) => i.id)} strategy={verticalListSortingStrategy}>
                            <tbody className="divide-y divide-admin-border">
                                {items.map((banner: any) => (
                                    <SortableTableRow key={banner.id} banner={banner} handleDelete={handleDelete} />
                                ))}
                                {items.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-admin-text-muted font-medium">
                                            No banners found. Create one to get started.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </SortableContext>
                    </DndContext>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
