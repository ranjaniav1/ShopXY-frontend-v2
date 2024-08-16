import React from 'react';
import { IconButton, Badge } from '@mui/material';

const CustomIconButton = ({
    startIcon,
    endIcon,
    onClick,
    className,
    badgeContent,
    badgeColor,
}) => {
    return (
        <IconButton
            onClick={onClick}
            className={`  p-2 rounded-md  mx-2${className}`}
        >
            {badgeContent ? (
                <Badge badgeContent={badgeContent} color={badgeColor}>
                    {startIcon}
                </Badge>
            ) : (
                startIcon
            )}
            {endIcon && (
                <span style={{ marginLeft: '8px' }}>
                    {endIcon}
                </span>
            )}
        </IconButton>
    );
};

export default CustomIconButton;
