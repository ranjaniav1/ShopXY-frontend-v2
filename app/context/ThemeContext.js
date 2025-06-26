// context/ThemeContext.tsx
"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { getWebSetting } from '../Service/Setting';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState('light');
  const [themeVars, setThemeVars] = useState({});
  const [webSettings, setWebSettings] = useState(null);

  // Utility to apply CSS variables
  const applyThemeVars = (background) => {
    if (!background) return;

    // Apply base variables (body, primary, secondary)
    Object.entries(background).forEach(([key, value]) => {
      if (typeof value === "string") {
        document.documentElement.style.setProperty(`--${key}`, value);
      }

      // Apply nested text variables like --t-primary
      if (key === "text") {
        Object.entries(value).forEach(([textKey, textValue]) => {
          document.documentElement.style.setProperty(`--t-${textKey}`, textValue);
        });
      }
    });
  };

  useEffect(() => {
    const initTheme = async () => {
      const savedTheme = Cookies.get('theme') || 'light';
      setThemeState(savedTheme);

      const settingsResponse = await getWebSetting();
      const webSettingsData = settingsResponse?.webSettings;
      setWebSettings(webSettingsData);

      const background = webSettingsData?.background?.[savedTheme];
      setThemeVars(background);
      applyThemeVars(background);
    };

    initTheme();
  }, []);

  const switchTheme = async (newTheme) => {
    setThemeState(newTheme);
    Cookies.set('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);

    const settingsResponse = await getWebSetting();
    const webSettingsData = settingsResponse?.webSettings;
    setWebSettings(webSettingsData);

    const background = webSettingsData?.background?.[newTheme];
    setThemeVars(background);
    applyThemeVars(background);
  };

  return (
    <ThemeContext.Provider value={{ theme, switchTheme, themeVars, webSettings }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
