'use client';
import React, { useEffect, useState } from 'react';
import Heading from '../Common/Heading';
import CustomSkeleton from '../Common/CustomSkeleton';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { useTheme, Grid, Box, Typography } from "@mui/material";
import { GetCollection } from '../Service/GetCollection';
import CustomCollectionCard from '../Common/CustomCollectionCard';
import CustomBox from '../Common/CustomBox';
import CustomIconButton from '../Common/CustomIconButton';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const Collection = () => {
    const { t } = useTranslation()
    const [collection, setCollection] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(6);
    const pathname = usePathname()
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
    const showArrowIcon = pathname !== "/categories/collections"
    // If on the /categories/collections route, display all categories
    useEffect(() => {
        if (pathname === "/categories/collections") {
            setVisibleCount(collection.length);
        }
    }, [pathname, collection.length]); return (
        <CustomBox>
            <Heading text={t("Best Deals on Electronics")} className={{ padding: 0 }}>
                {showArrowIcon && visibleCount < collection.length && (
                    <Link href="/categories/collections" passHref>
                        <CustomIconButton ><ArrowCircleRightOutlinedIcon fontSize='large' /></CustomIconButton></Link>
                )}
            </Heading>
            <Box>
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
                                        tooltip={category.title}
                                        id={category.id}
                                        slug={category.slug}
                                        image={category.collection_image}
                                        title={category.title}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </>
                ) : (
                    <Typography textAlign="center">{t('no Collection Found')}</Typography>
                )}
            </Box>
        </CustomBox>
    );
};

export default Collection;
