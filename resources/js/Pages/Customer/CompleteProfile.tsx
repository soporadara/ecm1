import { FormEvent } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { ArrowLeft, CheckCircle2, LockKeyhole, MapPin, Save, UserRound } from 'lucide-react';
import MainLayout from '../../Layouts/MainLayout';
import { useTranslation } from '../../hooks/useTranslation';

type Props = {
    auth: any;
    missingFields?: Record<string, string>;
    isManualOrderGate?: boolean;
    canSkip?: boolean;
};

export default function CompleteProfile({ auth, missingFields = {}, isManualOrderGate = false, canSkip = true }: Props) {
    const { t } = useTranslation();
    const user = auth?.user || {};
    const { data, setData, post, processing, errors } = useForm({
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
        post('/profile/complete');
    };

    const skip = () => {
        router.post('/profile/complete/skip');
    };

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
                                    <input value={data.name} onChange={event => setData('name', event.target.value)} className="w-full" required />
                                    {errors.name && <p className="mt-1 text-xs font-bold text-red-500">{errors.name}</p>}
                                </label>
                                <label className="block">
                                    <span className="mb-2 block text-sm font-black text-gray-700 dark:text-gray-200">{t('profile.login_email')}</span>
                                    <div className="flex min-h-12 items-center gap-3 rounded-lg border border-gray-200 bg-gray-100 px-4 text-sm font-bold text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                                        <LockKeyhole className="h-4 w-4" />
                                        {user.email}
                                    </div>
                                </label>
                                <label className="block">
                                    <span className="mb-2 block text-sm font-black text-gray-700 dark:text-gray-200">{t('profile.customer_id')}</span>
                                    <div className="flex min-h-12 items-center rounded-lg border border-gray-200 bg-gray-100 px-4 font-mono text-sm font-black text-brand-primary dark:border-gray-700 dark:bg-gray-800">
                                        {user.customer_code || 'Pending'}
                                    </div>
                                </label>
                                <label className="block">
                                    <span className="mb-2 block text-sm font-black text-gray-700 dark:text-gray-200">{t('profile.phone')} *</span>
                                    <input value={data.phone_e164} onChange={event => setData('phone_e164', event.target.value)} placeholder="+855 12 345 678" className="w-full" required />
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
                                    <textarea value={data.address_line_1} onChange={event => setData('address_line_1', event.target.value)} rows={3} className="w-full" required />
                                    {errors.address_line_1 && <p className="mt-1 text-xs font-bold text-red-500">{errors.address_line_1}</p>}
                                </label>
                                <label className="block">
                                    <span className="mb-2 block text-sm font-black text-gray-700 dark:text-gray-200">{t('profile.address_line_2')}</span>
                                    <input value={data.address_line_2} onChange={event => setData('address_line_2', event.target.value)} className="w-full" />
                                </label>
                                <label className="block">
                                    <span className="mb-2 block text-sm font-black text-gray-700 dark:text-gray-200">{t('profile.city')} *</span>
                                    <input value={data.city} onChange={event => setData('city', event.target.value)} className="w-full" required />
                                    {errors.city && <p className="mt-1 text-xs font-bold text-red-500">{errors.city}</p>}
                                </label>
                                <label className="block">
                                    <span className="mb-2 block text-sm font-black text-gray-700 dark:text-gray-200">{t('profile.postal_code')}</span>
                                    <input value={data.postal_code} onChange={event => setData('postal_code', event.target.value)} className="w-full" />
                                </label>
                                <label className="block">
                                    <span className="mb-2 block text-sm font-black text-gray-700 dark:text-gray-200">{t('profile.country')} *</span>
                                    <input value={data.country_code} onChange={event => setData('country_code', event.target.value.toUpperCase())} maxLength={2} className="w-full" required />
                                </label>
                                <label className="block md:col-span-2">
                                    <span className="mb-2 block text-sm font-black text-gray-700 dark:text-gray-200">{t('profile.address_notes')}</span>
                                    <textarea value={data.address_notes} onChange={event => setData('address_notes', event.target.value)} rows={2} className="w-full" />
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
                                    <select value={data.preferred_locale} onChange={event => setData('preferred_locale', event.target.value)} className="w-full">
                                        <option value="km">ភាសាខ្មែរ</option>
                                        <option value="en">English</option>
                                        <option value="vi">Tiếng Việt</option>
                                    </select>
                                </label>
                                <label className="block">
                                    <span className="mb-2 block text-sm font-black text-gray-700 dark:text-gray-200">{t('profile.currency')} *</span>
                                    <select value={data.preferred_currency} onChange={event => setData('preferred_currency', event.target.value)} className="w-full">
                                        <option value="USD">USD</option>
                                        <option value="VND">VND</option>
                                    </select>
                                </label>
                                <label className="block">
                                    <span className="mb-2 block text-sm font-black text-gray-700 dark:text-gray-200">Telegram</span>
                                    <input value={data.telegram_username} onChange={event => setData('telegram_username', event.target.value)} placeholder="@username" className="w-full" />
                                </label>
                                <label className="block">
                                    <span className="mb-2 block text-sm font-black text-gray-700 dark:text-gray-200">WhatsApp</span>
                                    <input value={data.whatsapp_number} onChange={event => setData('whatsapp_number', event.target.value)} className="w-full" />
                                </label>
                            </div>
                        </section>

                        <div className="sticky bottom-0 z-20 -mx-4 border-t border-gray-200 bg-white/95 p-4 backdrop-blur dark:border-gray-800 dark:bg-gray-950/95 sm:static sm:mx-0 sm:rounded-3xl sm:border sm:p-5">
                            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
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
        </MainLayout>
    );
}
