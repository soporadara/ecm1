import React, { useRef, useState } from 'react';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { signOutFirebase } from '@/lib/firebase';
import MobileProfileView from '../Components/Premium/MobileProfileView';
import { useTranslation } from '../hooks/useTranslation';

export default function Profile() {
    const { t } = useTranslation();
    const { auth, telegram_bot_username } = usePage().props as any;
    const user = auth.user;

    // Personal Info Form
    const { data, setData, put, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        contact_email: user.contact_email || '',
        phone_e164: user.phone_e164 || '',
        address_line_1: user.address_line_1 || '',
        address_line_2: user.address_line_2 || '',
        city: user.city || '',
        province: user.province || '',
        postal_code: user.postal_code || '',
        country_code: user.country_code || 'KH',
        address_notes: user.address_notes || '',
        preferred_locale: user.preferred_locale || user.preferred_language || 'en',
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
            <Head title={t('profile.account_settings')} />

            {/* Mobile View */}
            <div className="block lg:hidden">
                <MobileProfileView user={user} logout={logout} />
            </div>

            {/* Desktop View */}
            <div className="hidden lg:block max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8">
                
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">{t('profile.account_settings')}</h1>
                    <button
                        type="button"
                        onClick={logout}
                        className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 rounded-full transition-colors"
                    >
                        {t('profile.sign_out')}
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
                        <p className="text-gray-500 dark:text-gray-400 mt-1">{t('profile.customer_id')}: <span className="font-mono font-bold text-brand-primary">{user.customer_code || 'Pending'}</span></p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t('profile.login_email')}: {user.email}</p>
                        
                        {avatarForm.data.avatar && (
                            <button
                                onClick={uploadAvatar}
                                disabled={avatarForm.processing}
                                className="mt-4 px-6 py-2 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50"
                            >
                                {avatarForm.processing ? t('profile.uploading') : t('profile.save_picture')}
                            </button>
                        )}
                        {avatarForm.errors.avatar && <p className="text-sm text-red-500 mt-2">{avatarForm.errors.avatar}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Personal Information */}
                    <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-3xl p-8">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{t('profile.personal_details')}</h3>

                        <form onSubmit={updateProfile} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('profile.full_name')}</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
                                />
                                {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('profile.login_email')}</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
                                />
                                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('profile.preferred_contact_email')}</label>
                                <input
                                    type="email"
                                    value={data.contact_email}
                                    onChange={e => setData('contact_email', e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all"
                                />
                                {errors.contact_email && <p className="text-sm text-red-500 mt-1">{errors.contact_email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('profile.phone_number')}</label>
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
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('profile.language')}</label>
                                    <select value={data.preferred_locale} onChange={e => setData('preferred_locale', e.target.value)} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900">
                                        <option value="km">ភាសាខ្មែរ</option>
                                        <option value="en">English</option>
                                        <option value="vi">Tiếng Việt</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t('profile.preferred_currency')}</label>
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
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{t('profile.address.title', 'Address & Contact Apps')}</h3>
                        <form onSubmit={updateProfile} className="space-y-5">
                            <input value={data.address_line_1} onChange={e => setData('address_line_1', e.target.value)} placeholder={t('profile.address.line1', 'Address line 1')} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900" />
                            <input value={data.address_line_2} onChange={e => setData('address_line_2', e.target.value)} placeholder={t('profile.address.line2', 'Address line 2')} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900" />
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <input value={data.city} onChange={e => setData('city', e.target.value)} placeholder={t('profile.address.city', 'City')} className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900" />
                                <input value={data.province} onChange={e => setData('province', e.target.value)} placeholder={t('profile.address.province', 'Province')} className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900" />
                                <input value={data.postal_code} onChange={e => setData('postal_code', e.target.value)} placeholder={t('profile.address.postal_code', 'Postal code')} className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900" />
                            </div>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <input value={data.country_code} onChange={e => setData('country_code', e.target.value.toUpperCase())} placeholder={t('profile.address.country_code', 'KH')} maxLength={2} className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900" />
                                <input value={data.telegram_username} onChange={e => setData('telegram_username', e.target.value)} placeholder={t('profile.address.telegram', '@telegram')} className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900" />
                                <input value={data.whatsapp_number} onChange={e => setData('whatsapp_number', e.target.value)} placeholder={t('profile.address.whatsapp', 'WhatsApp number')} className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900" />
                            </div>
                            <textarea value={data.address_notes} onChange={e => setData('address_notes', e.target.value)} placeholder={t('profile.address.notes', 'Address notes')} rows={3} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-900" />
                            <button type="submit" disabled={processing} className="w-full rounded-xl bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                                {processing ? t('profile.saving', 'Saving...') : t('profile.address.save', 'Save Address')}
                            </button>
                        </form>
                    </div>

                    <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-3xl p-8">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Security</h3>

                        <div className="space-y-4">
                            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 text-sm text-blue-900 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-white">
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

                    <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-3xl p-8 mt-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Telegram Integration</h3>

                        {user.telegram_id ? (
                            <div className="rounded-2xl border border-green-100 bg-green-50/50 p-5 text-sm text-green-900 dark:border-green-900/50 dark:bg-green-950/20 dark:text-green-100">
                                <p className="font-bold flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block animate-pulse"></span>
                                    Linked with Telegram
                                </p>
                                <p className="mt-2">
                                    Your account is linked to Telegram ID: <strong className="font-mono">{user.telegram_id}</strong> {user.telegram_username ? `(@${user.telegram_username})` : ''}. You can use Telegram Bot OTP verification codes to log in securely.
                                </p>
                            </div>
                        ) : (
                            <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-5 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/20 dark:text-amber-100">
                                <p className="font-bold flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                                    Telegram Not Linked
                                </p>
                                <p className="mt-2 mb-4">
                                    Link your Telegram account to receive 6-digit login verification codes (OTP) directly to your Telegram chat.
                                </p>
                                {telegram_bot_username ? (
                                    <a
                                        href={`https://t.me/${telegram_bot_username}?start=link_${user.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center rounded-xl bg-brand-primary px-4 py-2 text-xs font-black text-white shadow-sm hover:bg-brand-secondary transition"
                                    >
                                        Link Telegram Account
                                    </a>
                                ) : (
                                    <p className="text-xs text-red-500 font-bold">
                                        Telegram configuration missing. Please check .env settings.
                                    </p>
                                )}
                            </div>
                        )}
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
