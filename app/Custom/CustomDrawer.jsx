import React, { useState } from 'react';
import { Drawer, IconButton, Radio, RadioGroup, FormControlLabel, FormLabel, useTheme, Box, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import CustomIconButton from './CustomIconButton';
import { setTheme } from '../redux/reducer/ThemeReducer';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { setLanguage } from '../redux/reducer/LanguageReducer';

const CustomDrawer = ({ open, onClose }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const currentTheme = useSelector(state => state.theme.theme);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            variant={isMobile ? "temporary" : "persistent"}
            ModalProps={{
                keepMounted: true,
            }}
        >
            <Box className="flex flex-col h-full" sx={{ width: isMobile ? '100%' : 350 }}>
                <Box className="flex justify-between items-center p-4" bgcolor={theme.palette.background.main}>
                    <h2 className="text-lg font-semibold">{t("Settings")}</h2>
                    <CustomIconButton onClick={onClose}>
                        <CloseIcon />
                    </CustomIconButton>
                </Box>

                <Box className="p-4 flex-grow overflow-y-auto" bgcolor={theme.palette.background.secondary}>
                    <div className="mb-4">
                        <FormLabel component="legend" className="text-md font-medium mb-2">{t("Theme Options")}</FormLabel>
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
                    </div>
                </Box>
            </Box>
        </Drawer>
    );
};

export default CustomDrawer;
