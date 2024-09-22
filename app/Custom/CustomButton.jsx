'use client';
import React from 'react';
import { Button, useTheme } from '@mui/material';

const CustomButton = ({
    startIcon,
    endIcon,
    onClick,
    className,
    variant = 'contained', // Default variant is 'contained'
    size = 'medium',       // Default size is 'medium'
    title,
    type = 'button',       // Default type is 'button'
    background,            // Optionally overriding the background
    ...props
}) => {
    const theme = useTheme();

    const getStyles = (variant) => {
        if (variant === 'contained') {
            return {
                background: background || theme.palette.button.background, // Use prop background or theme color
                color: theme.palette.button.color,
            };
        } else if (variant === 'outlined') {
            return {
                color: theme.palette.button.background,
                border: `1px solid ${theme.palette.button.background}`, // Outlined border

            };
        } else if (variant === 'text') {
            return {
                background: 'transparent',
                color: theme.palette[color].main,
                '&:hover': {
                    background: theme.palette.action.hover,
                },
            };
        }
        return {};
    };

    return (
        <Button
            startIcon={startIcon}
            endIcon={endIcon}
            onClick={onClick}
            className={className}
            variant={variant}
            size={size}
            type={type}
            {...props}
            sx={getStyles(variant)} // Apply styles based on the variant
        >
            {title}
        </Button>
    );
};

export default CustomButton;
