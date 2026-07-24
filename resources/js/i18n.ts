import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import km from './locales/km.json';
import vi from './locales/vi.json';

const resources = {
  en: { translation: en },
  km: { translation: km },
  vi: { translation: vi },
};

const languageCodeMap: Record<string, string> = {
    'ភាសាខ្មែរ': 'km',
    'Khmer': 'km',
    'English': 'en',
    'Tiếng Việt': 'vi',
    'Vietnamese': 'vi',
};

const savedLang = localStorage.getItem('language');
const initialLang = savedLang ? (languageCodeMap[savedLang] || savedLang) : 'km';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: resources[initialLang as keyof typeof resources] ? initialLang : 'km',
    fallbackLng: 'km',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
