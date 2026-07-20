import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';

export default function BannerSettings({ banner }: any) {
    const { data, setData, post, processing, errors } = useForm({
        title: banner?.title || 'Spring Collection\n2026',
        subtitle: banner?.subtitle || 'Elevate Your Everyday Style',
        media_type: banner?.content_data?.media_type || 'image',
        media_source: banner?.content_data?.media_source || 'url',
        media_url: banner?.content_data?.media_url || 'https://wpocean.com/html/tf/pengu/assets/images/slider/8.png',
        media_file: null as File | null,
        button_text: banner?.content_data?.button_text || 'SHOP NOW',
        button_link: banner?.content_data?.button_link || '/shop',
    });

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/settings/banner', {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                alert('Banner updated successfully!');
            }
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('media_file', file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    return (
        <AdminLayout>
            <Head title="Banner Settings" />
            
            <div className="max-w-4xl mx-auto p-6">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Hero Banner Settings</h1>
                        <p className="text-gray-500 mt-1">Configure the main banner on the homepage</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                    <form onSubmit={handleSubmit} className="p-6 space-y-8">
                        
                        {/* Media Configuration */}
                        <div className="space-y-6">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">Background Media</h2>
                            
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Media Type</label>
                                    <select 
                                        value={data.media_type}
                                        onChange={e => setData('media_type', e.target.value)}
                                        className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    >
                                        <option value="image">Image</option>
                                        <option value="video">Video</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Source</label>
                                    <select 
                                        value={data.media_source}
                                        onChange={e => setData('media_source', e.target.value)}
                                        className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    >
                                        <option value="url">External URL</option>
                                        <option value="upload">Upload File</option>
                                    </select>
                                </div>
                            </div>

                            {data.media_source === 'url' ? (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Media URL</label>
                                    <input 
                                        type="text" 
                                        value={data.media_url}
                                        onChange={e => setData('media_url', e.target.value)}
                                        className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                        placeholder="https://example.com/banner.mp4"
                                    />
                                    {errors.media_url && <p className="text-red-500 text-xs mt-1">{errors.media_url}</p>}
                                </div>
                            ) : (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Upload File</label>
                                    <input 
                                        type="file" 
                                        onChange={handleFileChange}
                                        accept={data.media_type === 'video' ? 'video/mp4,video/webm' : 'image/jpeg,image/png,image/webp'}
                                        className="w-full text-gray-700 dark:text-gray-300"
                                    />
                                    <p className="text-xs text-gray-500 mt-2">Max size: 50MB. {data.media_type === 'video' ? 'Supports MP4, WEBM.' : 'Supports JPG, PNG, WEBP.'}</p>
                                    {errors.media_file && <p className="text-red-500 text-xs mt-1">{errors.media_file}</p>}
                                </div>
                            )}

                            {/* Media Preview */}
                            <div className="mt-4 border rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900 aspect-video relative flex items-center justify-center">
                                {data.media_type === 'video' ? (
                                    <video 
                                        src={previewUrl || (data.media_source === 'url' ? data.media_url : banner?.content_data?.media_url)} 
                                        className="w-full h-full object-cover"
                                        autoPlay muted loop playsInline
                                    />
                                ) : (
                                    <img 
                                        src={previewUrl || (data.media_source === 'url' ? data.media_url : banner?.content_data?.media_url)} 
                                        className="w-full h-full object-cover"
                                        alt="Preview"
                                        onError={(e) => (e.currentTarget.style.display = 'none')}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Text Configuration */}
                        <div className="space-y-6">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">Banner Content</h2>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
                                <textarea 
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    rows={2}
                                    className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subtitle</label>
                                <input 
                                    type="text" 
                                    value={data.subtitle}
                                    onChange={e => setData('subtitle', e.target.value)}
                                    className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Button Text</label>
                                    <input 
                                        type="text" 
                                        value={data.button_text}
                                        onChange={e => setData('button_text', e.target.value)}
                                        className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Button Link</label>
                                    <input 
                                        type="text" 
                                        value={data.button_link}
                                        onChange={e => setData('button_link', e.target.value)}
                                        className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-brand-primary text-white px-6 py-2 rounded-md font-medium hover:bg-brand-secondary transition-colors disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
