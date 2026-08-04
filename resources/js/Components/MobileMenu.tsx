import { useEffect, useRef } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { ClipboardList, PhoneCall, Home, Moon, PackageCheck, ReceiptText, Shield, Sun, UserRound, X } from 'lucide-react';
import RegionSettings from './RegionSettings';
import { signOutFirebase } from '../lib/firebase';
import { useTranslation } from '../hooks/useTranslation';

type LanguageCode = 'km' | 'en' | 'vi';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    onLoginClick?: () => void;
    auth?: any;
    language: LanguageCode;
    changeLanguage: (lang: LanguageCode) => void;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    storeName: string;
    storeLogo?: string;
    pages?: any[];
}

const navItems = [
    { label: 'Home', labelKey: 'nav.home', href: '/', icon: Home },
    { label: 'Manual Order', labelKey: 'nav.manual_order', href: '/manual-order', icon: ClipboardList },
    { label: 'Contact', labelKey: 'nav.contact', href: '/contact', icon: PhoneCall },
];

const accountItems = [
    { label: 'Account Overview', labelKey: 'nav.account_overview', href: '/account', icon: UserRound },
    { label: 'Personal Information', labelKey: 'nav.personal_information', href: '/profile', icon: UserRound },
    { label: 'Create Manual Order', labelKey: 'nav.create_manual_order', href: '/manual-order', icon: ClipboardList },
    { label: 'My Orders', labelKey: 'nav.my_orders', href: '/my-orders', icon: PackageCheck },
    { label: 'Receipts', labelKey: 'nav.receipts', href: '/receipts', icon: ReceiptText },
    { label: 'Security', labelKey: 'nav.security', href: '/security', icon: Shield },
    { label: 'Contact Support', labelKey: 'nav.contact_support', href: '/contact', icon: PhoneCall },
];

