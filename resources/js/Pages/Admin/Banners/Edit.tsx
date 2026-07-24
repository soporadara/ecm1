import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import toast from 'react-hot-toast';

export default function Edit({ banner, mediaLibrary }: any) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        internal_name: banner.internal_name || '',
        title_en: banner.title_en || '',
        title_km: banner.title_km || '',
        eyebrow_en: banner.eyebrow_en || '',
        eyebrow_km: banner.eyebrow_km || '',
        description_en: banner.description_en || '',
        description_km: banner.description_km || '',
        primary_button_label: banner.primary_button_label || '',
        primary_button_url: banner.primary_button_url || '',
        secondary_button_label: banner.secondary_button_label || '',
        secondary_button_url: banner.secondary_button_url || '',
        desktop_image: null as File | null,
        mobile_image: null as File | null,
        fallback_color: banner.fallback_color || '#000000',
        text_position: banner.text_position || 'center',
        content_alignment: banner.content_alignment || 'center',
        theme_variant: banner.theme_variant || 'light',
        open_in_new_tab: banner.open_in_new_tab ?? false,
        is_active: banner.is_active ?? true,
        sort_order: banner.sort_order || 0,
        start_date: banner.start_date ? new Date(banner.start_date).toISOString().slice(0, 16) : '',
        end_date: banner.end_date ? new Date(banner.end_date).toISOString().slice(0, 16) : '',
    });

    const [previewUrl, setPreviewUrl] = useState<string | null>(banner?.desktop_image_url || null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/admin/banners/${banner.id}`, {
            onSuccess: () => toast.success('Banner updated successfully.')
        });
    };

    return (
        <AdminLayout title="Edit Banner">
            <Head title="Edit Banner - Admin" />

            <div className="mb-6 flex items-center gap-4">
                <Link href="/admin/banners" className="text-admin-text-muted hover:text-admin-primary bg-admin-surface-muted p-2 rounded-xl transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-admin-text tracking-tight">Edit Hero Banner</h1>
                    <p className="text-sm font-medium text-admin-text-muted mt-1">{banner.internal_name}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 w-full">
                
                {/* 1. Basic Info */}
                <div className="bg-admin-surface shadow-sm shadow-admin-border/20 rounded-2xl border border-admin-border/50 p-6 space-y-6">
                    <h3 className="text-lg font-bold text-admin-text border-b border-admin-border/50 pb-3">Banner Details</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-admin-text-muted mb-2 uppercase tracking-wide">Banner Name</label>
                            <input type="text" className="w-full rounded-xl border-admin-border bg-admin-bg text-admin-text focus:ring-2 focus:ring-admin-primary/20 focus:border-admin-primary" value={data.internal_name} onChange={e => setData('internal_name', e.target.value)} required />
                            {errors.internal_name && <p className="text-admin-danger text-xs mt-1">{errors.internal_name}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-admin-text-muted mb-2 uppercase tracking-wide">URL Link</label>
                            <input type="text" className="w-full rounded-xl border-admin-border bg-admin-bg text-admin-text focus:ring-2 focus:ring-admin-primary/20 focus:border-admin-primary" value={data.primary_button_url} onChange={e => setData('primary_button_url', e.target.value)} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-admin-border/50">
                        <div>
                            <label className="block text-sm font-bold text-admin-text-muted mb-2 uppercase tracking-wide">Desktop Image (Upload File)</label>
                            <input type="file" accept="image/*" className="w-full rounded-xl border-admin-border bg-admin-bg text-admin-text focus:ring-2 focus:ring-admin-primary/20 focus:border-admin-primary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-admin-primary/10 file:text-admin-primary hover:file:bg-admin-primary/20 transition-colors" onChange={e => {
                                const file = e.target.files?.[0] || null;
                                setData('desktop_image', file);
                                if (file) {
                                    setPreviewUrl(URL.createObjectURL(file));
                                } else {
                                    setPreviewUrl(banner?.desktop_image_url || null);
                                }
                            }} />
                            {errors.desktop_image && <p className="text-admin-danger text-xs mt-1">{errors.desktop_image}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-admin-text-muted mb-2 uppercase tracking-wide">Mobile Image (Optional)</label>
                            <input type="file" accept="image/*" className="w-full rounded-xl border-admin-border bg-admin-bg text-admin-text focus:ring-2 focus:ring-admin-primary/20 focus:border-admin-primary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-admin-primary/10 file:text-admin-primary hover:file:bg-admin-primary/20 transition-colors" onChange={e => setData('mobile_image', e.target.files?.[0] || null)} />
                            {errors.mobile_image && <p className="text-admin-danger text-xs mt-1">{errors.mobile_image}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-admin-border/50">
                        <div className="flex items-center">
                            <input type="checkbox" id="is_active" className="rounded border-admin-border text-admin-primary" checked={data.is_active} onChange={e => setData('is_active', e.target.checked)} />
                            <label htmlFor="is_active" className="ml-2 font-bold text-admin-text">Active (Visible)</label>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-admin-text-muted mb-2 uppercase tracking-wide">Order</label>
                            <input type="number" className="w-24 rounded-xl border-admin-border bg-admin-bg text-admin-text focus:ring-2 focus:ring-admin-primary/20" value={data.sort_order} onChange={e => setData('sort_order', parseInt(e.target.value) || 0)} />
                        </div>
                    </div>
                </div>

                {previewUrl && (
                    <div className="bg-admin-surface shadow-sm shadow-admin-border/20 rounded-2xl border border-admin-border/50 p-6 space-y-6">
                        <h3 className="text-lg font-bold text-admin-text border-b border-admin-border/50 pb-3">Banner Preview</h3>
                        <div className="w-full rounded-xl overflow-hidden border border-admin-border/30 bg-gray-100 flex items-center justify-center min-h-[100px]">
                            <img src={previewUrl} alt="Preview" className="w-full h-auto max-h-[400px] object-contain" />
                        </div>
                    </div>
                )}

                <div className="flex justify-end gap-3 pb-8">
                    <Link href="/admin/banners" className="px-6 py-2.5 rounded-xl font-bold text-admin-text-muted hover:text-admin-text bg-admin-surface hover:bg-admin-surface-muted transition-colors border border-admin-border/50">
                        Cancel
                    </Link>
                    <button type="submit" disabled={processing} className="px-6 py-2.5 rounded-xl font-bold bg-admin-primary text-white hover:bg-admin-primary-hover shadow-sm transition-colors disabled:opacity-50">
                        {processing ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
