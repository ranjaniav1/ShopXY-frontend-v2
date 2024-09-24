'use client';
import React, { useEffect, useState } from 'react';

import { Box, Card, Typography, useTheme } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CustomDrawer from '../Custom/CustomDrawer';
import BrandReviewDrawer from './BrandReviewDrawer';

const BrandRating = ({ brand }) => {


    const theme = useTheme();
    const [open, setOpen] = useState(false);


    const rating = brand.rating || 0;
    const reviewCount = brand.reviewCount || 0;

    return (
        <>
            <Card
                sx={{
                    padding: 2,
                    borderRadius: 2,
                    boxShadow: 2,
                    display: 'flex',
                    alignItems: 'center',
                    background: theme.palette.background.paper,
                    cursor: 'pointer' // Make the card clickable
                }}
                onClick={() => setOpen(true)} // Open drawer on click
            >
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <StorefrontIcon sx={{ fontSize: 50, color: '#1976d2' }} />
                    <Typography variant="h6" sx={{ marginLeft: 1, fontWeight: 'bold' }}>
                        {brand.title}
                    </Typography>
                </Box>
                <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#ff9800' }}>
                        {rating} ⭐
                    </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        {reviewCount} Review{reviewCount !== 1 ? 's' : ''}
                    </Typography>
                </Box>
            </Card>
            <CustomDrawer open={open} onClose={() => setOpen(false)} title={brand.title}>
                <BrandReviewDrawer brand={brand} />
            </CustomDrawer>
        </>
    );
}

export default BrandRating;
