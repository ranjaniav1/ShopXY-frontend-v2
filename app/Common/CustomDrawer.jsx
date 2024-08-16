import React from 'react';
import { Drawer, IconButton, Radio, RadioGroup, FormControlLabel, FormLabel, useTheme, Box, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import CustomIconButton from './CustomIconButton';
import { setTheme } from '../redux/reducer/ThemeReducer';

const CustomDrawer = ({ open, onClose }) => {
    const dispatch = useDispatch();
    const currentTheme = useSelector(state => state.theme.theme); // Get the current theme from Redux store
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the current screen is mobile

    const handleThemeChange = (event, newTheme) => {
        if (newTheme !== null) {
          dispatch(setTheme(newTheme));
        }
      };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            variant={isMobile ? "temporary" : "persistent"} // Persistent on desktop, temporary on mobile
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
        >
            <Box className="flex flex-col h-full" sx={{ width: isMobile ? '100%' : 350 }}>
                {/* Drawer Header */}
                <Box className="flex justify-between items-center p-4" bgcolor={theme.palette.background.main}>
                    <h2 className="text-lg font-semibold">Settings</h2>
                    <CustomIconButton onClick={onClose} >
                        <CloseIcon />
                    </CustomIconButton>
                </Box>

                {/* Drawer Content */}
                <Box className="p-4 flex-grow overflow-y-auto" bgcolor={theme.palette.background.secondary}>
                    <div className="mb-4 ">
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

                    {/* Add more settings options here */}
                    <div>
                        <h3 className="text-md font-medium mb-2">Other Settings</h3>
                        {/* Add other settings options here */}
                    </div>
                </Box>
            </Box>
        </Drawer>
    );
};

export default CustomDrawer;
