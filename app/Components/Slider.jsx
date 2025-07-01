"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Navigation, A11y, Autoplay } from "swiper/modules";
import ClientLink from "../Common/ClientClick";

const Slider = ({ data = [] }) => {
  if (!data.length) {
    return (
      <div className="h-[250px] flex items-center justify-center bg-secondary text-tprimary text-lg font-medium">
        No Sliders Available
      </div>
    );
  }

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
        {data.map((slide) => (
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
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
