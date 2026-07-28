import { FormEvent, useState, useEffect } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { ArrowLeft, CheckCircle2, LockKeyhole, MapPin, Save, UserRound, Loader2 } from 'lucide-react';
import MainLayout from '../../Layouts/MainLayout';
import { useTranslation } from '../../hooks/useTranslation';

type Props = {
    auth: any;
    missingFields?: Record<string, string>;
    isManualOrderGate?: boolean;
    canSkip?: boolean;
};

export default function CompleteProfile({ auth, missingFields = {}, isManualOrderGate = false, canSkip = true }: Props) {
    const { t, i18n } = useTranslation();
    const user = auth?.user || {};
    
    // UI Data Lists
    const PROVINCES = [
        { en: 'Banteay Meanchey', km: 'បន្ទាយមានជ័យ' }, { en: 'Battambang', km: 'បាត់ដំបង' },
        { en: 'Kampong Cham', km: 'កំពង់ចាម' }, { en: 'Kampong Chhnang', km: 'កំពង់ឆ្នាំង' },
        { en: 'Kampong Speu', km: 'កំពង់ស្ពឺ' }, { en: 'Kampong Thom', km: 'កំពង់ធំ' },
        { en: 'Kampot', km: 'កំពត' }, { en: 'Kandal', km: 'កណ្តាល' }, { en: 'Kep', km: 'កែប' },
        { en: 'Koh Kong', km: 'កោះកុង' }, { en: 'Kratie', km: 'ក្រចេះ' }, { en: 'Mondulkiri', km: 'មណ្ឌលគិរី' },
        { en: 'Oddar Meanchey', km: 'ឧត្តរមានជ័យ' }, { en: 'Pailin', km: 'ប៉ៃលិន' }, { en: 'Phnom Penh', km: 'ភ្នំពេញ' },
        { en: 'Preah Sihanouk', km: 'ព្រះសីហនុ' }, { en: 'Preah Vihear', km: 'ព្រះវិហារ' }, { en: 'Prey Veng', km: 'ព្រៃវែង' },
        { en: 'Pursat', km: 'ពោធិ៍សាត់' }, { en: 'Ratanakiri', km: 'រតនគិរី' }, { en: 'Siem Reap', km: 'សៀមរាប' },
        { en: 'Stung Treng', km: 'ស្ទឹងត្រែង' }, { en: 'Svay Rieng', km: 'ស្វាយរៀង' }, { en: 'Takeo', km: 'តាកែវ' },
        { en: 'Tboung Khmum', km: 'ត្បូងឃ្មុំ' }
    ];

    const COUNTRIES = [
        { code: 'KH', en: 'Cambodia', km: 'កម្ពុជា' },
        { code: 'VN', en: 'Vietnam', km: 'វៀតណាម' },
        { code: 'LA', en: 'Laos', km: 'ឡាវ' }
    ];

    // Phone parsing helpers
    const parsePhone = (phoneStr: string) => {
        if (!phoneStr) return { code: '+855', num: '' };
        if (phoneStr.startsWith('+84')) return { code: '+84', num: phoneStr.substring(3).replace(/^0+/, '') };
        if (phoneStr.startsWith('+856')) return { code: '+856', num: phoneStr.substring(4).replace(/^0+/, '') };
        if (phoneStr.startsWith('+855')) return { code: '+855', num: phoneStr.substring(4).replace(/^0+/, '') };
        return { code: '+855', num: phoneStr.replace(/^0+/, '') };
    };

    const initialPhone = parsePhone(user.phone_e164);
    const initialWhatsapp = parsePhone(user.whatsapp_number);
    const [phoneCode, setPhoneCode] = useState(initialPhone.code);
    const [phoneNum, setPhoneNum] = useState(initialPhone.num);
    const [whatsappCode, setWhatsappCode] = useState(initialWhatsapp.code);
    const [whatsappNum, setWhatsappNum] = useState(initialWhatsapp.num);

    const { data, setData, post, processing, errors, recentlySuccessful, hasErrors } = useForm({
        name: user.name || '',
        phone_e164: user.phone_e164 || '',
        address_line_1: user.address_line_1 || '',
        address_line_2: user.address_line_2 || '',
        city: user.city || user.province || '',
        province: user.province || '',
        postal_code: user.postal_code || '',
        country_code: user.country_code || 'KH',
        address_notes: user.address_notes || '',
        preferred_locale: user.preferred_locale || user.preferred_language || 'km',
        preferred_currency: user.preferred_currency === 'VND' ? 'VND' : 'USD',
        telegram_username: user.telegram_username || '',
        whatsapp_number: user.whatsapp_number || '',
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();
        
        // Update combined phone numbers before submit
        const fullPhone = phoneNum ? `${phoneCode}${phoneNum}` : '';
        const fullWhatsapp = whatsappNum ? `${whatsappCode}${whatsappNum}` : '';
        
        setData(current => ({
            ...current,
            phone_e164: fullPhone,
            whatsapp_number: fullWhatsapp
        }));

        // Allow React state to flush before post
        setTimeout(() => post('/profile/complete'), 0);
    };

    const skip = () => {
        router.post('/profile/complete/skip');
    };

    // Email PIN Verification Flow
    const [isChangingEmail, setIsChangingEmail] = useState(false);
    const [newEmail, setNewEmail] = useState('');
    const [showEmailPinModal, setShowEmailPinModal] = useState(false);
    const [emailPin, setEmailPin] = useState('');
    const [isSendingPin, setIsSendingPin] = useState(false);
    const [isVerifyingPin, setIsVerifyingPin] = useState(false);
    const [pinError, setPinError] = useState('');
    const [pinSuccess, setPinSuccess] = useState(false);
    const [pinCountdown, setPinCountdown] = useState(0);

    useEffect(() => {
        let timer: any;
        if (pinCountdown > 0) {
            timer = setInterval(() => {
                setPinCountdown(prev => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [pinCountdown]);

    const sendEmailPin = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newEmail || newEmail === user.email) return;

        if (pinCountdown > 0) {
            setShowEmailPinModal(true);
            return;
        }

        
        setIsSendingPin(true);
        setPinError('');
        setPinSuccess(false);
        router.post('/profile/send-pin', { new_email: newEmail }, {
            preserveScroll: true,
            onSuccess: () => {
                setShowEmailPinModal(true);
                setPinCountdown(120);
            },
            onFinish: () => setIsSendingPin(false)
        });
    };


    const verifyEmailPin = (e: React.FormEvent) => {
        e.preventDefault();
        if (emailPin.length !== 6) return;

        setIsVerifyingPin(true);
        setPinError('');
        setPinSuccess(false);

        router.post('/profile/verify-pin', { pin: emailPin }, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setPinSuccess(true);
                setTimeout(() => {
                    setShowEmailPinModal(false);
                    setIsChangingEmail(false);
                    setNewEmail('');
                    setEmailPin('');
                    setPinSuccess(false);
                }, 1500);
            },
            onError: (errors) => {
                setPinError(errors.pin || 'Wrong PIN, please try again.');
            },
            onFinish: () => setIsVerifyingPin(false)
        });
    };

    const inputClassName = "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-950 placeholder:text-gray-400 transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 dark:border-gray-800 dark:bg-gray-950 dark:text-white dark:focus:border-brand-primary";

    const missingList = Object.values(missingFields);
    const completedCount = Math.max(0, 8 - missingList.length);
    const progress = Math.round((completedCount / 8) * 100);

    return (
        <MainLayout title={t('profile.complete_title')}>
            <Head title={t('profile.complete_title')} />

            <div className="bg-gray-50 py-8 dark:bg-gray-950 sm:py-12">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-6 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-6">
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex items-start gap-4">
                                <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-3xl bg-brand-primary/10 text-brand-primary">
                                    {user.avatar || user.avatar_path ? (
                                        <img src={user.avatar || user.avatar_path} alt="" className="h-full w-full object-cover" />
                                    ) : (
                                        <UserRound className="h-8 w-8" />
                                    )}
                                </span>
                                <div>
                                    <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-primary">
                                        {isManualOrderGate ? t('profile.manual_order_required') : t('profile.onboarding')}
                                    </p>
                                    <h1 className="mt-2 text-3xl font-black text-gray-950 dark:text-white sm:text-4xl">{t('profile.complete_title')}</h1>
                                    <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-gray-600 dark:text-gray-300">
                                        {isManualOrderGate ? t('profile.manual_order_description') : t('profile.complete_description')}
                                    </p>
                                </div>
                            </div>
                            <div className="min-w-[12rem] rounded-2xl bg-gray-50 p-4 dark:bg-gray-800">
                                <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                    <span>{t('profile.progress')}</span>
                                    <span>{progress}%</span>
                                </div>
                                <div className="mt-3 h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                                    <div className="h-2 rounded-full bg-brand-primary transition-all" style={{ width: `${progress}%` }} />
                                </div>
                            </div>
                        </div>

                        {missingList.length > 0 && (
                            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-bold text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-100">
                                <p>{t('profile.missing_fields')}</p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {missingList.map((field) => (
                                        <span key={field} className="rounded-full bg-white px-3 py-1 text-xs dark:bg-gray-900">{field}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-6">
                            <h2 className="flex items-center gap-2 text-xl font-black text-gray-950 dark:text-white">
                                <UserRound className="h-5 w-5 text-brand-primary" />
                                {t('profile.identity')}
                            </h2>
                            <div className="mt-5 grid gap-5 md:grid-cols-2">
                                <label className="block">
                                    <span className="mb-2 block text-sm font-black text-gray-700 dark:text-gray-200">{t('profile.full_name')} *</span>
                                    <input value={data.name} onChange={event => setData('name', event.target.value)} className={inputClassName} required />
                                    {errors.name && <p className="mt-1 text-xs font-bold text-red-500">{errors.name}</p>}
                                </label>
                                <label className="block md:col-span-2 lg:col-span-1">
                                    <span className="mb-2 block text-sm font-black text-gray-700 dark:text-gray-200">{t('profile.login_email')}</span>
                                    {!isChangingEmail ? (
                                        <div className="flex min-h-[50px] items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm font-bold text-gray-500 dark:border-gray-800 dark:bg-gray-900/50 dark:text-gray-400">
                                            <div className="flex items-center gap-3 truncate">
                                                <LockKeyhole className="h-4 w-4 shrink-0" />
                                                <span className="truncate">{user.email}</span>
                                            </div>
                                            <button 
                                                type="button" 
                                                onClick={() => {
                                                    setIsChangingEmail(true);
                                                    setNewEmail('');
                                                }}
                                                className="ml-4 shrink-0 text-brand-primary hover:text-brand-secondary text-xs uppercase tracking-wider"
                                            >
                                                Change
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex w-full gap-2 transition-all">
                                            <input 
                                                type="email" 
                                                value={newEmail} 
                                                onChange={e => setNewEmail(e.target.value)} 
                                                className={inputClassName}
                                                placeholder="New email" 
                                                autoFocus
                                            />
                                            <button
                                                type="button"
                                                disabled={isSendingPin || !newEmail || newEmail === user.email}
                                                onClick={sendEmailPin}
                                                className="shrink-0 inline-flex min-h-[50px] items-center justify-center rounded-xl bg-gray-900 px-3 text-xs font-bold text-white transition hover:bg-black disabled:opacity-50 dark:bg-white dark:text-black sm:px-4 sm:text-sm"
                                            >
                                                {isSendingPin ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Send PIN'}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setIsChangingEmail(false)}
                                                className="shrink-0 inline-flex min-h-[50px] items-center justify-center rounded-xl border border-gray-200 bg-white px-3 text-xs font-bold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 sm:px-4 sm:text-sm"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                </label>
                                <label className="block">
                                    <span className="mb-2 block text-sm font-black text-gray-700 dark:text-gray-200">{t('profile.customer_id')}</span>
                                    <div className="flex min-h-[50px] items-center rounded-xl border border-gray-200 bg-gray-50 px-4 font-mono text-sm font-black text-brand-primary dark:border-gray-800 dark:bg-gray-900/50">
                                        {user.customer_code || 'Pending'}
                                    </div>
                                </label>
                                <label className="block md:col-span-2">
                                    <span className="mb-2 block text-sm font-black text-gray-700 dark:text-gray-200">{t('profile.phone')} *</span>
                                    <div className="flex shadow-sm rounded-xl">
                                        <select 
                                            value={phoneCode} 
                                            onChange={e => setPhoneCode(e.target.value)}
                                            className="w-[100px] sm:w-[120px] rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 px-3 py-3 text-sm font-semibold text-gray-950 focus:border-brand-primary focus:ring-0 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:focus:border-brand-primary"
                                        >
                                            <option value="+855">🇰🇭 +855</option>
                                            <option value="+84">🇻🇳 +84</option>
                                            <option value="+856">🇱🇦 +856</option>
                                        </select>
                                        <input 
                                            type="tel" 
                                            value={phoneNum} 
                                            onChange={e => setPhoneNum(e.target.value.replace(/\D/g, ''))} 
                                            placeholder="12 345 678" 
                                            className="w-full rounded-r-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-950 placeholder:text-gray-400 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 dark:border-gray-800 dark:bg-gray-950 dark:text-white dark:focus:border-brand-primary"
                                            required 
                                        />
                                    </div>
                                    {errors.phone_e164 && <p className="mt-1 text-xs font-bold text-red-500">{errors.phone_e164}</p>}
                                </label>
                            </div>
                        </section>

                        <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-6">
                            <h2 className="flex items-center gap-2 text-xl font-black text-gray-950 dark:text-white">
                                <MapPin className="h-5 w-5 text-brand-primary" />
                                {t('profile.delivery_details')}
                            </h2>
                            <div className="mt-5 grid gap-5 md:grid-cols-2">
                                <label className="block md:col-span-2">
                                    <span className="mb-2 block text-sm font-black text-gray-700 dark:text-gray-200">{t('profile.address_line_1')} *</span>
                                    <textarea value={data.address_line_1} onChange={event => setData('address_line_1', event.target.value)} rows={3} className={inputClassName} required />
                                    {errors.address_line_1 && <p className="mt-1 text-xs font-bold text-red-500">{errors.address_line_1}</p>}
                                </label>
                                <label className="block">
                                    <span className="mb-2 block text-sm font-black text-gray-700 dark:text-gray-200">{t('profile.address_line_2')}</span>
                                    <input value={data.address_line_2} onChange={event => setData('address_line_2', event.target.value)} className={inputClassName} />
                                </label>
                                <label className="block">
                                    <span className="mb-2 block text-sm font-black text-gray-700 dark:text-gray-200">{t('profile.city')} *</span>
                                    <input value={data.city} onChange={event => setData('city', event.target.value)} className={inputClassName} list="provinces-list" required />
                                    <datalist id="provinces-list">
                                        {PROVINCES.map(p => (
                                            <option key={p.en} value={i18n.language === 'km' ? p.km : p.en} />
                                        ))}
                                    </datalist>
                                    {errors.city && <p className="mt-1 text-xs font-bold text-red-500">{errors.city}</p>}
                                </label>
                                <label className="block">
                                    <span className="mb-2 block text-sm font-black text-gray-700 dark:text-gray-200">{t('profile.postal_code')}</span>
                                    <input value={data.postal_code} onChange={event => setData('postal_code', event.target.value)} className={inputClassName} />
                                </label>
                                <label className="block">
                                    <span className="mb-2 block text-sm font-black text-gray-700 dark:text-gray-200">{t('profile.country')} *</span>
                                    <input value={data.country_code} onChange={event => setData('country_code', event.target.value.toUpperCase())} className={inputClassName} list="countries-list" required />
                                    <datalist id="countries-list">
                                        {COUNTRIES.map(c => (
                                            <option key={c.code} value={c.code}>{i18n.language === 'km' ? c.km : c.en}</option>
                                        ))}
                                    </datalist>
                                </label>
                                <label className="block md:col-span-2">
                                    <span className="mb-2 block text-sm font-black text-gray-700 dark:text-gray-200">{t('profile.address_notes')}</span>
                                    <textarea value={data.address_notes} onChange={event => setData('address_notes', event.target.value)} rows={2} className={inputClassName} />
                                </label>
                            </div>
                        </section>

                        <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-6">
                            <h2 className="flex items-center gap-2 text-xl font-black text-gray-950 dark:text-white">
                                <CheckCircle2 className="h-5 w-5 text-brand-primary" />
                                {t('profile.preferences')}
                            </h2>
                            <div className="mt-5 grid gap-5 md:grid-cols-2">
                                <label className="block">
                                    <span className="mb-2 block text-sm font-black text-gray-700 dark:text-gray-200">{t('profile.language')} *</span>
                                    <select value={data.preferred_locale} onChange={event => setData('preferred_locale', event.target.value)} className={inputClassName}>
                                        <option value="km">ភាសាខ្មែរ</option>
                                        <option value="en">English</option>
                                        <option value="vi">Tiếng Việt</option>
                                    </select>
                                </label>
                                <label className="block">
                                    <span className="mb-2 block text-sm font-black text-gray-700 dark:text-gray-200">{t('profile.currency')} *</span>
                                    <select value={data.preferred_currency} onChange={event => setData('preferred_currency', event.target.value)} className={inputClassName}>
                                        <option value="USD">USD</option>
                                        <option value="VND">VND</option>
                                    </select>
                                </label>
                                <label className="block">
                                    <span className="mb-2 block text-sm font-black text-gray-700 dark:text-gray-200">Telegram</span>
                                    <input value={data.telegram_username} onChange={event => setData('telegram_username', event.target.value)} placeholder="@username or phone number" className={inputClassName} />
                                </label>
                                <label className="block">
                                    <span className="mb-2 block text-sm font-black text-gray-700 dark:text-gray-200">WhatsApp</span>
                                    <div className="flex shadow-sm rounded-xl">
                                        <select 
                                            value={whatsappCode} 
                                            onChange={e => setWhatsappCode(e.target.value)}
                                            className="w-[100px] sm:w-[120px] rounded-l-xl border border-r-0 border-gray-200 bg-gray-50 px-3 py-3 text-sm font-semibold text-gray-950 focus:border-brand-primary focus:ring-0 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:focus:border-brand-primary"
                                        >
                                            <option value="+855">🇰🇭 +855</option>
                                            <option value="+84">🇻🇳 +84</option>
                                            <option value="+856">🇱🇦 +856</option>
                                        </select>
                                        <input 
                                            type="tel" 
                                            value={whatsappNum} 
                                            onChange={e => setWhatsappNum(e.target.value.replace(/\D/g, ''))} 
                                            placeholder="12 345 678" 
                                            className="w-full rounded-r-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-950 placeholder:text-gray-400 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 dark:border-gray-800 dark:bg-gray-950 dark:text-white dark:focus:border-brand-primary"
                                        />
                                    </div>
                                </label>
                            </div>
                        </section>

                        <div className="sticky bottom-0 z-20 -mx-4 border-t border-gray-200 bg-white/95 p-4 backdrop-blur dark:border-gray-800 dark:bg-gray-950/95 sm:static sm:mx-0 sm:rounded-3xl sm:border sm:p-5">
                            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end sm:items-center">
                                {recentlySuccessful && (
                                    <span className="text-sm font-bold text-green-500 flex items-center gap-1.5 animate-in fade-in slide-in-from-right-4">
                                        <CheckCircle2 className="h-4 w-4" />
                                        {t('profile.saved_successfully') || 'Saved successfully!'}
                                    </span>
                                )}
                                {hasErrors && (
                                    <span className="text-sm font-bold text-red-500 flex items-center gap-1.5 animate-in fade-in slide-in-from-right-4">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        {t('profile.check_errors') || 'Please check errors'}
                                    </span>
                                )}
                                <button type="button" onClick={() => history.back()} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-gray-300 px-5 text-sm font-black text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-900">
                                    <ArrowLeft className="h-4 w-4" />
                                    {t('profile.back')}
                                </button>
                                {canSkip && (
                                    <button type="button" onClick={skip} className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-gray-300 px-5 text-sm font-black text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-900">
                                        {t('profile.skip_now')}
                                    </button>
                                )}
                                <button type="submit" disabled={processing} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-brand-primary px-6 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-brand-primary/20 hover:bg-brand-secondary disabled:opacity-60">
                                    <Save className="h-4 w-4" />
                                    {processing ? t('profile.saving') : t('profile.save_continue')}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Email PIN Verification Modal */}
            {showEmailPinModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
                        <button 
                            onClick={() => setShowEmailPinModal(false)}
                            className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 dark:hover:text-white"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                        </button>

                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Verify New Email</h3>
                            <p className="text-gray-500 dark:text-gray-400 mt-2">We sent a 6-digit code to <span className="font-bold text-gray-900 dark:text-white">{newEmail}</span>.</p>
                        </div>

                        <form onSubmit={verifyEmailPin}>
                            <input
                                type="text"
                                maxLength={6}
                                value={emailPin}
                                onChange={e => {
                                    setEmailPin(e.target.value.replace(/\D/g, ''));
                                    setPinError('');
                                }}
                                placeholder="000000"
                                className={`w-full text-center text-3xl tracking-[0.5em] font-mono bg-gray-50 dark:bg-gray-900 border ${pinError ? 'border-red-500 focus:ring-red-500' : pinSuccess ? 'border-green-500 focus:ring-green-500' : 'border-gray-200 dark:border-gray-800 focus:ring-brand-primary'} rounded-xl px-4 py-4 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent transition-all mb-4`}
                                required
                            />
                            
                            {pinError && (
                                <p className="text-red-500 text-sm font-bold text-center mb-4 flex items-center justify-center gap-2 animate-in fade-in slide-in-from-bottom-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    {pinError}
                                </p>
                            )}
                            
                            {pinSuccess && (
                                <p className="text-green-500 text-sm font-bold text-center mb-4 flex items-center justify-center gap-2 animate-in fade-in zoom-in">
                                    <CheckCircle2 className="w-5 h-5" />
                                    Verify successful!
                                </p>
                            )}
                            
                            <button
                                type="submit"
                                disabled={emailPin.length !== 6 || isVerifyingPin || pinSuccess || pinCountdown === 0}
                                className="w-full bg-brand-primary hover:bg-brand-secondary text-white font-bold py-4 rounded-xl transition disabled:opacity-50"
                            >
                                {isVerifyingPin ? 'Verifying...' : pinSuccess ? 'Verified' : 'Verify & Save Email'}
                            </button>
                            
                            <div className="mt-6 text-center">
                                {pinCountdown > 0 ? (
                                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Code expires in <span className="font-bold text-gray-900 dark:text-white">{pinCountdown}s</span></p>
                                ) : (
                                    <div className="animate-in fade-in slide-in-from-top-2">
                                        <p className="text-red-500 text-sm font-bold mb-2">Code expired</p>
                                        <button 
                                            type="button" 
                                            onClick={sendEmailPin} 
                                            disabled={isSendingPin}
                                            className="inline-flex items-center gap-1.5 text-brand-primary hover:text-brand-secondary text-sm font-bold transition disabled:opacity-50"
                                        >
                                            {isSendingPin ? <Loader2 className="w-4 h-4 animate-spin" /> : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>}
                                            Resend Code
                                        </button>
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </MainLayout>
    );
}
