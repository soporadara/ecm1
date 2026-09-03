import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';
import { useTranslation } from '../../hooks/useTranslation';

export default function Index({ posts }: any) {
    const { t } = useTranslation();
    return (
        <MainLayout>
            <Head title={t('our_blogs_title')} />

            <div className="bg-[#f9fafb] dark:bg-gray-950 min-h-screen py-16 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <p className="text-xs font-black uppercase tracking-[0.28em] text-[#1c55c0] dark:text-white mb-3">Latest Updates</p>
                        <h1 className="text-3xl md:text-5xl font-black text-[#1e293b] dark:text-white font-serif">{t('our_blogs_title')}</h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.data.map((post: any) => (
                            <article key={post.id} className="ui-card group bg-white dark:bg-gray-900 rounded-[24px] shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
                                <Link href={`/blog/${post.slug}`} className="block relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
                                    {post.image ? (
                                        <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <svg className="w-12 h-12 text-gray-300 dark:text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    )}
                                    {post.category && (
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-[11px] font-bold text-[#1c55c0] dark:text-black tracking-wide uppercase shadow-sm">
                                            {post.category.name}
                                        </div>
                                    )}
                                </Link>
                                <div className="p-6 md:p-8 flex-1 flex flex-col">
                                    <div className="flex items-center justify-between text-xs font-bold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">
                                        <time>{new Date(post.published_at || post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight mb-4 group-hover:text-[#ef5a3d] transition-colors line-clamp-2">
                                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 font-light line-clamp-2 text-sm mt-auto">
                                        {post.seo_description || 'Read more about this topic in our latest article.'}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>

                    {posts.last_page > 1 && (
                        <div className="mt-16 flex justify-center gap-2">
                            {posts.links.map((link: any, idx: number) => (
                                <Link
                                    key={idx}
                                    href={link.url || '#'}
                                    className={`px-4 py-2 border rounded-xl transition-colors font-semibold ${link.active ? 'bg-[#ef5a3d] text-white border-[#ef5a3d]' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
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
