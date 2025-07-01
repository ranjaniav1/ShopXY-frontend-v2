// app/context/LanguageContext.tsx or .jsx
"use client";

import React, { createContext, useContext, useState } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n"; // your existing i18n.js
import Cookies from "js-cookie";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(Cookies.get("language") || "en");

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    Cookies.set("language", lng);
    setLanguage(lng);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      <I18nextProvider i18n={i18n}>
        {children}
      </I18nextProvider>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
