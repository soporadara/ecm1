import React, { useRef, useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function Profile() {
    const { auth } = usePage().props as any;
    const user = auth.user;

    // Personal Info Form
    const { data, setData, put, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        phone_e164: user.phone_e164 || '',
        current_password: '',
    });

    const updateProfile = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('profile.update'), {
            preserveScroll: true,
            onSuccess: () => setData('current_password', ''),
        });
    };

    // Password Form
    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e: React.FormEvent) => {
        e.preventDefault();
        passwordForm.put(route('profile.password.update'), {
            preserveScroll: true,
            onSuccess: () => passwordForm.reset(),
        });
    };

    // Avatar Form
    const avatarInput = useRef<HTMLInputElement>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const avatarForm = useForm({
        avatar: null as File | null,
    });

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            avatarForm.setData('avatar', file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const uploadAvatar = (e: React.FormEvent) => {
        e.preventDefault();
        avatarForm.post(route('profile.avatar.update'), {
            preserveScroll: true,
            onSuccess: () => {
                avatarForm.reset();
                if (avatarInput.current) {
                    avatarInput.current.value = '';
                }
            },
        });
    };

    return (
        <MainLayout>
            <Head title="My Profile" />

            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8">
                
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Account Settings</h1>
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 rounded-full transition-colors"
                    >
                        Sign Out
                    </Link>
                </div>

                {/* Profile Header */}
                <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8">
                    
                    <div className="relative group">
                        <div className="w-32 h-32 rounded-full border-4 border-gray-100 dark:border-gray-900 overflow-hidden bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-gray-500 font-bold text-4xl">
                            {avatarPreview ? (
                                <img src={avatarPreview} alt="Avatar Preview" className="w-full h-full object-cover" />
                            ) : user.avatar ? (
                                <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                user.name.charAt(0).toUpperCase()
                            )}
                        </div>
                        <button 
                            onClick={() => avatarInput.current?.click()}
                            className="absolute bottom-0 right-0 p-2.5 bg-black dark:bg-white text-white dark:text-black rounded-full shadow-lg hover:scale-105 transition-transform"
                            title="Change Avatar"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                        <input type="file" ref={avatarInput} className="hidden" accept="image/*" onChange={handleAvatarChange} />
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">{user.email}</p>
                        
                        {avatarForm.data.avatar && (
                            <button
                                onClick={uploadAvatar}
                                disabled={avatarForm.processing}
                                className="mt-4 px-6 py-2 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
                            >
                                {avatarForm.processing ? 'Uploading...' : 'Save Picture'}
                            </button>
                        )}
                        {avatarForm.errors.avatar && <p className="text-sm text-red-500 mt-2">{avatarForm.errors.avatar}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Personal Information */}
                    <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-3xl p-8">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Personal Details</h3>

                        <form onSubmit={updateProfile} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
                                />
                                {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
                                />
                                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                                <input
                                    type="text"
                                    value={data.phone_e164}
                                    onChange={e => setData('phone_e164', e.target.value)}
                                    placeholder="+1234567890"
                                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
                                />
                                {errors.phone_e164 && <p className="text-sm text-red-500 mt-1">{errors.phone_e164}</p>}
                            </div>

                            <hr className="border-gray-200 dark:border-gray-800 my-6" />

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Password <span className="text-gray-400">(Required)</span></label>
                                <input
                                    type="password"
                                    value={data.current_password}
                                    onChange={e => setData('current_password', e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
                                />
                                {errors.current_password && <p className="text-sm text-red-500 mt-1">{errors.current_password}</p>}
                            </div>

                            <div className="pt-2 flex items-center justify-between">
                                {recentlySuccessful && <span className="text-sm font-medium text-green-600 dark:text-green-400">Saved successfully!</span>}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="ml-auto px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
                                >
                                    {processing ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Change Password */}
                    <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-3xl p-8">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Security</h3>

                        <form onSubmit={updatePassword} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Current Password</label>
                                <input
                                    type="password"
                                    value={passwordForm.data.current_password}
                                    onChange={e => passwordForm.setData('current_password', e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
                                />
                                {passwordForm.errors.current_password && <p className="text-sm text-red-500 mt-1">{passwordForm.errors.current_password}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Password</label>
                                <input
                                    type="password"
                                    value={passwordForm.data.password}
                                    onChange={e => passwordForm.setData('password', e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
                                />
                                {passwordForm.errors.password && <p className="text-sm text-red-500 mt-1">{passwordForm.errors.password}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm New Password</label>
                                <input
                                    type="password"
                                    value={passwordForm.data.password_confirmation}
                                    onChange={e => passwordForm.setData('password_confirmation', e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
                                />
                            </div>

                            <div className="pt-2 flex items-center justify-between">
                                {passwordForm.recentlySuccessful && <span className="text-sm font-medium text-green-600 dark:text-green-400">Password updated!</span>}
                                <button
                                    type="submit"
                                    disabled={passwordForm.processing}
                                    className="ml-auto px-6 py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-colors disabled:opacity-50"
                                >
                                    {passwordForm.processing ? 'Updating...' : 'Update Password'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
