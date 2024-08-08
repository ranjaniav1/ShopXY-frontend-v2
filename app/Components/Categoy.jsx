'use client'
import React, { useEffect, useState } from 'react'
import { Container } from '@mui/material'
import { GetCategories } from '../Service/GetCategory'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { A11y, Scrollbar } from 'swiper/modules'

const Categoy = () => {
    const [categories, setCategories] = useState([])

    async function GetCategory() {
        try {
            const result = await GetCategories();
            console.log("cate", result)
            setCategories(result.category)
        } catch (error) {
            console.log("failed to fetch categories", error)
        }
    }

    useEffect(() => { GetCategory() }, [])

    return (
        <div className='my-4'>
            <Container maxWidth="xl" className="bg-white">
                {categories && categories.length > 0 ? (
                    <Swiper
                    modules={[A11y, Scrollbar]}
                    spaceBetween={10}
                    slidesPerView={3}
                    scrollbar={{ draggable: true }}
                        breakpoints={{
                            640: {
                                slidesPerView: 4,
                                // spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 5,
                                // spaceBetween: 30,
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
                                <img
                                    src={category.category_icon}
                                    alt={category.title}
                                    className="w-24 h-24 rounded-full object-cover mb-2 mx-auto"
                                />
                                <p className="text-lg font-semibold">{category.title}</p>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <p>No categories found</p>
                )}
            </Container>
        </div>
    )
}

export default Categoy
