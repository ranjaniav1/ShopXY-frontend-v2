import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Cookies from "js-cookie"; // Client-side cookies

// Import translation files
import enTranslation from "./locales/en/translation.json";
import hiTranslation from "./locales/hi/translation.json";
import guTranslation from "./locales/gu/translation.json";
import frTranslation from "./locales/fr/translation.json";

const resources = {
  en: {
    translation: enTranslation
  },
  hi: {
    translation: hiTranslation
  },
  gu: {
    translation: guTranslation
  },
  fr: {
    translation: frTranslation
  }
};

// Initialize i18n with the provided language or default to "en"
const initializeI18n = (lng) => {
  i18n.use(initReactI18next).init({
    resources,
    lng: lng || "en", // default to 'en' if language is not provided
    fallbackLng: "en", // fallback to English
    interpolation: { escapeValue: false }
  });
};

// Only run this on the client side
if (typeof window !== "undefined") {
  const storedLanguage = Cookies.get("language") || "en"; // Get language from cookies, fallback to 'en'
  console.log("Language from cookies:", storedLanguage);
  initializeI18n(storedLanguage);
}

// Function to update language and set cookie
export const updateLanguage = (lng) => {
  i18n.changeLanguage(lng);
  Cookies.set("language", lng); // Save language in cookies
};

export default i18n;
