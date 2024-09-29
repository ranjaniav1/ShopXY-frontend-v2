'use client';
import React, { useEffect, useState } from 'react';
import { Box, Card, Typography, useTheme } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CustomDrawer from '../Custom/CustomDrawer';
import BrandReviewDrawer from './BrandReviewDrawer';
import { GetSpecificBrandReview } from '../Service/GetReviews';

const BrandRating = ({ brand, brandId }) => {
    const [reviews, setReviews] = useState([]);
    const [analytics, setAnalytics] = useState({});
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const fetchReviews = async () => {
        try {
            const data = await GetSpecificBrandReview({ id: brandId });
            console.log("Fetched data:", data);

            if (data && data.success) {
                setReviews(data.data.reviews);
                setAnalytics(data.data.analytics.analytics); // Access the nested analytics object
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [brandId]);

    // Extract rating and review count safely
    const averageRating = analytics.averageRating || 0;
    const reviewCount = analytics.totalReviews || 0;

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
                        {averageRating.toFixed(1)} ⭐
                    </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        {reviewCount} Review{reviewCount !== 1 ? 's' : ''}
                    </Typography>
                </Box>
            </Card>
            <CustomDrawer open={open} onClose={() => setOpen(false)} title={brand.title}>
            <BrandReviewDrawer brand={brand} reviews={reviews} analytics={analytics} />
            </CustomDrawer>
        </>
    );
}

export default BrandRating;
