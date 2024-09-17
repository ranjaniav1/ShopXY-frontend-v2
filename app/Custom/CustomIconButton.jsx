import React from 'react';
import { IconButton, useTheme } from '@mui/material';

const CustomIconButton = ({ children, onClick, sx, ...props }) => {
    const theme = useTheme();
    return (
        <IconButton
            onClick={onClick}
            sx={{
                borderRadius: '5px',
                padding: '6px',
                marginLeft: '2%',
                backgroundColor: theme.palette.button.background,
                color: theme.palette.button.color,
                '&:hover': {
                    backgroundColor: theme.palette.button.hover,
                }, ...sx, // Allow additional styling via sx prop
            }}
            {...props}
        >
            {children}
        </IconButton>
    );
};

export default CustomIconButton;
