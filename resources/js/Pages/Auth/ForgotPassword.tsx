import { FormEvent, useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, HelpCircle, Loader2, Mail } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { firebaseIsConfigured, sendFirebasePasswordReset } from '../../lib/firebase';
import MainLayout from '../../Layouts/MainLayout';

type LanguageCode = 'km' | 'en' | 'vi';

const languages: Array<{ code: LanguageCode; label: string }> = [
    { code: 'km', label: 'ខ្មែរ' },
    { code: 'en', label: 'EN' },
    { code: 'vi', label: 'VI' },
];

export default function ForgotPassword() {
    const { t, i18n } = useTranslation();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.classList.toggle('dark', savedTheme === 'dark' || (!savedTheme && prefersDark));
    }, []);

    const changeLanguage = (language: LanguageCode) => {
        localStorage.setItem('language', language);
        i18n.changeLanguage(language);
    };

    const submit = async (event: FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setMessage(null);
        setError(null);

        try {
            await sendFirebasePasswordReset(email);
            setMessage(t('login.reset_sent'));
        } catch (authError: any) {
            setError(authError?.code === 'auth/not-configured' ? t('login.error_not_configured') : t('login.error_backend'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout title={t('login.forgot_password')}>
            <Head title={t('login.forgot_password')} />
            <div className="auth-page -mt-[var(--public-header-offset)] overflow-hidden bg-[#12091f] px-4 pb-10 pt-[calc(var(--public-header-offset)+1.5rem)] text-white antialiased sm:px-6 lg:px-8">

            <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(96,165,250,0.25),transparent_28%),radial-gradient(circle_at_78%_22%,rgba(168,85,247,0.28),transparent_30%),linear-gradient(135deg,#0c0716_0%,#1f0d39_46%,#13051e_100%)]" />
            <div className="pointer-events-none fixed inset-0 opacity-60 [background-image:radial-gradient(circle,rgba(255,255,255,0.42)_1px,transparent_1px)] [background-size:42px_42px]" />

            <div className="relative mx-auto flex min-h-[calc(100vh-var(--public-header-offset)-3rem)] max-w-md items-center justify-center">
                <section className="w-full rounded-[2rem] border border-white/10 bg-[#210b3a]/92 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8">
                    <div className="mb-8 flex items-center justify-between gap-4">
                        <Link href="/" className="inline-flex items-center gap-3 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300">
                            <span className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-lg shadow-black/20">
                                <img src="/logo.png" alt="Logo" className="h-12 w-12 object-contain" />
                            </span>
                            <span>
                                <span className="block text-lg font-black leading-none">MVM Logistics</span>
                                <span className="text-xs font-bold text-white/55">{t('login.customer_portal')}</span>
                            </span>
                        </Link>

                        <div className="flex rounded-full border border-white/15 bg-white/8 p-1">
                            {languages.map((language) => (
                                <button
                                    key={language.code}
                                    type="button"
                                    onClick={() => changeLanguage(language.code)}
                                    className={`min-h-8 rounded-full px-3 text-xs font-black transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 ${
                                        i18n.language === language.code ? 'bg-white text-[#23103f] shadow-sm' : 'text-white/70 hover:bg-white/10 hover:text-white'
                                    }`}
                                >
                                    {language.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <h1 className="text-3xl font-black text-white">{t('login.forgot_heading')}</h1>
                    <p className="mt-3 text-sm font-semibold leading-6 text-white/66">{t('login.forgot_description')}</p>

                    {message && <div className="mt-5 rounded-2xl border border-emerald-300/30 bg-emerald-400/12 p-4 text-sm font-bold text-emerald-100">{message}</div>}
                    {error && <div className="mt-5 rounded-2xl border border-red-300/30 bg-red-500/12 p-4 text-sm font-bold text-red-100">{error}</div>}
                    {!firebaseIsConfigured && <div className="mt-5 rounded-2xl border border-amber-300/30 bg-amber-400/12 p-4 text-sm font-bold text-amber-100">{t('login.error_not_configured')}</div>}

                    <form onSubmit={submit} className="mt-6 space-y-4">
                        <label className="block">
                            <span className="mb-2 block text-xs font-black uppercase tracking-[0.15em] text-white/58">{t('login.email')}</span>
                            <span className="relative block">
                                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/55">
                                    <Mail className="h-5 w-5" />
                                </span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    className="h-12 w-full rounded-2xl border border-white/10 bg-white/12 pl-12 pr-4 text-sm font-bold text-white placeholder:text-white/35 focus:border-blue-300 focus:ring-2 focus:ring-blue-300/30"
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    required
                                />
                            </span>
                        </label>

                        <button
                            type="submit"
                            disabled={loading || !firebaseIsConfigured}
                            className="inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-sky-500 px-5 text-sm font-black uppercase tracking-wide text-white shadow-lg shadow-blue-950/40 transition hover:from-violet-500 hover:to-sky-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : t('login.send_reset')}
                        </button>
                    </form>

                    <div className="mt-8 grid grid-cols-2 gap-3">
                        <Link href="/login" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/8 px-4 text-sm font-black text-white/78 transition hover:bg-white/14 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300">
                            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                            {t('login.signin_tab')}
                        </Link>
                        <Link href="/contact" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/8 px-4 text-sm font-black text-white/78 transition hover:bg-white/14 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300">
                            <HelpCircle className="h-4 w-4" aria-hidden="true" />
                            {t('login.contact_support')}
                        </Link>
                    </div>
                </section>
            </div>
            </div>
        </MainLayout>
    );
}
