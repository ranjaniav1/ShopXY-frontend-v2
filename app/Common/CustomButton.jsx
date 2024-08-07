import React from 'react';
import { Button, IconButton, Icon } from '@mui/material';

const CustomButton = ({
    startIcon,
    endIcon,
    onClick,
    className,
    variant = 'contained',
    color = 'primary',
    size = 'medium',
    children,
    ...props
}) => {
    return (
        <Button
            startIcon={startIcon}
            endIcon={endIcon}
            onClick={onClick}
            className={className}
            variant={variant}
            color={color}
            size={size}
            {...props}
        >
            {children}
        </Button>
    );
};

export default CustomButton;
