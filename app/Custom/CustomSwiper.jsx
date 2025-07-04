"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Navigation, A11y, Autoplay, Pagination } from "swiper/modules";

const CustomSwiper = ({
  data = [],
  renderContent,
  height = "clamp(200px, 35vw, 500px)",
  className = "",
  swiperClass = "",
  autoplay = true,
  pagination = true,
  navigation = true,
  breakpoints={}
}) => {
  if (!data.length) {
    return (
      <div className="h-[250px] flex items-center justify-center bg-secondary text-tprimary text-lg font-medium">
        No Items Available
      </div>
    );
  }

  return (
    <div className={`my-7 rounded-md overflow-hidden bg-body ${className}`} style={{ height }}>
      <Swiper
        modules={[A11y, Navigation, Autoplay, Pagination]}
        slidesPerView={1}
        navigation={navigation}
        pagination={pagination ? { clickable: true } : false}
        breakpoints={breakpoints}
        autoplay={autoplay ? { delay: 3000, disableOnInteraction: false } : false}
        className={`h-full relative swiper-custom-nav ${swiperClass}`}
      >
        {data.map((item) => (
          <SwiperSlide key={item._id} className="relative h-full">
            {renderContent(item)}
          </SwiperSlide>
        ))}
      </Swiper>
    </div >
  );
};

export default CustomSwiper;
