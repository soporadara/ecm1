import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import zhCN from './locales/zh-CN.json';
import km from './locales/km.json';
import vi from './locales/vi.json';
import ko from './locales/ko.json';
import ja from './locales/ja.json';
import id from './locales/id.json';

const resources = {
  en: { translation: en },
  'zh-CN': { translation: zhCN },
  km: { translation: km },
  vi: { translation: vi },
  ko: { translation: ko },
  ja: { translation: ja },
  id: { translation: id }
};

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
const initialLang = savedLang ? languageCodeMap[savedLang] : 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLang || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
