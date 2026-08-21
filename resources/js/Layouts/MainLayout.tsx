import { FormEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, router, usePage } from '@inertiajs/react';
import axios from 'axios';
import {
    BookOpen,
    Check,
    ChevronDown,
    ClipboardList,
    Eye,
    FileText,
    HelpCircle,
    PhoneCall,
    Home,
    LogIn,
    LogOut,
    Loader2,
    LockKeyhole,
    Mail,
    Menu,
    Moon,
    PackageCheck,
    ReceiptText,
    Shield,
    ShieldCheck,
    ShoppingCart,
    Sun,
    Truck,
    User,
    UserRound,
    X,
    Zap,
    CheckCircle2,
} from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import BottomNavigation from '../Components/Premium/BottomNavigation';
import ManualOrderSheet from '../Components/Premium/ManualOrderSheet';
import SupportFAB from '../Components/SupportFAB';
import TelegramWidget from '../Components/Premium/TelegramWidget';
import { AlertTriangle, Send } from 'lucide-react';

import RegionSettings from '../Components/RegionSettings';
import SeoHead from '../Components/SeoHead';
import {
    createFirebasePasswordAccount,
    firebaseIsConfigured,
    getGoogleRedirectResult,
    signInWithFirebasePassword,
    signInWithGooglePopupOrRedirect,
    signOutFirebase,
} from '../lib/firebase';

interface Props {
    children: ReactNode;
    title?: string;
    description?: string;
}

type LanguageCode = 'km' | 'en' | 'vi';
type AuthMode = 'signin' | 'signup';
type AuthLoadingAction = 'google-signin' | 'google-signup' | 'facebook-signin' | 'facebook-signup' | 'email-signin' | 'email-signup' | null;

const languageStorageToCode: Record<string, LanguageCode> = {
    km: 'km',
    en: 'en',
    vi: 'vi',
    'ភាសាខ្មែរ': 'km',
    English: 'en',
    Khmer: 'km',
    'Tiếng Việt': 'vi',
    Vietnamese: 'vi',
};

const customerNav = [
    { label: 'Home', labelKey: 'nav.home', href: '/', icon: Home },
    { label: 'Manual Order', labelKey: 'nav.manual_order', href: '/manual-order', icon: ClipboardList },
    { label: 'Contact', labelKey: 'nav.contact', href: '/contact', icon: PhoneCall },
];

