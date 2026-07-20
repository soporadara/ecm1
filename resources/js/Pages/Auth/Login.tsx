import React, { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword?: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="min-h-screen flex text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900">
            <Head title="Log in" />
            
            {/* Left Side: Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 relative z-10">
                <div className="w-full max-w-md">
                    <Link href="/" className="flex items-center gap-2 mb-12 group inline-flex">
                        <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center transform group-hover:-rotate-12 transition-transform duration-300">
                            <span className="text-white font-bold text-xl font-serif">P</span>
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white">pengu.</span>
                    </Link>

                    <h1 className="text-4xl font-bold font-serif mb-2 text-gray-900 dark:text-white">Welcome back</h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-8">Please enter your details to sign in.</p>

                    {status && <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">{status}</div>}

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block font-medium text-sm text-gray-700 dark:text-gray-300">Email</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-lg focus:ring-brand-primary focus:border-brand-primary h-12"
                                autoComplete="username"
                                autoFocus
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            {errors.email && <p className="text-sm text-red-600 mt-2">{errors.email}</p>}
                        </div>

                        <div>
                            <div className="flex justify-between items-center mt-1">
                                <label htmlFor="password" className="block font-medium text-sm text-gray-700 dark:text-gray-300">Password</label>
                                {canResetPassword && (
                                    <Link href="/forgot-password" className="text-sm font-medium text-brand-primary hover:text-brand-secondary">
                                        Forgot password?
                                    </Link>
                                )}
                            </div>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-lg focus:ring-brand-primary focus:border-brand-primary h-12"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            {errors.password && <p className="text-sm text-red-600 mt-2">{errors.password}</p>}
                        </div>

                        <div className="flex items-center">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="rounded border-gray-300 text-brand-primary shadow-sm focus:ring-brand-primary h-4 w-4"
                                />
                                <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">Remember for 30 days</span>
                            </label>
                        </div>

                        <button 
                            type="submit" 
                            disabled={processing}
                            className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-gray-900 dark:bg-brand-primary hover:bg-gray-800 dark:hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-all disabled:opacity-50"
                        >
                            {processing ? 'Signing in...' : 'Sign in'}
                        </button>
                    </form>
                    
                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Don't have an account?{' '}
                            <Link href="/register" className="font-bold text-brand-primary hover:text-brand-secondary">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side: Image / Decoration */}
            <div className="hidden lg:block lg:w-1/2 relative bg-gray-50 dark:bg-gray-800 overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop" 
                    alt="Login Cover" 
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-12 text-white max-w-lg">
                    <h2 className="text-3xl font-bold font-serif mb-4 leading-tight">Elevate your everyday style with our premium collection.</h2>
                    <p className="text-gray-300 font-light text-lg">Join thousands of customers who have transformed their wardrobe with pengu.</p>
                </div>
            </div>
        </div>
    );
}
