import React from 'react';
import { IconButton, Badge } from '@mui/material';
import PropTypes from 'prop-types';

const CustomIconButton = ({
    startIcon,
    endIcon,
    onClick,
    className,
    ariaLabel,
    color = 'inherit',
    size = 'medium',
    badgeContent,
    badgeColor = 'error',
    ...props
}) => {
    return (
        <IconButton
            onClick={onClick}
            className={className}
            aria-label={ariaLabel}
            color={color}
            size={size}
            {...props}
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
