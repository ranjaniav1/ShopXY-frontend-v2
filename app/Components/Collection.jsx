'use client';
import React, { useEffect, useState } from 'react';
import Heading from '../Common/Heading';
import { Grid, Box, Typography, useTheme } from "@mui/material";
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import CustomBox from '../Custom/CustomBox';
import CustomSkeleton from '../Custom/CustomSkeleton';
import CustomCollectionCard from '../Common/CustomCollectionCard';
import { GetCollection } from '../Service/GetCollection';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, A11y } from 'swiper/modules';
import CustomTypography from '../Custom/CustomTypography';

const Collection = () => {
    const { t } = useTranslation();
    const [collection, setCollection] = useState([]);
    const [loading, setLoading] = useState(true);

    const theme = useTheme()
    const getCollection = async () => {
        const response = await GetCollection();
        setCollection(response?.collections);
        setLoading(false);
    };

    useEffect(() => {
        getCollection();
    }, []);



    return (
        <CustomBox>
            <Heading text={t("Our Top Collections")} />
            <Box>
                {loading ? (
                    <Grid container spacing={2}>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <CustomSkeleton
                                gridItem
                                gridProps={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                                key={index}
                                type="card"
                                width="96px"
                                height="96px"
                            />
                        ))}
                    </Grid>
                ) : collection?.length > 0 ? (
                    <Swiper
                        modules={[Navigation, A11y]}
                        spaceBetween={10}
                        slidesPerView={2}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 4 },
                            1024: { slidesPerView: 6, spaceBetween: 30 },
                        }}
                    >
                        {collection.map((col, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <Link href={`/collection/${col.slug}`}>
                                        <CustomCollectionCard
                                            tooltip={col.title}
                                            id={col._id}
                                            slug={col.slug}
                                            image={col.collection_image}
                                            title={col.title}
                                        />
                                    </Link>
                                </SwiperSlide>
                            );
                        })}

                    </Swiper>
                ) : (
                    <CustomTypography textAlign="center" sx={{ color: theme.palette.text.primary }}>
                        {t('No collections found')}
                    </CustomTypography>
                )}
            </Box>

        </CustomBox>
    );
};

export default Collection;
