import React, { useRef, useState } from 'react';
import { Link, router, useForm } from '@inertiajs/react';
import {
    PackageCheck, Receipt, Settings,
    LogOut, ChevronRight, Shield,
    Bell, MapPin, ArrowLeft, Camera, X,
    User, Check, Loader2, ArrowRight,
    HelpCircle, Edit3,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Section = 'menu' | 'personal' | 'address' | 'security';

export default function MobileProfileView({ user, logout }: any) {
    const [activeSection, setActiveSection] = useState<Section>('menu');

    const menuGroups = [
        {
            title: 'My Account',
            items: [
                { icon: PackageCheck, label: 'My Orders', href: '/my-orders', color: 'text-blue-500', bg: 'bg-blue-500/10' },
                { icon: Receipt, label: 'My Receipts', href: '/receipts', color: 'text-purple-500', bg: 'bg-purple-500/10' },
                { icon: MapPin, label: 'Addresses', onPress: () => setActiveSection('address'), color: 'text-green-500', bg: 'bg-green-500/10' },
            ],
        },
        {
            title: 'Settings & Preferences',
            items: [
                { icon: User, label: 'Personal Info', onPress: () => setActiveSection('personal'), color: 'text-brand-primary', bg: 'bg-brand-primary/10' },
                { icon: Settings, label: 'App Settings', href: '/settings', color: 'text-gray-700 dark:text-gray-300', bg: 'bg-gray-200 dark:bg-gray-800' },
                { icon: Bell, label: 'Notifications', href: '/notifications', color: 'text-orange-500', bg: 'bg-orange-500/10' },
                { icon: Shield, label: 'Security', onPress: () => setActiveSection('security'), color: 'text-teal-500', bg: 'bg-teal-500/10' },
            ],
        },
        {
            title: 'Support',
            items: [
                { icon: HelpCircle, label: 'Contact Support', href: '/contact', color: 'text-rose-500', bg: 'bg-rose-500/10' },
            ],
        },
    ];

    return (
        <AnimatePresence mode="wait">
            {activeSection === 'menu' && (
                <motion.div key="menu" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.18 }}>
                    <MenuView user={user} logout={logout} menuGroups={menuGroups} onEditProfile={() => setActiveSection('personal')} />
                </motion.div>
            )}
            {activeSection === 'personal' && (
                <motion.div key="personal" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.18 }}>
                    <PersonalInfoView user={user} onBack={() => setActiveSection('menu')} />
                </motion.div>
            )}
            {activeSection === 'address' && (
                <motion.div key="address" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.18 }}>
                    <AddressView user={user} onBack={() => setActiveSection('menu')} />
                </motion.div>
            )}
            {activeSection === 'security' && (
                <motion.div key="security" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.18 }}>
                    <SecurityView user={user} onBack={() => setActiveSection('menu')} />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

