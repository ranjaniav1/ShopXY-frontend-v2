"use client";

import React from "react";
import Heading from "../Common/Heading";
import CustomBrandCard from "../Common/CustomBrandCard";
import ClientLink from "../Common/ClientClick";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, A11y } from "swiper/modules";
import { useTranslation } from "react-i18next";

const Brands = ({ data = [] }) => {
  const { t } = useTranslation();

  return (
    <div>
      <Heading text={t("Our Top Brands")} />
      {data.length > 0 ? (
        <Swiper
          modules={[Navigation, A11y]}
          spaceBetween={10}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6, spaceBetween: 30 },
          }}
        >
          {data.map((brand) => (
            <SwiperSlide key={brand._id}>
              <ClientLink href={`/brand/${brand.slug}`}>
                <CustomBrandCard
                  id={brand._id}
                  slug={brand.slug}
                  image={brand.brand_image}
                  title={brand.title}
                />
              </ClientLink>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center text-tsecondary">{t("No Brands Found")}</p>
      )}
    </div>
  );
};

export default Brands;
