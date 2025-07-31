// Inside CustomSwiper.jsx
import { useRef, useEffect } from "react"; // add this
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
  navigation = false,
  breakpoints = {},
  swiperRef, // <- accept external ref
}) => {
  const internalRef = useRef(null);

  useEffect(() => {
    if (swiperRef && internalRef.current) {
      swiperRef.current = internalRef.current.swiper;
    }
  }, [swiperRef]);

  if (!data.length) {
    return (
      <div className="h-[250px] flex items-center justify-center bg-secondary text-tprimary text-lg font-medium">
        No Items Available
      </div>
    );
  }

  return (
    <div className={`rounded-md overflow-hidden ${className}`} style={{ height }}>
      <Swiper
        ref={internalRef}
        modules={[A11y, Navigation, Autoplay, Pagination]}
        slidesPerView={1}
        navigation={navigation}
        pagination={pagination ? { clickable: true } : false}
        autoplay={
          autoplay
            ? { delay: 4000, disableOnInteraction: false }
            : false
        }
        loop={true}
        breakpoints={breakpoints}
        className={`h-full relative swiper-custom-nav ${swiperClass}`}
      >
        {data.map((item, idx) => (
          <SwiperSlide key={item._id || idx} className="relative h-full">
            {renderContent(item, idx)}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CustomSwiper;
