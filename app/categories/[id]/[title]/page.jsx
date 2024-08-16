'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import CustomSkeleton from '@/app/Common/CustomSkeleton';
import { GetSingleCollection } from '@/app/Service/GetCollection';
import Link from 'next/link';
import Heading from '@/app/Common/Heading';
import { Box, Card, CardContent, Grid, Typography, useTheme } from '@mui/material';
import CustomBox from '@/app/Common/CustomBox';

const Page = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const { title } = useParams();
    const theme = useTheme()
    async function fetchCategory() {
        try {
            const result = await GetSingleCollection({ collection_id: id });
            console.log("collections", result.data);
            setCategories(result.data);
        } catch (error) {
            console.log("Failed to fetch categories", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (id) {
            fetchCategory();
        }
    }, [id]);

    return (
        <CustomBox>            <Heading text={title} />
            {loading ? (
                <Grid container spacing={2} className="p-4">
                    {Array.from({ length: categories.length || 9 }).map((_, index) => (
                        <Grid item xs={6} sm={4} md={5} lg={2} key={index}>
                            <CustomSkeleton
                                type="card"
                            />
                        </Grid>
                    ))}
                </Grid>
            ) : categories && categories.length > 0 ? (
                <Grid container spacing={2}>
                    {categories.map((category) => (
                        <Grid item xs={6} sm={4} md={5} lg={2} key={category.id}>
                            <Card sx={{
                                border: `1px solid ${theme.palette.card.border}`,
                                transition: 'border-color 0.3s ease', // Smooth transition for border color
                                '&:hover': {
                                    border: `1px solid ${theme.palette.card.hover}`, // Apply hover border color
                                },
                            }}>
                                <Link href={`/categories/collections/${category.id}/${category.slug}`}>
                                    <img
                                        src={category.collection_image}
                                        alt={category.title}
                                        className="w-full h-48 object-cover "
                                    />
                                </Link>
                                <CardContent>
                                    <Typography variant="h6" component="div" className="text-center">
                                        {category.title}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography className="text-center text-gray-600">No categories found</Typography>
            )}
        </CustomBox>
    );
};

export default Page;
