'use client'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

import { Navigation, A11y, Scrollbar } from 'swiper/modules';
import { GetCategories } from '../Service/GetCategory';
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
        <div className='my-7 '>

                <Swiper navigation={true} modules={[A11y, Scrollbar, Navigation]}
                    slidesPerView={1}
                    scrollbar={{ draggable: true }} style={{ height: '400px' ,borderRadius:'5px'}}>
                    {slider && slider.length > 0 ? (
                        slider.map((slide) => (
                            <SwiperSlide key={slide.id} >
                                <img
                                    src={slide.slider_image}
                                    alt={slide.title}
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        objectFit: 'contain',
                                    }}
                                />
                            </SwiperSlide>
                        ))
                    ) : (
                        <SwiperSlide>No slides available</SwiperSlide>
                    )}
                </Swiper>
           </div>
    )
}

export default Slider
