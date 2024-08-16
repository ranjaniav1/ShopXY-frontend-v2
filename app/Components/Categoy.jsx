'use client';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { A11y, Scrollbar } from 'swiper/modules';
import { GetCategories } from '../Service/GetCategory';
import Link from 'next/link';
import CustomSkeleton from '../Common/CustomSkeleton';
import { Box, Grid, useTheme } from '@mui/material';

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    async function GetCategory() {
        try {
            const result = await GetCategories();
            setCategories(result.data);
        } catch (error) {
            console.log("failed to fetch categories", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        GetCategory();
    }, []);

    const theme = useTheme();

    return (
        <Box className='py-5 rounded-md' style={{ background: theme.palette.background.main }}>
            {loading ? (
                <Grid container spacing={2} className="p-4">
                    {Array.from({ length: categories.length || 9 }).map((_, index) => (
                        <Grid item xs={4} sm={3} md={2} lg={1} key={index}>
                            <CustomSkeleton
                                type="image"
                                width="100%"
                                height="100px"
                            />
                        </Grid>
                    ))}
                </Grid>
            ) : categories && categories.length > 0 ? (
                <Swiper
                    modules={[A11y, Scrollbar]}
                    spaceBetween={10}
                    slidesPerView={3}
                    scrollbar={{ draggable: true }}
                    breakpoints={{
                        640: {
                            slidesPerView: 4,
                        },
                        768: {
                            slidesPerView: 5,
                        },
                        1024: {
                            slidesPerView: 9,
                            spaceBetween: 30,
                        },
                    }}
                >
                    {categories.map((category) => (
                        <SwiperSlide key={category.id} className="text-center">
                            <Link href={`/categories/${category.id}/${category.slug}`}>
                                <img
                                    src={category.category_icon}
                                    alt={category.title}
                                    className="w-24 h-24 rounded-lg object-cover mb-2 mx-auto"  style={{
                                        border: `2px solid ${theme.palette.card.border}`
                                    }}
                                />
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <p>No categories found</p>
            )}
        </Box>
    );
};

export default Category;
