import React, { useRef, useState, useCallback } from 'react';
import { Link, router, useForm } from '@inertiajs/react';
import {
    PackageCheck, Receipt, Settings,
    LogOut, ChevronRight, Shield,
    Bell, MapPin, ArrowLeft, Camera, X,
    User, Check, Loader2, ArrowRight,
    HelpCircle, Edit3, Lock, Eye, EyeOff,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../../hooks/useTranslation';

type Section = 'menu' | 'personal' | 'address' | 'security';

export default function MobileProfileView({ user, logout }: any) {
    const { t } = useTranslation();
    const [activeSection, setActiveSection] = useState<Section>('menu');

    const menuGroups = [
        {
            title: t('nav.account_overview'),
            items: [
                { icon: PackageCheck, label: t('nav.my_orders'), href: '/my-orders', color: 'text-blue-500', bg: 'bg-blue-500/10' },
                { icon: Receipt, label: t('nav.receipts'), href: '/receipts', color: 'text-purple-500', bg: 'bg-purple-500/10' },
                { icon: MapPin, label: t('nav.addresses'), onPress: () => setActiveSection('address'), color: 'text-green-500', bg: 'bg-green-500/10' },
            ],
        },
        {
            title: t('nav.settings_preferences'),
            items: [
                { icon: User, label: t('nav.personal_information'), onPress: () => setActiveSection('personal'), color: 'text-brand-primary', bg: 'bg-brand-primary/10' },
                { icon: Settings, label: t('nav.app_settings'), href: '/settings', color: 'text-gray-700 dark:text-gray-300', bg: 'bg-gray-200 dark:bg-gray-800' },
                { icon: Bell, label: t('nav.notifications'), href: '/notifications', color: 'text-orange-500', bg: 'bg-orange-500/10' },
                { icon: Shield, label: t('nav.security'), onPress: () => setActiveSection('security'), color: 'text-teal-500', bg: 'bg-teal-500/10' },
            ],
        },
        {
            title: t('nav.support_section'),
            items: [
                { icon: HelpCircle, label: t('nav.contact_support'), href: '/contact', color: 'text-rose-500', bg: 'bg-rose-500/10' },
            ],
        },
    ];

    const handleDragEnd = (e: any, { offset, velocity }: any) => {
        // If swiped right by more than 100px or flicked right with velocity
        if (offset.x > 100 || velocity.x > 500) {
            setActiveSection('menu');
        }
    };

    const dragProps = {
        drag: "x" as const,
        dragConstraints: { left: 0, right: 0 },
        dragElastic: { left: 0, right: 0.5 },
        onDragEnd: handleDragEnd,
        // The drag direction lock prevents the drag from interfering with vertical scrolling
        dragDirectionLock: true,
    };

    return (
        <AnimatePresence mode="wait">
            {activeSection === 'menu' && (
                <motion.div key="menu" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.18 }}>
                    <MenuView user={user} logout={logout} menuGroups={menuGroups} onEditProfile={() => setActiveSection('personal')} />
                </motion.div>
            )}
            {activeSection === 'personal' && (
                <motion.div key="personal" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.18 }} {...dragProps}>
                    <PersonalInfoView user={user} onBack={() => setActiveSection('menu')} />
                </motion.div>
            )}
            {activeSection === 'address' && (
                <motion.div key="address" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.18 }} {...dragProps}>
                    <AddressView user={user} onBack={() => setActiveSection('menu')} />
                </motion.div>
            )}
            {activeSection === 'security' && (
                <motion.div key="security" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.18 }} {...dragProps}>
                    <SecurityView user={user} onBack={() => setActiveSection('menu')} />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

