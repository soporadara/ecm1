import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import toast from 'react-hot-toast';
import RichTextEditor from '../../../Components/RichTextEditor';
import { useState } from 'react';

export default function Edit({ page }: any) {
    const [editorMode, setEditorMode] = useState<'visual' | 'code'>('visual');
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        title: page.title || '',
        slug: page.slug || '',
        content: page.content || '',
        seo_title: page.seo_title || '',
        seo_description: page.seo_description || '',
        banner_image: page.banner_image || '',
        is_published: page.is_published,
        is_private: page.is_private,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/admin/pages/${page.id}`, {
            onSuccess: () => toast.success('Page updated successfully!')
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
        <AdminLayout title="Edit Page">
            <Head title={`Edit ${page.title} - Admin`} />

            <div className="mb-8 flex items-center gap-4">
                <Link href="/admin/pages" className="text-admin-text-muted hover:text-admin-primary bg-admin-surface-muted p-2 rounded-xl transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-admin-text tracking-tight">Edit Page</h1>
                    <p className="text-sm font-medium text-admin-text-muted mt-1">{page.title}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 w-full">
                
                <div className="bg-admin-surface shadow-sm shadow-admin-border/20 rounded-2xl border border-admin-border/50 overflow-hidden p-6 sm:p-8 space-y-6">
                    
                    <div>
                        <label className="block text-sm font-bold text-admin-text-muted mb-2 uppercase tracking-wide">Title</label>
                        <input
                            type="text"
                            className="w-full rounded-xl border-admin-border bg-admin-bg text-admin-text focus:ring-2 focus:ring-admin-primary/20 focus:border-admin-primary transition-all duration-200"
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                            required
                        />
                        {errors.title && <p className="text-admin-danger text-xs font-medium mt-1.5">{errors.title}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-admin-text-muted mb-2 uppercase tracking-wide">Slug</label>
                        <input
                            type="text"
                            className={`w-full rounded-xl border-admin-border bg-admin-bg text-admin-text focus:ring-2 focus:ring-admin-primary/20 focus:border-admin-primary transition-all duration-200 ${page.is_system ? 'opacity-60 cursor-not-allowed bg-admin-surface-muted' : ''}`}
                            value={data.slug}
                            disabled={page.is_system}
                            onChange={e => setData('slug', e.target.value)}
                        />
                        {errors.slug && <p className="text-admin-danger text-xs font-medium mt-1.5">{errors.slug}</p>}
                        {page.is_system && <p className="text-admin-text-muted/70 text-xs font-medium mt-1.5">The slug for system pages cannot be modified.</p>}
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-bold text-admin-text-muted uppercase tracking-wide">Content</label>
                            <div className="flex items-center gap-3">
                                <label className="text-xs text-admin-primary hover:text-admin-primary-hover cursor-pointer flex items-center gap-1 font-bold">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                                    Upload HTML File
                                    <input type="file" accept=".html,.txt" className="hidden" onChange={handleFileUpload} />
                                </label>
                                <div className="bg-admin-surface-muted p-1 rounded-lg inline-flex border border-admin-border/50">
                                    <button type="button" onClick={() => setEditorMode('visual')} className={`px-3 py-1 text-xs font-bold rounded ${editorMode === 'visual' ? 'bg-admin-surface text-admin-text shadow-sm' : 'text-admin-text-muted hover:text-admin-text'}`}>Visual Editor</button>
                                    <button type="button" onClick={() => setEditorMode('code')} className={`px-3 py-1 text-xs font-bold rounded ${editorMode === 'code' ? 'bg-admin-surface text-admin-text shadow-sm' : 'text-admin-text-muted hover:text-admin-text'}`}>Raw Code</button>
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
                                className="w-full h-[500px] font-mono text-sm p-4 rounded-xl border-admin-border bg-admin-bg text-[#4ade80] focus:ring-2 focus:ring-admin-primary/20 focus:border-admin-primary transition-all duration-200"
                                placeholder="<html>...</html> or <style>...</style> <div>...</div>"
                            />
                        )}
                        {errors.content && <p className="text-admin-danger text-xs font-medium mt-1.5">{errors.content}</p>}
                    </div>

                    <div className="pt-8 border-t border-admin-border/50">
                        <h3 className="text-lg font-bold text-admin-text tracking-tight mb-6">Page Banner & SEO Optimization</h3>
                        
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-admin-text-muted mb-2 uppercase tracking-wide">Banner Image URL or Upload</label>
                                <div className="flex flex-col gap-3">
                                    <input
                                        type="text"
                                        placeholder="https://..."
                                        className="w-full rounded-xl border-admin-border bg-admin-bg text-admin-text focus:ring-2 focus:ring-admin-primary/20 focus:border-admin-primary transition-all duration-200"
                                        value={typeof data.banner_image === 'string' ? data.banner_image : ''}
                                        onChange={e => setData('banner_image', e.target.value)}
                                    />
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm text-admin-text-muted font-bold">OR</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="block w-full text-sm text-admin-text-muted file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-admin-primary/10 file:text-admin-primary hover:file:bg-admin-primary/20 transition-all cursor-pointer"
                                            onChange={e => {
                                                if (e.target.files && e.target.files[0]) {
                                                    setData('banner_image', e.target.files[0]);
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                {errors.banner_image && <p className="text-admin-danger text-xs font-medium mt-1.5">{errors.banner_image}</p>}
                                {data.banner_image && (
                                    <div className="mt-4 h-40 rounded-xl overflow-hidden border border-admin-border shadow-sm">
                                        <img 
                                            src={typeof data.banner_image === 'string' ? data.banner_image : URL.createObjectURL(data.banner_image)} 
                                            className="w-full h-full object-cover" 
                                            alt="Banner Preview" 
                                        />
                                    </div>
                                )}
                            </div>
                        
                            <div>
                                <label className="block text-sm font-bold text-admin-text-muted mb-2 uppercase tracking-wide">SEO Title</label>
                                <input
                                    type="text"
                                    className="w-full rounded-xl border-admin-border bg-admin-bg text-admin-text focus:ring-2 focus:ring-admin-primary/20 focus:border-admin-primary transition-all duration-200"
                                    value={data.seo_title}
                                    onChange={e => setData('seo_title', e.target.value)}
                                />
                                {errors.seo_title && <p className="text-admin-danger text-xs font-medium mt-1.5">{errors.seo_title}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-admin-text-muted mb-2 uppercase tracking-wide">SEO Description</label>
                                <textarea
                                    className="w-full rounded-xl border-admin-border bg-admin-bg text-admin-text focus:ring-2 focus:ring-admin-primary/20 focus:border-admin-primary transition-all duration-200"
                                    rows={3}
                                    value={data.seo_description}
                                    onChange={e => setData('seo_description', e.target.value)}
                                ></textarea>
                                {errors.seo_description && <p className="text-admin-danger text-xs font-medium mt-1.5">{errors.seo_description}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-admin-border/50 flex flex-col sm:flex-row gap-6 bg-admin-bg p-4 rounded-xl">
                        <div className="flex items-center">
                            <input
                                id="is_published"
                                type="checkbox"
                                className="rounded border-admin-border bg-admin-surface text-admin-primary focus:ring-admin-primary/50 h-5 w-5 transition-all"
                                checked={data.is_published}
                                onChange={e => setData('is_published', e.target.checked)}
                            />
                            <label htmlFor="is_published" className="ml-3 block text-sm font-bold text-admin-text cursor-pointer">
                                Publish Page
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="is_private"
                                type="checkbox"
                                className="rounded border-admin-border bg-admin-surface text-admin-danger focus:ring-admin-danger/50 h-5 w-5 transition-all"
                                checked={data.is_private}
                                onChange={e => setData('is_private', e.target.checked)}
                            />
                            <label htmlFor="is_private" className="ml-3 block text-sm font-bold text-admin-text cursor-pointer">
                                Private (Hidden from public)
                            </label>
                        </div>
                    </div>

                </div>

                <div className="flex justify-end gap-3 pb-8">
                    <Link href="/admin/pages" className="px-6 py-2.5 rounded-xl font-bold text-admin-text-muted hover:text-admin-text hover:bg-admin-surface-muted transition-colors">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-6 py-2.5 rounded-xl font-bold bg-admin-primary text-white hover:bg-admin-primary-hover shadow-sm shadow-admin-primary/30 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:hover:translate-y-0"
                    >
                        {processing ? 'Saving...' : 'Update Page'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
