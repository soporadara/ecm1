import { ReactNode, useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { useTranslation } from '../hooks/useTranslation';
import CartDrawer from '../Components/CartDrawer';
import MegaMenu from '../Components/MegaMenu';
import MobileMenu from '../Components/MobileMenu';
import SearchBar from '../Components/SearchBar';
import RegionSettings from '../Components/RegionSettings';
import { useCurrency } from '../Contexts/CurrencyContext';

interface Props {
    children: ReactNode;
}

const languageCodes: Record<string, string> = {
    'English': 'en',
    'Chinese': 'zh-CN',
    'Khmer': 'km',
    'Vietnamese': 'vi',
    'Korean': 'ko',
    'Japanese': 'ja',
    'Indonesian': 'id'
};

export default function MainLayout({ children }: Props) {
    const { global_nav, cart }: any = usePage().props;
    const { currentCurrency } = useCurrency();
    const { url } = usePage();
    const isHome = url === '/';
    const { categories, brands, collections } = global_nav || { categories: [], brands: [], collections: [] };

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    
    // Dark Mode State
    const [isDarkMode, setIsDarkMode] = useState(false);
    
    // Language State
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState('English');
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    
    const languages = ['English', 'Chinese', 'Khmer', 'Vietnamese', 'Korean', 'Japanese', 'Indonesian'];

    const cartItemsCount = cart?.items?.reduce((acc: number, item: any) => acc + item.quantity, 0) || 0;

    useEffect(() => {
        // Init Dark Mode
        const savedMode = localStorage.getItem('theme');
        if (savedMode === 'dark' || (!savedMode && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        }
        
        // Init Language
        const savedLang = localStorage.getItem('language');
        if (savedLang) {
            setLanguage(savedLang);
            const langCode = languageCodes[savedLang];
            if (langCode && i18n.language !== langCode) {
                i18n.changeLanguage(langCode);
            }
        }

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleDarkMode = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setIsDarkMode(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setIsDarkMode(true);
        }
    };

    const changeLanguage = (lang: string) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
        setIsLangMenuOpen(false);
        
        const langCode = languageCodes[lang] || 'en';
        i18n.changeLanguage(langCode);
    };

    // Prevent body scroll when drawers are open
    useEffect(() => {
        if (isMobileMenuOpen || isCartOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen, isCartOpen]);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 font-sans antialiased text-brand-gray dark:text-gray-300 flex flex-col relative transition-colors duration-300">
            
            {/* Drawers */}
            <MobileMenu 
                isOpen={isMobileMenuOpen} 
                onClose={() => setIsMobileMenuOpen(false)} 
                categories={categories}
                brands={brands}
                collections={collections}
            />
            
            <CartDrawer 
                isOpen={isCartOpen} 
                onClose={() => setIsCartOpen(false)} 
                cart={cart}
            />

            {/* Announcement Bar */}
            <div className="bg-brand-secondary dark:bg-black text-white text-xs font-bold uppercase tracking-widest text-center py-2 px-4 hidden md:block z-50 relative">
                {t('nav.free_shipping')}
            </div>

            {/* Main Header */}
            <header className={`w-full z-40 transition-all duration-300 ${
                isHome 
                    ? (isScrolled ? 'fixed top-0 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800' : 'absolute top-0 md:top-[32px] bg-transparent border-transparent')
                    : 'sticky top-0 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800'
            }`}>
                
                {/* Desktop Single Row */}
                <div className={`hidden lg:block border-b ${isHome && !isScrolled ? 'border-transparent' : 'border-gray-100 dark:border-gray-800'}`}>
                    <div className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between relative">
                        {/* Left: Navigation Menus */}
                        <nav className="flex items-center space-x-6 text-[13px] font-bold text-brand-dark dark:text-gray-300 w-1/3 h-full">
                            <Link href="/" className="hover:text-brand-primary transition-colors flex items-center h-full uppercase tracking-wider">{t('nav.home')}</Link>
                            {/* SHOP with MegaMenu */}
                            <div className="flex items-center h-full group static cursor-pointer">
                                <Link href="/shop" className="hover:text-brand-primary transition-colors flex items-center gap-1 uppercase tracking-wider h-full">
                                    {t('nav.shop')}
                                    <svg className="w-3 h-3 text-gray-400 group-hover:text-brand-primary transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </Link>
                                <MegaMenu categories={categories} brands={brands} collections={collections} />
                            </div>
                            <Link href="/pages/about-us" className="hover:text-brand-primary transition-colors flex items-center h-full uppercase tracking-wider">{t('nav.about')}</Link>
                            <Link href="/blog" className="hover:text-brand-primary transition-colors flex items-center h-full uppercase tracking-wider">{t('nav.blog')}</Link>
                            <Link href="/pages/contact-us" className="hover:text-brand-primary transition-colors flex items-center h-full uppercase tracking-wider">{t('nav.contact')}</Link>
                        </nav>
                        
                        {/* Center: Logo */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-4">
                            <Link href="/" className="flex items-center gap-2">
                                <span className="font-bold tracking-tight text-2xl text-brand-secondary dark:text-white capitalize">Rafel</span>
                            </Link>
                            
                            {/* Explicit CMS Link for the User */}
                            <Link href="/admin" className="hidden lg:flex items-center gap-1 bg-red-50 text-red-600 px-3 py-1 rounded text-xs font-bold hover:bg-red-100 transition-colors">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                CMS Dashboard
                            </Link>
                        </div>

                        {/* Right: Utilities */}
                        <div className="flex items-center justify-end space-x-4 w-1/3 text-brand-dark dark:text-gray-200">
                            
                            {/* Region Settings */}
                            <div className="relative">
                                <button 
                                    onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                                    className="hover:text-brand-primary transition-colors flex items-center gap-1 p-2 text-sm font-bold uppercase"
                                >
                                    <span className="text-lg leading-none mr-1">
                                        {currentCurrency === 'USD' ? '🇺🇸' : currentCurrency === 'KHR' ? '🇰🇭' : '🇨🇳'}
                                    </span>
                                    <span>{currentCurrency} / {languageCodes[language]?.toUpperCase() || 'EN'}</span>
                                    <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </button>
                                <RegionSettings 
                                    isOpen={isLangMenuOpen} 
                                    onClose={() => setIsLangMenuOpen(false)}
                                    language={language}
                                    languages={languages}
                                    changeLanguage={changeLanguage}
                                />
                            </div>

                            {/* Dark Mode Toggle */}
                            <button 
                                onClick={() => {
                                    setIsDarkMode(!isDarkMode);
                                    if (isDarkMode) {
                                        document.documentElement.classList.remove('dark');
                                        localStorage.setItem('theme', 'light');
                                    } else {
                                        document.documentElement.classList.add('dark');
                                        localStorage.setItem('theme', 'dark');
                                    }
                                }}
                                className="hover:text-brand-primary transition-colors p-2"
                            >
                                {isDarkMode ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                                )}
                            </button>

                            {/* Search */}
                            <SearchBar />

                            {/* User */}
                            <Link href="/login" className="hover:text-brand-primary transition-colors p-2 hidden sm:block">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                            </Link>

                            {/* Cart */}
                            <button onClick={() => setIsCartOpen(true)} className="relative hover:text-brand-primary transition-colors p-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                                {cartItemsCount > 0 && (
                                    <span className="absolute top-0 right-0 bg-brand-primary text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                        {cartItemsCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Header (Classic) */}
                <div className="lg:hidden container mx-auto px-4 py-4 flex justify-between items-center relative">
                    <button onClick={() => setIsMobileMenuOpen(true)} className="text-brand-dark dark:text-white p-1">
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                    </button>
                    
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <Link href="/" className="flex items-center gap-1">
                            <span className="font-bold tracking-tight text-xl text-brand-secondary dark:text-white capitalize">Rafel</span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-2">
                        <button onClick={() => setIsCartOpen(true)} className="relative text-brand-dark dark:text-white p-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                            {cartItemsCount > 0 && (
                                <span className="absolute top-0 right-0 bg-brand-primary text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                    {cartItemsCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </header>
            
            <main className="flex-grow flex flex-col">
                {children}
            </main>

            <footer className="bg-gray-50 dark:bg-gray-900 py-16 mt-auto border-t border-gray-100 dark:border-gray-800">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                        {/* Column 1: Store Info */}
                        <div>
                            <Link href="/" className="inline-block mb-6">
                                <span className="font-bold tracking-tight text-3xl text-brand-secondary dark:text-white capitalize">Rafel</span>
                            </Link>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                                Elevate your everyday style with Rafel. We bring you the latest fashion trends and high-quality accessories from top global brands right to your doorstep.
                            </p>
                            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 shrink-0 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    <span>123 Fashion Street, Phnom Penh, Cambodia</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 shrink-0 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                    <span>+855 12 345 678</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <svg className="w-5 h-5 shrink-0 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    <span>support@rafel.com</span>
                                </li>
                            </ul>
                        </div>

                        {/* Column 2: Follow Us */}
                        <div>
                            <h3 className="text-sm font-bold text-brand-secondary dark:text-white mb-6 uppercase tracking-wider">Follow Us</h3>
                            <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-400 font-medium">
                                <li>
                                    <a href="#" className="flex items-center gap-3 hover:text-brand-primary transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
                                        Facebook
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center gap-3 hover:text-brand-primary transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect width={16} height={16} x={4} y={4} rx={4} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} /><circle cx={12} cy={12} r={3} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 7.5v.001" /></svg>
                                        Instagram
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center gap-3 hover:text-brand-primary transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2 12c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm13.062-1.39l-4.472-2.58A1.1 1.1 0 009 8.986v5.163a1.1 1.1 0 001.59.957l4.472-2.58a1.1 1.1 0 000-1.916z" /></svg>
                                        Youtube
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Column 3: Customer Service */}
                        <div>
                            <h3 className="text-sm font-bold text-brand-secondary dark:text-white mb-6 uppercase tracking-wider">Customer Service</h3>
                            <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-400 font-medium">
                                <li>
                                    <Link href="/pages/exchange-policy" className="flex items-center gap-3 hover:text-brand-primary transition-colors">
                                        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                        Online exchange policy
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/pages/privacy-policy" className="flex items-center gap-3 hover:text-brand-primary transition-colors">
                                        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/pages/faqs" className="flex items-center gap-3 hover:text-brand-primary transition-colors">
                                        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                                        FAQs
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/pages/store-locator" className="flex items-center gap-3 hover:text-brand-primary transition-colors">
                                        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        Find a store
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Column 4: We Accept */}
                        <div>
                            <h3 className="text-sm font-bold text-brand-secondary dark:text-white mb-6 uppercase tracking-wider">We Accept</h3>
                            <div className="flex flex-wrap gap-2">
                                <img src="https://www.ababank.com/fileadmin/user_upload/ABA_Pay_Way/ABA_Pay_logo.png" alt="ABA PAY" className="h-8 object-contain bg-[#005E82] rounded p-1 border border-gray-100" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Visa_Logo.png/640px-Visa_Logo.png" alt="VISA" className="h-8 object-contain bg-white rounded p-1 border border-gray-100" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/1200px-Mastercard_2019_logo.svg.png" alt="Mastercard" className="h-8 object-contain bg-white rounded p-1 border border-gray-100" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/UnionPay_logo.svg/1200px-UnionPay_logo.svg.png" alt="UnionPay" className="h-8 object-contain bg-white rounded p-1 border border-gray-100" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/JCB_logo.svg/1200px-JCB_logo.svg.png" alt="JCB" className="h-8 object-contain bg-white rounded p-1 border border-gray-100" />
                                <div className="h-8 flex items-center bg-white border border-gray-100 rounded px-2 gap-1">
                                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                    <span className="text-xs text-gray-600 font-medium whitespace-nowrap">Cash on Delivery</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-200 dark:border-gray-800 mt-16 pt-8 pb-4 text-center text-sm text-gray-500 dark:text-gray-400">
                        Powered By Rafel &copy; {new Date().getFullYear()}
                    </div>
                </div>
            </footer>
        </div>
    );
}
