'use client';
import React from 'react';
import Cookies from 'js-cookie';
import { useTheme } from '../context/ThemeContext'; // 👈 Your custom hook
import { useLanguage } from '../context/LanguageContext';
import CustomRadioGroup from '../Custom/CustomRadioGroup';

const NavSetting = ({ onClose }) => {
    const { theme, switchTheme } = useTheme();
    const { language, setLanguage } = useLanguage();

    const handleThemeChange = (e) => {
        const newTheme = e.target.value;
        switchTheme(newTheme);
        Cookies.set('theme', newTheme);
        onClose?.();
    }


    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
        onClose?.()
    };

    return (
        <>
            <CustomRadioGroup
                name="theme"
                label="Theme Options"
                value={theme}
                onChange={handleThemeChange}
                options={[
                    { value: "light", label: "Light Mode" },
                    { value: "dark", label: "Dark Mode" },
                ]}
            />

            <CustomRadioGroup
                name="language"
                label="Select Language"
                value={language}
                onChange={handleLanguageChange}
                options={[
                    { value: "en", label: "English" },
                    { value: "hi", label: "Hindi" },
                    { value: "gu", label: "Gujarati" },
                    { value: "fr", label: "French" },
                ]}
            />
        </>
    );
};

export default NavSetting;
