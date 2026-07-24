import { useState, useEffect, useCallback } from 'react';
import en from '../locales/en.json';
import km from '../locales/km.json';
import vi from '../locales/vi.json';

const translations: Record<string, any> = {
    'en': en,
    'km': km,
    'vi': vi,
};

// Global state to sync all hook instances
const languageCodeMap: Record<string, string> = {
    'ភាសាខ្មែរ': 'km',
    'Khmer': 'km',
    'English': 'en',
    'Tiếng Việt': 'vi',
    'Vietnamese': 'vi',
};

const savedLang = localStorage.getItem('language');
let currentLanguage = savedLang ? (languageCodeMap[savedLang] || savedLang) : 'km';
if (!translations[currentLanguage]) currentLanguage = 'km';
const listeners = new Set<() => void>();

export function useTranslation() {
    const [lang, setLang] = useState(currentLanguage);

    useEffect(() => {
        const listener = () => setLang(currentLanguage);
        listeners.add(listener);
        return () => {
            listeners.delete(listener);
        };
    }, []);

    const t = useCallback((key: string) => {
        if (!key) return '';
        
        // Check for direct string matches in 'db' namespace first
        if (translations[lang] && translations[lang]['db'] && translations[lang]['db'][key]) {
            return translations[lang]['db'][key];
        }

        const keys = key.split('.');
        let value = translations[lang];
        for (const k of keys) {
            if (value && value[k] !== undefined) {
                value = value[k];
            } else {
                value = translations.km;
                for (const fallbackKey of keys) {
                    if (value && value[fallbackKey] !== undefined) {
                        value = value[fallbackKey];
                    } else {
                        return key;
                    }
                }
                return value || key;
            }
        }
        return value || key;
    }, [lang]);

    const changeLanguage = (newLang: string) => {
        if (translations[newLang]) {
            currentLanguage = newLang;
            localStorage.setItem('language', newLang);
            listeners.forEach(listener => listener());
        }
    };

    return {
        t,
        i18n: {
            language: lang,
            changeLanguage
        }
    };
}
