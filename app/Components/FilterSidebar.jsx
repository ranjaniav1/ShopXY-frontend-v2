'use client';
import React, { useState, useEffect } from 'react';
import { GetSingleBrands } from '../Service/GetBrands';
import { Checkbox, FormControlLabel, FormGroup, Typography, Paper, Divider, Box, IconButton } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@mui/icons-material';

const FilterSidebar = ({ brand_id }) => {
    const [brands, setBrands] = useState([]);

    async function GetCollection() {
        try {
            const result = await GetSingleBrands({ brand_id });
            console.log("brands", result.data);
            setBrands(result.data);
        } catch (error) {
            console.log("failed to fetch collection", error);
        }
    }

    useEffect(() => {
        if (brand_id) {
            GetCollection();
        }
    }, [brand_id]);



    return (

        <Box
            sx={{
                width: '100%',
                padding: '16px',
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                height: 'fit-content',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
        >
            <Typography variant="h6">Filters</Typography>

            <Divider sx={{ my: 2 }} />
            <Box>
                <Typography variant="subtitle1" gutterBottom>
                    Brands
                </Typography>
                <FormGroup>
                    {brands.map((brand) => (
                        <FormControlLabel
                            key={brand.id}
                            control={<Checkbox color="primary" />}
                            label={brand.title}
                            sx={{ mb: 1 }}
                        />
                    ))}
                </FormGroup>
            </Box>
        </Box>);
};

export default FilterSidebar;
