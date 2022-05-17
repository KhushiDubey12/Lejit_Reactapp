import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './en/translation.json';
import frTranslation from './fr/translation.json';

export const resources = {
    en: {
        translation: enTranslation
    },
    fr: {
        translation: frTranslation
    }
} as const;

i18n.use(initReactI18next).init({
    interpolation: {
        escapeValue: false
    },
    debug: true,
    fallbackLng: ['en', 'fr'],
    resources
});