const customerLinks = [
    { label: 'Account Overview', labelKey: 'nav.account_overview', href: '/account', icon: User },
    { label: 'Personal Information', labelKey: 'nav.personal_information', href: '/profile', icon: UserRound },
    { label: 'Create Manual Order', labelKey: 'nav.create_manual_order', href: '/manual-order', icon: ClipboardList },
    { label: 'My Orders', labelKey: 'nav.my_orders', href: '/my-orders', icon: PackageCheck },
    { label: 'Receipts', labelKey: 'nav.receipts', href: '/receipts', icon: ReceiptText },
    { label: 'Security', labelKey: 'nav.security', href: '/security', icon: Shield },
    { label: 'Contact Support', labelKey: 'nav.contact_support', href: '/contact', icon: PhoneCall },
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

function TelegramIcon() {
    return (
        <svg className="h-5 w-5 shrink-0 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.02-.27 0-.11.02-1.93 1.23-5.46 3.62-.51.35-.98.52-1.4.51-.46-.01-1.35-.26-2.01-.48-.81-.27-1.46-.42-1.4-.88.03-.24.36-.49.99-.75 3.88-1.69 6.46-2.8 7.74-3.33 3.68-1.5 4.44-1.76 4.94-1.77.11 0 .36.03.52.16.14.11.18.27.19.38 0 .08.01.21 0 .32z"/>
        </svg>
    );
}

export default function MainLayout({ children, title, description }: Props) {
    const { auth, general_settings, flash, global_nav, telegram_bot_username, telegram_bot_id }: any = usePage().props;
    const { url, component } = usePage();
    const isHome = component === 'Home';
    const { t, i18n } = useTranslation();
    const [isManualOrderOpen, setIsManualOrderOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [language, setLanguage] = useState<LanguageCode>('en');
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
    const [isAuthChoiceOpen, setIsAuthChoiceOpen] = useState(false);
    const [authMode, setAuthMode] = useState<AuthMode>('signin');
    const [authLoading, setAuthLoading] = useState<AuthLoadingAction>(null);
    const [authError, setAuthError] = useState<string | null>(null);
    const [firebaseIsConfiguredState, setFirebaseIsConfiguredState] = useState(false);
    const [isMiniApp, setIsMiniApp] = useState(false);
    const [showModalSigninPassword, setShowModalSigninPassword] = useState(false);
    const [showModalSignupPassword, setShowModalSignupPassword] = useState(false);
    const [showModalConfirmPassword, setShowModalConfirmPassword] = useState(false);
    const [signinForm, setSigninForm] = useState({ email: '', password: '', remember: true });
    const [signupMethod, setSignupMethod] = useState<'email' | 'phone'>('email');
    const [countryCode, setCountryCode] = useState('+855');
    const [customCountryCode, setCustomCountryCode] = useState('+');
    const [signupForm, setSignupForm] = useState({ name: '', email: '', phone: '', password: '', passwordConfirmation: '', acceptTerms: false });
    const accountRef = useRef<HTMLDivElement>(null);
    const accountButtonRef = useRef<HTMLButtonElement>(null);
    const authCloseButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (telegram_bot_id && !document.getElementById('telegram-widget-script')) {
            const script = document.createElement('script');
            script.id = 'telegram-widget-script';
            script.src = 'https://telegram.org/js/telegram-widget.js?22';
            script.async = true;
            document.body.appendChild(script);
        }
    }, [telegram_bot_id]);

    const handleTelegramWidgetAuth = async (user: any) => {
        setAuthLoading('telegram-widget');
        setAuthError(null);
        try {
            const response = await axios.post('/api/auth/telegram-widget', user);
            if (response.data.success) {
                setIsAuthChoiceOpen(false);
                window.location.assign('/');
            }
        } catch (err: any) {
            setAuthError(err.response?.data?.error || 'Telegram authentication failed.');
        } finally {
            setAuthLoading(null);
        }
    };

    const translatedLabel = (key: string, fallback: string) => {
        const translated = t(key);
        return translated === key ? fallback : translated;
    };

    const getPageTitle = (slug: string, defaultLabel: string, labelKey: string) => {
        const p = global_nav?.pages?.find((p: any) => p.slug === slug);
        const fallback = translatedLabel(labelKey, defaultLabel);
        if (p) {
            const key = `title_${language}`;
            if (p[key]) return p[key];
            if (p.is_system) return fallback;
            return p.title || fallback;
        }
        return fallback;
    };

    const dynamicCustomerNav = customerNav.map(nav => {
        if (nav.href === '/') {
            return { ...nav, dynamicLabel: getPageTitle('home', nav.label, nav.labelKey) };
        }
        if (nav.href === '/contact') {
            return { ...nav, dynamicLabel: getPageTitle('contact-us', nav.label, nav.labelKey) };
        }
        return { ...nav, dynamicLabel: translatedLabel(nav.labelKey, nav.label) };
    });

    const isCmsUser = Boolean(auth?.user?.is_admin) || ['admin', 'super_admin', 'logistics', 'content', 'support'].includes(auth?.user?.role);
    const customerUser = auth?.user && !isCmsUser ? auth.user : null;
    const isCustomerProfileIncomplete = Boolean(customerUser && customerUser.profile_is_complete === false);
    const isTransparent = isHome && !isScrolled && !isMobile;
    const headerTheme = isTransparent ? 'light' : 'dark';

    const isActiveNavItem = (href: string) => {
        if (href === '/') return url === '/';
        if (href === '/manual-order') return url === '/manual-order' || url.startsWith('/manual-order/');
        return url === href || url.startsWith(`${href}/`);
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const nextIsDark = savedTheme === 'dark';
        setIsDarkMode(nextIsDark);
        document.documentElement.classList.toggle('dark', nextIsDark);

        const savedLanguage = localStorage.getItem('language');
        const preferredLanguage = languageStorageToCode[savedLanguage || ''] || languageStorageToCode[auth?.user?.preferred_locale] || 'en';
        setLanguage(preferredLanguage);
        if (i18n.language !== preferredLanguage) i18n.changeLanguage(preferredLanguage);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', checkMobile, { passive: true });
        handleScroll();
        checkMobile();

        const handleOpenLoginModal = () => {
            openAuthModal('signin');
        };
        window.addEventListener('open-login-modal', handleOpenLoginModal);

        if (flash?.open_login_modal) {
            openAuthModal(flash.open_login_modal as AuthMode);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('open-login-modal', handleOpenLoginModal);
        };
    }, [flash?.open_login_modal]);

    useEffect(() => {
        const tg = (window as any).Telegram?.WebApp;
        if (tg && tg.initData && (!customerUser || !customerUser.telegram_id)) {
            setIsMiniApp(true);
            tg.ready();
            tg.expand();
            
            setAuthLoading('telegram-miniapp');
            axios.post('/api/auth/telegram-miniapp', { initData: tg.initData })
                .then(res => {
                    if (res.data.success) {
                        router.reload({ only: ['auth'] });
                    }
                })
                .catch(err => {
                    console.error("Mini App Auth Error:", err);
                    setAuthError(err.response?.data?.error || 'Mini App authentication failed');
                })
                .finally(() => {
                    setAuthLoading(null);
                });
        }
    }, [customerUser]);

    useEffect(() => {
        const handlePointerDown = (event: MouseEvent) => {
            if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
                setIsAccountMenuOpen(false);
            }
        };
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsAccountMenuOpen(false);
                setIsAuthChoiceOpen(false);
                accountButtonRef.current?.focus();
            }
        };
        document.addEventListener('mousedown', handlePointerDown);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handlePointerDown);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        document.body.style.overflow = isManualOrderOpen || isAuthChoiceOpen ? 'hidden' : 'unset';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isManualOrderOpen, isAuthChoiceOpen]);

    useEffect(() => {
        if (!isAuthChoiceOpen) return;
        const previouslyFocused = document.activeElement as HTMLElement | null;
        authCloseButtonRef.current?.focus();
        return () => previouslyFocused?.focus();
    }, [isAuthChoiceOpen]);

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

        window.location.assign('/');
    };

    useEffect(() => {
        let active = true;

        getGoogleRedirectResult()
            .then(async (result) => {
                if (!active || !result?.user) return;
                setAuthLoading('google-signin');
                await completeBackendLogin(await result.user.getIdToken(), 'signin');
            })
            .catch((authError) => {
                if (!active) return;
                setAuthError(errorMessage(authError?.code));
                setIsAuthChoiceOpen(true);
            })
            .finally(() => active && setAuthLoading(null));

        return () => {
            active = false;
        };
    }, []);

    const changeLanguage = (nextLanguage: LanguageCode) => {
        setLanguage(nextLanguage);
        localStorage.setItem('language', nextLanguage);
        i18n.changeLanguage(nextLanguage);
    };

    const toggleDarkMode = () => {
        const next = !isDarkMode;
        setIsDarkMode(next);
        document.documentElement.classList.toggle('dark', next);
        localStorage.setItem('theme', next ? 'dark' : 'light');
    };

    const logoutCustomer = async () => {
        try {
            await signOutFirebase();
        } finally {
            router.post('/logout');
        }
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

    const openAuthModal = (mode: AuthMode = 'signin') => {
        setAuthMode(mode);
        setAuthError(null);
        setIsAuthChoiceOpen(true);
    };

    const switchAuthMode = (mode: AuthMode) => {
        setAuthMode(mode);
        setAuthError(null);
    };

    const handleGoogleAuth = async (intent: AuthMode) => {
        setAuthLoading(intent === 'signin' ? 'google-signin' : 'google-signup');
        setAuthError(null);

        try {
            const result = await signInWithGooglePopupOrRedirect();
            if (!result?.user) return;
            await completeBackendLogin(await result.user.getIdToken(), intent);
        } catch (authError: any) {
            setAuthError(authError?.response?.data?.message || authError?.response?.data?.errors?.id_token?.[0] || errorMessage(authError?.code));
            setAuthLoading(null);
        }
    };


    const submitModalSignIn = (event: FormEvent) => {
        event.preventDefault();
        setAuthLoading('email-signin');
        setAuthError(null);

        router.post('/login', {
            email: signinForm.email,
            password: signinForm.password,
            remember: signinForm.remember,
        }, {
            preserveScroll: true,
            onError: (errors) => {
                setAuthError(errors.email || errors.password || t('login.error_invalid_credentials'));
                setAuthLoading(null);
            },
            onSuccess: () => {
                setIsAuthChoiceOpen(false);
                setAuthLoading(null);
            },
            onFinish: () => {
                // Keep loading state true if redirecting to manual-order, but onFinish usually fires after navigation
            }
        });
    };

    const submitModalSignUp = (event: FormEvent) => {
        event.preventDefault();
        setAuthError(null);

        if (signupForm.password !== signupForm.passwordConfirmation) {
            setAuthError(t('login.error_password_mismatch'));
            return;
        }

        if (!signupForm.acceptTerms) {
            setAuthError(t('login.error_terms_required'));
            return;
        }

        setAuthLoading('email-signup');

        router.post('/register', {
            name: signupForm.name,
            email: signupMethod === 'email' ? signupForm.email : '',
            phone: signupMethod === 'phone' ? (countryCode === 'other' ? `${customCountryCode} ${signupForm.phone}` : `${countryCode} ${signupForm.phone}`) : '',
            password: signupForm.password,
            password_confirmation: signupForm.passwordConfirmation,
        }, {
            preserveScroll: true,
            onError: (errors) => {
                setAuthError(errors.email || errors.phone || errors.password || errors.name || t('login.error_backend'));
                setAuthLoading(null);
            },
            onSuccess: () => {
                setIsAuthChoiceOpen(false);
                setAuthLoading(null);
            },
        });
    };

    const navToneClass = isTransparent
        ? 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]'
        : 'text-gray-950 dark:text-white';

    const navLinkClass = (href: string) => {
        const isActive = isActiveNavItem(href);
        const base = 'inline-flex min-h-11 items-center gap-2 rounded-2xl px-4 py-2 text-sm font-black uppercase tracking-wider transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60 active:scale-95 overflow-hidden relative border border-transparent';
        
        const glassEffect = 'bg-white/20 dark:bg-white/10 backdrop-blur-md border-white/30 dark:border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)]';
        
        let stateClass = '';
        if (isActive) {
            stateClass = isTransparent 
                ? `text-white ${glassEffect} scale-105`
                : `text-[#1c55c0] dark:text-[#3b82f6] bg-[#1c55c0]/15 dark:bg-[#3b82f6]/20 !border-[#1c55c0]/30 dark:!border-[#3b82f6]/30 shadow-sm`;
        } else {
            stateClass = isTransparent
                ? `hover:text-white hover:${glassEffect} hover:scale-105`
                : `hover:text-[#1c55c0] dark:hover:text-[#3b82f6] bg-gradient-to-r from-[#1c55c0]/15 to-[#1c55c0]/15 dark:from-[#3b82f6]/15 dark:to-[#3b82f6]/15 bg-[length:0%_100%] bg-no-repeat bg-center transition-[background-size,border-color,color] duration-300 ease-out hover:bg-[length:100%_100%] hover:!border-[#1c55c0]/30 dark:hover:!border-[#3b82f6]/30`;
        }
        
        return [base, navToneClass, stateClass].join(' ');
    };

    const iconButtonClass = [
        'inline-flex h-11 w-11 items-center justify-center rounded-full transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60 active:scale-[0.98] motion-reduce:active:scale-100',
        isTransparent ? 'text-white hover:bg-white/12' : 'text-gray-950 hover:bg-black/5 dark:text-white dark:hover:bg-white/10',
    ].join(' ');

    return (
        <div className="min-h-[100dvh] overflow-x-hidden bg-white font-sans antialiased text-brand-gray transition-colors duration-300 [--public-header-height:5rem] [--public-header-offset:5rem] dark:bg-gray-950 dark:text-gray-300 lg:[--public-header-height:6rem] lg:[--public-header-offset:6rem]">
            <SeoHead title={title} description={description} />
            <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-xl focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-black focus:text-gray-950 focus:shadow-lg">
                Skip to content
            </a>

            <BottomNavigation 
                onOpenManualOrder={() => {
                    if (!customerUser) {
                        openAuthModal('signin');
                    } else {
                        router.visit('/manual-order');
                    }
                }} 
                onOpenAuthModal={() => openAuthModal('signin')}
                unreadNotificationsCount={auth?.user?.unread_notifications || 0} 
            />
            
            <ManualOrderSheet 
                isOpen={isManualOrderOpen}
                onClose={() => setIsManualOrderOpen(false)}
            />

            <header
                data-header-state={isScrolled ? 'solid' : 'transparent'}
                data-header-theme={headerTheme}
                className={[
                    !isHome ? 'hidden lg:block' : '',
                    'relative lg:fixed w-full inset-x-0 top-0 z-[60] transition-[background-color,border-color,box-shadow,backdrop-filter] duration-200 ease-out motion-reduce:transition-none',
                    isTransparent
                        ? 'border-b border-transparent bg-transparent'
                        : 'border-b border-gray-200/80 bg-white/95 shadow-sm backdrop-blur-xl dark:border-gray-800/80 dark:bg-gray-950/95',
                ].join(' ')}
            >
                {isTransparent && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 hidden lg:block bg-gradient-to-b from-black/45 via-black/20 to-transparent" />}

                <div className="relative mx-auto grid h-20 max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6 lg:h-24 lg:px-8">
                    <div className="flex items-center lg:hidden">
                        <button type="button" onClick={toggleDarkMode} className={iconButtonClass} aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
                            {isDarkMode ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />}
                        </button>
                    </div>
                    <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
                        {dynamicCustomerNav.map((item) => {
                            if (item.href === '/manual-order' && !customerUser) {
                                return (
                                    <button
                                        key={item.href}
                                        type="button"
                                        onClick={() => openAuthModal('signin')}
                                        className={navLinkClass(item.href)}
                                    >
                                        <item.icon className="h-4 w-4" aria-hidden="true" />
                                        {item.dynamicLabel}
                                    </button>
                                );
                            }
                            return (
                                <Link key={item.href} href={item.href} prefetch={['mount', 'hover']} className={navLinkClass(item.href)} aria-current={isActiveNavItem(item.href) ? 'page' : undefined}>
                                    <item.icon className="h-4 w-4" aria-hidden="true" />
                                    {item.dynamicLabel}
                                </Link>
                            );
                        })}
                    </nav>



                    <Link href="/" prefetch={['mount', 'hover']} className={`inline-flex justify-self-center rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60 ${!isTransparent ? 'dark:bg-white dark:p-1.5 dark:shadow-[0_0_0_2px_rgba(255,255,255,0.1)]' : ''}`}>
                        {general_settings?.store_logo ? (
                            <img
                                src={general_settings.store_logo}
                                alt={general_settings?.store_name || 'Store Logo'}
                                className="h-14 w-auto object-contain transition-[height] duration-200 lg:h-20"
                            />
                        ) : (
                            <span className={`text-xl font-black tracking-tight lg:text-2xl ${navToneClass}`}>{general_settings?.store_name || 'RafelEiffel'}</span>
                        )}
                    </Link>

                    <div className="flex items-center justify-end gap-1 lg:gap-2">
                        <div className="block">
                            <RegionSettings language={language} changeLanguage={changeLanguage} tone={isTransparent ? 'light' : 'dark'} />
                        </div>

                        <Link href="/my-orders" prefetch={['mount', 'hover']} className={`!hidden lg:!inline-flex ${iconButtonClass}`} aria-label={translatedLabel('nav.my_orders', 'My Orders')}>
                            <PackageCheck className="h-5 w-5" aria-hidden="true" />
                        </Link>

                        <button type="button" onClick={toggleDarkMode} className={`!hidden lg:!inline-flex ${iconButtonClass}`} aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
                            {isDarkMode ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />}
                        </button>

                        {customerUser ? (
                            <div ref={accountRef} className="relative hidden lg:block">
                                <button
                                    ref={accountButtonRef}
                                    type="button"
                                    aria-haspopup="menu"
                                    aria-expanded={isAccountMenuOpen}
                                    aria-controls="customer-account-menu"
                                    className={[
                                        'inline-flex min-h-11 items-center gap-2 rounded-full px-2.5 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60 active:scale-[0.98] motion-reduce:active:scale-100',
                                        isTransparent ? 'text-white hover:bg-white/12' : 'text-gray-950 hover:bg-black/5 dark:text-white dark:hover:bg-white/10',
                                        isAccountMenuOpen ? (isTransparent ? 'bg-white/14' : 'bg-black/5 dark:bg-white/10') : '',
                                    ].join(' ')}
                                    onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                                >
                                    {customerUser.avatar || customerUser.avatar_path ? (
                                        <img src={customerUser.avatar || customerUser.avatar_path} alt="" className="h-8 w-8 rounded-full object-cover ring-1 ring-white/50" />
                                    ) : (
                                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/16 ring-1 ring-current/15">
                                            <UserRound className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                    )}
                                    <span className="hidden max-w-[8rem] truncate text-sm font-bold lg:inline xl:max-w-[12rem] 2xl:hidden">{customerUser.name.split(' ')[0] || customerUser.name}</span>
                                    <span className="hidden max-w-[16rem] truncate text-sm font-bold 2xl:inline">{customerUser.name}</span>
                                    <ChevronDown className={`hidden h-4 w-4 transition sm:block ${isAccountMenuOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                                </button>

                                {isAccountMenuOpen && (
                                    <div
                                        id="customer-account-menu"
                                        role="menu"
                                        className="absolute right-0 top-full z-[130] mt-3 w-[min(22rem,calc(100vw-2rem))] origin-top-right overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900"
                                    >
                                        <div className="flex gap-3 border-b border-gray-100 p-4 dark:border-gray-800">
                                            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-100">
                                                {customerUser.avatar || customerUser.avatar_path ? (
                                                    <img src={customerUser.avatar || customerUser.avatar_path} alt="" className="h-12 w-12 rounded-full object-cover" />
                                                ) : (
                                                    <UserRound className="h-6 w-6" aria-hidden="true" />
                                                )}
                                            </span>
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-black text-gray-950 dark:text-white">{customerUser.name}</p>
                                                <p className="truncate text-xs font-semibold text-gray-500 dark:text-gray-400">{customerUser.email}</p>
                                                <p className="mt-1 truncate font-mono text-xs font-black text-brand-primary">{customerUser.customer_code || translatedLabel('nav.customer_id_pending', 'Customer ID pending')}</p>
                                            </div>
                                        </div>
                                        <div className="p-1">

                                            {customerLinks.map((item) => (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    role="menuitem"
                                                    className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 ${
                                                        isActiveNavItem(item.href) ? 'bg-brand-primary/10 text-brand-primary' : 'text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800'
                                                    }`}
                                                    onClick={() => setIsAccountMenuOpen(false)}
                                                >
                                                    <item.icon className="h-4 w-4" aria-hidden="true" />
                                                    {translatedLabel(item.labelKey, item.label)}
                                                </Link>
                                            ))}
                                        </div>
                                        <div className="border-t border-gray-100 p-1 dark:border-gray-800">
                                            <button
                                                type="button"
                                                onClick={logoutCustomer}
                                                role="menuitem"
                                                className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-black text-gray-800 transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 dark:text-gray-100 dark:hover:bg-gray-800"
                                            >
                                                <LogOut className="h-4 w-4" aria-hidden="true" />
                                                {translatedLabel('nav.logout', 'Logout')}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => openAuthModal('signin')}
                                className={`${iconButtonClass} hidden lg:inline-flex lg:w-auto lg:px-3`}
                                aria-label="Customer login"
                                aria-haspopup="dialog"
                            >
                                <LogIn className="h-5 w-5" aria-hidden="true" />
                                <span className="hidden text-sm font-black lg:inline">{translatedLabel('nav.login', 'Login')}</span>
                            </button>
                        )}
                    </div>
                </div>
            </header>

            {isAuthChoiceOpen && (
                <div
                    className="fixed inset-0 z-[180] flex items-end sm:items-center justify-center p-0 sm:p-4 sm:p-6"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="customer-auth-choice-title"
                >
                    <button
                        type="button"
                        className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
                        onClick={() => setIsAuthChoiceOpen(false)}
                        aria-label="Close login options"
                    />
                    <section className="relative w-full max-w-lg rounded-t-3xl sm:rounded-3xl overflow-y-auto overflow-x-hidden bg-white shadow-[0_-4px_60px_rgba(15,23,42,0.24)] ring-1 ring-white/40 dark:bg-[#0f172a] dark:ring-white/10 sm:max-w-6xl max-h-[92dvh] sm:max-h-[90vh] flex flex-col">
                        {/* Compact close button — top-right, small and clean */}
                        <button
                            ref={authCloseButtonRef}
                            type="button"
                            onClick={() => setIsAuthChoiceOpen(false)}
                            className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-500 shadow-sm ring-1 ring-slate-200/70 transition hover:bg-slate-100 hover:text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 dark:bg-slate-800 dark:ring-white/10 dark:text-slate-300 dark:hover:bg-slate-700"
                            aria-label="Close"
                        >
                            <X className="h-4 w-4" />
                        </button>

                        <div className="customer-auth-modal relative grid lg:grid-cols-[1.1fr_1fr]">
                            
                            {/* ── LEFT VISUAL PANEL (White Theme) ── */}
                            <aside className="relative hidden min-h-[36rem] flex-col justify-center bg-[#f8fafc] p-10 dark:bg-[#1e293b] lg:flex lg:p-14">
                                <div className="mb-12 flex items-center gap-4">
                                    <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200 dark:bg-white">
                                        <img src={general_settings?.store_logo || '/logo.png'} alt={general_settings?.store_name || 'MVM Logistics'} className="h-8 w-8 object-contain" />
                                    </span>
                                    <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">
                                        {general_settings?.store_name || 'MVM Logistics'}
                                    </p>
                                </div>

                                <h3 className="max-w-[20rem] text-4xl font-black leading-[1.15] tracking-tight text-slate-900 dark:text-white xl:text-5xl">
                                    {translatedLabel('login.visual_headline', 'Manual orders, tracking, and receipts in one place.')}
                                </h3>
                                <p className="mt-6 max-w-[22rem] text-base font-medium leading-relaxed text-slate-500 dark:text-slate-400">
                                    {translatedLabel('login.visual_desc', 'Create requests faster and follow your shipment from review to delivery.')}
                                </p>

                                <div className="mt-8 flex flex-wrap gap-2">
                                    {(['login.badge_fast', 'login.badge_secure', 'login.badge_track'] as const).map((key, i) => {
                                        const icons = [<Zap key={0} className="h-4 w-4 text-brand-primary" />, <ShieldCheck key={1} className="h-4 w-4 text-brand-primary" />, <Truck key={2} className="h-4 w-4 text-brand-primary" />];
                                        return (
                                            <span key={i} className="inline-flex h-9 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                                {icons[i]} {translatedLabel(key, ['Fast', 'Secure', 'Track'][i])}
                                            </span>
                                        );
                                    })}
                                </div>
                            </aside>

                            {/* ── FORM PANEL ── */}
                            <div className="relative flex flex-col overflow-y-auto p-6 sm:p-10 max-h-[80dvh] sm:max-h-none">
                            {/* Compact heading — hidden on lg since it's in the left panel */}
                            <div className="mb-3 flex items-center gap-3 pr-10 lg:hidden">
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow ring-1 ring-slate-200 dark:bg-white">
                                    <img src={general_settings?.store_logo || '/logo.png'} alt={general_settings?.store_name || 'MVM Logistics'} className="h-7 w-7 object-contain" />
                                </span>
                                <div className="min-w-0">
                                    <p className="text-[0.6rem] font-black uppercase tracking-[0.3em] text-brand-primary">{general_settings?.store_name || 'MVM Logistics'}</p>
                                    <h2 id="customer-auth-choice-title" className="truncate text-xl font-black tracking-tight text-slate-950 dark:text-white sm:text-2xl">
                                        {authMode === 'signin' ? translatedLabel('nav.customer_login', 'Customer Login') : translatedLabel('login.signup_heading', 'Create Account')}
                                    </h2>
                                </div>
                            </div>

                            <p className="mb-1 text-sm font-semibold leading-6 text-slate-500 dark:text-slate-400">
                                {authMode === 'signin'
                                    ? translatedLabel('login.signin_description', 'Sign in to create Manual Orders and track your deliveries.')
                                    : translatedLabel('login.signup_description', 'Create an account to submit Manual Orders and follow your order status.')}
                            </p>

                            {/* Compact segmented tab control */}
                            <div className="mt-3 grid grid-cols-2 rounded-xl bg-slate-100 p-1 dark:bg-white/8" role="tablist" aria-label="Authentication mode">
                                <button
                                    type="button"
                                    role="tab"
                                    aria-selected={authMode === 'signin'}
                                    onClick={() => switchAuthMode('signin')}
                                    className={`min-h-[44px] rounded-lg text-sm font-black transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/30 ${
                                        authMode === 'signin' ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/25' : 'text-slate-500 hover:bg-white/70 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white'
                                    }`}
                                >
                                    {translatedLabel('login.signin_tab', 'Sign In')}
                                </button>
                                <button
                                    type="button"
                                    role="tab"
                                    aria-selected={authMode === 'signup'}
                                    onClick={() => switchAuthMode('signup')}
                                    className={`min-h-[44px] rounded-lg text-sm font-black transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/30 ${
                                        authMode === 'signup' ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/25' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white'
                                    }`}
                                >
                                    {translatedLabel('login.signup_tab', 'Sign Up')}
                                </button>
                            </div>

                            {authError && (
                                <div role="alert" aria-live="assertive" className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700 dark:border-red-400/30 dark:bg-red-500/12 dark:text-red-100">
                                    {authError}
                                </div>
                            )}

                            {authMode === 'signin' ? (
                                <div className="mt-4 space-y-3">
                                    <button
                                        type="button"
                                        onClick={() => handleGoogleAuth('signin')}
                                        disabled={authLoading !== null || !firebaseIsConfigured}
                                        className="inline-flex min-h-[48px] w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/40 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white dark:text-slate-950"
                                    >
                                        {authLoading === 'google-signin' ? <Loader2 className="h-5 w-5 animate-spin" /> : <GoogleIcon />}
                                        {authLoading === 'google-signin' ? t('login.loading') : t('login.continue_google')}
                                    </button>
                                    
                                    {telegram_bot_id && !isMiniApp && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if ((window as any).Telegram?.Login?.auth) {
                                                    setAuthLoading('telegram-widget');
                                                    (window as any).Telegram.Login.auth(
                                                        { bot_id: telegram_bot_id, request_access: 'write' },
                                                        (user: any) => {
                                                            if (user) {
                                                                handleTelegramWidgetAuth(user);
                                                            } else {
                                                                setAuthLoading(null);
                                                            }
                                                        }
                                                    );
                                                } else {
                                                    setAuthError('Telegram login is not available yet. Please wait a moment.');
                                                }
                                            }}
                                            disabled={authLoading !== null}
                                            className="inline-flex min-h-[48px] w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/40 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white dark:text-slate-950"
                                        >
                                            {authLoading === 'telegram-widget' ? <Loader2 className="h-5 w-5 animate-spin" /> : <TelegramIcon />}
                                            {authLoading === 'telegram-widget' ? t('login.loading') : t('login.continue_telegram', { defaultValue: 'Continue with Telegram' })}
                                        </button>
                                    )}

                                    <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                                        <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
                                        {t('login.or_continue_email')}
                                        <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
                                    </div>

                                    <form onSubmit={submitModalSignIn} className="space-y-3">
                                        {/* Email or Phone field */}
                                        <label className="block">
                                            <span className="mb-1 block text-xs font-bold text-slate-600 dark:text-slate-300">{t('login.email_or_phone', { defaultValue: 'Email address or phone number' })}</span>
                                            <span className="relative block">
                                                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                                <input
                                                    type="text"
                                                    value={signinForm.email}
                                                    onChange={(event) => setSigninForm({ ...signinForm, email: event.target.value })}
                                                    className="auth-input-left-icon h-[52px] w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-bold text-slate-950 placeholder:text-slate-400 shadow-sm transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15 dark:border-white/10 dark:bg-slate-800 dark:text-white"
                                                    placeholder={t('login.email_or_phone', { defaultValue: 'Email address or phone number' })}
                                                    autoComplete="username"
                                                    required
                                                />
                                            </span>
                                        </label>

                                        {/* Password field */}
                                        <label className="block">
                                            <span className="mb-1 block text-xs font-bold text-slate-600 dark:text-slate-300">{t('login.password')}</span>
                                            <span className="relative block">
                                                <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                                <input
                                                    type={showModalSigninPassword ? 'text' : 'password'}
                                                    value={signinForm.password}
                                                    onChange={(event) => setSigninForm({ ...signinForm, password: event.target.value })}
                                                    className="auth-input-left-icon auth-input-has-action h-[52px] w-full rounded-xl border border-slate-200 bg-white pl-11 pr-12 text-sm font-bold text-slate-950 placeholder:text-slate-400 shadow-sm transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15 dark:border-white/10 dark:bg-slate-800 dark:text-white"
                                                    placeholder={t('login.password')}
                                                    autoComplete="current-password"
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowModalSigninPassword(!showModalSigninPassword)}
                                                    className="absolute right-2.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 dark:hover:bg-white/10"
                                                    aria-label={showModalSigninPassword ? 'Hide password' : 'Show password'}
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </button>
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
                                            <button
                                                type="button"
                                                onClick={() => window.location.assign('/forgot-password')}
                                                className="font-black text-brand-primary hover:text-brand-secondary hover:underline"
                                            >
                                                {t('login.forgot_password')}
                                            </button>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={authLoading !== null}
                                            className="inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-xl bg-brand-primary px-5 text-sm font-black text-white shadow-lg shadow-brand-primary/25 transition hover:-translate-y-0.5 hover:bg-brand-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/30 disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            {authLoading === 'email-signin' ? <Loader2 className="h-5 w-5 animate-spin" /> : <LogIn className="h-5 w-5" />}
                                            {authLoading === 'email-signin' ? t('login.loading') : t('login.signin_button')}
                                        </button>
                                    </form>
                                </div>
                            ) : (
                                <form onSubmit={submitModalSignUp} className="mt-4 space-y-3">
                                    <button
                                        type="button"
                                        onClick={() => handleGoogleAuth('signup')}
                                        disabled={authLoading !== null || !firebaseIsConfigured}
                                        className="inline-flex min-h-[48px] w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/40 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white dark:text-slate-950"
                                    >
                                        {authLoading === 'google-signup' ? <Loader2 className="h-5 w-5 animate-spin" /> : <GoogleIcon />}
                                        {authLoading === 'google-signup' ? t('login.loading') : t('login.signup_google')}
                                    </button>

                                    {telegram_bot_id && !isMiniApp && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if ((window as any).Telegram?.Login?.auth) {
                                                    setAuthLoading('telegram-widget');
                                                    (window as any).Telegram.Login.auth(
                                                        { bot_id: telegram_bot_id, request_access: 'write' },
                                                        (user: any) => {
                                                            if (user) {
                                                                handleTelegramWidgetAuth(user);
                                                            } else {
                                                                setAuthLoading(null);
                                                            }
                                                        }
                                                    );
                                                } else {
                                                    setAuthError('Telegram login is not available yet. Please wait a moment.');
                                                }
                                            }}
                                            disabled={authLoading !== null}
                                            className="inline-flex min-h-[48px] w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/40 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-white dark:text-slate-950"
                                        >
                                            {authLoading === 'telegram-widget' ? <Loader2 className="h-5 w-5 animate-spin" /> : <TelegramIcon />}
                                            {authLoading === 'telegram-widget' ? t('login.loading') : t('login.signup_telegram', { defaultValue: 'Sign up with Telegram' })}
                                        </button>
                                    )}
                                    <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                                        <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
                                        {t('login.or_signup_email')}
                                        <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
                                    </div>

                                    <div className="flex rounded-lg bg-slate-100 p-1 dark:bg-white/5 mb-2 mt-4">
                                        <button
                                            type="button"
                                            onClick={() => setSignupMethod('email')}
                                            className={`flex-1 rounded-md py-1.5 text-xs font-bold transition-colors ${
                                                signupMethod === 'email'
                                                    ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white'
                                                    : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                                            }`}
                                        >
                                            {t('login.signup_email', { defaultValue: 'Sign up with Email' })}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setSignupMethod('phone')}
                                            className={`flex-1 rounded-md py-1.5 text-xs font-bold transition-colors ${
                                                signupMethod === 'phone'
                                                    ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white'
                                                    : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                                            }`}
                                        >
                                            {t('login.signup_phone', { defaultValue: 'Sign up with Phone' })}
                                        </button>
                                    </div>

                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <label className="block sm:col-span-2">
                                            <span className="mb-1 block text-xs font-bold text-slate-600 dark:text-slate-300">{t('login.full_name')}</span>
                                            <input
                                                type="text"
                                                value={signupForm.name}
                                                onChange={(event) => setSignupForm({ ...signupForm, name: event.target.value })}
                                                className="h-[52px] w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-950 placeholder:text-slate-400 shadow-sm transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15 dark:border-white/10 dark:bg-slate-800 dark:text-white"
                                                placeholder={t('login.full_name_placeholder')}
                                                autoComplete="name"
                                                required
                                            />
                                        </label>
                                        
                                        {signupMethod === 'email' ? (
                                            <label className="block sm:col-span-2">
                                                <span className="mb-1 block text-xs font-bold text-slate-600 dark:text-slate-300">{t('login.email')}</span>
                                                <input
                                                    type="email"
                                                    value={signupForm.email}
                                                    onChange={(event) => setSignupForm({ ...signupForm, email: event.target.value })}
                                                    className="h-[52px] w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-950 placeholder:text-slate-400 shadow-sm transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15 dark:border-white/10 dark:bg-slate-800 dark:text-white"
                                                    placeholder={t('login.email')}
                                                    autoComplete="email"
                                                    required
                                                />
                                            </label>
                                        ) : (
                                            <label className="block sm:col-span-2">
                                                <span className="mb-1 block text-xs font-bold text-slate-600 dark:text-slate-300">Phone Number</span>
                                                <div className="flex gap-2">
                                                    {countryCode === 'other' ? (
                                                        <div className="relative h-[52px] w-[120px] shrink-0">
                                                            <input 
                                                                type="text" 
                                                                value={customCountryCode}
                                                                onChange={(e) => setCustomCountryCode(e.target.value)}
                                                                className="h-full w-full rounded-xl border border-slate-200 bg-white pl-3 pr-8 text-sm font-bold text-slate-950 shadow-sm transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15 dark:border-white/10 dark:bg-slate-800 dark:text-white"
                                                                placeholder="+Code"
                                                                required
                                                            />
                                                            <button 
                                                                type="button" 
                                                                onClick={() => setCountryCode('+855')} 
                                                                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                                            >
                                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <select
                                                            value={countryCode}
                                                            onChange={(e) => setCountryCode(e.target.value)}
                                                            className="h-[52px] w-[120px] shrink-0 rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-950 shadow-sm transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15 dark:border-white/10 dark:bg-slate-800 dark:text-white"
                                                        >
                                                            <option value="+855">🇰🇭 +855</option>
                                                            <option value="+84">🇻🇳 +84</option>
                                                            <option value="+856">🇱🇦 +856</option>
                                                            <option value="+62">🇮🇩 +62</option>
                                                            <option value="other">Other</option>
                                                        </select>
                                                    )}
                                                    <input
                                                        type="tel"
                                                        value={signupForm.phone}
                                                        onChange={(event) => setSignupForm({ ...signupForm, phone: event.target.value })}
                                                        className="h-[52px] flex-1 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-950 placeholder:text-slate-400 shadow-sm transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15 dark:border-white/10 dark:bg-slate-800 dark:text-white"
                                                        placeholder="e.g. 12 345 678"
                                                        autoComplete="tel"
                                                        required
                                                    />
                                                </div>
                                            </label>
                                        )}
                                    </div>

                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <label className="block">
                                            <span className="mb-1 block text-xs font-bold text-slate-600 dark:text-slate-300">{t('login.password')}</span>
                                            <span className="relative block">
                                                <input
                                                    type={showModalSignupPassword ? 'text' : 'password'}
                                                    value={signupForm.password}
                                                    onChange={(event) => setSignupForm({ ...signupForm, password: event.target.value })}
                                                    className="auth-input-has-action h-[52px] w-full rounded-xl border border-slate-200 bg-white px-4 pr-11 text-sm font-bold text-slate-950 placeholder:text-slate-400 shadow-sm transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15 dark:border-white/10 dark:bg-slate-800 dark:text-white"
                                                    placeholder={t('login.password')}
                                                    autoComplete="new-password"
                                                    minLength={8}
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowModalSignupPassword(!showModalSignupPassword)}
                                                    className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 dark:hover:bg-white/10"
                                                    aria-label={showModalSignupPassword ? 'Hide password' : 'Show password'}
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </button>
                                            </span>
                                        </label>
                                        <label className="block">
                                            <span className="mb-1 block text-xs font-bold text-slate-600 dark:text-slate-300">{t('login.confirm_password')}</span>
                                            <span className="relative block">
                                                <input
                                                    type={showModalConfirmPassword ? 'text' : 'password'}
                                                    value={signupForm.passwordConfirmation}
                                                    onChange={(event) => setSignupForm({ ...signupForm, passwordConfirmation: event.target.value })}
                                                    className="auth-input-has-action h-[52px] w-full rounded-xl border border-slate-200 bg-white px-4 pr-11 text-sm font-bold text-slate-950 placeholder:text-slate-400 shadow-sm transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15 dark:border-white/10 dark:bg-slate-800 dark:text-white"
                                                    placeholder={t('login.confirm_password')}
                                                    autoComplete="new-password"
                                                    minLength={8}
                                                    required
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowModalConfirmPassword(!showModalConfirmPassword)}
                                                    className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 dark:hover:bg-white/10"
                                                    aria-label={showModalConfirmPassword ? 'Hide password' : 'Show password'}
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </button>
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
                                            <Link href="/terms-of-service" className="font-black text-brand-primary hover:underline">{t('login.terms')}</Link>
                                            {' '}{t('login.and')}{' '}
                                            <Link href="/privacy-policy" className="font-black text-brand-primary hover:underline">{t('login.privacy')}</Link>.
                                        </span>
                                    </label>

                                    <button
                                        type="submit"
                                        disabled={authLoading !== null}
                                        className="inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-xl bg-brand-primary px-5 text-sm font-black text-white shadow-lg shadow-brand-primary/25 transition hover:-translate-y-0.5 hover:bg-brand-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/30 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {authLoading === 'email-signup' ? <Loader2 className="h-5 w-5 animate-spin" /> : <Check className="h-5 w-5" />}
                                        {authLoading === 'email-signup' ? t('login.loading') : t('login.create_account')}
                                    </button>

                                    <p className="text-center text-xs font-semibold text-slate-500 dark:text-slate-300">
                                        {t('login.have_account')}{' '}
                                        <button type="button" onClick={() => switchAuthMode('signin')} className="font-black text-brand-primary hover:text-brand-secondary hover:underline">
                                            {t('login.signin_tab')}
                                        </button>
                                    </p>
                                </form>
                            )}

                            {/* Contact support link */}
                            <Link
                                href="/contact"
                                onClick={() => setIsAuthChoiceOpen(false)}
                                className="mt-2 inline-flex min-h-[44px] w-full items-center justify-center rounded-xl text-xs font-black text-slate-400 transition hover:bg-slate-50 hover:text-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/20 dark:text-slate-500 dark:hover:bg-white/8 dark:hover:text-slate-300"
                            >
                                {translatedLabel('login.contact_support', 'Contact Support')}
                            </Link>
                            </div>
                        </div>
                    </section>
                </div>
            )}

            <main id="main-content" className={`flex min-h-[100dvh] flex-1 flex-col ${isHome ? '' : 'lg:pt-[var(--public-header-offset)]'}`}>
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="flex flex-col flex-1"
                >
                    {children}
                </motion.div>
            </main>

            <footer className="relative z-10 border-t border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-950">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
                    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                        <div>
                            <Link href="/" className="inline-flex items-center gap-3 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 dark:bg-white dark:p-1.5 dark:shadow-[0_0_0_2px_rgba(255,255,255,0.1)]">
                                {general_settings?.store_logo ? (
                                    <img src={general_settings.store_logo} alt={general_settings?.store_name || 'Store Logo'} className="h-16 w-auto object-contain" />
                                ) : (
                                    <span className="text-2xl font-black text-brand-secondary dark:text-white">{general_settings?.store_name || 'RafelEiffel'}</span>
                                )}
                            </Link>
                            <p className="mt-5 text-sm leading-7 text-gray-600 dark:text-gray-400">
                                {translatedLabel('footer.logistics_desc', `${general_settings?.store_name || 'RafelEiffel'} helps customers create manual orders, coordinate product sourcing, and track logistics orders from submission to delivery.`)}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-sm font-black uppercase tracking-wider text-gray-950 dark:text-white">{translatedLabel('footer.navigation', 'Navigation')}</h3>
                            <ul className="mt-5 space-y-3 text-sm font-bold text-gray-600 dark:text-gray-400">
                                {dynamicCustomerNav.map((item) => (
                                    <li key={item.href}>
                                        <Link href={item.href} prefetch={['mount', 'hover']} className="inline-flex min-h-8 items-center gap-2 rounded-lg transition hover:text-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50">
                                            <item.icon className="h-4 w-4" aria-hidden="true" />
                                            {item.dynamicLabel}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-black uppercase tracking-wider text-gray-950 dark:text-white">{translatedLabel('footer.customer_service', 'Customer Service')}</h3>
                            <ul className="mt-5 space-y-3 text-sm font-bold text-gray-600 dark:text-gray-400">
                                <li><Link href="/my-orders" prefetch={['mount', 'hover']} className="inline-flex min-h-8 items-center gap-2 rounded-lg transition hover:text-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50"><PackageCheck className="h-4 w-4" />{translatedLabel('nav.my_orders', 'My Orders')}</Link></li>
                                <li><Link href="/receipts" prefetch={['mount', 'hover']} className="inline-flex min-h-8 items-center gap-2 rounded-lg transition hover:text-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50"><FileText className="h-4 w-4" />{translatedLabel('nav.receipts', 'Receipts')}</Link></li>
                                <li><Link href="/blog" prefetch={['mount', 'hover']} className="inline-flex min-h-8 items-center gap-2 rounded-lg transition hover:text-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50"><BookOpen className="h-4 w-4" />{translatedLabel('nav.blog', 'Blog')}</Link></li>
                                <li><Link href="/contact" prefetch={['mount', 'hover']} className="inline-flex min-h-8 items-center gap-2 rounded-lg transition hover:text-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50"><PhoneCall className="h-4 w-4" />{translatedLabel('nav.contact_support', 'Contact Support')}</Link></li>
                                <li><Link href="/#faq" className="inline-flex min-h-8 items-center gap-2 rounded-lg transition hover:text-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50"><HelpCircle className="h-4 w-4" />{translatedLabel('faq.title', 'FAQ')}</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-black uppercase tracking-wider text-gray-950 dark:text-white">{translatedLabel('footer.offline_payment', 'Offline Manual Order Payment')}</h3>
                            <p className="mt-5 text-sm leading-7 text-gray-600 dark:text-gray-400">
                                {translatedLabel('footer.offline_payment_desc', 'Our team confirms product pricing, logistics fees, payment instructions, and receipts directly on each order.')}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Blue Wavy Section */}
                <div className="relative w-full mt-4 text-[#1c55c0] dark:text-gray-900 leading-none">
                    <svg className="block w-full h-[60px] md:h-[120px] dark:opacity-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
                        <path fill="currentColor" fillOpacity="0.3" d="M0,160L48,170.7C96,181,192,203,288,181.3C384,160,480,96,576,90.7C672,85,768,139,864,170.7C960,203,1056,213,1152,192C1248,171,1344,117,1392,90.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                        <path fill="currentColor" fillOpacity="0.6" d="M0,224L48,208C96,192,192,160,288,165.3C384,171,480,213,576,213.3C672,213,768,171,864,154.7C960,139,1056,149,1152,160C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                        <path fill="currentColor" fillOpacity="1" d="M0,96L48,122.7C96,149,192,203,288,197.3C384,192,480,128,576,106.7C672,85,768,107,864,144C960,181,1056,235,1152,245.3C1248,256,1344,224,1392,208L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                    
                    <div className="w-full bg-[#1c55c0] dark:bg-gray-900 pb-[calc(7.5rem+env(safe-area-inset-bottom))] lg:pb-8 pt-4 text-white">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-sm gap-6 md:gap-0">
                            {/* Social Icons (Left) */}
                            <div className="flex gap-4 font-medium opacity-90 order-2 md:order-1 items-center md:w-1/3 justify-center md:justify-start">
                                <a href="https://www.facebook.com/MVMLogistics" target="_blank" rel="noreferrer" className="hover:opacity-75 transition-opacity" title="Facebook">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
                                </a>
                                <a href="https://m.me/MVMLogistics" target="_blank" rel="noreferrer" className="hover:opacity-75 transition-opacity" title="Messenger">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.145 2 11.26c0 2.923 1.5 5.518 3.82 7.185V22l3.493-1.921c.85.234 1.748.36 2.687.36 5.523 0 10-4.145 10-9.26C22 6.145 17.523 2 12 2zm1.066 12.63l-2.73-2.905-5.32 2.905 5.862-6.223 2.805 2.906 5.244-2.906-5.861 6.223z"/></svg>
                                </a>
                                <a href="https://zalo.me/0317669555" target="_blank" rel="noreferrer" className="hover:opacity-75 transition-opacity" title="Zalo">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21.84 10.99c0-5.1-4.78-9.22-10.66-9.22S.52 5.89.52 10.99c0 3.73 2.54 7.02 6.27 8.35v3.4c0 .32.33.54.62.39l4.13-2.06c.32.04.64.07.97.07 5.88 0 10.66-4.12 10.66-9.22z" /></svg>
                                </a>
                                <a href="https://t.me/+855317669555" target="_blank" rel="noreferrer" className="hover:opacity-75 transition-opacity" title="Telegram">
                                    <TelegramIcon className="w-5 h-5" />
                                </a>
                                <a href="tel:0317669555" className="hover:opacity-75 transition-opacity" title="Phone">
                                    <PhoneCall className="w-5 h-5" />
                                </a>
                            </div>
                            
                            {/* Copyright (Center) */}
                            <div className="opacity-90 order-1 md:order-2 text-center flex-1 font-semibold tracking-wide">
                                &copy; {new Date().getFullYear()} MVM Logistics. All Rights Reserved.
                            </div>
                            
                            {/* Policy Links (Right) */}
                            <div className="flex gap-4 font-medium opacity-90 order-3 md:w-1/3 justify-center md:justify-end">
                                <Link href="/privacy-policy" className="hover:text-white/70 transition">Privacy Policy</Link>
                                <Link href="/terms-of-service" className="hover:text-white/70 transition">Terms of Service</Link>
                                <Link href="/prohibited-items" className="hover:text-white/70 transition">Prohibited Items</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            
            <SupportFAB />

        </div>
    );
}
