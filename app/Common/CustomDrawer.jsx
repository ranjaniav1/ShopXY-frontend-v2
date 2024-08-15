import React from 'react';
import { Drawer, IconButton, Radio, RadioGroup, FormControlLabel, FormLabel, useTheme, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../redux/actions/action';

const CustomDrawer = ({ open, onClose }) => {
    const dispatch = useDispatch();
    const currentTheme = useSelector(state => state.mode); // Get the current theme from Redux store

    const theme = useTheme()
    const handleThemeChange = (event) => {
        dispatch(setTheme(event.target.value));
        // Dispatch action to change the theme
    };
    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
        >
            <Box className="flex flex-col h-full">
                {/* Drawer Header */}
                <Box className="flex justify-between items-center p-4 " bgcolor={theme.palette.background.main}>
                    <h2 className="text-lg font-semibold">Settings</h2>
                    <IconButton onClick={onClose} className='btn rounded-md'>
                        <CloseIcon />
                    </IconButton>
                </Box>

                {/* Drawer Content */}
                <Box className="p-4 flex-grow overflow-y-auto" bgcolor={theme.palette.background.secondary}>
                    <div className="mb-4">
                        <FormLabel component="legend" className="text-md font-medium mb-2">Theme Options</FormLabel>
                        <RadioGroup
                            aria-label="theme"
                            name="theme"
                            value={currentTheme} // Use the theme from Redux store
                            onChange={handleThemeChange}
                            className="flex flex-row"
                        >
                            <div className="flex items-center mb-2">
                                <FormControlLabel
                                    value="light"
                                    control={<Radio />}
                                    label="Light Mode"
                                    className="flex items-center"
                                />
                            </div>
                            <div className="flex items-center">
                                <FormControlLabel
                                    value="dark"
                                    control={<Radio />}
                                    label="Dark Mode"
                                    className="flex items-center"
                                />
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Add more settings options here */}
                    <div>
                        {/* Additional settings */}
                        <h3 className="text-md font-medium mb-2">Other Settings</h3>
                        {/* Add other settings options here */}
                    </div>
                </Box>
            </Box>
        </Drawer>
    );
};

export default CustomDrawer;
