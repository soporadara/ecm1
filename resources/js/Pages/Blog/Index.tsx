import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';

export default function Index({ posts }: any) {
    const featuredPost = posts.data.length > 0 ? posts.data[0] : null;
    const sidePosts = posts.data.length > 1 ? posts.data.slice(1, 4) : [];
    const gridPosts = posts.data.length > 4 ? posts.data.slice(4) : [];

    return (
        <MainLayout>
            <Head title="Blog - Our Latest News" />

            {/* Page Header */}
            <div className="bg-gray-100 dark:bg-gray-900 py-16 text-center transition-colors">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Latest News</h1>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Discover styling tips, new product announcements, and behind-the-scenes stories from our team.</p>
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
                                            <span className="text-xs text-brand-primary font-bold uppercase tracking-wide bg-brand-primary/10 px-3 py-1 rounded-full">
                                                Featured
                                            </span>
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
                                                <p className="text-gray-500 dark:text-gray-400">Content Creator</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar Featured Posts */}
                            <div className="lg:w-1/3 flex flex-col gap-6">
                                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 mb-2">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                        <span className="w-2 h-6 bg-brand-primary rounded-full"></span>
                                        Trending Now
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
