import { Head, Link } from '@inertiajs/react';
import React from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';

interface Props {
    active_theme: {
        name: string;
        version: string;
        author: string;
        description: string;
    };
}

export default function Themes({ active_theme }: Props) {
    return (
        <AdminLayout title="Themes">
            <Head title="Themes - Admin" />

            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Themes</h1>
                <p className="text-sm text-gray-500 mt-1">Manage your storefront appearance.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Active Theme Card */}
                <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden border-2 border-brand-primary">
                    <div className="h-48 bg-gray-100 dark:bg-gray-700 flex items-center justify-center relative overflow-hidden group">
                        {/* Placeholder graphic for theme */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-90"></div>
                        <div className="relative z-10 text-white text-center">
                            <h3 className="text-2xl font-black uppercase tracking-widest">{active_theme.name}</h3>
                            <p className="text-sm opacity-80 mt-1">The Default Headless Theme</p>
                        </div>
                    </div>
                    
                    <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                    {active_theme.name} <span className="text-xs font-normal text-gray-500 ml-2">v{active_theme.version}</span>
                                </h2>
                                <p className="text-sm text-gray-500">By {active_theme.author}</p>
                            </div>
                            <span className="px-2.5 py-1 text-xs font-bold bg-brand-primary text-white rounded-full">
                                Active
                            </span>
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 h-12">
                            {active_theme.description}
                        </p>
                        
                        <div className="mt-6 flex items-center gap-3">
                            <Link 
                                href="/admin/customize" 
                                className="flex-1 text-center bg-brand-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-secondary transition-colors"
                            >
                                Customize
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Add New Theme Placeholder */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center h-full min-h-[350px] p-6 text-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-not-allowed group">
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300">Add New Theme</h3>
                    <p className="text-sm text-gray-500 mt-2">Third-party theme support is disabled in this headless configuration.</p>
                </div>
            </div>
        </AdminLayout>
    );
}
