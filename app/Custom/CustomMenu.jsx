import React from 'react';
import { Menu, MenuItem, Button, Typography, Box, useTheme } from '@mui/material';

const CustomMenu = ({
    anchorEl,
    open,
    onClose,
    onOpen,
    startIcon,
    title,
    menuItems,
    buttonProps,
    endIcon,
    className, ...props
}) => {
    const theme = useTheme()
    return (
        <Box className={className}>
            <Button
               {...buttonProps}
               onClick={onOpen}
               variant="contained"
               startIcon={startIcon}
               endIcon={endIcon}
               sx={{
                   textTransform: 'none',
                   width: '100%',
                   color: theme.palette.button.color,
                   background: theme.palette.button.background,
                   '&:hover': {
                       background: theme.palette.button.hover,
                   },
               }}
            >
                {title && (
                    <Typography variant="body1" style={{ marginLeft: '8px' }}>
                        {title}
                    </Typography>
                )}
            </Button>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={onClose}
                {...props}
            >
                {menuItems.map((item, index) => (
                    <MenuItem key={index} onClick={() => {
                        item.onClick();
                        onClose();
                    }}>
                        {item.title}
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    );
};



export default CustomMenu;
