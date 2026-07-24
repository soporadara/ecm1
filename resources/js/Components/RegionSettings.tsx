import { useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { useCurrency } from '../Contexts/CurrencyContext';

type LanguageCode = 'km' | 'en' | 'vi';

interface RegionSettingsProps {
    language: LanguageCode;
    changeLanguage: (lang: LanguageCode) => void;
    variant?: 'header' | 'drawer';
    tone?: 'light' | 'dark';
}

const languages: Array<{ code: LanguageCode; flag: string; label: string }> = [
    { code: 'km', flag: '🇰🇭', label: 'ភាសាខ្មែរ' },
    { code: 'en', flag: '🇬🇧', label: 'English' },
    { code: 'vi', flag: '🇻🇳', label: 'Tiếng Việt' },
];

const currencies = [
    { code: 'USD' as const, symbol: '$', label: 'United States Dollar' },
    { code: 'VND' as const, symbol: '₫', label: 'Vietnamese Dong' },
];

export default function RegionSettings({ language, changeLanguage, variant = 'header', tone = 'dark' }: RegionSettingsProps) {
    const { currentCurrency, setCurrentCurrency } = useCurrency();
    const [openMenu, setOpenMenu] = useState<'language' | 'currency' | null>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const languageButtonRef = useRef<HTMLButtonElement>(null);
    const currencyButtonRef = useRef<HTMLButtonElement>(null);
    const languageMenuId = useId();
    const currencyMenuId = useId();

    const selectedLanguage = languages.find((item) => item.code === language) || languages[0];
    const selectedCurrency = currencies.find((item) => item.code === currentCurrency) || currencies[0];
    const isDrawer = variant === 'drawer';
    const transparentLightText = tone === 'light' && !isDrawer;

    useEffect(() => {
        const handlePointerDown = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setOpenMenu(null);
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                const lastOpen = openMenu;
                setOpenMenu(null);
                if (lastOpen === 'language') languageButtonRef.current?.focus();
                if (lastOpen === 'currency') currencyButtonRef.current?.focus();
            }
        };

        document.addEventListener('mousedown', handlePointerDown);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handlePointerDown);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [openMenu]);

    const triggerClass = [
        'inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 active:scale-[0.98] motion-reduce:active:scale-100',
        isDrawer
            ? 'bg-gray-50 text-gray-900 hover:bg-white dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800'
            : transparentLightText
                ? 'text-white hover:bg-white/12'
                : 'text-gray-950 hover:bg-black/5 dark:text-white dark:hover:bg-white/10',
    ].join(' ');

    const menuClass = [
        'z-[120] min-w-56 overflow-hidden rounded-2xl border border-gray-100 bg-white p-1 shadow-2xl outline-none transition dark:border-gray-700 dark:bg-gray-900',
        isDrawer ? 'relative mt-2 w-full' : 'absolute right-0 top-full mt-3',
    ].join(' ');

    return (
        <div ref={wrapperRef} className={isDrawer ? 'space-y-4' : 'relative flex items-center gap-2'}>
            <div className={isDrawer ? 'relative' : 'relative'}>
                {isDrawer && <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Language</p>}
                <button
                    ref={languageButtonRef}
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={openMenu === 'language'}
                    aria-controls={languageMenuId}
                    className={triggerClass}
                    onClick={() => setOpenMenu(openMenu === 'language' ? null : 'language')}
                >
                    <span aria-hidden="true">{selectedLanguage.flag}</span>
                    <span>{selectedLanguage.label}</span>
                    <ChevronDown className={`h-4 w-4 transition ${openMenu === 'language' ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                {openMenu === 'language' && (
                    <div id={languageMenuId} role="listbox" aria-label="Select language" className={menuClass}>
                        {languages.map((item) => (
                            <button
                                key={item.code}
                                type="button"
                                role="option"
                                aria-selected={language === item.code}
                                aria-current={language === item.code ? 'true' : undefined}
                                onClick={() => {
                                    changeLanguage(item.code);
                                    setOpenMenu(null);
                                    languageButtonRef.current?.focus();
                                }}
                                className={`flex min-h-11 w-full items-center justify-between rounded-xl px-3 text-left text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 ${
                                    language === item.code
                                        ? 'bg-brand-primary/10 text-brand-primary'
                                        : 'text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800'
                                }`}
                            >
                                <span className="flex items-center gap-2"><span aria-hidden="true">{item.flag}</span>{item.label}</span>
                                {language === item.code && <Check className="h-4 w-4" aria-hidden="true" />}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className={isDrawer ? 'relative' : 'relative'}>
                {isDrawer && <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Currency</p>}
                <button
                    ref={currencyButtonRef}
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={openMenu === 'currency'}
                    aria-controls={currencyMenuId}
                    className={triggerClass}
                    onClick={() => setOpenMenu(openMenu === 'currency' ? null : 'currency')}
                >
                    <span>{selectedCurrency.symbol}</span>
                    <span>{selectedCurrency.code}</span>
                    <ChevronDown className={`h-4 w-4 transition ${openMenu === 'currency' ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>
                {openMenu === 'currency' && (
                    <div id={currencyMenuId} role="listbox" aria-label="Select currency" className={menuClass}>
                        {currencies.map((item) => (
                            <button
                                key={item.code}
                                type="button"
                                role="option"
                                aria-selected={currentCurrency === item.code}
                                onClick={() => {
                                    setCurrentCurrency(item.code);
                                    setOpenMenu(null);
                                    currencyButtonRef.current?.focus();
                                }}
                                className={`flex min-h-11 w-full items-center justify-between rounded-xl px-3 text-left text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 ${
                                    currentCurrency === item.code
                                        ? 'bg-brand-primary/10 text-brand-primary'
                                        : 'text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800'
                                }`}
                            >
                                <span>{item.symbol} {item.label} — {item.code}</span>
                                {currentCurrency === item.code && <Check className="h-4 w-4" aria-hidden="true" />}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
