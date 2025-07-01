// app/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en/translation.json";
import hi from "./locales/hi/translation.json";
import gu from "./locales/gu/translation.json";
import fr from "./locales/fr/translation.json";

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  gu: { translation: gu },
  fr: { translation: fr },
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
}

export default i18n;
