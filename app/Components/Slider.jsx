'use client'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { GetCategories } from '../Service/GetCategory';
import { Container } from '@mui/material';

const Slider = () => {
    const [slider, setSlider] = useState([])

    async function GetCategory() {
        try {
            const result = await GetCategories();
            console.log("swiper", result.swiper)
            setSlider(result.swiper)
        } catch (error) {
            console.log("failed to fetch slider", error)
        }
    }

    useEffect(() => { GetCategory() }, [])

    return (
        <div className='my-4'>

            <Container maxWidth="xl">
                <Swiper navigation={true} modules={[Navigation]} style={{ height: '400px' }}>
                    {slider && slider.length > 0 ? (
                        slider.map((slide) => (
                            <SwiperSlide key={slide.id} >
                                <img
                                    src={slide.slider_image}
                                    alt={slide.title}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        objectFit: 'cover',
                                        borderRadius: '5px'
                                    }}
                                />
                            </SwiperSlide>
                        ))
                    ) : (
                        <SwiperSlide>No slides available</SwiperSlide>
                    )}
                </Swiper>
            </Container ></div>
    )
}

export default Slider
