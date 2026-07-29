import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';

export default function Index({ posts }: any) {
    return (
        <MainLayout>
            <Head title="Blog - Roller Compactor" />

            <div className="bg-[#f9fafb] min-h-screen py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
                        {posts.data.map((post: any) => (
                            <div key={post.id} className="flex flex-col group">
                                {post.image && (
                                    <Link href={`/blog/${post.slug}`} className="mb-5 block overflow-hidden rounded-[20px]">
                                        <img 
                                            src={post.image} 
                                            alt={post.title} 
                                            className="w-full h-[240px] object-cover hover:scale-105 transition-transform duration-500" 
                                        />
                                    </Link>
                                )}
                                
                                <div className="text-center px-4">
                                    <div className="flex items-center justify-center gap-4 text-[#ef5a3d] text-sm font-medium mb-3">
                                        <div className="flex items-center gap-1.5">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-gray-500">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            10 Min Read
                                        </div>
                                    </div>
                                    
                                    <Link href={`/blog/${post.slug}`}>
                                        <h2 className="text-[22px] font-bold text-[#1e293b] leading-snug hover:text-[#ef5a3d] transition-colors">
                                            {post.title}
                                        </h2>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {posts.last_page > 1 && (
                        <div className="mt-16 flex justify-center gap-2">
                            {posts.links.map((link: any, idx: number) => (
                                <Link
                                    key={idx}
                                    href={link.url || '#'}
                                    className={`px-4 py-2 border rounded transition-colors ${link.active ? 'bg-[#ef5a3d] text-white border-[#ef5a3d]' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
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
