import { Head, Link, useForm } from '@inertiajs/react';
import axios from 'axios';
import { ArrowRight, Eye, Loader2, LockKeyhole, Mail, Moon, ShieldCheck, Sun } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { firebaseIsConfigured, getGoogleRedirectResult, signInWithGooglePopupOrRedirect } from '../../lib/firebase';

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

export default function CmsLogin() {
    const [googleLoading, setGoogleLoading] = useState(false);
    const [googleError, setGoogleError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [lightMode, setLightMode] = useState(true);
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: true,
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();
        post('/cms/login');
    };

    const completeCmsGoogleLogin = async (idToken: string) => {
        const response = await axios.post('/auth/firebase/cms', { id_token: idToken });
        window.location.assign(response.data?.next_url || '/admin');
    };

    useEffect(() => {
        let active = true;

        getGoogleRedirectResult()
            .then(async (result) => {
                if (!active || !result?.user) return;
                setGoogleLoading(true);
                await completeCmsGoogleLogin(await result.user.getIdToken());
            })
            .catch(() => active && setGoogleError('We could not verify your staff account.'))
            .finally(() => active && setGoogleLoading(false));

        return () => {
            active = false;
        };
    }, []);

    const continueWithGoogle = async () => {
        setGoogleLoading(true);
        try {
            const result = await signInWithGooglePopupOrRedirect();
            if (result?.user) {
                await completeCmsGoogleLogin(await result.user.getIdToken());
            } else {
                setGoogleLoading(false);
            }
        } catch (error: any) {
            setGoogleError('Failed to sign in with Google');
            setGoogleLoading(false);
        }
    };

    return (
        <div className={`cms-login-page fixed inset-0 overflow-hidden px-4 py-4 text-slate-900 transition-colors sm:px-6 ${lightMode ? 'bg-[#f5fbff]' : 'cms-login-dark bg-[#1f2937] text-slate-100'}`}>
            <Head title="CMS Login" />

            <div className={`pointer-events-none fixed inset-0 transition-colors ${
                lightMode
                    ? 'bg-[radial-gradient(circle_at_22%_20%,rgba(59,130,246,0.16),transparent_27%),radial-gradient(circle_at_78%_70%,rgba(147,197,253,0.24),transparent_30%),linear-gradient(135deg,#ffffff_0%,#eef7ff_54%,#ffffff_100%)]'
                    : 'bg-[radial-gradient(circle_at_22%_20%,rgba(59,130,246,0.18),transparent_27%),radial-gradient(circle_at_78%_70%,rgba(71,85,105,0.38),transparent_34%),linear-gradient(135deg,#111827_0%,#1f2937_58%,#374151_100%)]'
            }`} />

            <main className="relative flex h-full items-center justify-center">
                <section className={`relative grid w-full max-w-6xl overflow-hidden rounded-[2rem] shadow-[0_26px_85px_rgba(37,99,235,0.18)] ring-1 md:grid-cols-[0.8fr_1.2fr] ${lightMode ? 'bg-white ring-blue-100' : 'bg-slate-800 ring-white/10'}`}>
                    <button
                        type="button"
                        onClick={() => setLightMode(!lightMode)}
                        className={`absolute right-4 top-4 z-10 inline-flex h-10 items-center gap-1 rounded-full p-1 transition hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300/30 ${lightMode ? 'bg-blue-50 text-blue-300 hover:bg-blue-100' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}
                        aria-label="Toggle login preview theme"
                    >
                        <span className={`flex h-8 w-8 items-center justify-center rounded-full transition ${lightMode ? 'bg-white text-amber-400 shadow-sm' : 'text-slate-400'}`}>
                            <Sun className="h-4 w-4" />
                        </span>
                        <span className={`flex h-8 w-8 items-center justify-center rounded-full transition ${!lightMode ? 'bg-slate-900 text-slate-100 shadow-sm' : 'text-blue-200'}`}>
                            <Moon className="h-4 w-4" />
                        </span>
                    </button>

                    <aside className={`hidden min-h-[42rem] flex-col justify-between p-8 lg:p-12 md:flex ${lightMode ? 'bg-blue-50/80' : 'bg-slate-900/55'}`}>
                        <div>
                            <Link href="/" className={`inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl shadow-[0_18px_45px_rgba(37,99,235,0.12)] ring-1 ${lightMode ? 'bg-white ring-blue-100' : 'bg-slate-800 ring-white/10'}`}>
                                <img src="/logo.png" alt="MVM Logistics" className="h-12 w-12 object-contain" />
                            </Link>
                            <p className="mt-8 text-xs font-black uppercase tracking-[0.32em] text-blue-500">MVM CMS</p>
                            <h1 className={`mt-3 text-4xl font-black leading-tight tracking-tight ${lightMode ? 'text-slate-950' : 'text-white'}`}>
                                Staff<br />Dashboard
                            </h1>
                            <p className={`mt-4 text-sm font-semibold leading-6 ${lightMode ? 'text-slate-600' : 'text-slate-300'}`}>
                                Secure access for content, orders, approvals, and logistics operations.
                            </p>
                        </div>
                        <div className={`inline-flex items-center gap-3 rounded-2xl p-3 text-sm font-black ${lightMode ? 'bg-white text-blue-600 shadow-sm' : 'bg-slate-800 text-blue-300'}`}>
                            <ShieldCheck className="h-5 w-5" />
                            Protected CMS access
                        </div>
                    </aside>

                    <div className="flex flex-col justify-center p-6 sm:p-8 md:p-12 lg:p-16">
                        <div className="mb-5 flex items-center gap-4 pr-24 md:hidden">
                            <span className={`flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl shadow-sm ring-1 ${lightMode ? 'bg-white ring-blue-100' : 'bg-slate-900 ring-white/10'}`}>
                                <img src="/logo.png" alt="MVM Logistics" className="h-11 w-11 object-contain" />
                            </span>
                            <div>
                                <p className="text-xs font-black uppercase tracking-[0.28em] text-blue-500">MVM CMS</p>
                                <h1 className={`mt-1 text-2xl font-black tracking-tight ${lightMode ? 'text-slate-900' : 'text-white'}`}>Welcome Back</h1>
                            </div>
                        </div>

                        <div className="mb-4 hidden md:block">
                            <p className="text-xs font-black uppercase tracking-[0.28em] text-blue-500">MVM System</p>
                            <h2 className={`mt-1 text-3xl font-black tracking-tight ${lightMode ? 'text-slate-900' : 'text-white'}`}>
                                Welcome <span className="text-blue-500">Back</span>
                            </h2>
                            <p className={`mt-1 text-sm font-semibold ${lightMode ? 'text-slate-500' : 'text-slate-300'}`}>Sign in to continue to your dashboard.</p>
                        </div>

                        {googleError && (
                            <div className="mb-3 rounded-2xl border border-red-200 bg-red-50 p-3 text-sm font-black text-red-500">
                                {googleError}
                            </div>
                        )}

                        <form onSubmit={submit} className="flex flex-col gap-4">
                            <label className="block">
                                <span className={`mb-1.5 block text-sm font-black ${lightMode ? 'text-slate-600' : 'text-slate-200'}`}>Email address</span>
                                <span className="relative block">
                                    <span className={`pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 ${lightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                                        <Mail className="h-5 w-5" />
                                    </span>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={event => setData('email', event.target.value)}
                                        className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-16 pr-5 text-base font-bold text-slate-900 placeholder:text-slate-300 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-200/70"
                                        placeholder="you@company.com"
                                        autoComplete="username"
                                        required
                                    />
                                </span>
                                {errors.email && <span className="mt-1.5 block text-xs font-bold text-red-500">{errors.email}</span>}
                            </label>

                            <label className="block">
                                <span className={`mb-1.5 flex items-center justify-between gap-4 text-sm font-black ${lightMode ? 'text-slate-600' : 'text-slate-200'}`}>
                                    Password
                                    <Link href="/forgot-password" className="text-xs font-black text-blue-500 hover:underline transition-colors hover:text-blue-400">Forgot?</Link>
                                </span>
                                <span className="relative block">
                                    <span className={`pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 ${lightMode ? 'text-slate-500' : 'text-slate-400'}`}>
                                        <LockKeyhole className="h-5 w-5" />
                                    </span>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={data.password}
                                        onChange={event => setData('password', event.target.value)}
                                        className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-16 pr-16 text-base font-bold text-slate-900 placeholder:text-slate-300 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-200/70"
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-slate-500 transition hover:bg-blue-50 hover:text-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                                        aria-label="Show password"
                                    >
                                        <Eye className="h-5 w-5" />
                                    </button>
                                </span>
                                {errors.password && <span className="mt-1.5 block text-xs font-bold text-red-500">{errors.password}</span>}
                            </label>

                            <div className="flex items-center justify-between gap-4">
                                <label className={`inline-flex items-center gap-3 text-sm font-black ${lightMode ? 'text-slate-700' : 'text-slate-200'}`}>
                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={event => setData('remember', event.target.checked)}
                                        className="rounded border-slate-300 bg-white"
                                    />
                                    Keep me signed in
                                </label>
                                <span className={`hidden text-sm font-black sm:inline ${lightMode ? 'text-slate-300' : 'text-slate-500'}`}>Protected access</span>
                            </div>

                            <button
                                disabled={processing}
                                className="mt-1 inline-flex min-h-[52px] w-full items-center justify-center gap-3 rounded-2xl bg-blue-500 px-6 py-3 text-base font-black text-white shadow-[0_18px_45px_rgba(37,99,235,0.28)] transition duration-200 hover:-translate-y-0.5 hover:bg-blue-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300/45 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {processing ? <Loader2 className="h-5 w-5 animate-spin" /> : <ShieldCheck className="h-5 w-5" />}
                                {processing ? 'Signing in...' : 'Sign in to CMS'}
                                {!processing && <ArrowRight className="h-5 w-5" />}
                            </button>
                        </form>

                        <div className={`my-5 flex items-center gap-4 text-xs font-black uppercase tracking-[0.24em] ${lightMode ? 'text-slate-300' : 'text-slate-500'}`}>
                            <span className={`h-px flex-1 ${lightMode ? 'bg-slate-200' : 'bg-slate-700'}`} />
                            Or continue with
                            <span className={`h-px flex-1 ${lightMode ? 'bg-slate-200' : 'bg-slate-700'}`} />
                        </div>

                        <button
                            type="button"
                            onClick={continueWithGoogle}
                            disabled={googleLoading || processing || !firebaseIsConfigured}
                            className={`inline-flex min-h-[52px] w-full items-center justify-center gap-3 rounded-2xl border px-5 py-3 text-sm font-black shadow-sm transition duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300/30 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 ${lightMode ? 'border-slate-200 bg-white text-slate-900 hover:border-blue-200 hover:bg-blue-50' : 'border-white/10 bg-slate-900 text-slate-100 hover:border-blue-400/40 hover:bg-slate-700'}`}
                        >
                            {googleLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <GoogleIcon />}
                            {googleLoading ? 'Verifying...' : 'Continue with Google'}
                        </button>

                        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 text-xs font-bold">
                            <span className={lightMode ? 'text-slate-300' : 'text-slate-500'}>© 2026 MVM SYSTEM</span>
                            <Link href="/" className={`font-black transition hover:text-blue-500 hover:underline ${lightMode ? 'text-slate-700' : 'text-slate-300'}`}>
                                Back to website
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
