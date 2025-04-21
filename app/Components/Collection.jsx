'use client';
import React, { useEffect, useState } from 'react';
import Heading from '../Common/Heading';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { Grid, Box, Typography } from "@mui/material";
import { usePathname, useRouter } from 'next/navigation';
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
    const [visibleCount, setVisibleCount] = useState(6);
    const pathname = usePathname();
    const showArrowIcon = pathname !== "/categories/collections";

    const getCollection = async () => {
        const response = await GetCollection();
        setCollection(response);
        setLoading(false);
    };

    useEffect(() => {
        getCollection();
    }, []);

    useEffect(() => {
        // If on /categories/collections, display all collections
        if (pathname === "/categories/collections") {
            setVisibleCount(collection?.length || 0);
        }
    }, [pathname, collection]);


    return (
        <CustomBox>
            <Heading text={t("Our Top Collections")}>
                {showArrowIcon && visibleCount < (collection?.length || 0) && (
                    <Link href="/categories/collections" passHref aria-label="See all collections">
                  
                        <ArrowCircleRightOutlinedIcon fontSize='large' sx={{ color: "white" }} />
                  
                    </Link>
                )}
            </Heading>

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
                ) : collection && collection.length > 0 ? (
                    pathname === "/categories/collections" ? (
                        // Display all collections in a grid if on /categories/collections
                        <Grid container spacing={2}>
                            {collection.map((category, index) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
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
                        // Use Swiper for other pages
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
                            {collection.slice(0, visibleCount).map((category, index) => (
                                <SwiperSlide key={index}>
                                    <Link href={`/categories/collections/${category.id}/${category.slug}`} passHref>
                                        <CustomCollectionCard
                                            tooltip={category.title}
                                            id={category.id}
                                            slug={category.slug}
                                            image={category.collection_image}
                                            title={category.title}
                                        />
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )
                ) : (
                    <CustomTypography textAlign="center">{t('no Collection Found')}</CustomTypography>
                )}
            </Box>
        </CustomBox>
    );
};

export default Collection;
