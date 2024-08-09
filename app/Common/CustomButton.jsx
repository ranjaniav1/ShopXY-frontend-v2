import React from 'react';
import { Button, IconButton, Icon } from '@mui/material';

const CustomButton = ({
    startIcon,
    endIcon,
    onClick,
    className,
    variant ,
    color ,
    size ,
    title,
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
            {title}
        </Button>
    );
};

export default CustomButton;
