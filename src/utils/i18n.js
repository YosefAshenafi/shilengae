import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    debug: true,

    lng: 'en',
    fallbackLng: 'en',
    whitelist: ['en', 'de'],

    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    // ** Custom Backend **
    // use frontend folder
    saveMissing: true,
    saveMissingTo: 'all',

    backend: {
      loadPath: `${process.env.REACT_APP_BACKEND}/media/translation_packs/translation-{{lng}}.json`
    }
  });

export default i18n;