/* ─── MENU ─── */
function MenuView({ user, logout, menuGroups, onEditProfile }: any) {
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
                        <Edit3 className="w-3.5 h-3.5" /> Edit Profile
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
                                    <>
                                        <div className="flex items-center gap-4 flex-1">
                                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${item.bg} ${item.color}`}>
                                                <item.icon className="w-5 h-5" />
                                            </div>
                                            <span className="font-bold text-gray-900 dark:text-white">{item.label}</span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-300 dark:text-gray-600 flex-shrink-0" />
                                    </>
                                );
                                const rowClass = `w-full flex items-center justify-between px-4 py-3.5 active:bg-gray-50 dark:active:bg-gray-800 transition-colors ${j !== group.items.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}`;
                                if (item.href) {
                                    return <Link key={item.label} href={item.href} className={rowClass}>{inner}</Link>;
                                }
                                return <button key={item.label} type="button" onClick={item.onPress} className={`${rowClass} text-left`}>{inner}</button>;
                            })}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="px-5 mt-8">
                <button onClick={logout} className="w-full bg-red-50 dark:bg-red-500/10 text-red-500 font-bold py-4 rounded-2xl border border-red-100 dark:border-red-500/20 hover:bg-red-100 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                    <LogOut className="w-5 h-5" /> Sign Out
                </button>
            </div>
        </div>
    );
}

/* ─── PERSONAL INFO ─── */
function PersonalInfoView({ user, onBack }: { user: any; onBack: () => void }) {
    const { data, setData, put, errors, processing, recentlySuccessful } = useForm({
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
        preferred_locale: user.preferred_locale || user.preferred_language || 'km',
        preferred_currency: user.preferred_currency === 'VND' ? 'VND' : 'USD',
        telegram_username: user.telegram_username || '',
        whatsapp_number: user.whatsapp_number || '',
    });

    const [isChangingEmail, setIsChangingEmail] = useState(false);
    const [newEmail, setNewEmail] = useState('');
    const [showEmailPinModal, setShowEmailPinModal] = useState(false);
    const [emailPin, setEmailPin] = useState('');
    const [isSendingPin, setIsSendingPin] = useState(false);
    const [isVerifyingPin, setIsVerifyingPin] = useState(false);

    const sendEmailPin = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newEmail || newEmail === user.email) return;
        setIsSendingPin(true);
        router.post('/profile/send-pin', { new_email: newEmail }, {
            preserveScroll: true,
            onSuccess: () => setShowEmailPinModal(true),
            onFinish: () => setIsSendingPin(false),
        });
    };

    const verifyEmailPin = (e: React.FormEvent) => {
        e.preventDefault();
        if (emailPin.length !== 6) return;
        setIsVerifyingPin(true);
        router.post('/profile/verify-pin', { pin: emailPin }, {
            preserveScroll: true,
            onSuccess: () => { setShowEmailPinModal(false); setIsChangingEmail(false); setNewEmail(''); setEmailPin(''); },
            onFinish: () => setIsVerifyingPin(false),
        });
    };

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
                <h1 className="text-lg font-black text-gray-900 dark:text-white">Personal Information</h1>
            </div>

            <form onSubmit={submit} className="px-5 pt-6 space-y-5">
                <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Full Name</label>
                    <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className={inputClass} required />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">Login Email</label>
                    {!isChangingEmail ? (
                        <div className="flex gap-2">
                            <input type="email" value={user.email} disabled className={`${inputClass} flex-1 opacity-60 cursor-not-allowed`} />
                            <button type="button" onClick={() => setIsChangingEmail(true)} className="px-4 py-3 text-sm font-bold bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition text-gray-700 dark:text-gray-300 flex-shrink-0">Change</button>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <div className="flex gap-2">
                                <input type="email" placeholder="New email address" value={newEmail} onChange={e => setNewEmail(e.target.value)} className={`${inputClass} flex-1 !border-brand-primary`} />
                                <button type="button" onClick={sendEmailPin} disabled={!newEmail || newEmail === user.email || isSendingPin} className="px-4 py-3 text-sm font-bold bg-brand-primary text-white rounded-xl disabled:opacity-50 flex-shrink-0">
                                    {isSendingPin ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send PIN'}
                                </button>
                                <button type="button" onClick={() => setIsChangingEmail(false)} className="w-11 h-11 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                                    <X className="w-4 h-4 text-gray-500" />
                                </button>
                            </div>
                            {errors.new_email && (
                                <p className="text-xs text-red-500 mt-1 font-bold">{errors.new_email}</p>
                            )}
                            <p className="text-xs text-gray-400">We'll send a 6-digit code to confirm your new email.</p>
                        </div>
                    )}
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

            {/* Email PIN Modal */}
            {showEmailPinModal && (
                <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="w-full sm:max-w-md bg-white dark:bg-gray-900 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl">
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <h3 className="text-lg font-black text-gray-900 dark:text-white">Verify New Email</h3>
                                <p className="text-sm text-gray-500 mt-0.5">Code sent to <strong>{newEmail}</strong></p>
                            </div>
                            <button onClick={() => setShowEmailPinModal(false)} className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                                <X className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>
                        <form onSubmit={verifyEmailPin}>
                            <input type="text" maxLength={6} value={emailPin} onChange={e => setEmailPin(e.target.value.replace(/\D/g, ''))} placeholder="000000"
                                className="w-full text-center text-3xl tracking-[0.5em] font-mono bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-primary outline-none mb-4"
                                required autoFocus />
                            {errors.pin && (
                                <p className="text-sm font-bold text-red-500 mb-3 text-center">{errors.pin}</p>
                            )}
                            <button type="submit" disabled={emailPin.length !== 6 || isVerifyingPin} className="w-full py-4 rounded-2xl bg-brand-primary text-white font-black disabled:opacity-50">
                                {isVerifyingPin ? 'Verifying...' : 'Verify & Save Email'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

/* ─── ADDRESS ─── */
function AddressView({ user, onBack }: { user: any; onBack: () => void }) {
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

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-28">
            <div className="sticky top-0 z-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center gap-3">
                <button type="button" onClick={onBack} className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-lg font-black text-gray-900 dark:text-white">Address & Delivery</h1>
            </div>
            <form onSubmit={submit} className="px-5 pt-6 space-y-4">
                <input value={data.address_line_1} onChange={e => setData('address_line_1', e.target.value)} placeholder="Address line 1" className={inputClass} />
                <input value={data.address_line_2} onChange={e => setData('address_line_2', e.target.value)} placeholder="Address line 2" className={inputClass} />
                <div className="grid grid-cols-2 gap-3">
                    <input value={data.city} onChange={e => setData('city', e.target.value)} placeholder="City" className={inputClass} />
                    <input value={data.province} onChange={e => setData('province', e.target.value)} placeholder="Province" className={inputClass} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <input value={data.postal_code} onChange={e => setData('postal_code', e.target.value)} placeholder="Postal code" className={inputClass} />
                    <input value={data.country_code} onChange={e => setData('country_code', e.target.value.toUpperCase())} placeholder="KH" maxLength={2} className={inputClass} />
                </div>
                <textarea value={data.address_notes} onChange={e => setData('address_notes', e.target.value)} placeholder="Delivery notes (gate code, landmarks…)" rows={3} className={`${inputClass} resize-none`} />
                {recentlySuccessful && (
                    <div className="flex items-center gap-2 text-green-600 text-sm font-bold bg-green-50 dark:bg-green-900/20 rounded-xl px-4 py-3">
                        <Check className="w-4 h-4" /> Address saved!
                    </div>
                )}
                <button type="submit" disabled={processing} className="w-full py-4 rounded-2xl bg-brand-primary text-white font-black text-sm disabled:opacity-50 hover:bg-brand-secondary active:scale-[0.98] transition-all shadow-lg shadow-brand-primary/25">
                    {processing ? <span className="flex items-center justify-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Saving...</span> : 'Save Address'}
                </button>
            </form>
        </div>
    );
}

/* ─── SECURITY ─── */
function SecurityView({ user, onBack }: { user: any; onBack: () => void }) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-28">
            <div className="sticky top-0 z-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center gap-3">
                <button type="button" onClick={onBack} className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-lg font-black text-gray-900 dark:text-white">Security</h1>
            </div>
            <div className="px-5 pt-6 space-y-4">
                <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl p-5">
                    <p className="font-bold text-blue-900 dark:text-blue-100">Sign-in Provider</p>
                    <p className="mt-1 text-sm text-blue-700 dark:text-blue-200">
                        Your account is secured via <strong>{user.authentication_provider === 'google' ? 'Google' : 'Email & Password'}</strong>.
                    </p>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                    <div className="px-5 py-3 border-b border-gray-100 dark:border-gray-800">
                        <p className="text-xs font-black uppercase tracking-wider text-gray-400">Account Details</p>
                    </div>
                    <dl className="divide-y divide-gray-100 dark:divide-gray-800">
                        {[
                            { label: 'Login Email', value: user.email },
                            { label: 'Customer ID', value: user.customer_code || 'Pending', mono: true },
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
                {[
                    user.authentication_provider === 'google' && { label: 'Manage Google Account Security', href: 'https://myaccount.google.com/security', external: true },
                    { label: 'Request Account Help', href: '/contact' },
                    { label: 'Change / Reset Password', href: '/forgot-password' },
                ].filter(Boolean).map((item: any) => (
                    item.external ? (
                        <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="w-full flex items-center justify-between px-5 py-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            <span className="text-sm font-bold text-gray-900 dark:text-white">{item.label}</span>
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                        </a>
                    ) : (
                        <Link key={item.label} href={item.href} className="w-full flex items-center justify-between px-5 py-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            <span className="text-sm font-bold text-gray-900 dark:text-white">{item.label}</span>
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                        </Link>
                    )
                ))}
            </div>
        </div>
    );
}
