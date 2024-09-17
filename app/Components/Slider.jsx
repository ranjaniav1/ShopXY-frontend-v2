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

const Slider = () => {
    const [slider, setSlider] = useState([]);
    const [loading, setLoading] = useState(true);

    async function GetCategory() {
        try {
            const result = await GetHomeScreenData();
            console.log("swiper", result);
            setSlider(result.swiper);
        } catch (error) {
            console.log("failed to fetch slider", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        GetCategory();
    }, []);

    return (
        <div className='my-7'>
            <Swiper
                navigation={true}
                modules={[A11y, Navigation, Autoplay]}
                slidesPerView={1}
                scrollbar={{ draggable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                style={{ height: '400px', borderRadius: '5px' }}
            >
                {loading ? (
                    <SwiperSlide>
                        <CustomSkeleton type="image" width="100%" height="400px" />
                    </SwiperSlide>
                ) : (
                    slider && slider.length > 0 ? (
                        slider.map((slide) => (
                            <SwiperSlide key={slide.id}>
                                <Link href={`/categories/${slide.id}/${slide.slug}`}>
                                    <img
                                        src={slide.slider_image}
                                        alt={slide.title}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </Link>
                            </SwiperSlide>
                        ))
                    ) : (
                        <SwiperSlide>No slides available</SwiperSlide>
                    )
                )}
            </Swiper>
        </div>
    );
};

export default Slider;
