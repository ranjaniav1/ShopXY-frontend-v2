'use client';
import React, { useEffect, useState } from 'react';
import Heading from '../Common/Heading';
import CustomSkeleton from '../Common/CustomSkeleton';
import CustomButton from '../Common/CustomButton';
import { useTheme, Grid, Box, Typography } from "@mui/material";
import { GetCollection } from '../Service/GetCollection';
import CustomCollectionCard from '../Common/CustomCollectionCard';
import CustomBox from '../Common/CustomBox';

const Collection = () => {
    const [collection, setCollection] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(6);
    const theme = useTheme();

    useEffect(() => {
        async function fetchCollection() {
            try {
                const result = await GetCollection();
                console.log("catcollection", result.collection);
                setCollection(result.data);
            } catch (error) {
                console.log("failed to fetch collection", error);
            } finally {
                setLoading(false);
            }
        }
        fetchCollection();
    }, []);

    const handleShowMore = () => {
        setVisibleCount(prevCount => prevCount + 6);
    };

    return (
        <CustomBox>

            <Heading text="Best Deals on Electronics" />
            <Box >
                {loading ? (
                    <Grid container spacing={2}>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                <CustomSkeleton type="card" width="96px" height="96px" />
                            </Grid>
                        ))}
                    </Grid>
                ) : collection.length > 0 ? (
                    <>
                        <Grid container spacing={2}>
                            {collection.slice(0, visibleCount).map(category => (
                                <Grid item xs={6} sm={4} md={3} lg={2} key={category.id}>
                                    <CustomCollectionCard
                                        id={category.id}
                                        slug={category.slug}
                                        image={category.collection_image}
                                        title={category.title}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        {visibleCount < collection.length && (
                            <Box textAlign="center" my={4}>
                                <CustomButton title="Show More" onClick={handleShowMore} />
                            </Box>
                        )}
                    </>
                ) : (
                    <Typography textAlign="center">No collection found</Typography>
                )}
            </Box>
        </CustomBox>
    );
};

export default Collection;
