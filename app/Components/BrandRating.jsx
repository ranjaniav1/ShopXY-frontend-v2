'use client'
import React, { useEffect, useState } from 'react'
import { GetSpecificBrandReview } from '../Service/GetReviews'
import { Box } from '@mui/material'
import StorefrontIcon from '@mui/icons-material/Storefront';

const BrandRating = ({ BrandId }) => {
    const [brand, setBrand] = useState({ title: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function getBrands() {
        try {
            const response = await GetSpecificBrandReview({ id: BrandId });
            console.log("brands review", response)
            setBrand(response);
        } catch (err) {
            setError('Failed to fetch brand reviews');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getBrands();
    }, [BrandId]); // Add BrandId as a dependency

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="border-gray-300">
            <h1>Sold By</h1>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <StorefrontIcon sx={{ fontSize: 50 }} />
                <h1 style={{ marginLeft: '10px' }}>{ 'No title available'}</h1>
            </Box>
        </div>
    );
}

export default BrandRating;
