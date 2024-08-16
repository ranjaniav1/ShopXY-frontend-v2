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
import { Box, useTheme } from '@mui/material';

const Categoy = () => {
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

    const skeletonCount = 9;
    const theme = useTheme()

    console.log("Primary", theme.palette.background.main)
    return (
        <Box className=' py-5 rounded-md' style={{background: theme.palette.background.main}}>
            {loading ? (
                <div className="p-4 flex space-x-10">
                    {Array.from({ length: skeletonCount }).map((_, index) => (
                        <CustomSkeleton
                            key={index}
                            type="image"
                            width="96px"
                            height="96px"
                        />
                    ))}
                </div>
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
                        <SwiperSlide
                            key={category.id}
                            className="text-center"
                        >
                            <Link href={`/categories/${category.id}/${category.slug}`}>
                                <img
                                    src={category.category_icon}
                                    alt={category.title}
                                    className="w-24 h-24 rounded-lg object-cover mb-2 mx-auto border-btn"
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

export default Categoy;
