import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import toast from 'react-hot-toast';

export default function Create({ categories = [] }: { categories?: any[] }) {
    const [isSmartImportOpen, setIsSmartImportOpen] = useState(false);
    const [smartImportText, setSmartImportText] = useState('');

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        slug: '',
        content: '',
        image: '',
        image_urls: '',
        image_files: [] as File[],
        seo_title: '',
        seo_description: '',
        post_category_id: '',
        is_published: true,
        scheduled_at: '',
    });

    const [isImporting, setIsImporting] = useState(false);

    const handleSmartImport = async () => {
        if (!smartImportText.trim()) return;

        let textToParse = smartImportText;
        let isDocUrl = false;

        if (smartImportText.trim().match(/^https:\/\/docs\.google\.com\/document\/d\//)) {
            isDocUrl = true;
            setIsImporting(true);
            try {
                const response = await window.axios.post('/admin/posts/import-doc', { url: smartImportText.trim() });
                textToParse = response.data.text;
                if (!textToParse) {
                     toast.error('The document is empty.');
                     setIsImporting(false);
                     return;
                }
            } catch (error: any) {
                toast.error(error.response?.data?.error || 'Failed to fetch Google Doc. Make sure it is public.');
                setIsImporting(false);
                return;
            }
            setIsImporting(false);
        }

        const lines = textToParse.split('\n').map((l: string) => l.trim()).filter((l: string) => l.length > 0);
        if (lines.length === 0) return;

        const extractedTitle = lines[0];
        let mainImage = '';
        let parsedContent = '';

        // Powerful regex to detect image URLs even if embedded inside text
        const imageRegex = /(https?:\/\/[^\s]+(?:\.(?:jpg|jpeg|png|webp|gif)|image|img|media|\/img\.miniexcavator\.org\/)[^\s]*)/gi;

        for (let i = 1; i < lines.length; i++) {
            let line = lines[i];
            
            // Check if line contains any image URLs
            const imageMatches = line.match(imageRegex);
            
            if (imageMatches && imageMatches.length > 0) {
                // If it's the very first image found, set it as main image
                if (!mainImage) {
                    mainImage = imageMatches[0];
                }
                
                // Replace all image URLs in this line with HTML img tags
                let modifiedLine = line;
                imageMatches.forEach((url: string) => {
                    modifiedLine = modifiedLine.replace(url, `<br/><figure><img src="${url}" alt="Image" class="w-full h-auto rounded-lg my-4 shadow-sm" /></figure><br/>`);
                });
                
                // If the entire line was just the URL(s), don't wrap in <p>
                if (line.replace(imageRegex, '').trim() === '') {
                    parsedContent += `${modifiedLine}\n`;
                } else {
                    parsedContent += `<p>${modifiedLine}</p>\n`;
                }
            } else {
                parsedContent += `<p>${line}</p>\n`;
            }
        }

        setData(prev => ({
            ...prev,
            title: prev.title || extractedTitle,
            content: parsedContent,
            image: prev.image || mainImage
        }));

        setIsSmartImportOpen(false);
        setSmartImportText('');
        toast.success(isDocUrl ? 'Google Doc imported successfully!' : 'Content smartly imported!');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/posts', {
            onSuccess: () => toast.success('Post created successfully!')
        });
    };

    return (
        <AdminLayout title="Create Blog Post">
            <Head title="Create Post - Admin" />

            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/posts" className="text-gray-500 hover:text-brand-primary transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Post</h1>
                        <p className="text-sm text-gray-500 mt-1">Publish a new article to your blog.</p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={() => setIsSmartImportOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-bold hover:bg-blue-100 transition-colors border border-blue-200 shadow-sm"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    Smart Import Docs
                </button>
            </div>

            {/* Smart Import Modal */}
            {isSmartImportOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden border border-gray-100 dark:border-gray-700 transform transition-all">
                        <div className="border-b border-gray-100 dark:border-gray-700 px-6 py-4 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Smart Import Content</h3>
                            </div>
                            <button onClick={() => setIsSmartImportOpen(false)} className="text-gray-400 hover:text-gray-500 transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-4 mb-6">
                                <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-1">How it works:</h4>
                                <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1 list-disc list-inside">
                                    <li>Paste a public <strong>Google Docs URL</strong> to automatically fetch its text.</li>
                                    <li>Or paste your <strong>raw text</strong> directly below.</li>
                                    <li>The first line automatically becomes the Post Title.</li>
                                    <li>Any image URLs found inside the text will automatically be converted to beautiful embedded images!</li>
                                </ul>
                            </div>
                            
                            <textarea
                                className="w-full h-64 rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:ring-brand-primary focus:border-brand-primary shadow-inner p-4 text-sm leading-relaxed transition-colors"
                                placeholder="https://docs.google.com/document/d/...&#10;--- OR ---&#10;My Great Blog Title&#10;&#10;Here is paragraph 1. Look at this cool image: https://img.example.com/image.webp&#10;&#10;Here is paragraph 2..."
                                value={smartImportText}
                                onChange={e => setSmartImportText(e.target.value)}
                                disabled={isImporting}
                            />
                            
                            <div className="mt-6 flex justify-end gap-3">
                                <button type="button" onClick={() => setIsSmartImportOpen(false)} className="px-6 py-2.5 rounded-xl font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" disabled={isImporting}>
                                    Cancel
                                </button>
                                <button type="button" onClick={handleSmartImport} className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold bg-brand-primary text-white hover:bg-brand-secondary disabled:opacity-50 transition-colors shadow-md hover:shadow-lg" disabled={isImporting || !smartImportText.trim()}>
                                    {isImporting ? (
                                        <>
                                            <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                            Importing...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" /></svg>
                                            Process & Import
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

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
                        {errors.slug && <p className="mt-1 text-sm text-red-500">{errors.slug}</p>}
                    </div>
                    
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">Category</label>
                        <select
                            value={data.post_category_id}
                            onChange={e => setData('post_category_id', e.target.value)}
                            className="w-full bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-brand-primary focus:border-brand-primary h-11 px-4 dark:text-white"
                        >
                            <option value="">No Category</option>
                            {categories.map((cat: any) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        {errors.post_category_id && <p className="mt-1 text-sm text-red-500">{errors.post_category_id}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cover Image URL</label>
                        <input
                            type="url"
                            className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary"
                            value={data.image}
                            onChange={e => setData('image', e.target.value)}
                            placeholder="https://example.com/image.jpg"
                        />
                        {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                        
                        {data.image && (
                            <div className="mt-4">
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Image Preview</p>
                                <img src={data.image} alt="Preview" className="h-48 w-full object-cover rounded-lg border border-gray-200 dark:border-gray-700" onError={(e) => (e.currentTarget.style.display = 'none')} />
                            </div>
                        )}
                    </div>

                    <div className="grid gap-5 rounded-2xl border border-gray-100 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-900/40 lg:grid-cols-2">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Additional Image URLs</label>
                            <textarea
                                className="w-full rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:ring-brand-primary focus:border-brand-primary"
                                rows={5}
                                value={data.image_urls}
                                onChange={e => setData('image_urls', e.target.value)}
                                placeholder={'https://example.com/image-1.jpg\nhttps://example.com/image-2.jpg'}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Upload Images</label>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={e => setData('image_files', Array.from(e.target.files || []))}
                                className="block w-full rounded-xl border border-dashed border-gray-300 bg-white p-4 text-sm font-semibold text-gray-700 file:mr-4 file:rounded-lg file:border-0 file:bg-brand-primary file:px-4 file:py-2 file:text-sm file:font-black file:text-white hover:border-brand-primary dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
                            />
                            <p className="mt-2 text-xs font-semibold text-gray-500">You can select multiple article images.</p>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Content (HTML allowed)</label>
                        <textarea
                            className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-brand-primary focus:border-brand-primary"
                            rows={10}
                            value={data.content}
                            onChange={e => setData('content', e.target.value)}
                        ></textarea>
                        {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
                    </div>

                    <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">SEO Optimization</h3>
                        
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

                    <div className="grid gap-5 border-t border-gray-100 pt-6 dark:border-gray-700 md:grid-cols-2">
                        <label className="flex items-center rounded-xl border border-gray-100 bg-gray-50 p-4 text-sm font-bold text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-white">
                            <input
                                id="is_published"
                                type="checkbox"
                                className="mr-3 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-brand-primary focus:ring-brand-primary h-6 w-6"
                                checked={data.is_published}
                                onChange={e => setData('is_published', e.target.checked)}
                            />
                            Publish this post
                        </label>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Schedule publish date</label>
                            <input
                                type="datetime-local"
                                value={data.scheduled_at}
                                onChange={e => setData('scheduled_at', e.target.value)}
                                className="w-full rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:ring-brand-primary focus:border-brand-primary"
                            />
                        </div>
                    </div>

                </div>

                <div className="flex justify-end gap-3 pb-8">
                    <Link href="/admin/posts" className="px-6 py-2.5 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-6 py-2.5 rounded-lg font-medium bg-brand-primary text-white hover:bg-brand-secondary transition-colors shadow-sm disabled:opacity-50"
                    >
                        {processing ? 'Saving...' : 'Create Post'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
