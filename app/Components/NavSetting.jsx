'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../redux/reducer/LanguageReducer';
import i18n from '../i18n';
import Cookies from 'js-cookie';
import { useTheme } from '../context/ThemeContext'; // 👈 Your custom hook

const NavSetting = ({ onClose }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const selectedLanguage = useSelector(state => state.language.language);

    const { theme, switchTheme } = useTheme(); // 👈 from your context

    const handleThemeChange = (e) => {
        const newTheme = e.target.value;
        if (newTheme) {
            switchTheme(newTheme); // 👈 use context function
            Cookies.set('theme', newTheme);
            if (onClose) onClose();
        }
    };

    const handleLanguageChange = (event) => {
        const lang = event.target.value;
        dispatch(setLanguage(lang));
        i18n.changeLanguage(lang);
        Cookies.set('language', lang);
        if (onClose) onClose();
    };

    return (
        <>
            <div className="mb-4">
                <label className="text-md font-medium mb-2 block">Theme Options</label>
                <div className="flex flex-row gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="theme"
                            value="light"
                            checked={theme === 'light'}
                            onChange={handleThemeChange}
                        />
                        Light Mode
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="theme"
                            value="dark"
                            checked={theme === 'dark'}
                            onChange={handleThemeChange}
                        />
                        Dark Mode
                    </label>
                </div>
            </div>

            <div className="mb-4">
                <label className="text-md font-medium mb-2 block">Select Language</label>
                <div className="flex flex-row gap-4">
                    {['en', 'hi', 'gu', 'fr'].map(lang => (
                        <label key={lang} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="language"
                                value={lang}
                                checked={selectedLanguage === lang}
                                onChange={handleLanguageChange}
                            />
                            {lang === 'en' ? 'English' :
                                lang === 'hi' ? 'Hindi' :
                                    lang === 'gu' ? 'Gujarati' : 'French'}
                        </label>
                    ))}
                </div>
            </div>
        </>
    );
};

export default NavSetting;
