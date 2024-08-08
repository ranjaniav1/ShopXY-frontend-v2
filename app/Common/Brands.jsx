'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Divider, TextField, Checkbox, FormControlLabel, Button } from '@mui/material';
import CustomMenu from './CustomMenu';
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import { GetCategories } from '../Service/GetCategory';

const FilterSidebar = () => {
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [filterType, setFilterType] = useState('');

    async function fetchCategories() {
        try {
            const result = await GetCategories();
            console.log("brands", result.brands);
            console.log("categories", result.category);
            setBrands(result.brands || []);
            setCategories(result.category || []);
        } catch (error) {
            console.log("Failed to fetch data", error);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleMenuOpen = (event, type) => {
        setAnchorEl(event.currentTarget);
        setFilterType(type);
        setOpen(true);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };

    const createMenuItems = (items) => items.map((item) => ({
        title: item.name || item.color,
        onClick: () => {
            console.log('Selected:', item.name || item.color);
            handleMenuClose();
        },
    }));

    const sortMenuItems = createMenuItems([
        { name: 'Price: Low to High' },
        { name: 'Price: High to Low' },
        { name: 'Newest Arrivals' },
    ]);

    const brandMenuItems = createMenuItems(brands);

    return (
        <Box
            sx={{
                width: '250px',
                padding: '16px',
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                height: '100%',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
        >
            <Typography variant="h6" gutterBottom>
                FILTERS (20 Products)
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Box sx={{ mb: 2 }}>
                <CustomMenu
                    startIcon={<ArrowDropDownSharpIcon />}
                    title="Sort By"
                    menuItems={sortMenuItems}
                    anchorEl={anchorEl}
                    open={open && filterType === 'sort'}
                    onClose={handleMenuClose}
                    onOpen={(event) => handleMenuOpen(event, 'sort')}
                />
            </Box>

            <Typography variant="subtitle1" gutterBottom>
                Categories
            </Typography>
            <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Search categories"
                sx={{ mb: 2 }}
            />
            <Box sx={{ mb: 2 }}>
                {categories.map((category) => (
                    <FormControlLabel
                        key={category.id}
                        control={<Checkbox />}
                        label={category.title}
                    />
                ))}
            </Box>

            <Typography variant="subtitle1" gutterBottom>
                Brands
            </Typography>
            <Box>
                {brands.map((brand) => (
                    <FormControlLabel
                        key={brand.id}
                        control={<Checkbox />}
                        label={brand.title}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default FilterSidebar;
