'use client';
import React, { useState, useEffect } from 'react';
import { GetSingleBrands } from '../Service/GetBrands';
import { Checkbox, FormControlLabel, FormGroup, Typography, Paper, Divider, Box, IconButton } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@mui/icons-material';

const FilterSidebar = ({ brand_id }) => {
    const [brands, setBrands] = useState([]);
    const [expanded, setExpanded] = useState(true);

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

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Paper className="w-full md:w-1/4 lg:w-1/5 p-4 border-r border-gray-200 bg-white shadow-md rounded-lg">
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6">Filters</Typography>
                <IconButton onClick={handleExpandClick} size="small">
                    {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
            </Box>
            <Divider sx={{ my: 2 }} />
            {expanded && (
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
            )}
        </Paper>
    );
};

export default FilterSidebar;
