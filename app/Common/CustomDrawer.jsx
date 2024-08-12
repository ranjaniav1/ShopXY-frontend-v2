import React from 'react';
import { Drawer, IconButton, Radio, RadioGroup, FormControlLabel, FormLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CustomDrawer = ({ open, onClose }) => {
    const [theme, setTheme] = React.useState('light');

    const handleThemeChange = (event) => {
        setTheme(event.target.value);
        // Implement theme switch logic here (e.g., update context or local storage)
    };

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
        >
            <div className="flex flex-col h-full">
                {/* Drawer Header */}
                <div className="flex justify-between items-center p-4 bg-gray-200">
                    <h2 className="text-lg font-semibold">Settings</h2>
                    <IconButton onClick={onClose} className='btn rounded-md'>
                        <CloseIcon />
                    </IconButton>
                </div>
                
                {/* Drawer Content */}
                <div className="p-4 flex-grow overflow-y-auto">
                    <div className="mb-4">
                        <FormLabel component="legend" className="text-md font-medium mb-2">Theme Options</FormLabel>
                        <RadioGroup
                            aria-label="theme"
                            name="theme"
                            value={theme}
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
                </div>
            </div>
        </Drawer>
    );
};

export default CustomDrawer;
