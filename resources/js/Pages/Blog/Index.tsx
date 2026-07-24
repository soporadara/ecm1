import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';

export default function Index({ posts, categories = [] }: any) {
    const featuredPost = posts.data.length > 0 ? posts.data[0] : null;
    const sidePosts = posts.data.length > 1 ? posts.data.slice(1, 4) : [];
    const gridPosts = posts.data.length > 4 ? posts.data.slice(4) : [];

    return (
        <MainLayout>
            <Head title="Logistics Blog - Guides and Company Updates" />

            {/* Page Header */}
            <div className="bg-gray-100 dark:bg-gray-900 py-16 text-center transition-colors">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Logistics Guides and Company Updates</h1>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Practical articles about manual orders, sourcing products, shipping updates, payment guidance, and delivery support.</p>
            </div>

            <div className="bg-white dark:bg-[#0a1b2a] min-h-screen py-16 transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Featured Top Section */}
                    {featuredPost && (
                        <div className="flex flex-col lg:flex-row gap-8 mb-16">
                            {/* Main Featured Post */}
                            <div className="lg:w-2/3">
                                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                                    {featuredPost.image && (
                                        <Link href={`/blog/${featuredPost.slug}`} className="flex-1">
                                            <div className="w-full h-80 lg:h-[450px] overflow-hidden">
                                                <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                            </div>
                                        </Link>
                                    )}
                                    <div className="p-8">
                                        <div className="flex items-center gap-4 mb-3">
                                            <span className="text-xs text-brand-primary font-bold uppercase tracking-wide bg-brand-primary/10 px-3 py-1 rounded-full">Featured</span>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                {new Date(featuredPost.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                            </span>
                                        </div>
                                        <Link href={`/blog/${featuredPost.slug}`}>
                                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 hover:text-brand-primary dark:hover:text-brand-primary transition-colors leading-tight">
                                                {featuredPost.title}
                                            </h2>
                                        </Link>
                                        <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-6 text-lg">
                                            {featuredPost.seo_description || 'Read more about this topic in our detailed article.'}
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-bold text-gray-700 dark:text-gray-300">
                                                {(featuredPost.user?.name || 'A').charAt(0)}
                                            </div>
                                            <div className="text-sm">
                                                <p className="font-semibold text-gray-900 dark:text-white">{featuredPost.user?.name || 'Admin'}</p>
                                                <p className="text-gray-500 dark:text-gray-400">Logistics Team</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar Featured Posts */}
                            <div className="lg:w-1/3 flex flex-col gap-6">
                                {/* Search Widget */}
                                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Search</h3>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search articles..."
                                            className="w-full pl-4 pr-10 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                        />
                                        <button className="absolute right-3 top-2.5 text-gray-400 hover:text-brand-primary">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Categories Widget */}
                                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Categories</h3>
                                    <ul className="space-y-2">
                                        {categories.map((category: any) => (
                                            <li key={category.id} className="flex justify-between items-center">
                                                <Link href={`/blog?category=${category.slug}`} className="text-gray-600 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-primary transition-colors">
                                                    {category.name}
                                                </Link>
                                                <span className="text-sm text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 rounded-full">{category.posts_count}</span>
                                            </li>
                                        ))}
                                        {categories.length === 0 && (
                                            <li className="text-gray-500 italic">No categories yet.</li>
                                        )}
                                    </ul>
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 mb-2">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                        <span className="w-2 h-6 bg-brand-primary rounded-full"></span>
                                        Recent Guides
                                    </h3>
                                </div>
                                {sidePosts.map((post: any) => (
                                    <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex hover:shadow-md transition-shadow group">
                                        {post.image && (
                                            <Link href={`/blog/${post.slug}`} className="w-1/3 sm:w-2/5 shrink-0">
                                                <div className="h-full w-full overflow-hidden">
                                                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                </div>
                                            </Link>
                                        )}
                                        <div className="p-4 flex flex-col justify-center flex-1">
                                            <p className="text-xs text-brand-primary font-semibold mb-1 uppercase tracking-wide">
                                                {new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </p>
                                            <Link href={`/blog/${post.slug}`}>
                                                <h4 className="text-base font-bold text-gray-900 dark:text-white mb-1 hover:text-brand-primary dark:hover:text-brand-primary transition-colors line-clamp-2">
                                                    {post.title}
                                                </h4>
                                            </Link>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">14 min read</p>
                                        </div>
                                    </div>
                                ))}

                                {/* Social Links Widget */}
                                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 mt-2">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Follow Us</h3>
                                    <div className="flex gap-4">
                                        <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-brand-primary hover:text-white transition-colors shadow-sm">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                            </svg>
                                        </a>
                                        <a href="#" className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-brand-primary hover:text-white transition-colors shadow-sm">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Blog Grid */}
                    {gridPosts.length > 0 && (
                        <>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">More Articles</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {gridPosts.map((post: any) => (
                                    <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                        {post.image && (
                                            <Link href={`/blog/${post.slug}`}>
                                                <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                                                    <img src={post.image} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                                </div>
                                            </Link>
                                        )}
                                        <div className="p-6">
                                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-2 uppercase tracking-wide">
                                                {new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                            </p>
                                            <Link href={`/blog/${post.slug}`}>
                                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-brand-primary dark:hover:text-brand-primary transition-colors line-clamp-2">
                                                    {post.title}
                                                </h2>
                                            </Link>
                                            <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4 text-sm">
                                                {post.seo_description || 'Read more about this topic in our detailed article.'}
                                            </p>
                                            <Link href={`/blog/${post.slug}`} className="text-brand-primary font-medium hover:underline inline-flex items-center text-sm">
                                                Read Article
                                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {/* Pagination */}
                    {posts.last_page > 1 && (
                        <div className="mt-16 flex justify-center gap-2">
                            {posts.links.map((link: any, idx: number) => (
                                <Link
                                    key={idx}
                                    href={link.url || '#'}
                                    className={`px-4 py-2 border rounded transition-colors ${link.active ? 'bg-brand-primary text-white border-brand-primary' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
