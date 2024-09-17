import React from 'react';
import { IconButton, useTheme } from '@mui/material';

const CustomIconButton = ({ children, onClick, sx, ...props }) => {
    const theme = useTheme();
    return (
        <IconButton
            onClick={onClick}
            sx={{
                borderRadius: '5px',
                padding: 1,
                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',

                }, ...sx, // Allow additional styling via sx prop
            }}
        >
            {children}
        </IconButton>
    );
};

export default CustomIconButton;