/* ─── MENU ─── */
function MenuView({ user, logout, menuGroups, onEditProfile }: any) {
    const { t } = useTranslation();
    const avatarInput = useRef<HTMLInputElement>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setAvatarPreview(URL.createObjectURL(file));
            setIsUploading(true);
            const formData = new FormData();
            formData.append('avatar', file);
            router.post('/profile/avatar', formData as any, {
                preserveScroll: true,
                onFinish: () => setIsUploading(false),
                onSuccess: () => setAvatarPreview(null),
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-28">
            {/* Hero Header */}
            <div className="bg-brand-primary pb-12 rounded-b-[2.5rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />
                <div className="px-5 pt-12 flex justify-between items-center relative z-10">
                    <Link href="/" className="w-12 h-12 flex items-center justify-center rounded-full bg-black/10 text-white hover:bg-black/20 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <button onClick={logout} className="w-12 h-12 flex items-center justify-center rounded-full bg-black/10 text-white hover:bg-red-500/80 transition-colors">
                        <LogOut className="w-4 h-4 ml-0.5" />
                    </button>
                </div>
                <div className="px-5 mt-5 relative z-10 flex flex-col items-center text-center">
                    <div className="relative mb-3">
                        <button onClick={() => avatarInput.current?.click()} className="relative w-24 h-24 rounded-full border-4 border-white/30 overflow-hidden bg-white/10 flex items-center justify-center text-white font-bold text-3xl shadow-xl group">
                            {isUploading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10">
                                    <Loader2 className="w-7 h-7 animate-spin text-white" />
                                </div>
                            )}
                            {avatarPreview ? (
                                <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                            ) : user?.avatar ? (
                                <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                <span>{user?.name?.charAt(0)?.toUpperCase() || 'U'}</span>
                            )}
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Camera className="w-6 h-6 text-white" />
                            </div>
                        </button>
                        <button onClick={() => avatarInput.current?.click()} className="absolute bottom-0 right-0 w-8 h-8 bg-white text-brand-primary rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                            <Camera className="w-4 h-4" />
                        </button>
                        <input type="file" ref={avatarInput} className="hidden" accept="image/*" onChange={handleAvatarChange} />
                    </div>
                    <h1 className="text-2xl font-black text-white">{user?.name}</h1>
                    <p className="text-white/80 text-sm font-medium mt-1">{user?.email}</p>
                    {user?.customer_code && (
                        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-black/20 rounded-full border border-white/10">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                            <span className="text-xs font-bold text-white uppercase tracking-wider">{user.customer_code}</span>
                        </div>
                    )}
                    <button onClick={onEditProfile} className="mt-4 flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-white text-sm font-bold border border-white/30 hover:bg-white/30 transition-colors">
                        <Edit3 className="w-3.5 h-3.5" /> {t('profile.personal_details')}
                    </button>
                </div>
            </div>

            {/* Menu Sections */}
            <div className="px-5 mt-6 space-y-5">
                {menuGroups.map((group: any, i: number) => (
                    <motion.div key={group.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                        <h2 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-2 ml-1">{group.title}</h2>
                        <div className="bg-white dark:bg-gray-900 rounded-[20px] shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                            {group.items.map((item: any, j: number) => {
                                const inner = (
                                    <div className="flex items-center justify-between w-full px-4 py-3.5 pointer-events-none">
                                        <div className="flex items-center gap-4 flex-1">
                                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${item.bg} ${item.color}`}>
                                                <item.icon className="w-5 h-5" />
                                            </div>
                                            <span className="font-bold text-gray-900 dark:text-white">{item.label}</span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600 flex-shrink-0" />
                                    </div>
                                );
                                const rowClass = `relative block w-full text-left cursor-pointer touch-manipulation active:bg-gray-50 dark:active:bg-gray-800 transition-colors ${j !== group.items.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}`;
                                if (item.href) {
                                    return <Link key={item.label} href={item.href} className={rowClass}>{inner}</Link>;
                                }
                                return <button key={item.label} type="button" onClick={item.onPress} className={rowClass}>{inner}</button>;
                            })}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="px-5 mt-8">
                <button onClick={logout} className="w-full bg-red-50 dark:bg-red-500/10 text-red-500 font-bold py-4 rounded-2xl border border-red-100 dark:border-red-500/20 hover:bg-red-100 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                    <LogOut className="w-5 h-5" /> {t('nav.logout')}
                </button>
            </div>
        </div>
    );
}

/* ─── PERSONAL INFO ─── */
function PersonalInfoView({ user, onBack }: { user: any; onBack: () => void }) {
    const { t } = useTranslation();
    const { data, setData, put, errors, processing, recentlySuccessful } = useForm({
        name: user.name || '',
        email: user.email || '',
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

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put('/profile', { preserveScroll: true });
    };

    const inputClass = 'w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 focus:outline-none transition-all';

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-28">
            <div className="sticky top-0 z-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center gap-3">
                <button type="button" onClick={onBack} className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-lg font-black text-gray-900 dark:text-white">{t('nav.personal_information')}</h1>
            </div>

            <form onSubmit={submit} className="px-5 pt-6 space-y-5">
                <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">{t('profile.full_name', 'Full Name')}</label>
                    <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className={inputClass} required />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">{t('profile.login_email', 'Login Email')}</label>
                    <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className={inputClass} />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Contact Email</label>
                    <input type="email" value={data.contact_email} onChange={e => setData('contact_email', e.target.value)} className={inputClass} placeholder="Preferred contact email" />
                    {errors.contact_email && <p className="text-xs text-red-500 mt-1">{errors.contact_email}</p>}
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Phone Number</label>
                    <input type="text" value={data.phone_e164} onChange={e => setData('phone_e164', e.target.value)} placeholder="+85512345678" className={inputClass} />
                    {errors.phone_e164 && <p className="text-xs text-red-500 mt-1">{errors.phone_e164}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Telegram</label>
                        <input type="text" value={data.telegram_username} onChange={e => setData('telegram_username', e.target.value)} placeholder="@username" className={inputClass} />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">WhatsApp</label>
                        <input type="text" value={data.whatsapp_number} onChange={e => setData('whatsapp_number', e.target.value)} placeholder="+855..." className={inputClass} />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Language</label>
                        <select value={data.preferred_locale} onChange={e => setData('preferred_locale', e.target.value)} className={inputClass}>
                            <option value="km">ភាសាខ្មែរ</option>
                            <option value="en">English</option>
                            <option value="vi">Tiếng Việt</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Currency</label>
                        <select value={data.preferred_currency} onChange={e => setData('preferred_currency', e.target.value)} className={inputClass}>
                            <option value="USD">USD</option>
                            <option value="VND">VND</option>
                        </select>
                    </div>
                </div>

                {recentlySuccessful && (
                    <div className="flex items-center gap-2 text-green-600 text-sm font-bold bg-green-50 dark:bg-green-900/20 rounded-xl px-4 py-3">
                        <Check className="w-4 h-4" /> Saved successfully!
                    </div>
                )}

                <button type="submit" disabled={processing} className="w-full py-4 rounded-2xl bg-brand-primary text-white font-black text-sm disabled:opacity-50 hover:bg-brand-secondary active:scale-[0.98] transition-all shadow-lg shadow-brand-primary/25">
                    {processing ? <span className="flex items-center justify-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Saving...</span> : 'Save Changes'}
                </button>
            </form>

        </div>
    );
}

/* ─── ADDRESS ─── */
function AddressView({ user, onBack }: { user: any; onBack: () => void }) {
    const { t } = useTranslation();
    const { data, setData, put, processing, recentlySuccessful } = useForm({
        name: user.name || '',
        contact_email: user.contact_email || '',
        phone_e164: user.phone_e164 || '',
        address_line_1: user.address_line_1 || '',
        address_line_2: user.address_line_2 || '',
        city: user.city || '',
        province: user.province || '',
        postal_code: user.postal_code || '',
        country_code: user.country_code || 'KH',
        address_notes: user.address_notes || '',
        preferred_locale: user.preferred_locale || 'km',
        preferred_currency: user.preferred_currency || 'USD',
        telegram_username: user.telegram_username || '',
        whatsapp_number: user.whatsapp_number || '',
    });

    const submit = (e: React.FormEvent) => { e.preventDefault(); put('/profile', { preserveScroll: true }); };
    const inputClass = 'w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 focus:outline-none transition-all';
    const labelClass = 'block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider';

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-28">
            <div className="sticky top-0 z-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center gap-3">
                <button type="button" onClick={onBack} className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-lg font-black text-gray-900 dark:text-white">{t('nav.addresses', 'Address & Delivery')}</h1>
            </div>
            <form onSubmit={submit} className="px-5 pt-6 space-y-4">
                <div>
                    <label className={labelClass}>{t('profile.address_line_1', 'Address Line 1')}</label>
                    <input value={data.address_line_1} onChange={e => setData('address_line_1', e.target.value)} placeholder="e.g. 123 Main Street" className={inputClass} />
                </div>
                <div>
                    <label className={labelClass}>{t('profile.address_line_2', 'Address Line 2')}</label>
                    <input value={data.address_line_2} onChange={e => setData('address_line_2', e.target.value)} placeholder="Apt, Suite, Floor (optional)" className={inputClass} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className={labelClass}>{t('profile.city', 'City')}</label>
                        <input value={data.city} onChange={e => setData('city', e.target.value)} placeholder="Phnom Penh" className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>{t('nav.province', 'Province')}</label>
                        <input value={data.province} onChange={e => setData('province', e.target.value)} placeholder="Phnom Penh" className={inputClass} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className={labelClass}>{t('profile.postal_code', 'Postal Code')}</label>
                        <input value={data.postal_code} onChange={e => setData('postal_code', e.target.value)} placeholder="12000" className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>{t('profile.country', 'Country Code')}</label>
                        <input value={data.country_code} onChange={e => setData('country_code', e.target.value.toUpperCase())} placeholder="KH" maxLength={2} className={inputClass} />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className={labelClass}>Telegram</label>
                        <input value={data.telegram_username} onChange={e => setData('telegram_username', e.target.value)} placeholder="@username" className={inputClass} />
                    </div>
                    <div>
                        <label className={labelClass}>WhatsApp</label>
                        <input value={data.whatsapp_number} onChange={e => setData('whatsapp_number', e.target.value)} placeholder="+855..." className={inputClass} />
                    </div>
                </div>
                <div>
                    <label className={labelClass}>{t('profile.address_notes', 'Address Notes')}</label>
                    <textarea value={data.address_notes} onChange={e => setData('address_notes', e.target.value)} placeholder="Special delivery instructions..." rows={3} className={`${inputClass} resize-none`} />
                </div>
                {recentlySuccessful && (
                    <div className="flex items-center gap-2 text-green-600 text-sm font-bold bg-green-50 dark:bg-green-900/20 rounded-xl px-4 py-3">
                        <Check className="w-4 h-4" /> Saved successfully!
                    </div>
                )}
                <button type="submit" disabled={processing} className="w-full py-4 rounded-2xl bg-brand-primary text-white font-black text-sm disabled:opacity-50 hover:bg-brand-secondary active:scale-[0.98] transition-all shadow-lg shadow-brand-primary/25">
                    {processing ? <span className="flex items-center justify-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> {t('profile.saving', 'Saving...')}</span> : t('profile.save_continue', 'Save Address')}
                </button>
            </form>
        </div>
    );
}

/* ─── SECURITY ─── */
function SecurityView({ user, onBack }: { user: any; onBack: () => void }) {
    const { t } = useTranslation();
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [showOldPw, setShowOldPw] = useState(false);
    const [showNewPw, setShowNewPw] = useState(false);
    const [showConfirmPw, setShowConfirmPw] = useState(false);
    const [pwSuccess, setPwSuccess] = useState(false);
    const [pwError, setPwError] = useState('');

    const { data, setData, post, processing, reset } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        setPwError('');
        if (data.password !== data.password_confirmation) {
            setPwError('New passwords do not match.');
            return;
        }
        if (data.password.length < 8) {
            setPwError('Password must be at least 8 characters.');
            return;
        }
        post('/profile/password', {
            preserveScroll: true,
            onSuccess: () => {
                setPwSuccess(true);
                reset();
                setTimeout(() => { setPwSuccess(false); setShowPasswordForm(false); }, 2000);
            },
            onError: (errors: any) => {
                setPwError(errors.current_password || errors.password || 'Failed to change password.');
            },
        });
    };

    const inputClass = 'w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 focus:outline-none transition-all pr-12';

    const isGoogle = user.authentication_provider === 'google';

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-28">
            <div className="sticky top-0 z-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center gap-3">
                <button type="button" onClick={onBack} className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-lg font-black text-gray-900 dark:text-white">{t('nav.security', 'Security')}</h1>
            </div>
            <div className="px-5 pt-6 space-y-4">
                {/* Sign-in provider info */}
                <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl p-5">
                    <p className="font-bold text-blue-900 dark:text-white">Sign-in Provider</p>
                    <p className="mt-1 text-sm text-blue-700 dark:text-blue-200">
                        Your account is secured via <strong>{isGoogle ? 'Google' : 'Email & Password'}</strong>.
                    </p>
                </div>

                {/* Account Details */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                    <div className="px-5 py-3 border-b border-gray-100 dark:border-gray-800">
                        <p className="text-xs font-black uppercase tracking-wider text-gray-400">Account Details</p>
                    </div>
                    <dl className="divide-y divide-gray-100 dark:divide-gray-800">
                        {[
                            { label: t('profile.login_email', 'Login Email'), value: user.email },
                            { label: t('profile.customer_id', 'Customer ID'), value: user.customer_code || 'Pending', mono: true },
                            { label: 'Last Login', value: user.last_login_at ? new Date(user.last_login_at).toLocaleDateString() : 'Not recorded' },
                        ].map(row => (
                            <div key={row.label} className="flex justify-between items-center px-5 py-4">
                                <dt className="text-sm font-bold text-gray-700 dark:text-gray-300">{row.label}</dt>
                                <dd className={`text-sm text-gray-500 dark:text-gray-400 text-right truncate max-w-[10rem] ${row.mono ? 'font-mono text-brand-primary font-black' : ''}`}>{row.value}</dd>
                            </div>
                        ))}
                        <div className="flex justify-between items-center px-5 py-4">
                            <dt className="text-sm font-bold text-gray-700 dark:text-gray-300">Email Status</dt>
                            <dd>
                                {user.email_verified_at ? (
                                    <span className="inline-flex items-center gap-1 text-xs font-bold text-green-700 bg-green-100 dark:bg-green-900/30 dark:text-green-300 px-2.5 py-1 rounded-full">
                                        <Check className="w-3 h-3" /> Verified
                                    </span>
                                ) : (
                                    <span className="text-xs font-bold text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300 px-2.5 py-1 rounded-full">Not verified</span>
                                )}
                            </dd>
                        </div>
                    </dl>
                </div>

                {/* Google Account Security */}
                {isGoogle && (
                    <a href="https://myaccount.google.com/security" target="_blank" rel="noreferrer"
                        className="block w-full text-left bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <div className="flex items-center justify-between w-full px-5 py-4">
                            <span className="text-sm font-bold text-gray-900 dark:text-white">Manage Google Account Security</span>
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                        </div>
                    </a>
                )}

                {/* Request Account Help */}
                <Link href="/contact"
                    className="block w-full text-left bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-center justify-between w-full px-5 py-4">
                        <span className="text-sm font-bold text-gray-900 dark:text-white">Request Account Help</span>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                </Link>

                {/* Change / Reset Password */}
                {!isGoogle && (
                    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden">
                        <button
                            type="button"
                            onClick={() => { setShowPasswordForm(v => !v); setPwError(''); setPwSuccess(false); }}
                            className="flex items-center justify-between w-full px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-teal-500/10 flex items-center justify-center">
                                    <Lock className="w-4 h-4 text-teal-500" />
                                </div>
                                <span className="text-sm font-bold text-gray-900 dark:text-white">Change / Reset Password</span>
                            </div>
                            <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${showPasswordForm ? 'rotate-90' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {showPasswordForm && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                >
                                    <form onSubmit={handlePasswordChange} className="px-5 pb-5 space-y-4 border-t border-gray-100 dark:border-gray-800 pt-4">
                                        {/* Old password */}
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Current Password</label>
                                            <div className="relative">
                                                <input
                                                    type={showOldPw ? 'text' : 'password'}
                                                    value={data.current_password}
                                                    onChange={e => setData('current_password', e.target.value)}
                                                    placeholder="Enter current password"
                                                    className={inputClass}
                                                    required
                                                    autoComplete="current-password"
                                                />
                                                <button type="button" onClick={() => setShowOldPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                                    {showOldPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </div>
                                        {/* New password */}
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">New Password</label>
                                            <div className="relative">
                                                <input
                                                    type={showNewPw ? 'text' : 'password'}
                                                    value={data.password}
                                                    onChange={e => setData('password', e.target.value)}
                                                    placeholder="At least 8 characters"
                                                    className={inputClass}
                                                    required
                                                    autoComplete="new-password"
                                                />
                                                <button type="button" onClick={() => setShowNewPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                                    {showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </div>
                                        {/* Confirm password */}
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Confirm New Password</label>
                                            <div className="relative">
                                                <input
                                                    type={showConfirmPw ? 'text' : 'password'}
                                                    value={data.password_confirmation}
                                                    onChange={e => setData('password_confirmation', e.target.value)}
                                                    placeholder="Repeat new password"
                                                    className={inputClass}
                                                    required
                                                    autoComplete="new-password"
                                                />
                                                <button type="button" onClick={() => setShowConfirmPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                                    {showConfirmPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Errors / Success */}
                                        {pwError && (
                                            <div className="flex items-start gap-2 text-red-600 text-sm bg-red-50 dark:bg-red-900/20 rounded-xl px-4 py-3">
                                                <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                                <span>{pwError}</span>
                                            </div>
                                        )}
                                        {pwSuccess && (
                                            <div className="flex items-center gap-2 text-green-600 text-sm font-bold bg-green-50 dark:bg-green-900/20 rounded-xl px-4 py-3">
                                                <Check className="w-4 h-4" /> Password changed successfully!
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full py-3.5 rounded-2xl bg-brand-primary text-white font-black text-sm disabled:opacity-50 hover:bg-brand-secondary active:scale-[0.98] transition-all shadow-lg shadow-brand-primary/25"
                                        >
                                            {processing ? <span className="flex items-center justify-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Changing...</span> : 'Change Password'}
                                        </button>

                                        {/* Forgot password note */}
                                        <p className="text-xs text-center text-gray-500 dark:text-gray-400 leading-relaxed">
                                            Forgot your password? Please{' '}
                                            <Link href="/contact" className="text-brand-primary font-bold underline underline-offset-2">contact our admin</Link>{' '}
                                            for assistance.
                                        </p>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}

                {/* For Google users: no password to change */}
                {isGoogle && (
                    <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl px-5 py-4">
                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed text-center">
                            You sign in via Google. To change your password, manage it from your{' '}
                            <a href="https://myaccount.google.com/security" target="_blank" rel="noreferrer" className="text-brand-primary font-bold underline underline-offset-2">Google Account</a>.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
