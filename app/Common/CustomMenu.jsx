import React from 'react';
import { Menu, MenuItem, Button, Typography, Box } from '@mui/material';

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
    return (
        <Box className={className}>
            <Button
                {...buttonProps}
                onClick={onOpen}
                variant="contained"
                startIcon={startIcon}
                endIcon={endIcon}
                style={{ textTransform: 'none' ,width:'100%'}} className='btn '
            // Prevents uppercase text in the button
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
