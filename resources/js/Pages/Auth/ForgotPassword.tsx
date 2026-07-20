import { Head, useForm, Link } from '@inertiajs/react';
import MainLayout from '../../Layouts/MainLayout';
import React, { useState } from 'react';

export default function ForgotPassword() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });
    
    const [status, setStatus] = useState<string | null>(null);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/forgot-password', {
            onSuccess: (page: any) => {
                setStatus(page.props.flash?.success || 'If an account matches that email, a password reset link has been sent.');
            }
        });
    };

    return (
        <MainLayout>
            <Head title="Forgot Password" />
            
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
                            Reset Password
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                            Enter your email address and we'll send you a link to reset your password.
                        </p>
                    </div>
                    
                    {status && (
                        <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 p-4 rounded text-sm text-center">
                            {status}
                        </div>
                    )}
                    
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
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded text-white bg-brand-primary hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors uppercase tracking-widest disabled:opacity-50"
                            >
                                {processing ? 'Sending...' : 'Send Reset Link'}
                            </button>
                        </div>
                        
                        <div className="text-center mt-4">
                            <Link href="/login" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-brand-primary transition-colors">
                                Back to login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
}
