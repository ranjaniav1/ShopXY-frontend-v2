// app/context/LanguageContext.tsx or .jsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n"; // your existing i18n.js
import Cookies from "js-cookie";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(Cookies.get("language") || "en");
useEffect(() => {
    // Ensure the i18n language is in sync with cookie on first load
    i18n.changeLanguage(language);
  }, [language]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    Cookies.set("language", lng,{path:"/"});
    setLanguage(lng);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage:changeLanguage }}>
      <I18nextProvider i18n={i18n}>
        {children}
      </I18nextProvider>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
