import React, { useRef, useState } from 'react';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { signOutFirebase } from '@/lib/firebase';

export default function Profile() {
    const { auth } = usePage().props as any;
    const user = auth.user;

    // Personal Info Form
    const { data, setData, put, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        contact_email: user.contact_email || '',
        phone_e164: user.phone_e164 || '',
        address_line_1: user.address_line_1 || '',
        address_line_2: user.address_line_2 || '',
        city: user.city || '',
        province: user.province || '',
        postal_code: user.postal_code || '',
        country_code: user.country_code || 'KH',
        address_notes: user.address_notes || '',
        preferred_locale: user.preferred_locale || user.preferred_language || 'km',
        preferred_currency: user.preferred_currency === 'VND' ? 'VND' : 'USD',
        telegram_username: user.telegram_username || '',
        whatsapp_number: user.whatsapp_number || '',
    });

    const [showSmsModal, setShowSmsModal] = useState(false);
    const [smsCode, setSmsCode] = useState('');

    const submitForm = () => {
        put('/profile', {
            preserveScroll: true,
            onSuccess: () => setShowSmsModal(false),
        });
    };

    const updateProfile = (e: React.FormEvent) => {
        e.preventDefault();
        
        const originalPhone = user.phone_e164 || '';
        const newPhone = data.phone_e164 || '';
        if (newPhone !== originalPhone && newPhone.length > 0) {
            setShowSmsModal(true);
        } else {
            submitForm();
        }
    };

    const handleSmsVerify = (e: React.FormEvent) => {
        e.preventDefault();
        if (smsCode === '123456') {
            submitForm();
        } else {
            alert('Invalid verification code. Please use 123456 for testing.');
        }
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
        avatarForm.post('/profile/avatar', {
            preserveScroll: true,
            onSuccess: () => {
                avatarForm.reset();
                if (avatarInput.current) {
                    avatarInput.current.value = '';
                }
            },
        });
    };

    const logout = async () => {
        try {
            await signOutFirebase();
        } finally {
            router.post('/logout');
        }
    };

    return (
        <MainLayout>
            <Head title="My Profile" />

            <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8">
                
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Account Settings</h1>
                    <button
                        type="button"
                        onClick={logout}
                        className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 rounded-full transition-colors"
                    >
                        Sign Out
                    </button>
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
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Customer ID: <span className="font-mono font-bold text-brand-primary">{user.customer_code || 'Pending'}</span></p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Login email: {user.email}</p>
                        
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
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Locked login email</label>
                                <input
                                    type="email"
                                    value={user.email}
                                    disabled
                                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                                />
                                <p className="mt-1 text-xs text-gray-500">Your login email is protected and cannot be changed from this page.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preferred contact email</label>
                                <input
                                    type="email"
                                    value={data.contact_email}
                                    onChange={e => setData('contact_email', e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
                                />
                                {errors.contact_email && <p className="text-sm text-red-500 mt-1">{errors.contact_email}</p>}
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

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language</label>
                                    <select value={data.preferred_locale} onChange={e => setData('preferred_locale', e.target.value)} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900">
                                        <option value="km">ភាសាខ្មែរ</option>
                                        <option value="en">English</option>
                                        <option value="vi">Tiếng Việt</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preferred currency</label>
                                    <select value={data.preferred_currency} onChange={e => setData('preferred_currency', e.target.value)} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900">
                                        <option value="USD">USD - United States Dollar</option>
                                        <option value="VND">VND - Vietnamese Dong</option>
                                    </select>
                                </div>
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

                    <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-3xl p-8">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Address & Contact Apps</h3>
                        <form onSubmit={updateProfile} className="space-y-5">
                            <input value={data.address_line_1} onChange={e => setData('address_line_1', e.target.value)} placeholder="Address line 1" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900" />
                            <input value={data.address_line_2} onChange={e => setData('address_line_2', e.target.value)} placeholder="Address line 2" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900" />
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <input value={data.city} onChange={e => setData('city', e.target.value)} placeholder="City" className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900" />
                                <input value={data.province} onChange={e => setData('province', e.target.value)} placeholder="Province" className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900" />
                                <input value={data.postal_code} onChange={e => setData('postal_code', e.target.value)} placeholder="Postal code" className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900" />
                            </div>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <input value={data.country_code} onChange={e => setData('country_code', e.target.value.toUpperCase())} placeholder="KH" maxLength={2} className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900" />
                                <input value={data.telegram_username} onChange={e => setData('telegram_username', e.target.value)} placeholder="@telegram" className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900" />
                                <input value={data.whatsapp_number} onChange={e => setData('whatsapp_number', e.target.value)} placeholder="WhatsApp number" className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900" />
                            </div>
                            <textarea value={data.address_notes} onChange={e => setData('address_notes', e.target.value)} placeholder="Address notes" rows={3} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900" />
                            <button type="submit" disabled={processing} className="w-full rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                                {processing ? 'Saving...' : 'Save Address'}
                            </button>
                        </form>
                    </div>

                    <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-3xl p-8">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Security</h3>

                        <div className="space-y-4">
                            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 text-sm text-blue-900 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-100">
                                <p className="font-bold">Sign-in provider: Google</p>
                                <p className="mt-2">Your customer login is protected by Google Firebase Authentication. Manage passwords and two-step verification from your Google Account.</p>
                            </div>
                            <dl className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                                <div className="flex justify-between gap-4"><dt className="font-bold text-gray-900 dark:text-white">Locked login email</dt><dd className="text-right">{user.email}</dd></div>
                                <div className="flex justify-between gap-4"><dt className="font-bold text-gray-900 dark:text-white">Customer ID</dt><dd className="font-mono text-right">{user.customer_code || 'Pending'}</dd></div>
                                <div className="flex justify-between gap-4"><dt className="font-bold text-gray-900 dark:text-white">Last login</dt><dd className="text-right">{user.last_login_at ? new Date(user.last_login_at).toLocaleString() : 'Not recorded'}</dd></div>
                            </dl>
                            <a href="https://myaccount.google.com/security" target="_blank" rel="noreferrer" className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-gray-200 px-4 text-sm font-black text-gray-800 transition hover:bg-gray-50 dark:border-gray-800 dark:text-gray-100 dark:hover:bg-gray-900">
                                Manage Google Account Security
                            </a>
                            <Link href="/contact" className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-gray-950 px-4 text-sm font-black text-white transition hover:bg-gray-800 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200">
                                Request Account Help
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* SMS Verification Modal */}
            {showSmsModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-3xl p-8 max-w-md w-full shadow-2xl">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Verify Your Phone Number</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">
                            We've sent an SMS with a verification code to <strong>{data.phone_e164}</strong>. 
                            (For testing, please enter <strong>123456</strong>).
                        </p>
                        <form onSubmit={handleSmsVerify} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">6-Digit Code</label>
                                <input
                                    type="text"
                                    value={smsCode}
                                    onChange={e => setSmsCode(e.target.value)}
                                    maxLength={6}
                                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white text-center tracking-[0.5em] text-lg transition-all"
                                    placeholder="••••••"
                                    required
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowSmsModal(false)}
                                    className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 px-4 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
                                >
                                    {processing ? 'Verifying...' : 'Verify & Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </MainLayout>
    );
}
