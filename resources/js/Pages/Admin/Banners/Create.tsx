import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import toast from 'react-hot-toast';

export default function Create({ mediaLibrary }: any) {
    const { data, setData, post, processing, errors } = useForm({
        internal_name: '',
        title_en: '',
        title_km: '',
        eyebrow_en: '',
        eyebrow_km: '',
        description_en: '',
        description_km: '',
        primary_button_label: '',
        primary_button_url: '',
        secondary_button_label: '',
        secondary_button_url: '',
        desktop_image: null as File | null,
        mobile_image: null as File | null,
        fallback_color: '#000000',
        text_position: 'center',
        content_alignment: 'center',
        theme_variant: 'light',
        open_in_new_tab: false,
        is_active: true,
        sort_order: 0,
        start_date: '',
        end_date: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/banners', {
            onSuccess: () => toast.success('Banner created successfully.')
        });
    };

    return (
        <AdminLayout title="Create Banner">
            <Head title="Create Banner - Admin" />

            <div className="mb-6 flex items-center gap-4">
                <Link href="/admin/banners" className="text-admin-text-muted hover:text-admin-primary bg-admin-surface-muted p-2 rounded-xl transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-admin-text tracking-tight">Create Hero Banner</h1>
                    <p className="text-sm font-medium text-admin-text-muted mt-1">Design a new storefront banner.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 w-full">
                
                {/* 1. Basic Info */}
                <div className="bg-admin-surface shadow-sm shadow-admin-border/20 rounded-2xl border border-admin-border/50 p-6 space-y-6">
                    <h3 className="text-lg font-bold text-admin-text border-b border-admin-border/50 pb-3">1. Identification & Media</h3>
                    
                    <div>
                        <label className="block text-sm font-bold text-admin-text-muted mb-2 uppercase tracking-wide">Internal Name (For admin reference only)</label>
                        <input type="text" className="w-full rounded-xl border-admin-border bg-admin-bg text-admin-text focus:ring-2 focus:ring-admin-primary/20 focus:border-admin-primary" value={data.internal_name} onChange={e => setData('internal_name', e.target.value)} required />
                        {errors.internal_name && <p className="text-admin-danger text-xs mt-1">{errors.internal_name}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-admin-text-muted mb-2 uppercase tracking-wide">Desktop Image (Upload File)</label>
                            <input type="file" accept="image/*" className="w-full rounded-xl border-admin-border bg-admin-bg text-admin-text focus:ring-2 focus:ring-admin-primary/20 focus:border-admin-primary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-admin-primary/10 file:text-admin-primary hover:file:bg-admin-primary/20 transition-colors" onChange={e => setData('desktop_image', e.target.files?.[0] || null)} />
                            {errors.desktop_image && <p className="text-admin-danger text-xs mt-1">{errors.desktop_image}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-admin-text-muted mb-2 uppercase tracking-wide">Mobile Image (Optional)</label>
                            <input type="file" accept="image/*" className="w-full rounded-xl border-admin-border bg-admin-bg text-admin-text focus:ring-2 focus:ring-admin-primary/20 focus:border-admin-primary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-admin-primary/10 file:text-admin-primary hover:file:bg-admin-primary/20 transition-colors" onChange={e => setData('mobile_image', e.target.files?.[0] || null)} />
                            {errors.mobile_image && <p className="text-admin-danger text-xs mt-1">{errors.mobile_image}</p>}
                        </div>
                    </div>
                </div>

                {/* 2. Content */}
                <div className="bg-admin-surface shadow-sm shadow-admin-border/20 rounded-2xl border border-admin-border/50 p-6 space-y-6">
                    <h3 className="text-lg font-bold text-admin-text border-b border-admin-border/50 pb-3">2. Content & Translations</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* EN */}
                        <div className="space-y-4">
                            <h4 className="font-bold text-admin-text-muted">English</h4>
                            <div>
                                <label className="block text-xs font-bold text-admin-text-muted mb-1">Eyebrow (Small text above title)</label>
                                <input type="text" className="w-full rounded-xl border-admin-border bg-admin-bg text-admin-text focus:ring-2 focus:ring-admin-primary/20" value={data.eyebrow_en} onChange={e => setData('eyebrow_en', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-admin-text-muted mb-1">Title</label>
                                <input type="text" className="w-full rounded-xl border-admin-border bg-admin-bg text-admin-text focus:ring-2 focus:ring-admin-primary/20" value={data.title_en} onChange={e => setData('title_en', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-admin-text-muted mb-1">Description</label>
                                <textarea className="w-full rounded-xl border-admin-border bg-admin-bg text-admin-text focus:ring-2 focus:ring-admin-primary/20" rows={3} value={data.description_en} onChange={e => setData('description_en', e.target.value)}></textarea>
                            </div>
                        </div>
                        
                        {/* KM */}
                        <div className="space-y-4">
                            <h4 className="font-bold text-admin-text-muted font-khmer">Khmer (Optional)</h4>
                            <div>
                                <label className="block text-xs font-bold text-admin-text-muted mb-1 font-khmer">Eyebrow</label>
                                <input type="text" className="w-full rounded-xl border-admin-border bg-admin-bg text-admin-text focus:ring-2 focus:ring-admin-primary/20 font-khmer" value={data.eyebrow_km} onChange={e => setData('eyebrow_km', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-admin-text-muted mb-1 font-khmer">Title</label>
                                <input type="text" className="w-full rounded-xl border-admin-border bg-admin-bg text-admin-text focus:ring-2 focus:ring-admin-primary/20 font-khmer" value={data.title_km} onChange={e => setData('title_km', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-admin-text-muted mb-1 font-khmer">Description</label>
                                <textarea className="w-full rounded-xl border-admin-border bg-admin-bg text-admin-text focus:ring-2 focus:ring-admin-primary/20 font-khmer" rows={3} value={data.description_km} onChange={e => setData('description_km', e.target.value)}></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Buttons & Actions */}
                <div className="bg-admin-surface shadow-sm shadow-admin-border/20 rounded-2xl border border-admin-border/50 p-6 space-y-6">
                    <h3 className="text-lg font-bold text-admin-text border-b border-admin-border/50 pb-3">3. Calls to Action</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-admin-text-muted mb-2 uppercase tracking-wide">Primary Button Label</label>
                            <input type="text" className="w-full rounded-xl border-admin-border bg-admin-bg text-admin-text focus:ring-2 focus:ring-admin-primary/20" value={data.primary_button_label} onChange={e => setData('primary_button_label', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-admin-text-muted mb-2 uppercase tracking-wide">Primary Button URL</label>
                            <input type="text" className="w-full rounded-xl border-admin-border bg-admin-bg text-admin-text focus:ring-2 focus:ring-admin-primary/20" value={data.primary_button_url} onChange={e => setData('primary_button_url', e.target.value)} />
                        </div>
                    </div>
                </div>

                {/* 4. Settings */}
                <div className="bg-admin-surface shadow-sm shadow-admin-border/20 rounded-2xl border border-admin-border/50 p-6 space-y-6">
                    <h3 className="text-lg font-bold text-admin-text border-b border-admin-border/50 pb-3">4. Layout & Scheduling Settings</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-admin-text-muted mb-2 uppercase tracking-wide">Text Position</label>
                            <select className="w-full rounded-xl border-admin-border bg-admin-bg text-admin-text" value={data.text_position} onChange={e => setData('text_position', e.target.value)}>
                                <option value="left">Left</option>
                                <option value="center">Center</option>
                                <option value="right">Right</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-admin-text-muted mb-2 uppercase tracking-wide">Alignment</label>
                            <select className="w-full rounded-xl border-admin-border bg-admin-bg text-admin-text" value={data.content_alignment} onChange={e => setData('content_alignment', e.target.value)}>
                                <option value="top">Top</option>
                                <option value="center">Center</option>
                                <option value="bottom">Bottom</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-admin-text-muted mb-2 uppercase tracking-wide">Theme</label>
                            <select className="w-full rounded-xl border-admin-border bg-admin-bg text-admin-text" value={data.theme_variant} onChange={e => setData('theme_variant', e.target.value)}>
                                <option value="light">Light Text (Dark bg)</option>
                                <option value="dark">Dark Text (Light bg)</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-admin-text-muted mb-2 uppercase tracking-wide">Fallback Background Color</label>
                            <input type="color" className="w-full h-10 rounded border border-admin-border cursor-pointer" value={data.fallback_color} onChange={e => setData('fallback_color', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-admin-text-muted mb-2 uppercase tracking-wide">Start Date (Optional)</label>
                            <input type="datetime-local" className="w-full rounded-xl border-admin-border bg-admin-bg text-admin-text" value={data.start_date} onChange={e => setData('start_date', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-admin-text-muted mb-2 uppercase tracking-wide">End Date (Optional)</label>
                            <input type="datetime-local" className="w-full rounded-xl border-admin-border bg-admin-bg text-admin-text" value={data.end_date} onChange={e => setData('end_date', e.target.value)} />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-admin-border/50">
                        <div className="flex items-center">
                            <input type="checkbox" id="is_active" className="rounded border-admin-border text-admin-primary" checked={data.is_active} onChange={e => setData('is_active', e.target.checked)} />
                            <label htmlFor="is_active" className="ml-2 font-bold text-admin-text">Active (Visible)</label>
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" id="open_in_new_tab" className="rounded border-admin-border text-admin-primary" checked={data.open_in_new_tab} onChange={e => setData('open_in_new_tab', e.target.checked)} />
                            <label htmlFor="open_in_new_tab" className="ml-2 font-bold text-admin-text">Open Links in New Tab</label>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-admin-text-muted mb-2 uppercase tracking-wide">Sort Order</label>
                            <input type="number" className="w-24 rounded-xl border-admin-border bg-admin-bg text-admin-text" value={data.sort_order} onChange={e => setData('sort_order', parseInt(e.target.value) || 0)} />
                        </div>
                    </div>

                </div>

                <div className="flex justify-end gap-3 pb-8">
                    <Link href="/admin/banners" className="px-6 py-2.5 rounded-xl font-bold text-admin-text-muted hover:text-admin-text bg-admin-surface hover:bg-admin-surface-muted transition-colors border border-admin-border/50">
                        Cancel
                    </Link>
                    <button type="submit" disabled={processing} className="px-6 py-2.5 rounded-xl font-bold bg-admin-primary text-white hover:bg-admin-primary-hover shadow-sm transition-colors disabled:opacity-50">
                        {processing ? 'Creating...' : 'Create Banner'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
