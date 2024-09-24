'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Grid, Typography, useTheme } from '@mui/material';
import CustomBox from '@/app/Custom/CustomBox';
import CustomSkeleton from '@/app/Custom/CustomSkeleton'
import CustomCollectionCard from '@/app/Common/CustomCollectionCard';
import Link from 'next/link';
import { GetSingleCategories } from '@/app/Service/GetCategory';
import Heading from '@/app/Common/Heading';
const Page = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const { title } = useParams();
    const theme = useTheme()
    async function fetchCategory() {
        try {
            const result = await GetSingleCategories({ id });
            console.log("collections", result);
            setCategories(result);
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
        <CustomBox>
            <Heading text={title} />
            {loading ? (
                <Grid container spacing={2} className="p-4">
                    {Array.from({ length: categories.length || 9 }).map((_, index) => (
                        <Grid item xs={6} sm={4} md={5} lg={3} key={index}>
                            <CustomSkeleton
                                type="card"
                            />
                        </Grid>
                    ))}
                </Grid>
            ) : categories && categories.length > 0 ? (
                <Grid container spacing={2}>
                    {categories.map((category) => (
                        <Grid item xs={6} sm={4} md={3} lg={2} key={category.id}>
                            <Link href={`/categories/collections/${category.id}/${encodeURIComponent(category.slug)}`} passHref>
                                <CustomCollectionCard
                                    tooltip={category.title}
                                    id={category.id}
                                    slug={category.slug}
                                    image={category.collection_image}
                                    title={category.title}
                                />
                            </Link>
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