export default function MobileMenu({ isOpen, onClose, onLoginClick, auth, language, changeLanguage, isDarkMode, toggleDarkMode, storeName, storeLogo, pages = [] }: MobileMenuProps) {
    const { url } = usePage();
    const { t } = useTranslation();
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const isCmsUser = Boolean(auth?.user?.is_admin) || ['admin', 'super_admin', 'logistics', 'content', 'support'].includes(auth?.user?.role);
    const customerUser = auth?.user && !isCmsUser ? auth.user : null;

    const getPageTitle = (slug: string, defaultLabel: string) => {
        const p = pages?.find((p: any) => p.slug === slug);
        if (p) {
            const key = `title_${language}`;
            return p[key] || p.title || defaultLabel;
        }
        return defaultLabel;
    };

    useEffect(() => {
        if (!isOpen) return;

        const previouslyFocused = document.activeElement as HTMLElement | null;
        closeButtonRef.current?.focus();
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
                previouslyFocused?.focus();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    const isActive = (href: string) => {
        if (href === '/') return url === '/';
        if (href === '/manual-order') return url === '/manual-order' || url.startsWith('/manual-order/');
        return url === href || url.startsWith(`${href}/`);
    };

    const logoutCustomer = async () => {
        try {
            await signOutFirebase();
        } finally {
            onClose();
            router.post('/logout');
        }
    };

    const translatedLabel = (key: string, fallback: string) => {
        const translated = t(key);
        return translated === key ? fallback : translated;
    };

    return (
        <>
            <div
                className={`fixed inset-0 z-[100] bg-black/55 transition-opacity duration-200 lg:hidden ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                onClick={onClose}
                aria-hidden="true"
            />

            <aside
                aria-hidden={!isOpen}
                className={`fixed inset-y-0 left-0 z-[110] flex w-[min(92vw,24rem)] flex-col overflow-hidden border-r border-gray-100 bg-white shadow-2xl transition-transform duration-200 ease-out motion-reduce:transition-none dark:border-gray-800 dark:bg-gray-950 lg:hidden ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex min-h-20 items-center justify-between border-b border-gray-100 bg-white/95 px-5 backdrop-blur dark:border-gray-800 dark:bg-gray-950/95">
                    <Link href="/" onClick={onClose} className="inline-flex items-center rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60">
                        {storeLogo ? (
                            <img src={storeLogo} alt={storeName} className="h-16 w-auto object-contain" />
                        ) : (
                            <span className="text-xl font-black text-brand-secondary dark:text-white">{storeName}</span>
                        )}
                    </Link>
                    <button
                        ref={closeButtonRef}
                        type="button"
                        onClick={onClose}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full text-gray-700 transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60 dark:text-gray-100 dark:hover:bg-gray-800"
                        aria-label="Close navigation menu"
                    >
                        <X className="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto bg-gray-50/70 px-4 py-4 dark:bg-gray-900/40">
                    <nav aria-label="Mobile primary navigation" className="space-y-1 rounded-3xl border border-gray-100 bg-white p-2 shadow-sm dark:border-gray-800 dark:bg-gray-950">
                            {navItems.map((item) => {
                                let displayLabel = translatedLabel(item.labelKey, item.label);
                                if (item.href === '/') displayLabel = getPageTitle('home', item.label);
                                if (item.href === '/contact') displayLabel = getPageTitle('contact-us', item.label);

                                if (item.href === '/manual-order' && !customerUser && onLoginClick) {
                                    return (
                                        <button
                                            key={item.href}
                                            type="button"
                                            onClick={() => { onClose(); onLoginClick(); }}
                                            className={`group flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-[15px] font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 ${
                                                isActive(item.href) ? 'bg-brand-primary/10 text-brand-primary' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                                            }`}
                                        >
                                            <item.icon className="h-5 w-5 opacity-70 transition-transform group-hover:scale-110" />
                                            {displayLabel}
                                        </button>
                                    );
                                }
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        prefetch={['mount', 'hover']}
                                        onClick={onClose}
                                        aria-current={isActive(item.href) ? 'page' : undefined}
                                        className={`group flex items-center gap-3 rounded-2xl px-4 py-3.5 text-[15px] font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 ${
                                            isActive(item.href)
                                                ? 'bg-brand-primary/10 text-brand-primary'
                                                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                                        }`}
                                    >
                                        <item.icon className="h-5 w-5 opacity-70 transition-transform group-hover:scale-110" />
                                        {displayLabel}
                                    </Link>
                                );
                            })}
                    </nav>

                    <div className="mt-4 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
                        <RegionSettings language={language} changeLanguage={changeLanguage} variant="drawer" />
                        <div className="mt-4">
                            <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">{translatedLabel('nav.theme', 'Theme')}</p>
                            <button
                                type="button"
                                onClick={toggleDarkMode}
                                className="flex min-h-12 w-full items-center justify-between rounded-2xl bg-gray-50 px-4 text-sm font-black text-gray-900 transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
                            >
                                <span>{isDarkMode ? translatedLabel('nav.dark_mode', 'Dark mode') : translatedLabel('nav.light_mode', 'Light mode')}</span>
                                {isDarkMode ? <Moon className="h-5 w-5" aria-hidden="true" /> : <Sun className="h-5 w-5" aria-hidden="true" />}
                            </button>
                        </div>
                    </div>

                    <div className="mt-4 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
                        <div className="mb-3 flex items-center gap-3">
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-100">
                                {customerUser?.avatar || customerUser?.avatar_path ? (
                                    <img src={customerUser.avatar || customerUser.avatar_path} alt="" className="h-10 w-10 rounded-full object-cover" />
                                ) : (
                                    <UserRound className="h-5 w-5" aria-hidden="true" />
                                )}
                            </span>
                            <div className="min-w-0">
                                <p className="truncate text-sm font-black text-gray-950 dark:text-white">{customerUser?.name || translatedLabel('nav.customer_account', 'Customer Account')}</p>
                                <p className="truncate text-xs font-semibold text-gray-500 dark:text-gray-400">{customerUser?.customer_code || translatedLabel('nav.sign_in_to_manage_orders', 'Sign in to manage orders')}</p>
                            </div>
                        </div>

                        {customerUser ? (
                            <div className="space-y-1">
                                {accountItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        prefetch={['mount', 'hover']}
                                        onClick={onClose}
                                        className="flex min-h-12 items-center gap-3 rounded-2xl px-3 text-sm font-bold text-gray-700 transition hover:-translate-y-0.5 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60 dark:text-gray-200 dark:hover:bg-gray-900"
                                    >
                                        <item.icon className="h-4 w-4" aria-hidden="true" />
                                        {translatedLabel(item.labelKey, item.label)}
                                    </Link>
                                ))}
                                <button type="button" onClick={logoutCustomer} className="flex min-h-12 w-full items-center gap-3 rounded-2xl px-3 text-left text-sm font-black text-gray-800 transition hover:-translate-y-0.5 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60 dark:text-gray-100 dark:hover:bg-gray-900">
                                    {translatedLabel('nav.logout', 'Logout')}
                                </button>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={() => {
                                    onClose();
                                    onLoginClick?.();
                                }}
                                className="flex min-h-12 w-full items-center justify-center rounded-2xl bg-brand-primary px-4 text-sm font-black uppercase tracking-wider text-white shadow-lg shadow-brand-primary/20 transition hover:-translate-y-0.5 hover:bg-brand-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60"
                            >
                                {translatedLabel('nav.customer_login', 'Customer Login')}
                            </button>
                        )}
                    </div>

                    <div className="h-[calc(env(safe-area-inset-bottom)+1rem)]" />
                </div>
            </aside>
        </>
    );
}
