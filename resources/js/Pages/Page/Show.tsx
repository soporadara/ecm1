import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';

export default function Show({ page }: any) {
    return (
        <MainLayout>
            <Head>
                <title>{page.seo_title || page.title}</title>
                <meta name="description" content={page.seo_description || ''} />
            </Head>

            {/* Header Banner */}
            <div 
                className={`py-16 md:py-24 text-center relative ${page.banner_image ? 'bg-black text-white' : 'bg-gray-100 text-gray-900'}`}
                style={page.banner_image ? { backgroundImage: `url(${page.banner_image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
            >
                {page.banner_image && <div className="absolute inset-0 bg-black/50"></div>}
                <div className="max-w-3xl mx-auto px-4 relative z-10">
                    <h1 className={`text-4xl md:text-5xl font-bold ${page.banner_image ? 'text-white' : 'text-gray-900'}`}>
                        {page.title}
                    </h1>
                </div>
            </div>

            {/* Page Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {page.content ? (
                    <div 
                        className="prose prose-lg prose-brand max-w-none text-gray-800"
                        dangerouslySetInnerHTML={{ __html: page.content }}
                    />
                ) : (
                    <p className="text-gray-500 text-center py-20">This page is currently empty.</p>
                )}
            </div>
        </MainLayout>
    );
}
