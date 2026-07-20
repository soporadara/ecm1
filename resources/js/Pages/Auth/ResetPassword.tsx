import { Head, useForm } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';
import React from 'react';

export default function ResetPassword({ token, email }: { token: string, email?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        token: token,
        email: email || '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/reset-password');
    };

    return (
        <MainLayout>
            <Head title="Reset Password" />
            
            <div className="min-h-screen bg-[#fdf2f2] dark:bg-gray-950 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
                <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-900 p-10 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800">
                    <div>
                        <div className="flex justify-center mb-6">
                            <div className="flex items-center space-x-2">
                                <div className="w-6 h-6 rounded-full border-2 border-brand-primary flex items-center justify-center">
                                    <div className="w-1.5 h-1.5 bg-brand-primary rounded-full"></div>
                                </div>
                                <span className="text-2xl font-bold font-serif text-brand-secondary dark:text-white">pengu</span>
                            </div>
                        </div>
                        <h2 className="text-center text-3xl font-extrabold font-serif text-brand-secondary dark:text-white">
                            Create New Password
                        </h2>
                    </div>
                    
                    <form className="mt-8 space-y-6" onSubmit={submit}>
                        <div className="rounded-md shadow-sm space-y-4">
                            <div>
                                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email address</label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded focus:outline-none focus:ring-brand-primary focus:border-brand-primary focus:z-10 sm:text-sm transition-colors"
                                    placeholder="Enter your email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="appearance-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded focus:outline-none focus:ring-brand-primary focus:border-brand-primary focus:z-10 sm:text-sm transition-colors"
                                    placeholder="Create a new password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                            </div>
                            <div>
                                <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm Password</label>
                                <input
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    type="password"
                                    required
                                    className="appearance-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-700 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded focus:outline-none focus:ring-brand-primary focus:border-brand-primary focus:z-10 sm:text-sm transition-colors"
                                    placeholder="Confirm your new password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded text-white bg-brand-primary hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors uppercase tracking-widest disabled:opacity-50"
                            >
                                {processing ? 'Resetting...' : 'Reset Password'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
}
