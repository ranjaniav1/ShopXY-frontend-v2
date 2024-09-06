import { Divider, FormControlLabel, FormLabel, Radio, RadioGroup, useTheme } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../redux/reducer/ThemeReducer';
import { setLanguage } from '../redux/reducer/LanguageReducer';

const NavSetting = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const currentTheme = useSelector(state => state.theme.theme);
    const theme = useTheme();
    const selectedLanguage = useSelector(state => state.language.language);

    const handleThemeChange = (event, newTheme) => {
        if (newTheme !== null) {
            dispatch(setTheme(newTheme));
        }
    };

    const handleLanguageChange = (event) => {
        const lang = event.target.value;
        dispatch(setLanguage(lang));
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
                        label={t("Light Mode")}
                    />
                    <FormControlLabel
                        value="dark"
                        control={<Radio />}
                        label={t("Dark Mode")}
                    />
                </RadioGroup>
            </div>
            <div className="mb-4">
                <FormLabel component="legend" className="text-md font-medium mb-2">{t("Select Language")}</FormLabel>
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
                        label={t("English")}
                    />
                    <FormControlLabel
                        value="fr"
                        control={<Radio />}
                        label={t("French")}
                    />
                    <FormControlLabel
                        value="es"
                        control={<Radio />}
                        label={t("Spanish")}
                    />
                </RadioGroup>
            </div></>
    )
}

export default NavSetting
