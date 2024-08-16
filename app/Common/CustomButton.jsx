import React from 'react';
import { Button, IconButton, Icon, useTheme } from '@mui/material';
const CustomButton = ({
    startIcon,
    endIcon,
    onClick,
    className,
    variant,
    color,
    size,
    title,
    ...props
}) => {
    const theme = useTheme()
    return (
        <Button
            startIcon={startIcon}
            endIcon={endIcon}
            onClick={onClick}
            className={className}
            variant={variant}
            size={size}
            {...props}
            sx={{ background: theme.palette.button.background, color: theme.palette.button.color,'&:hover':{background:theme.palette.button.hover} }}
        >
            {title}
        </Button>
    );
};

export default CustomButton;
