import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import toast from 'react-hot-toast';
import RichTextEditor from '../../../Components/RichTextEditor';
import { useState } from 'react';

export default function Create() {
    const [editorMode, setEditorMode] = useState<'visual' | 'code'>('visual');
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        slug: '',
        content: '',
        seo_title: '',
        seo_description: '',
        is_published: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/pages', {
            onSuccess: () => toast.success('Page created successfully!')
        });
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target?.result as string;
            setData('content', content);
            setEditorMode('code');
            toast.success('File loaded into code editor');
        };
        reader.readAsText(file);
    };

    return (
        <AdminLayout title="Create Page">
            <Head title="Create Page - Admin" />

            <div className="mb-6 flex items-center gap-4">
                <Link href="/admin/pages" className="text-gray-500 hover:text-brand-primary transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Page</h1>
                    <p className="text-sm text-gray-500 mt-1">Add a new static page to your storefront.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 w-full">
                
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-100 dark:border-gray-700 overflow-hidden p-6 space-y-6">
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
                        <input
                            type="text"
                            className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary"
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                            required
                        />
                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Slug (optional)</label>
                        <input
                            type="text"
                            className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary"
                            value={data.slug}
                            onChange={e => setData('slug', e.target.value)}
                        />
                        {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug}</p>}
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content</label>
                            <div className="flex items-center gap-3">
                                <label className="text-xs text-indigo-600 hover:text-indigo-800 cursor-pointer flex items-center gap-1">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                                    Upload HTML File
                                    <input type="file" accept=".html,.txt" className="hidden" onChange={handleFileUpload} />
                                </label>
                                <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-lg inline-flex">
                                    <button type="button" onClick={() => setEditorMode('visual')} className={`px-3 py-1 text-xs font-medium rounded ${editorMode === 'visual' ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}>Visual Editor</button>
                                    <button type="button" onClick={() => setEditorMode('code')} className={`px-3 py-1 text-xs font-medium rounded ${editorMode === 'code' ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}>Raw Code</button>
                                </div>
                            </div>
                        </div>
                        
                        {editorMode === 'visual' ? (
                            <RichTextEditor
                                value={data.content}
                                onChange={(content) => setData('content', content)}
                            />
                        ) : (
                            <textarea
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                className="w-full h-[500px] font-mono text-sm p-4 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-green-400 focus:ring-brand-primary focus:border-brand-primary"
                                placeholder="<html>...</html> or <style>...</style> <div>...</div>"
                            />
                        )}
                        {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
                    </div>

                    <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Page Banner & SEO Optimization</h3>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Banner Image URL or Upload</label>
                                <div className="flex flex-col gap-3">
                                    <input
                                        type="text"
                                        placeholder="https://..."
                                        className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary"
                                        value={typeof data.banner_image === 'string' ? data.banner_image : ''}
                                        onChange={e => setData('banner_image', e.target.value)}
                                    />
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm text-gray-500 font-bold">OR</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-primary/10 file:text-brand-primary hover:file:bg-brand-primary/20 transition-all cursor-pointer"
                                            onChange={e => {
                                                if (e.target.files && e.target.files[0]) {
                                                    setData('banner_image', e.target.files[0]);
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                {errors.banner_image && <p className="text-red-500 text-xs mt-1">{errors.banner_image}</p>}
                                {data.banner_image && (
                                    <div className="mt-3 h-32 rounded-lg overflow-hidden border border-gray-200">
                                        <img 
                                            src={typeof data.banner_image === 'string' ? data.banner_image : URL.createObjectURL(data.banner_image as any)} 
                                            className="w-full h-full object-cover" 
                                            alt="Banner Preview" 
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">SEO Title</label>
                                <input
                                    type="text"
                                    className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary"
                                    value={data.seo_title}
                                    onChange={e => setData('seo_title', e.target.value)}
                                />
                                {errors.seo_title && <p className="text-red-500 text-xs mt-1">{errors.seo_title}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">SEO Description</label>
                                <textarea
                                    className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary"
                                    rows={3}
                                    value={data.seo_description}
                                    onChange={e => setData('seo_description', e.target.value)}
                                ></textarea>
                                {errors.seo_description && <p className="text-red-500 text-xs mt-1">{errors.seo_description}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100 dark:border-gray-700 flex items-center">
                        <input
                            id="is_published"
                            type="checkbox"
                            className="rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-brand-primary focus:ring-brand-primary h-5 w-5"
                            checked={data.is_published}
                            onChange={e => setData('is_published', e.target.checked)}
                        />
                        <label htmlFor="is_published" className="ml-3 block text-sm font-medium text-gray-900 dark:text-white">
                            Publish Page immediately
                        </label>
                    </div>

                </div>

                <div className="flex justify-end gap-3 pb-8">
                    <Link href="/admin/pages" className="px-6 py-2.5 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-6 py-2.5 rounded-lg font-medium bg-brand-primary text-white hover:bg-brand-secondary transition-colors shadow-sm disabled:opacity-50"
                    >
                        {processing ? 'Saving...' : 'Create Page'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
