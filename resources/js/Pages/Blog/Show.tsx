import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';

export default function Show({ post, relatedPosts, categories = [] }: any) {
    const galleryImages = (post.images || []).filter((image: string) => image && image !== post.image);

    return (
        <MainLayout>
            <Head>
                <title>{post.seo_title || post.title}</title>
                <meta name="description" content={post.seo_description || ''} />
            </Head>

            <div className="bg-gray-50 dark:bg-black min-h-screen py-16 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="flex flex-col lg:flex-row gap-12">
                        
                        {/* Main Content Area */}
                        <div className="lg:w-2/3">
                            <article className="bg-white dark:bg-[#0a1b2a] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                                {/* Header */}
                                <div className="p-8 pb-4">
                                    <span className="inline-block px-3 py-1 bg-brand-primary/10 text-brand-primary font-bold uppercase tracking-wider text-xs rounded-full mb-4">
                                        News
                                    </span>
                                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight font-serif">
                                        {post.title}
                                    </h1>
                                    <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 text-sm border-b border-gray-100 dark:border-gray-800 pb-6">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-bold text-gray-700 dark:text-gray-300">
                                                {(post.user?.name || 'A').charAt(0)}
                                            </div>
                                            <span className="font-semibold text-gray-900 dark:text-white">By {post.user ? post.user.name : 'Admin'}</span>
                                        </div>
                                        <span>•</span>
                                        <span>{new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                        <span>•</span>
                                        <span>8 min read</span>
                                    </div>
                                </div>

                                {/* Cover Image */}
                                {post.image && (
                                    <div className="w-full">
                                        <img src={post.image} alt={post.title} className="w-full h-auto object-cover max-h-[500px]" />
                                    </div>
                                )}

                                {galleryImages.length > 0 && (
                                    <div className="grid gap-3 px-8 pt-6 sm:grid-cols-2">
                                        {galleryImages.map((image: string) => (
                                            <img key={image} src={image} alt={post.title} className="h-56 w-full rounded-xl border border-gray-100 object-cover dark:border-gray-800" />
                                        ))}
                                    </div>
                                )}

                                {/* Content */}
                                <div className="p-8">
                                    <div 
                                        className="prose prose-lg dark:prose-invert prose-brand max-w-none text-gray-800 dark:text-gray-300 leading-relaxed font-light"
                                        dangerouslySetInnerHTML={{ __html: post.content }}
                                    />
                                </div>
                            </article>
                        </div>

                        {/* Sidebar Area */}
                        <aside className="lg:w-1/3 flex flex-col gap-8">
                            
                            {/* Social Networks */}
                            <div className="bg-white dark:bg-[#0a1b2a] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-5 bg-brand-primary rounded-full"></span>
                                    Contact Channels
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <a href="#" className="flex items-center justify-center gap-2 bg-[#E1306C] text-white py-2 rounded font-medium text-sm hover:opacity-90 transition-opacity"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> Instagram</a>
                                    <a href="#" className="flex items-center justify-center gap-2 bg-[#1877F2] text-white py-2 rounded font-medium text-sm hover:opacity-90 transition-opacity"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> Facebook</a>
                                    <a href="#" className="flex items-center justify-center gap-2 bg-[#E60023] text-white py-2 rounded font-medium text-sm hover:opacity-90 transition-opacity"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.17 0 7.41 2.967 7.41 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.624 0 12.017 0z"/></svg> Pinterest</a>
                                    <a href="#" className="flex items-center justify-center gap-2 bg-[#1DA1F2] text-white py-2 rounded font-medium text-sm hover:opacity-90 transition-opacity"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg> Twitter</a>
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="bg-white dark:bg-[#0a1b2a] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-5 bg-brand-primary rounded-full"></span>
                                    Categories
                                </h3>
                                <ul className="space-y-2">
                                    {categories.map((cat: any) => (
                                        <li key={cat.id}>
                                            <Link href={`/blog?category=${cat.slug}`} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-primary transition-colors">
                                                <span>{cat.name}</span>
                                                <span className="bg-gray-100 dark:bg-gray-800 text-xs py-1 px-2 rounded font-medium">{cat.posts_count}</span>
                                            </Link>
                                        </li>
                                    ))}
                                    {categories.length === 0 && (
                                        <li className="text-gray-500 text-sm italic">No categories yet.</li>
                                    )}
                                </ul>
                            </div>

                            {/* Recent Posts (Related) */}
                            {relatedPosts && relatedPosts.length > 0 && (
                                <div className="bg-white dark:bg-[#0a1b2a] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                        <span className="w-1.5 h-5 bg-brand-primary rounded-full"></span>
                                        Recent Posts
                                    </h3>
                                    <div className="flex flex-col gap-4">
                                        {relatedPosts.map((related: any) => (
                                            <Link key={related.id} href={`/blog/${related.slug}`} className="flex gap-4 group">
                                                <div className="w-20 h-20 shrink-0 rounded overflow-hidden bg-gray-100 dark:bg-gray-800">
                                                    {related.image ? (
                                                        <img src={related.image} alt={related.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No img</div>
                                                    )}
                                                </div>
                                                <div className="flex flex-col justify-center">
                                                    <h4 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-2 group-hover:text-brand-primary transition-colors mb-1">
                                                        {related.title}
                                                    </h4>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {new Date(related.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Tag Cloud */}
                            <div className="bg-white dark:bg-[#0a1b2a] rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-5 bg-brand-primary rounded-full"></span>
                                    Tag Cloud
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {['Logistics', 'Manual Order', 'Delivery', 'Sourcing', 'Warehouse', 'Payments', 'Receipts', 'Support'].map((tag, i) => (
                                        <a key={i} href="#" className="inline-block border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-brand-primary hover:text-white hover:border-brand-primary dark:hover:bg-brand-primary transition-colors text-xs font-medium px-3 py-1.5 rounded">
                                            {tag}
                                        </a>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Newsletter / Promo */}
                            <div className="bg-brand-secondary rounded-xl p-8 text-center text-white relative overflow-hidden">
                                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                                <h3 className="text-2xl font-bold font-serif mb-2 relative z-10">Get Logistics Updates</h3>
                                <p className="text-sm text-gray-300 mb-6 relative z-10">Receive new shipping guides, sourcing tips, and service updates.</p>
                                <form className="relative z-10" onSubmit={(e) => e.preventDefault()}>
                                    <input type="email" placeholder="Email Address" className="w-full text-black px-4 py-3 rounded mb-3 text-sm focus:ring-2 focus:ring-brand-primary" />
                                    <button type="button" className="w-full bg-brand-primary text-white font-bold uppercase tracking-widest text-xs px-4 py-3 rounded hover:bg-brand-primary/90 transition-colors">
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
