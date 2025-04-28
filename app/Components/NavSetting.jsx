import { Divider, FormControlLabel, FormLabel, Radio, RadioGroup, useTheme } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../redux/reducer/ThemeReducer';
import { setLanguage } from '../redux/reducer/LanguageReducer';
import i18n from '../i18n';
import Cookies from 'js-cookie';

const NavSetting = ({onClose}) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const currentTheme = useSelector(state => state.theme.theme);
    const selectedLanguage = useSelector(state => state.language.language);

    const handleThemeChange = ( newTheme) => {
        if (newTheme !== null) {
            dispatch(setTheme(newTheme));
            Cookies.set("theme", newTheme);  // <-- Save to Cookies

            if(onClose) onClose()
        }
    };

    const handleLanguageChange = (event) => {
        const lang = event.target.value;
        dispatch(setLanguage(lang));
        i18n.changeLanguage(lang);
        Cookies.set("language", lang); 
        if(onClose) onClose()
    };
    return (
        <>
            <div className="mb-4">
                <FormLabel component="legend" className="text-md font-medium mb-2">Theme Options</FormLabel>
                <RadioGroup
                    aria-label="theme"
                    name="theme"
                    value={currentTheme}
                    onChange={handleThemeChange}
                    className="flex flex-row"
                >
                    <FormControlLabel
                        value="light"
                        control={<Radio />}
                        label="Light Mode"
                    />
                    <FormControlLabel
                        value="dark"
                        control={<Radio />}
                        label="Dark Mode"
                    />
                </RadioGroup>
            </div>
            <div className="mb-4">
                <FormLabel component="legend" className="text-md font-medium mb-2">Select Language</FormLabel>
                <RadioGroup
                    aria-label="language"
                    name="language"
                    value={selectedLanguage}
                    onChange={handleLanguageChange}
                    className="flex flex-row"
                >
                    <FormControlLabel
                        value="en"
                        control={<Radio />}
                        label="English"
                    />
                    <FormControlLabel
                        value="hi"
                        control={<Radio />}
                        label="Hindi"
                    />
                    <FormControlLabel
                        value="gu"
                        control={<Radio />}
                        label="Gujarati"
                    />
                    <FormControlLabel
                        value="fr"
                        control={<Radio />}
                        label="French"
                    />

                </RadioGroup>
            </div></>
    )
}

export default NavSetting
