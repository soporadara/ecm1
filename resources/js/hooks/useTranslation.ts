import { useState, useEffect, useCallback } from 'react';
import en from '../locales/en.json';
import zhCN from '../locales/zh-CN.json';
import km from '../locales/km.json';
import vi from '../locales/vi.json';
import ko from '../locales/ko.json';
import ja from '../locales/ja.json';
import id from '../locales/id.json';

const translations: Record<string, any> = {
    'en': en,
    'zh-CN': zhCN,
    'km': km,
    'vi': vi,
    'ko': ko,
    'ja': ja,
    'id': id,
};

// Global state to sync all hook instances
const languageCodeMap: Record<string, string> = {
    'English': 'en',
    'Chinese': 'zh-CN',
    'Khmer': 'km',
    'Vietnamese': 'vi',
    'Korean': 'ko',
    'Japanese': 'ja',
    'Indonesian': 'id'
};

const savedLang = localStorage.getItem('language');
let currentLanguage = savedLang ? (languageCodeMap[savedLang] || 'en') : 'en';
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
                return key;
            }
        }
        return value || key;
    }, [lang]);

    const changeLanguage = (newLang: string) => {
        if (translations[newLang]) {
            currentLanguage = newLang;
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
