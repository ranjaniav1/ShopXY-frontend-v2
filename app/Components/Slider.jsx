'use client';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Navigation, A11y, Autoplay } from 'swiper/modules';
import { GetHomeScreenData } from '../Service/GetHomeScreenData';
import Link from 'next/link';
import CustomSkeleton from '../Custom/CustomSkeleton';
import CustomTypography from '../Custom/CustomTypography';
import { useTheme } from '@mui/material';

const Slider = () => {
    const [slider, setSlider] = useState([]);
    const [loading, setLoading] = useState(true);
const theme=useTheme()
    async function GetSliders() {
        try {
            const result = await GetHomeScreenData();
            setSlider(result?.sliders);
        } catch (error) {
            console.log("failed to fetch slider", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        GetSliders();
    }, []);

    return (
        <div className="my-7 rounded-md overflow-hidden h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px]">
            <Swiper
                navigation={true}
                modules={[A11y, Navigation, Autoplay]}
                slidesPerView={1}
                scrollbar={{ draggable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                className="h-full"
            >
                {loading ? (
                    <SwiperSlide className="h-full">
                        <CustomSkeleton type="image" width="100%" height="100%" />
                    </SwiperSlide>
                ) : slider && slider.length > 0 ? (
                    slider.map((slide) => (
                        <SwiperSlide key={slide.id} className="h-full">
                            <Link href={`/categories/${slide.id}/${slide.slug}`} className="block w-full h-full">
                                <img
                                    src={slide.slider_image}
                                    alt={slide.title}
                                    className="w-full h-full object-cover"
                                />
                            </Link>
                        </SwiperSlide>
                    ))
                ) : (
                    <CustomTypography textAlign="center" sx={{color:theme.palette.text.primary}}>No Swipers Available</CustomTypography>                )}
            </Swiper>
        </div>
    );
};

export default Slider;
