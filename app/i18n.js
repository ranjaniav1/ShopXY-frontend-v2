import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translation files
import enTranslation from "./locales/en/translation.json";
import esTranslation from "./locales/es/translation.json";
import frTranslation from "./locales/fr/translation.json";

const resources = {
  en: {
    translation: enTranslation
  },
  es: {
    translation: esTranslation
  },
  fr: {
    translation: frTranslation
  }
};

const initializeI18n = (lng) => {
  i18n.use(initReactI18next).init({
    resources,
    lng: lng || "en", // Default to 'en' if no language is provided
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });
};

// Only run this code in the browser
if (typeof window !== "undefined") {
  const storedLanguage = localStorage.getItem("language");
  initializeI18n(storedLanguage);
} else {
  // Initialize with default language on the server
  initializeI18n("en");
}

export default i18n;
