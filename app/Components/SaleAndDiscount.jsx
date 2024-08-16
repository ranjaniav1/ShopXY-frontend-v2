'use client';
import React, { useEffect, useState } from 'react';
import Heading from '../Common/Heading';
import { GetHomeScreenData } from '../Service/GetHomeScreenData';
import { Box, Grid, Skeleton, Typography, useTheme } from '@mui/material';
import CustomBox from '../Common/CustomBox';

const SaleAndDiscount = () => {
    const [collection, setCollection] = useState([]);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();

    async function fetchCollection() {
        try {
            const result = await GetHomeScreenData();
            console.log("sale and discount", result.sale_and_discount_product);
            setCollection(result.sale_and_discount_product);
        } catch (error) {
            console.log("failed to fetch collection", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCollection();
    }, []);

    return (
        <CustomBox>
            <Heading text="Best Discount Products" />
            <Box>
                {loading ? (
                    <Grid container spacing={2}>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                                <Skeleton variant="rectangular" width="100%" height={200} />
                            </Grid>
                        ))}
                    </Grid>
                ) : collection.length > 0 ? (
                    <Grid container spacing={2}>
                        {collection.slice(0, 6).map((category) => (
                            <Grid item xs={6} sm={4} md={3} lg={2} key={category.id}>
                                <Box
                                    sx={{
                                        position: 'relative',
                                        border: `1px solid ${theme.palette.card.border}`,
                                        background: `1px solid ${theme.palette.card.background}`, // Border color from theme
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        boxShadow: theme.shadows[2],
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                            boxShadow: theme.shadows[4], // Darker shadow on hover
                                            borderColor: theme.palette.card.hover, // Change border color on hover
                                        },
                                    }}
                                >
                                    <img
                                        src={category.banner_image}
                                        alt={category.title}
                                        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                    />
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            right: 0,
                                            backgroundColor: theme.palette.button.background,
                                            color: theme.palette.button.color,
                                            padding: '4px 8px',
                                            borderBottomLeftRadius: '8px',
                                            fontSize: '0.75rem',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        Sale
                                    </Box>
                                    <Typography
                                        variant="body1"
                                        component="p"
                                        sx={{
                                            textAlign: 'center',
                                            padding: '16px',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {category.title}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Typography textAlign="center">No collection found</Typography>
                )}
            </Box>
        </CustomBox>
    );
};

export default SaleAndDiscount;
