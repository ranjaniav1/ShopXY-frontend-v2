'use client';
import React, { useEffect, useState } from 'react';
import Heading from '../Common/Heading';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { Grid, Box, Typography } from "@mui/material";
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import CustomBox from '../Custom/CustomBox';
import CustomIconButton from '../Custom/CustomIconButton';
import CustomSkeleton from '../Custom/CustomSkeleton';
import CustomCollectionCard from '../Common/CustomCollectionCard';
import { GetCollection } from '../Service/GetCollection';

const Collection = () => {
    const { t } = useTranslation();
    const [collection, setCollection] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(6);
    const pathname = usePathname();
    const showArrowIcon = pathname !== "/categories/collections";

    useEffect(() => {
        const getCollection = async () => {
            const data = await GetCollection();
            setCollection(data);
            setLoading(false);
        };
        getCollection();
    }, []);

    useEffect(() => {
        if (pathname === "/categories/collections") {
            setVisibleCount(collection?.length || 0);  // Ensure collection is defined
        }
    }, [pathname, collection]);

    return (
        <CustomBox>
            <Heading text={t("Our Top Collections")}>
                {showArrowIcon && visibleCount < (collection?.length || 0) && (
                    <Link href="/categories/collections" passHref>
                        <CustomIconButton><ArrowCircleRightOutlinedIcon fontSize='large' sx={{ color: "white" }} /></CustomIconButton>
                    </Link>
                )}
            </Heading>

            <Box>
                {loading ? (
                    <Grid container spacing={2}>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <CustomSkeleton gridItem gridProps={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index} type="card" width="96px" height="96px" />
                        ))}
                    </Grid>
                ) : collection?.length > 0 ? (
                    <Grid container spacing={2}>
                        {collection.slice(0, visibleCount).map(category => (
                            <Grid item xs={6} sm={4} md={3} lg={2} key={category.id}>
                                <Link href={`/categories/collections/${category.id}/${category.slug}`} passHref>
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
                    <Typography textAlign="center">{t('no Collection Found')}</Typography>
                )}
            </Box>
        </CustomBox>
    );
};

export default Collection;
