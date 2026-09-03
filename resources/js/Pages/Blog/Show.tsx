import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';
import toast from 'react-hot-toast';

export default function Show({ post, relatedPosts, categories = [] }: any) {
    const { data, setData, post: submitForm, processing, reset, errors } = useForm({
        name: '',
        email: '',
        website: '',
        review_title: '',
        content: '',
    });

    const submitComment = (e: React.FormEvent) => {
        e.preventDefault();
        submitForm(`/blog/${post.id}/comments`, {
            onSuccess: () => {
                reset();
                toast.success('Your comment has been posted successfully!');
            },
        });
    };

    return (
        <MainLayout 
            title={post.seo_title || post.title} 
            description={post.seo_description || ''} 
            image={post.image}
        >
            <div className="bg-[#f4f6f9] dark:bg-gray-950 min-h-screen pt-24 pb-12 transition-colors">
                <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
                    
                    <div className="flex flex-col lg:flex-row gap-6">
                        
                        {/* Main Content Area */}
                        <div className="lg:w-[70%] min-w-0">
                            <article className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 mb-6 transition-colors clearfix">
                                <div className="p-6 md:p-8 lg:p-10">
                                    {/* Meta header */}
                                    <div className="flex items-center gap-2 text-[#ef5a3d] text-xs font-semibold mb-4 uppercase tracking-wider">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </div>
                                    <h1 className="text-2xl md:text-3xl font-bold text-[#1e293b] dark:text-white leading-snug mb-6 tracking-tight">
                                        {post.title}
                                    </h1>

                                    {/* Content */}
                                    <div className="blog-post-content prose dark:prose-invert !max-w-none w-full clear-left">
                                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                                    </div>
                                </div>
                            </article>

                            {/* Display Comments */}
                            {post.comments && post.comments.length > 0 && (
                                <div className="mb-6">
                                    <h2 className="text-base font-bold text-[#0B152A] dark:text-white mb-4 border-b border-gray-100 dark:border-gray-800 pb-3">
                                        {post.comments.length} {post.comments.length === 1 ? 'Comment' : 'Comments'}
                                    </h2>
                                    <div className="space-y-4">
                                        {post.comments.map((comment: any) => (
                                            <div key={comment.id} className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-5 transition-colors">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center shrink-0">
                                                        <span className="text-sm font-bold text-gray-500 dark:text-gray-400">
                                                            {comment.name.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex justify-between items-start mb-1">
                                                            <div>
                                                                <h4 className="text-sm font-bold text-[#1e293b] dark:text-white">
                                                                    {comment.name}
                                                                </h4>
                                                                <span className="text-xs text-gray-400 dark:text-gray-500">
                                                                    {new Date(comment.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        {comment.review_title && (
                                                            <h5 className="text-sm font-semibold text-[#1e293b] dark:text-gray-300 mt-1 mb-1">
                                                                {comment.review_title}
                                                            </h5>
                                                        )}
                                                        <p className="text-[13px] text-gray-600 dark:text-gray-300 mt-1.5 whitespace-pre-wrap leading-relaxed">
                                                            {comment.content}
                                                        </p>

                                                        {/* Admin Reply */}
                                                        {comment.admin_reply && (
                                                            <div className="mt-4 p-4 bg-[#f8fafc] dark:bg-gray-950 rounded-lg border-l-4 border-[#ef5a3d]">
                                                                <div className="flex flex-col gap-1.5">
                                                                    <span className="text-xs font-bold text-[#ef5a3d] uppercase tracking-wide">Response from Admin</span>
                                                                    <p className="text-[13px] text-gray-600 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                                                                        {comment.admin_reply}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Comment Section */}
                            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 md:p-8 transition-colors">
                                <h2 className="text-base font-bold text-[#0B152A] dark:text-white mb-5">Leave A Comment</h2>
                                <form className="space-y-4" onSubmit={submitComment}>
                                    <div>
                                        <input 
                                            type="text" 
                                            placeholder="Review Title (Optional)" 
                                            value={data.review_title}
                                            onChange={e => setData('review_title', e.target.value)}
                                            className="w-full bg-[#f9fafb] dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#ef5a3d] focus:border-[#ef5a3d] placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-white"
                                        />
                                        {errors.review_title && <div className="text-red-500 text-xs mt-1">{errors.review_title}</div>}
                                    </div>
                                    <div>
                                        <textarea 
                                            placeholder="Write Your Comment..." 
                                            rows={6}
                                            required
                                            value={data.content}
                                            onChange={e => setData('content', e.target.value)}
                                            className="w-full bg-[#f9fafb] dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#ef5a3d] focus:border-[#ef5a3d] placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-white resize-y"
                                        ></textarea>
                                        {errors.content && <div className="text-red-500 text-xs mt-1">{errors.content}</div>}
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <input 
                                                type="text" 
                                                placeholder="Name *" 
                                                required
                                                value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                                className="w-full bg-[#f9fafb] dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#ef5a3d] focus:border-[#ef5a3d] placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-white"
                                            />
                                            {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                                        </div>
                                        <div>
                                            <input 
                                                type="email" 
                                                placeholder="Email *" 
                                                required
                                                value={data.email}
                                                onChange={e => setData('email', e.target.value)}
                                                className="w-full bg-[#f9fafb] dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#ef5a3d] focus:border-[#ef5a3d] placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-white"
                                            />
                                            {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                                        </div>
                                        <div>
                                            <input 
                                                type="text" 
                                                placeholder="Website (optional)" 
                                                value={data.website}
                                                onChange={e => setData('website', e.target.value)}
                                                className="w-full bg-[#f9fafb] dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#ef5a3d] focus:border-[#ef5a3d] placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-white"
                                            />
                                            {errors.website && <div className="text-red-500 text-xs mt-1">{errors.website}</div>}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" id="save-info" className="w-3.5 h-3.5 text-[#ef5a3d] border-gray-300 dark:border-gray-700 rounded focus:ring-[#ef5a3d]" />
                                        <label htmlFor="save-info" className="text-xs text-gray-500 dark:text-gray-400 leading-snug">
                                            Save my name, email, and website for next time.
                                        </label>
                                    </div>
                                    <div>
                                        <button disabled={processing} type="submit" className="bg-[#ef5a3d] hover:bg-[#d94b2f] text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm disabled:opacity-50">
                                            {processing ? 'Posting...' : 'Post Comment'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Sidebar Area */}
                        <aside className="lg:w-[30%] flex flex-col gap-5 lg:sticky lg:top-24 h-fit">
                            
                            {/* Categories */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-5">
                                <h3 className="text-sm font-bold text-[#1e293b] dark:text-white mb-3 uppercase tracking-wider">Categories</h3>
                                <div className="divide-y divide-gray-50 dark:divide-gray-800">
                                    {categories.map((cat: any) => (
                                        <Link key={cat.id} href={`/blog?category=${cat.slug}`} className="flex items-center justify-between group py-2.5 first:pt-0 last:pb-0">
                                            <span className="text-sm text-[#64748b] dark:text-gray-400 group-hover:text-[#ef5a3d] dark:group-hover:text-[#ef5a3d] transition-colors font-medium">{cat.name}</span>
                                            <span className="text-xs bg-gray-100 dark:bg-gray-800 text-[#64748b] dark:text-gray-400 px-2 py-0.5 rounded-full font-medium">{cat.posts_count}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Related Posts */}
                            {relatedPosts && relatedPosts.length > 0 && (
                                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-5">
                                    <h3 className="text-sm font-bold text-[#1e293b] dark:text-white mb-3 uppercase tracking-wider">Related Posts</h3>
                                    <div className="flex flex-col divide-y divide-gray-50 dark:divide-gray-800">
                                        {relatedPosts.map((related: any) => (
                                            <Link key={related.id} href={`/blog/${related.slug}`} className="flex gap-3 group py-3 first:pt-0 last:pb-0">
                                                <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                                                    {related.image && (
                                                        <img src={related.image} alt={related.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                    )}
                                                </div>
                                                <div className="flex flex-col justify-center flex-1 min-w-0">
                                                    <p className="text-[11px] font-semibold text-[#ef5a3d] mb-0.5">
                                                        {new Date(related.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </p>
                                                    <h4 className="font-semibold text-[#1e293b] dark:text-gray-200 text-[13px] leading-snug line-clamp-2 group-hover:text-[#ef5a3d] transition-colors">
                                                        {related.title}
                                                    </h4>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Tags */}
                            {post.tags && (
                                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-5">
                                    <h3 className="text-sm font-bold text-[#1e293b] dark:text-white mb-3 uppercase tracking-wider">Tags</h3>
                                    <div className="flex flex-wrap gap-1.5">
                                        {post.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean).map((tag: string, i: number) => (
                                            <span key={i} className="inline-block border border-gray-200 dark:border-gray-700 text-[#64748b] dark:text-gray-400 bg-gray-50 dark:bg-gray-800 text-xs font-medium px-2.5 py-1 rounded-md">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            {/* Social Networks */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-5">
                                <h3 className="text-sm font-bold text-[#1e293b] dark:text-white mb-3 uppercase tracking-wider">Follow Us</h3>
                                <div className="flex flex-wrap gap-2.5">  
                                    <a href="https://www.facebook.com/MVMLogistics" target="_blank" rel="noreferrer" title="Facebook" className="w-11 h-11 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                                    </a>
                                    <a href="https://m.me/MVMLogistics" target="_blank" rel="noreferrer" title="Messenger" className="w-11 h-11 rounded-full bg-[#00B2FF] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.14 2 11.246c0 2.9 1.455 5.485 3.738 7.152v3.655l3.414-1.87c.895.253 1.85.39 2.848.39 5.523 0 10-4.14 10-9.246S17.523 2 12 2zm1.096 12.433l-2.825-3.02-5.503 3.02 6.044-6.425 2.89 3.02 5.438-3.02-6.044 6.425z"/></svg>
                                    </a>
                                    <a href="https://t.me/mvmlogistic" target="_blank" rel="noreferrer" title="Telegram" className="w-11 h-11 rounded-full bg-[#26A5E4] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.892-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                                    </a>
                                    <a href="https://zalo.me/0813308055" target="_blank" rel="noreferrer" title="Zalo" className="w-11 h-11 rounded-full bg-[#0068FF] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M21.547 5.767a9.208 9.208 0 0 0-3.328-3.342C16.32 1.347 14.184.75 12 .75c-2.185 0-4.321.597-5.918 1.675a9.208 9.208 0 0 0-3.328 3.342c-1.373 2.378-1.884 5.253-1.442 8.125a10.038 10.038 0 0 0 2.457 5.378l-1.391 3.51a.63.63 0 0 0 .809.805l3.585-1.343a10.024 10.024 0 0 0 5.228 1.458c2.185 0 4.321-.597 5.918-1.675a9.208 9.208 0 0 0 3.328-3.342c1.373-2.378 1.884-5.253 1.442-8.125a10.038 10.038 0 0 0-1.14-4.791zm-4.707 9.475a.916.916 0 0 1-.926.918H8.084a.916.916 0 0 1-.926-.918v-1.12c0-.507.414-.918.926-.918h1.86v-1.285H8.084a.916.916 0 0 1-.926-.918V9.882c0-.508.414-.918.926-.918h7.83a.916.916 0 0 1 .926.918v1.12a.916.916 0 0 1-.926.918h-1.86v1.285h1.86a.916.916 0 0 1 .926.918v1.12z"/></svg>
                                    </a>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
