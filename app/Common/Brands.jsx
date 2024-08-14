'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import CustomMenu from './CustomMenu';
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';

const Brands = ({ onSortChange }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [filterType, setFilterType] = useState('');



    const handleMenuOpen = (event, type) => {
        setAnchorEl(event.currentTarget);
        setFilterType(type);
        setOpen(true);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };

    const handleSortSelect = (sortOption) => {
        onSortChange(sortOption);
        handleMenuClose();
    };

    const createMenuItems = (items, onSelect) => items.map((item) => ({
        title: item.name || item.color,
        onClick: () => onSelect(item.name || item.color),
    }));

    const sortMenuItems = createMenuItems([
        { name: 'Price: Low to High' },
        { name: 'Price: High to Low' },
        { name: 'Newest Arrivals' },
    ], handleSortSelect);

    return (
        <Box
            sx={{
                // width: '85%',
                padding: '16px',
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                height: 'fit-content',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
        >
            <Typography variant="h6" gutterBottom>
                FILTERS
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Box sx={{ mb: 2 }}>
                <CustomMenu
                   endIcon={<ArrowDropDownSharpIcon />}
                    title="Sort By"
                    menuItems={sortMenuItems}
                    anchorEl={anchorEl}
                    open={open && filterType === 'sort'}
                    onClose={handleMenuClose}
                    onOpen={(event) => handleMenuOpen(event, 'sort')}
                />
            </Box>
        </Box>
    );
};

export default Brands;
