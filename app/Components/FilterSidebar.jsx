'use client';
import React, { useEffect, useState } from 'react';
import { Checkbox, FormControlLabel, FormGroup, Typography, Divider, Box } from '@mui/material';
import { GetSingleBrands } from '../Service/GetBrands';

const FilterSidebar = ({ onBrandChange, brand_id }) => {
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [brands, setBrands] = useState([]);

    const GetBrands = async () => {
        try {
            const result = await GetSingleBrands({ brand_id });
            console.log("brands", result.data);
            setBrands(result.data);
        } catch (error) {
            console.log("failed to fetch brands", error);
        }
    };

    useEffect(() => {
        GetBrands();
    }, [brand_id]);

    const handleCheckboxChange = (event, brandId) => {
        let updatedSelectedBrands;
        if (event.target.checked) {
            updatedSelectedBrands = [...selectedBrands, brandId];
        } else {
            updatedSelectedBrands = selectedBrands.filter(id => id !== brandId);
        }

        setSelectedBrands(updatedSelectedBrands);
        onBrandChange(updatedSelectedBrands);
    };

    return (
        <Box
            sx={{
                width: '17%',
                padding: '16px',
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '4px',
                height: '100vh', // Full viewport height
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                position: 'fixed',
                overflowY: 'auto' // Allow sidebar to scroll if needed
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
                            control={
                                <Checkbox
                                    color="primary"
                                    checked={selectedBrands.includes(brand.id)}
                                    onChange={(e) => handleCheckboxChange(e, brand.id)}
                                />
                            }
                            label={brand.title}
                            sx={{ mb: 1 }}
                        />
                    ))}
                </FormGroup>
            </Box>
        </Box>
    );
};

export default FilterSidebar;
