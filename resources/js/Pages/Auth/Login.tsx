import { FormEvent, useEffect, useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import { ArrowLeft, HelpCircle, Loader2, LockKeyhole, ShieldCheck, Truck, Zap } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import MainLayout from '../../Layouts/MainLayout';
import {
    createFirebasePasswordAccount,
    firebaseIsConfigured,
    getGoogleRedirectResult,
    signInWithFirebasePassword,
    signInWithGooglePopupOrRedirect,
    signInWithFacebookPopupOrRedirect,
} from '../../lib/firebase';

type LanguageCode = 'km' | 'en' | 'vi';
type AuthMode = 'signin' | 'signup';
type LoadingAction = 'google-signin' | 'google-signup' | 'facebook-signin' | 'facebook-signup' | 'email-signin' | 'email-signup' | null;

const languages: Array<{ code: LanguageCode; label: string }> = [
    { code: 'km', label: 'ខ្មែរ' },
    { code: 'en', label: 'EN' },
    { code: 'vi', label: 'VI' },
];

function GoogleIcon() {
    return (
        <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06L5.84 9.9C6.71 7.31 9.14 5.38 12 5.38z" />
        </svg>
    );
}

function FacebookIcon() {
    return (
        <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
    );
}

export default function Login() {
    const { t, i18n } = useTranslation();
    const pageProps = usePage().props as any;
    const [mode, setMode] = useState<AuthMode>(pageProps.initialMode === 'signup' ? 'signup' : 'signin');
    const [loading, setLoading] = useState<LoadingAction>(null);
    const [error, setError] = useState<string | null>(null);
    const [signinForm, setSigninForm] = useState({ email: '', password: '', remember: true });
    const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '', passwordConfirmation: '', acceptTerms: false });

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.classList.toggle('dark', savedTheme === 'dark' || (!savedTheme && prefersDark));
    }, []);

    useEffect(() => {
        let active = true;

        getGoogleRedirectResult()
            .then(async (result) => {
                if (!active || !result?.user) return;
                setLoading('google-signin');
                await completeBackendLogin(await result.user.getIdToken(), 'signin');
            })
            .catch((authError) => {
                if (!active) return;
                setError(errorMessage(authError?.code));
            })
            .finally(() => active && setLoading(null));

        return () => {
            active = false;
        };
    }, []);

    const completeBackendLogin = async (idToken: string, intent: AuthMode, name?: string) => {
        const response = await axios.post('/auth/firebase/session', {
            id_token: idToken,
            intent,
            name,
            locale: i18n.language,
        }, {
            headers: {
                'X-App-Locale': i18n.language,
            },
        });

        window.location.assign(response.data?.next_url || '/manual-order');
    };

    const errorMessage = (code?: string) => {
        switch (code) {
            case 'auth/popup-closed-by-user':
            case 'auth/cancelled-popup-request':
                return t('login.error_cancelled');
            case 'auth/popup-blocked':
                return t('login.error_popup_blocked');
            case 'auth/unauthorized-domain':
                return t('login.error_unauthorized_domain');
            case 'auth/network-request-failed':
                return t('login.error_network');
            case 'auth/email-already-in-use':
                return t('login.error_email_exists');
            case 'auth/invalid-email':
                return t('login.error_invalid_email');
            case 'auth/invalid-login-credentials':
            case 'auth/invalid-credential':
            case 'auth/user-not-found':
            case 'auth/wrong-password':
                return t('login.error_invalid_credentials');
            case 'auth/weak-password':
                return t('login.error_weak_password');
            case 'auth/not-configured':
                return t('login.error_not_configured');
            default:
                return t('login.error_backend');
        }
    };

    const changeLanguage = (language: LanguageCode) => {
        localStorage.setItem('language', language);
        i18n.changeLanguage(language);
    };

    const switchMode = (nextMode: AuthMode) => {
        setMode(nextMode);
        setError(null);
        window.history.replaceState({}, '', nextMode === 'signup' ? '/register' : '/login');
    };

    const handleGoogle = async (intent: AuthMode) => {
        setLoading(intent === 'signin' ? 'google-signin' : 'google-signup');
        setError(null);

        try {
            const result = await signInWithGooglePopupOrRedirect();
            if (!result?.user) return;
            await completeBackendLogin(await result.user.getIdToken(), intent);
        } catch (authError: any) {
            setError(authError?.response?.data?.message || authError?.response?.data?.errors?.id_token?.[0] || errorMessage(authError?.code));
            setLoading(null);
        }
    };

    const handleFacebook = async (intent: AuthMode) => {
        setLoading(intent === 'signin' ? 'facebook-signin' : 'facebook-signup');
        setError(null);

        try {
            const result = await signInWithFacebookPopupOrRedirect();
            if (!result?.user) return;
            await completeBackendLogin(await result.user.getIdToken(), intent);
        } catch (authError: any) {
            setError(authError?.response?.data?.message || authError?.response?.data?.errors?.id_token?.[0] || errorMessage(authError?.code));
            setLoading(null);
        }
    };

    const submitSignIn = async (event: FormEvent) => {
        event.preventDefault();
        setLoading('email-signin');
        setError(null);

        try {
            const result = await signInWithFirebasePassword(signinForm.email, signinForm.password, signinForm.remember);
            await completeBackendLogin(await result.user.getIdToken(), 'signin');
        } catch (authError: any) {
            setError(authError?.response?.data?.message || authError?.response?.data?.errors?.id_token?.[0] || errorMessage(authError?.code));
            setLoading(null);
        }
    };

    const submitSignUp = async (event: FormEvent) => {
        event.preventDefault();
        setError(null);

        if (signupForm.password !== signupForm.passwordConfirmation) {
            setError(t('login.error_password_mismatch'));
            return;
        }

        if (!signupForm.acceptTerms) {
            setError(t('login.error_terms_required'));
            return;
        }

        setLoading('email-signup');

        try {
            const result = await createFirebasePasswordAccount(signupForm.name, signupForm.email, signupForm.password);
            await completeBackendLogin(await result.user.getIdToken(true), 'signup', signupForm.name);
        } catch (authError: any) {
            setError(authError?.response?.data?.message || authError?.response?.data?.errors?.id_token?.[0] || errorMessage(authError?.code));
            setLoading(null);
        }
    };

    const busy = loading !== null;

    return (
        <MainLayout title={mode === 'signin' ? t('login.signin_title') : t('login.signup_title')}>
            <Head title={mode === 'signin' ? t('login.signin_title') : t('login.signup_title')} />
            <div className="customer-auth-page -mt-[var(--public-header-offset)] min-h-screen overflow-hidden bg-[#f8fafc] px-4 pb-10 pt-[calc(var(--public-header-offset)+1.5rem)] text-slate-950 antialiased transition-colors dark:bg-[#0f172a] dark:text-white sm:px-6 lg:px-8">
                <div className="mx-auto grid min-h-[calc(100vh-var(--public-header-offset)-3rem)] max-w-6xl items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
                    
                    {/* Visual Panel Left (White Theme) */}
                    <aside className="relative hidden h-full min-h-[36rem] flex-col justify-center rounded-3xl bg-white p-10 shadow-[0_2px_40px_rgba(15,23,42,0.04)] ring-1 ring-slate-200/50 dark:bg-[#1e293b] dark:ring-white/10 lg:flex lg:p-14">
                        <div className="mb-12 flex items-center gap-4">
                            <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200 dark:bg-white">
                                <img src={'/logo.png'} alt="Logo" className="h-8 w-8 object-contain" />
                            </span>
                            <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">
                                {t('login.customer_portal')}
                            </p>
                        </div>

                        <h1 className="max-w-[20rem] text-4xl font-black leading-[1.15] tracking-tight text-slate-900 dark:text-white xl:text-5xl">
                            {t('login.visual_title')}
                        </h1>
                        <p className="mt-6 max-w-[22rem] text-base font-medium leading-relaxed text-slate-500 dark:text-slate-400">
                            Create requests faster and follow your shipment from review to delivery.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-3">
                            <span className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                <Zap className="h-4 w-4 text-blue-500" /> Fast
                            </span>
                            <span className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                <ShieldCheck className="h-4 w-4 text-blue-500" /> Secure
                            </span>
                            <span className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                <Truck className="h-4 w-4 text-blue-500" /> Track
                            </span>
                        </div>
                    </aside>

                    {/* Form Panel Right */}
                    <section className="flex w-full flex-col justify-center py-6 lg:py-8 lg:pl-4">
                        <div className="w-full rounded-2xl bg-white p-6 shadow-[0_28px_80px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/50 dark:bg-[#1e293b] dark:ring-white/10 sm:p-10 lg:bg-transparent lg:p-0 lg:shadow-none lg:ring-0">
                            
                            {/* Mobile header (hidden on lg since it's in the left panel) */}
                            <div className="mb-8 flex items-center gap-3 lg:hidden">
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow ring-1 ring-slate-200 dark:bg-white">
                                    <img src={'/logo.png'} alt="Logo" className="h-8 w-8 object-contain" />
                                </span>
                                <div>
                                    <p className="text-[0.65rem] font-black uppercase tracking-[0.3em] text-[#a3747d]">
                                        {t('login.customer_portal')}
                                    </p>
                                    <h1 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white sm:text-3xl">
                                        {mode === 'signin' ? t('login.signin_title') : t('login.signup_heading')}
                                    </h1>
                                </div>
                            </div>
                            
                            <div className="mb-8 grid grid-cols-2 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
                                <button
                                    type="button"
                                    onClick={() => switchMode('signin')}
                                    className={`min-h-11 rounded-[1.25rem] px-7 text-sm font-black transition duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#a3747d]/25 ${
                                        mode === 'signin' ? 'bg-[#a3747d] text-white shadow-lg shadow-[#a3747d]/25' : 'text-slate-500 hover:bg-[#f7eef0] hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white'
                                    }`}
                                >
                                    {t('login.signin_tab')}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => switchMode('signup')}
                                    className={`min-h-[44px] rounded-lg text-sm font-black transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a3747d]/30 ${
                                        mode === 'signup' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white' : 'text-slate-500 hover:bg-white/60 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-700/50'
                                    }`}
                                >
                                    {t('login.signup_tab')}
                                </button>
                            </div>    </div>

                            {error && (
                                <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700 shadow-sm dark:border-red-400/30 dark:bg-red-500/12 dark:text-red-100">
                                    {error}
                                </div>
                            )}

                            {!firebaseIsConfigured && (
                                <div className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-bold text-amber-800 shadow-sm dark:border-amber-300/30 dark:bg-amber-400/12 dark:text-amber-100">
                                    {t('login.error_not_configured')}
                                </div>
                            )}

                            {mode === 'signin' ? (
                            <form onSubmit={submitSignIn} className="space-y-4">
                                <button
                                    type="button"
                                    onClick={() => handleGoogle('signin')}
                                    disabled={busy || !firebaseIsConfigured}
                                    className="inline-flex min-h-[48px] w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-5 text-sm font-black text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-[#a3747d]/50 hover:bg-[#fffafa] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a3747d]/25 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white dark:text-slate-950"
                                >
                                    {loading === 'google-signin' ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : <GoogleIcon />}
                                    {loading === 'google-signin' ? t('login.loading') : t('login.continue_google')}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleFacebook('signin')}
                                    disabled={busy || !firebaseIsConfigured}
                                    className="inline-flex min-h-[48px] w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-5 text-sm font-black text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-[#a3747d]/50 hover:bg-[#fffafa] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a3747d]/25 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white dark:text-slate-950"
                                >
                                    {loading === 'facebook-signin' ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : <FacebookIcon />}
                                    {loading === 'facebook-signin' ? t('login.loading') : 'Continue with Facebook'}
                                </button>

                                <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                                    <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
                                    {t('login.or_continue_email')}
                                    <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
                                </div>

                                <label className="block">
                                    <span className="mb-1 block text-xs font-bold text-slate-600 dark:text-slate-300">{t('login.email')}</span>
                                    <span className="relative block">
                                        <input
                                            type="email"
                                            value={signinForm.email}
                                            onChange={(event) => setSigninForm({ ...signinForm, email: event.target.value })}
                                            className="h-[52px] w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-950 placeholder:text-slate-400 shadow-sm transition focus:border-[#a3747d] focus:ring-2 focus:ring-[#a3747d]/20 dark:border-white/10 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
                                            placeholder={t('login.email')}
                                            autoComplete="email"
                                            required
                                        />
                                    </span>
                                </label>

                                <label className="block">
                                    <span className="mb-1 block text-xs font-bold text-slate-600 dark:text-slate-300">{t('login.password')}</span>
                                    <span className="relative block">
                                        <input
                                            type="password"
                                            value={signinForm.password}
                                            onChange={(event) => setSigninForm({ ...signinForm, password: event.target.value })}
                                            className="h-[52px] w-full rounded-xl border border-slate-200 bg-white px-4 pr-11 text-sm font-bold text-slate-950 placeholder:text-slate-400 shadow-sm transition focus:border-[#a3747d] focus:ring-2 focus:ring-[#a3747d]/20 dark:border-white/10 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
                                            placeholder={t('login.password')}
                                            autoComplete="current-password"
                                            required
                                        />
                                        <LockKeyhole className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                    </span>
                                </label>

                                <div className="flex items-center justify-between gap-4 text-xs">
                                    <label className="inline-flex min-h-[44px] cursor-pointer items-center gap-2.5 font-bold text-slate-500 dark:text-slate-300">
                                        <input
                                            type="checkbox"
                                            checked={signinForm.remember}
                                            onChange={(event) => setSigninForm({ ...signinForm, remember: event.target.checked })}
                                            className="rounded border-slate-300 bg-white"
                                        />
                                        {t('login.remember_me')}
                                    </label>
                                    <Link href="/forgot-password" className="font-black text-[#a3747d] hover:text-[#835d65] hover:underline">
                                        {t('login.forgot_password')}
                                    </Link>
                                </div>

                                <button
                                    type="submit"
                                    disabled={busy || !firebaseIsConfigured}
                                    className="inline-flex min-h-[52px] w-full items-center justify-center rounded-xl bg-[#a3747d] px-5 text-sm font-black text-white shadow-md shadow-[#a3747d]/25 transition hover:-translate-y-0.5 hover:bg-[#8c626b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a3747d]/30 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading === 'email-signin' ? <Loader2 className="h-5 w-5 animate-spin" /> : t('login.signin_button')}
                                </button>

                                <p className="text-center text-xs font-semibold text-slate-500 dark:text-slate-300">
                                    {t('login.no_account')}{' '}
                                    <button type="button" onClick={() => switchMode('signup')} className="font-black text-[#a3747d] hover:text-[#835d65] hover:underline">
                                        {t('login.signup_tab')}
                                    </button>
                                </p>
                            </form>
                        ) : (
                            <form onSubmit={submitSignUp} className="space-y-4">
                                <button
                                    type="button"
                                    onClick={() => handleGoogle('signup')}
                                    disabled={busy || !firebaseIsConfigured}
                                    className="inline-flex min-h-[48px] w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-5 text-sm font-black text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-[#a3747d]/50 hover:bg-[#fffafa] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a3747d]/25 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white dark:text-slate-950"
                                >
                                    {loading === 'google-signup' ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : <GoogleIcon />}
                                    {loading === 'google-signup' ? t('login.loading') : t('login.signup_google')}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleFacebook('signup')}
                                    disabled={busy || !firebaseIsConfigured}
                                    className="inline-flex min-h-[48px] w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-5 text-sm font-black text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-[#a3747d]/50 hover:bg-[#fffafa] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a3747d]/25 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white dark:text-slate-950"
                                >
                                    {loading === 'facebook-signup' ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : <FacebookIcon />}
                                    {loading === 'facebook-signup' ? t('login.loading') : 'Sign up with Facebook'}
                                </button>

                                <div className="flex items-center gap-4 py-1 text-sm font-bold text-slate-400 dark:text-slate-500">
                                    <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
                                    {t('login.or_signup_email')}
                                    <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
                                </div>

                                <div className="grid gap-3 sm:grid-cols-2">
                                    <label className="block sm:col-span-2">
                                        <span className="mb-1 block text-xs font-bold text-slate-600 dark:text-slate-300">{t('login.full_name')}</span>
                                        <span className="relative block">
                                            <input
                                                type="text"
                                                value={signupForm.name}
                                                onChange={(event) => setSignupForm({ ...signupForm, name: event.target.value })}
                                                className="h-[52px] w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-950 placeholder:text-slate-400 shadow-sm transition focus:border-[#a3747d] focus:ring-2 focus:ring-[#a3747d]/20 dark:border-white/10 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
                                                placeholder={t('login.full_name_placeholder')}
                                                autoComplete="name"
                                                required
                                            />
                                        </span>
                                    </label>

                                    <label className="block sm:col-span-2">
                                        <span className="mb-1 block text-xs font-bold text-slate-600 dark:text-slate-300">{t('login.email')}</span>
                                        <span className="relative block">
                                            <input
                                                type="email"
                                                value={signupForm.email}
                                                onChange={(event) => setSignupForm({ ...signupForm, email: event.target.value })}
                                                className="h-[52px] w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-950 placeholder:text-slate-400 shadow-sm transition focus:border-[#a3747d] focus:ring-2 focus:ring-[#a3747d]/20 dark:border-white/10 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
                                                placeholder={t('login.email')}
                                                autoComplete="email"
                                                required
                                            />
                                        </span>
                                    </label>

                                    <label className="block">
                                        <span className="mb-1 block text-xs font-bold text-slate-600 dark:text-slate-300">{t('login.password')}</span>
                                        <span className="relative block">
                                            <input
                                                type="password"
                                                value={signupForm.password}
                                                onChange={(event) => setSignupForm({ ...signupForm, password: event.target.value })}
                                                className="h-[52px] w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-950 placeholder:text-slate-400 shadow-sm transition focus:border-[#a3747d] focus:ring-2 focus:ring-[#a3747d]/20 dark:border-white/10 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
                                                placeholder={t('login.password')}
                                                autoComplete="new-password"
                                                minLength={8}
                                                required
                                            />
                                        </span>
                                    </label>

                                    <label className="block">
                                        <span className="mb-1 block text-xs font-bold text-slate-600 dark:text-slate-300">{t('login.confirm_password')}</span>
                                        <span className="relative block">
                                            <input
                                                type="password"
                                                value={signupForm.passwordConfirmation}
                                                onChange={(event) => setSignupForm({ ...signupForm, passwordConfirmation: event.target.value })}
                                                className="h-[52px] w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-950 placeholder:text-slate-400 shadow-sm transition focus:border-[#a3747d] focus:ring-2 focus:ring-[#a3747d]/20 dark:border-white/10 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500"
                                                placeholder={t('login.confirm_password')}
                                                autoComplete="new-password"
                                                minLength={8}
                                                required
                                            />
                                        </span>
                                    </label>
                                </div>

                                <label className="flex min-h-[44px] cursor-pointer items-start gap-2.5 text-xs font-semibold leading-5 text-slate-500 dark:text-slate-300">
                                    <input
                                        type="checkbox"
                                        checked={signupForm.acceptTerms}
                                        onChange={(event) => setSignupForm({ ...signupForm, acceptTerms: event.target.checked })}
                                        className="mt-0.5 rounded border-slate-300 bg-white"
                                    />
                                    <span>
                                        {t('login.terms_prefix')}{' '}
                                        <Link href="/pages/terms" className="font-black text-[#a3747d] hover:text-[#835d65] hover:underline">{t('login.terms')}</Link>
                                        {' '}{t('login.and')}{' '}
                                        <Link href="/pages/privacy" className="font-black text-[#a3747d] hover:text-[#835d65] hover:underline">{t('login.privacy')}</Link>.
                                    </span>
                                </label>

                                <button
                                    type="submit"
                                    disabled={busy || !firebaseIsConfigured}
                                    className="inline-flex min-h-[52px] w-full items-center justify-center rounded-xl bg-[#a3747d] px-5 text-sm font-black text-white shadow-md shadow-[#a3747d]/25 transition hover:-translate-y-0.5 hover:bg-[#8c626b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a3747d]/30 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading === 'email-signup' ? <Loader2 className="h-5 w-5 animate-spin" /> : t('login.create_account')}
                                </button>

                                <p className="text-center text-xs font-semibold text-slate-500 dark:text-slate-300">
                                    {t('login.have_account')}{' '}
                                    <button type="button" onClick={() => switchMode('signin')} className="font-black text-[#a3747d] hover:text-[#835d65] hover:underline">
                                        {t('login.signin_tab')}
                                    </button>
                                </p>
                            </form>
                        )}

                        <div className="mt-8 grid grid-cols-2 gap-3">
                            <Link href="/" className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-black text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a3747d]/30 dark:border-white/10 dark:bg-white/10 dark:text-white/80">
                                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                                {t('login.back_home')}
                            </Link>
                            <Link href="/contact" className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-black text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a3747d]/30 dark:border-white/10 dark:bg-white/10 dark:text-white/80">
                                <HelpCircle className="h-4 w-4" aria-hidden="true" />
                                {t('login.contact_support')}
                            </Link>
                        </div>

                        <div className="mt-5 flex items-center justify-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-500">
                            <ShieldCheck className="h-4 w-4" />
                            {t('login.secure_note')}
                        </div>
                    </section>
                </div>
            </div>
        </MainLayout>
    );
}
