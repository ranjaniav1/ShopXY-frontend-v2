'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { getWebSetting } from '../Service/Setting';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState('light');
  const [themeVars, setThemeVars] = useState({});
  const [webSettings, setWebSettings] = useState(null)

  useEffect(() => {
    const initTheme = async () => {
      const savedTheme = Cookies.get('theme') || 'light';
      setThemeState(savedTheme);

      const settingsResponse = await getWebSetting();
      const webSettingsData = settingsResponse?.webSettings;

      setWebSettings(webSettingsData);

      const background = webSettingsData?.background?.[savedTheme];
      if (background) {
        setThemeVars(background);
        Object.entries(background).forEach(([key, value]) => {
          document.documentElement.style.setProperty(`--${key}`, value);
        });
      }
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
    if (background) {
      setThemeVars(background);
      Object.entries(background).forEach(([key, value]) => {
        document.documentElement.style.setProperty(`--${key}`, value);
      });
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, switchTheme, themeVars,webSettings }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
