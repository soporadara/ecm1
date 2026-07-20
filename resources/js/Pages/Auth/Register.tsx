import React, { useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <div className="min-h-screen flex text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900">
            <Head title="Register" />
            
            {/* Left Side: Image / Decoration */}
            <div className="hidden lg:block lg:w-1/2 relative bg-gray-50 dark:bg-gray-800 overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2000&auto=format&fit=crop" 
                    alt="Register Cover" 
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-12 text-white max-w-lg">
                    <h2 className="text-3xl font-bold font-serif mb-4 leading-tight">Begin your style journey today.</h2>
                    <p className="text-gray-300 font-light text-lg">Create an account to track orders, save your wishlist, and get exclusive offers.</p>
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 relative z-10">
                <div className="w-full max-w-md">
                    <Link href="/" className="flex items-center gap-2 mb-10 group inline-flex">
                        <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center transform group-hover:-rotate-12 transition-transform duration-300">
                            <span className="text-white font-bold text-xl font-serif">P</span>
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white">pengu.</span>
                    </Link>

                    <h1 className="text-4xl font-bold font-serif mb-2 text-gray-900 dark:text-white">Create an account</h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-8">Enter your details below to get started.</p>

                    <form onSubmit={submit} className="space-y-5">
                        <div>
                            <label htmlFor="name" className="block font-medium text-sm text-gray-700 dark:text-gray-300">Full Name</label>
                            <input
                                id="name"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-lg focus:ring-brand-primary focus:border-brand-primary h-12"
                                autoComplete="name"
                                autoFocus
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            {errors.name && <p className="text-sm text-red-600 mt-2">{errors.name}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block font-medium text-sm text-gray-700 dark:text-gray-300">Email</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-lg focus:ring-brand-primary focus:border-brand-primary h-12"
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            {errors.email && <p className="text-sm text-red-600 mt-2">{errors.email}</p>}
                        </div>

                        <div>
                            <label htmlFor="password" className="block font-medium text-sm text-gray-700 dark:text-gray-300">Password</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-lg focus:ring-brand-primary focus:border-brand-primary h-12"
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            {errors.password && <p className="text-sm text-red-600 mt-2">{errors.password}</p>}
                        </div>

                        <div>
                            <label htmlFor="password_confirmation" className="block font-medium text-sm text-gray-700 dark:text-gray-300">Confirm Password</label>
                            <input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                className="mt-1 block w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-lg focus:ring-brand-primary focus:border-brand-primary h-12"
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                            {errors.password_confirmation && <p className="text-sm text-red-600 mt-2">{errors.password_confirmation}</p>}
                        </div>

                        <button 
                            type="submit" 
                            disabled={processing}
                            className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-gray-900 dark:bg-brand-primary hover:bg-gray-800 dark:hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-all disabled:opacity-50 mt-2"
                        >
                            {processing ? 'Creating account...' : 'Create Account'}
                        </button>
                    </form>
                    
                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Already have an account?{' '}
                            <Link href="/login" className="font-bold text-brand-primary hover:text-brand-secondary">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
