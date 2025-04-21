'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, Divider, Select, MenuItem, FormGroup, FormControlLabel, Checkbox, useTheme } from '@mui/material';
import { useParams } from 'next/navigation';
import { GetSingleBrands } from '../Service/GetBrands'; // Ensure this import is correct and matches your service file
import { useTranslation } from 'react-i18next';
import CustomTypography from '../Custom/CustomTypography';

const Brands = ({ onBrandChange }) => {
    const [brands, setBrands] = useState([]);
    const theme = useTheme();
    const { t } = useTranslation()
    // Fetch brands data
    const fetchBrands = async () => {
        try {
            const result = await GetSingleBrands({ brand_id: 101 });
            setBrands(result.data);
        } catch (error) {
            console.log("Failed to fetch brands", error);
        }
    };

    useEffect(() => {
        fetchBrands();
    }, []);





    return (
        <Box sx={{ width: '100%', padding: '16px', backgroundColor: theme.palette.background.main, border: '1px solid #e0e0e0', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <CustomTypography variant="h6">{t("Filters")}</CustomTypography>
            <Divider sx={{ my: 2 }} />

            {/* Sort By Dropdown */}
            <Box sx={{ mb: 2 }}>
                <CustomTypography variant="subtitle1" gutterBottom>
                    {t(" Sort By")}
                </CustomTypography>
                <Select sx={{ width: '100%' }}>
                    <MenuItem value="alphabetical">Alphabetical</MenuItem>
                    <MenuItem value="reverse-alphabetical">Reverse Alphabetical</MenuItem>
                    <MenuItem value="price-low-to-high">Price: Low to High</MenuItem>
                    <MenuItem value="price-high-to-low">Price: High to Low</MenuItem>
                    <MenuItem value="rating-based">Rating Based</MenuItem>
                    <MenuItem value="discount-based">Discount Based</MenuItem>
                </Select>
            </Box>

            {/* Rating Filter */}
            <Box sx={{ mb: 2 }}>
                <CustomTypography variant="subtitle1" gutterBottom>
                    {t("Filter by Rating")}
                </CustomTypography>
                <Select sx={{ width: '100%' }}>
                    <MenuItem value="2-3">2.0 to 3.0</MenuItem>
                    <MenuItem value="3-4">3.0 to 4.0</MenuItem>
                    <MenuItem value="4-5">4.0 to 5.0</MenuItem>
                </Select>
            </Box>

            {/* Brands Filtering */}
            <Box>
                <CustomTypography variant="subtitle1" gutterBottom>
                    {t("Brands")}
                </CustomTypography>
                <FormGroup>
                    {brands.length > 0 ? (
                        brands.map((brand) => (
                            <FormControlLabel
                                key={brand.id}
                                control={
                                    <Checkbox
                                        color="primary"
                                    />
                                }
                                label={brand.title}
                                sx={{ mb: 1 }}
                            />
                        ))
                    ) : (
                        <CustomTypography variant="body2">No brands available</CustomTypography>
                    )}
                </FormGroup>
            </Box>
        </Box>
    );
};

export default Brands;
