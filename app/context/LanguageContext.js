'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import i18n from '../i18n';
import Cookies from 'js-cookie';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState('en');

  useEffect(() => {
    const storedLang = Cookies.get('language') || 'en';
    setLanguageState(storedLang);
    i18n.changeLanguage(storedLang);
  }, []);

  const setLanguage = (lang) => {
    setLanguageState(lang);
    i18n.changeLanguage(lang);
    Cookies.set('language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
