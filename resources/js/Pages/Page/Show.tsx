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
            <div className="bg-gray-100 py-16 md:py-24 text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{page.title}</h1>
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
