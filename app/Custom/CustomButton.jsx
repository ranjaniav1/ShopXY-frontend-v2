'use client'
import React from 'react';
import { Button, useTheme } from '@mui/material';

const CustomButton = ({
    startIcon,
    endIcon,
    onClick,
    className,
    variant,
    color,
    size,
    title,
    type,
    background, // Adding background to props
    ...props
}) => {
    const theme = useTheme();
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
            sx={{
                background: background ? background : theme.palette.button.background, // Use background prop if provided
                color: theme.palette.button.color,
                '&:hover': {
                    background: theme.palette.button.hover,
                },
            }}
        >
            {title}
        </Button>
    );
};

export default CustomButton;
