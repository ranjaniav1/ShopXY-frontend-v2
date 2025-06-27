"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Navigation, A11y, Autoplay } from "swiper/modules";
import { GetHomeScreenData } from "../Service/GetHomeScreenData";
import Link from "next/link";
import ClientLink from "../Common/ClientClick";

const Slider = () => {
  const [slider, setSlider] = useState([]);
  const [loading, setLoading] = useState(true);

  const GetSliders = async () => {
    try {
      const result = await GetHomeScreenData();
      setSlider(result?.sliders || []);
    } catch (error) {
      console.error("Failed to fetch slider", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetSliders();
  }, []);

  return (
    <div
      className="my-7 rounded-md overflow-hidden bg-body"
      style={{
        height: "clamp(200px, 35vw, 500px)",
      }}
    >
      <Swiper
        navigation
        modules={[A11y, Navigation, Autoplay]}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="h-full"
      >
        {loading ? (
          <SwiperSlide className="h-full bg-secondary animate-pulse" />
        ) : slider.length > 0 ? (
          slider.map((slide) => (
            <SwiperSlide key={slide._id} className="h-full">
              <ClientLink
                href={`/categories/${slide._id}/${slide.slug}`}
                className="block w-full h-full"
              >
                <img
                  src={slide.slider_image}
                  alt={slide.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </ClientLink>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide className="h-full flex items-center justify-center bg-secondary text-tprimary text-lg font-medium">
            No Swipers Available
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default Slider;
