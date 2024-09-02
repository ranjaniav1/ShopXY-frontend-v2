import React, { useState } from 'react';
import { Drawer, IconButton, Radio, RadioGroup, FormControlLabel, FormLabel, useTheme, Box, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import CustomIconButton from './CustomIconButton';
import { useTranslation } from 'react-i18next';


const CustomDrawer = ({ open, onClose, title, children }) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
 

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
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <CustomIconButton onClick={onClose}>
                        <CloseIcon />
                    </CustomIconButton>
                </Box>

                <Box className="p-4 flex-grow " bgcolor={theme.palette.background.secondary}>
                    {children}
                </Box>
            </Box>
        </Drawer>
    );
};

export default CustomDrawer;
