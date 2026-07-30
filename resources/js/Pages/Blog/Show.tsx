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
        <MainLayout>
            <Head>
                <title>{post.seo_title || post.title}</title>
                <meta name="description" content={post.seo_description || ''} />
            </Head>

            <div className="bg-[#f9fafb] dark:bg-gray-950 min-h-screen py-16 transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="flex flex-col lg:flex-row gap-8">
                        
                        {/* Main Content Area */}
                        <div className="lg:w-[68%]">
                            <article className="bg-white dark:bg-gray-900 rounded-[20px] shadow-sm border border-gray-100 dark:border-gray-800 mb-10 transition-colors clearfix">
                                <div className="p-8 md:p-12">
                                    {/* Header */}
                                    <div className="flex items-center gap-4 text-[#ef5a3d] text-sm font-medium mb-6">
                                        <div className="flex items-center gap-1.5">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            10 Min Read
                                        </div>
                                    </div>
                                    <h1 className="text-4xl md:text-5xl font-bold text-[#1e293b] dark:text-white leading-tight mb-8">
                                        {post.title}
                                    </h1>



                                    {/* Content */}
                                    <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed font-light clear-left">
                                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                                    </div>
                                </div>
                            </article>

                            {/* Display Comments */}
                            {post.comments && post.comments.length > 0 && (
                                <div className="mb-10">
                                    <h2 className="text-[24px] font-bold text-[#0B152A] dark:text-white mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
                                        {post.comments.length} {post.comments.length === 1 ? 'Comment' : 'Comments'}
                                    </h2>
                                    <div className="space-y-6">
                                        {post.comments.map((comment: any) => (
                                            <div key={comment.id} className="bg-white dark:bg-gray-900 rounded-[20px] shadow-sm border border-gray-100 dark:border-gray-800 p-6 md:p-8 transition-colors">
                                                <div className="flex items-start gap-4">
                                                    <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center shrink-0">
                                                        <span className="text-xl font-bold text-gray-500 dark:text-gray-400">
                                                            {comment.name.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <div>
                                                                <h4 className="text-lg font-bold text-[#1e293b] dark:text-white">
                                                                    {comment.name}
                                                                </h4>
                                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                                    {new Date(comment.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        {comment.review_title && (
                                                            <h5 className="text-md font-bold text-[#1e293b] dark:text-gray-300 mt-2 mb-1">
                                                                {comment.review_title}
                                                            </h5>
                                                        )}
                                                        <p className="text-gray-700 dark:text-gray-300 mt-2 whitespace-pre-wrap leading-relaxed">
                                                            {comment.content}
                                                        </p>

                                                        {/* Admin Reply */}
                                                        {comment.admin_reply && (
                                                            <div className="mt-6 p-5 bg-[#f8fafc] dark:bg-gray-950 rounded-xl border-l-4 border-[#ef5a3d]">
                                                                <div className="flex flex-col gap-2">
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="text-sm font-bold text-[#ef5a3d]">Response from Admin</span>
                                                                    </div>
                                                                    <p className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">
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
                            <div className="bg-white dark:bg-gray-900 rounded-[20px] shadow-sm border border-gray-100 dark:border-gray-800 p-8 md:p-12 transition-colors">
                                <h2 className="text-[28px] font-bold text-[#0B152A] dark:text-white mb-8">Leave A Comment</h2>
                                <form className="space-y-6" onSubmit={submitComment}>
                                    <div>
                                        <input 
                                            type="text" 
                                            placeholder="Review Title (Optional)" 
                                            value={data.review_title}
                                            onChange={e => setData('review_title', e.target.value)}
                                            className="w-full bg-[#f9fafb] dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-md px-5 py-4 focus:outline-none focus:ring-1 focus:ring-[#ef5a3d] focus:border-[#ef5a3d] placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-white"
                                        />
                                        {errors.review_title && <div className="text-red-500 text-sm mt-1">{errors.review_title}</div>}
                                    </div>
                                    <div>
                                        <textarea 
                                            placeholder="Write Your Comment...." 
                                            rows={10}
                                            required
                                            value={data.content}
                                            onChange={e => setData('content', e.target.value)}
                                            className="w-full bg-[#f9fafb] dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-md px-5 py-4 focus:outline-none focus:ring-1 focus:ring-[#ef5a3d] focus:border-[#ef5a3d] placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-white resize-y"
                                        ></textarea>
                                        {errors.content && <div className="text-red-500 text-sm mt-1">{errors.content}</div>}
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div>
                                            <input 
                                                type="text" 
                                                placeholder="Name" 
                                                required
                                                value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                                className="w-full bg-[#f9fafb] dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-md px-5 py-4 focus:outline-none focus:ring-1 focus:ring-[#ef5a3d] focus:border-[#ef5a3d] placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-white"
                                            />
                                            {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                                        </div>
                                        <div>
                                            <input 
                                                type="email" 
                                                placeholder="Email" 
                                                required
                                                value={data.email}
                                                onChange={e => setData('email', e.target.value)}
                                                className="w-full bg-[#f9fafb] dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-md px-5 py-4 focus:outline-none focus:ring-1 focus:ring-[#ef5a3d] focus:border-[#ef5a3d] placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-white"
                                            />
                                            {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                                        </div>
                                        <div>
                                            <input 
                                                type="text" 
                                                placeholder="Website (optional)" 
                                                value={data.website}
                                                onChange={e => setData('website', e.target.value)}
                                                className="w-full bg-[#f9fafb] dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-md px-5 py-4 focus:outline-none focus:ring-1 focus:ring-[#ef5a3d] focus:border-[#ef5a3d] placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-white"
                                            />
                                            {errors.website && <div className="text-red-500 text-sm mt-1">{errors.website}</div>}
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 mt-4 mb-2">
                                        <input type="checkbox" id="save-info" className="mt-1 w-4 h-4 text-[#ef5a3d] border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded focus:ring-[#ef5a3d]" />
                                        <label htmlFor="save-info" className="text-[15px] text-gray-600 dark:text-gray-400 leading-snug">
                                            Save my name, email, and website in this browser for the next time I comment.
                                        </label>
                                    </div>
                                    <div>
                                        <button disabled={processing} type="submit" className="bg-[#ef5a3d] hover:bg-[#d94b2f] text-white font-medium px-8 py-3.5 rounded-md transition-colors text-lg disabled:opacity-50">
                                            {processing ? 'Posting...' : 'Post Comment'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Sidebar Area */}
                        <aside className="lg:w-[32%] flex flex-col gap-8">
                            
                            {/* Categories */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8">
                                <h3 className="text-[18px] font-bold text-[#1e293b] dark:text-white mb-5">Categories</h3>
                                <div className="space-y-3">
                                    {categories.map((cat: any) => (
                                        <Link key={cat.id} href={`/blog?category=${cat.slug}`} className="flex items-center justify-between group">
                                            <span className="text-[#64748b] dark:text-gray-400 group-hover:text-[#ef5a3d] dark:group-hover:text-[#ef5a3d] transition-colors">{cat.name}</span>
                                            <span className="text-xs bg-[#f8fafc] dark:bg-gray-800 text-[#64748b] dark:text-gray-400 px-2.5 py-1 rounded-md">{cat.posts_count}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Blogs */}
                            {relatedPosts && relatedPosts.length > 0 && (
                                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8">
                                    <h3 className="text-[18px] font-bold text-[#1e293b] dark:text-white mb-6">Related Posts</h3>
                                    <div className="flex flex-col gap-5">
                                        {relatedPosts.map((related: any) => (
                                            <Link key={related.id} href={`/blog/${related.slug}`} className="flex gap-4 group">
                                                <div className="w-[85px] h-[85px] shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                                                    {related.image && (
                                                        <img src={related.image} alt={related.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                    )}
                                                </div>
                                                <div className="flex flex-col justify-center flex-1">
                                                    <p className="text-[11px] font-bold text-[#ef5a3d] mb-1">
                                                        {new Date(related.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </p>
                                                    <h4 className="font-bold text-[#1e293b] dark:text-gray-200 text-sm leading-snug line-clamp-2 group-hover:text-[#ef5a3d] transition-colors">
                                                        {related.title}
                                                    </h4>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Tag Cloud */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8">
                                <h3 className="text-[18px] font-bold text-[#1e293b] dark:text-white mb-5">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['Road Roller', 'Equipment', 'Safety', 'Maintenance', 'Construction', 'Tips'].map((tag, i) => (
                                        <a key={i} href="#" className="inline-block border border-gray-200 dark:border-gray-700 text-[#64748b] dark:text-gray-400 hover:bg-[#ef5a3d] hover:text-white hover:border-[#ef5a3d] transition-colors text-xs font-medium px-3.5 py-1.5 rounded-md">
                                            {tag}
                                        </a>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Social Networks */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8">
                                <h3 className="text-[18px] font-bold text-[#1e293b] dark:text-white mb-5">Follow Us</h3>
                                <div className="flex flex-wrap gap-3">
                                    <a href="#" className="w-11 h-11 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                                    </a>
                                    <a href="#" className="w-11 h-11 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                                    </a>
                                    <a href="#" className="w-11 h-11 rounded-full bg-[#E1306C] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                                    </a>
                                </div>
                            </div>

                            {/* Newsletter */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8">
                                <h3 className="text-[18px] font-bold text-[#1e293b] dark:text-white mb-3">Newsletter</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">Subscribe to our newsletter to get our newest articles straight to your inbox.</p>
                                <form className="flex flex-col gap-3" onSubmit={(e) => { e.preventDefault(); toast.success('Subscribed successfully!'); }}>
                                    <input 
                                        type="email" 
                                        required 
                                        placeholder="Your email address" 
                                        className="w-full bg-[#f9fafb] dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#ef5a3d] focus:border-[#ef5a3d] text-sm text-gray-900 dark:text-white"
                                    />
                                    <button type="submit" className="w-full bg-[#ef5a3d] hover:bg-[#d94b2f] text-white font-bold py-3 rounded-md transition-colors text-sm">
                                        Subscribe
                                    </button>
                                </form>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
