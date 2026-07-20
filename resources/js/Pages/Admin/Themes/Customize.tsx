import { Head, useForm, Link } from '@inertiajs/react';
import React, { FormEvent } from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import toast from 'react-hot-toast';

interface CustomizeProps {
    colors: {
        primary_color?: string;
        secondary_color?: string;
        bg_color?: string;
    };
}

export default function Customize({ colors }: CustomizeProps) {
    const { data, setData, post, processing, errors } = useForm({
        primary_color: colors.primary_color || '#4f46e5',
        secondary_color: colors.secondary_color || '#0f172a',
        bg_color: colors.bg_color || '#f8fafc',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post('/admin/customize', {
            preserveScroll: true,
            onSuccess: () => toast.success('Theme colors customized successfully!'),
            onError: () => toast.error('Failed to customize theme.'),
        });
    };

    return (
        <AdminLayout title="Customize Theme">
            <Head title="Customize Theme — Rafel CMS" />

            <div className="mb-6 flex items-center gap-4">
                <Link href="/admin/themes" className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Customize Theme</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Adjust the global color scheme of your storefront.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Editor Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                            <h2 className="font-bold text-gray-900 dark:text-white">Color Settings</h2>
                        </div>
                        
                        <form onSubmit={submit} className="p-4 space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Primary Color
                                </label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        value={data.primary_color}
                                        onChange={e => setData('primary_color', e.target.value)}
                                        className="h-10 w-10 p-0.5 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        value={data.primary_color}
                                        onChange={e => setData('primary_color', e.target.value)}
                                        className="flex-1 rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {errors.primary_color && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.primary_color}</p>}
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Used for primary buttons, highlights, and active states.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Secondary Color
                                </label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        value={data.secondary_color}
                                        onChange={e => setData('secondary_color', e.target.value)}
                                        className="h-10 w-10 p-0.5 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        value={data.secondary_color}
                                        onChange={e => setData('secondary_color', e.target.value)}
                                        className="flex-1 rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {errors.secondary_color && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.secondary_color}</p>}
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Used for headers, dark text, and footer backgrounds.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Page Background
                                </label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        value={data.bg_color}
                                        onChange={e => setData('bg_color', e.target.value)}
                                        className="h-10 w-10 p-0.5 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        value={data.bg_color}
                                        onChange={e => setData('bg_color', e.target.value)}
                                        className="flex-1 rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                {errors.bg_color && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.bg_color}</p>}
                            </div>

                            <div className="pt-4 mt-6 border-t border-gray-100 dark:border-gray-700">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
                                >
                                    {processing ? 'Saving...' : 'Publish Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Live Preview */}
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col h-full min-h-[500px]">
                        <div className="p-3 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex justify-between items-center">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            </div>
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Live Preview</span>
                            <div className="w-10"></div>
                        </div>
                        
                        <div className="flex-1 p-6 flex flex-col justify-center items-center relative overflow-hidden" style={{ backgroundColor: data.bg_color }}>
                            {/* Dummy Storefront UI to show colors */}
                            <div className="w-full max-w-sm bg-white rounded-xl shadow-xl overflow-hidden transform transition-all">
                                <div className="h-16 flex items-center justify-between px-6" style={{ backgroundColor: data.secondary_color }}>
                                    <span className="text-white font-bold tracking-widest uppercase">Store</span>
                                    <div className="flex gap-3">
                                        <div className="w-4 h-4 rounded-full bg-white/20"></div>
                                        <div className="w-4 h-4 rounded-full bg-white/20"></div>
                                    </div>
                                </div>
                                
                                <div className="p-6 text-center space-y-4">
                                    <h2 className="text-xl font-bold" style={{ color: data.secondary_color }}>Premium Collection</h2>
                                    <p className="text-sm text-gray-500">Discover our latest arrivals tailored specifically for your lifestyle.</p>
                                    
                                    <button 
                                        className="w-full py-3 rounded-lg font-bold text-white transition-opacity hover:opacity-90 mt-4 shadow-lg shadow-black/10"
                                        style={{ backgroundColor: data.primary_color }}
                                    >
                                        Shop Now
                                    </button>
                                </div>
                                
                                <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-around">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="w-8 h-8 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: i === 0 ? data.primary_color + '20' : 'transparent', color: i === 0 ? data.primary_color : '#9ca3af' }}>
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
