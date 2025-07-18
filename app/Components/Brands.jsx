"use client";

import React, { useRef } from "react";
import Heading from "../Common/Heading";
import ClientLink from "../Common/ClientClick";

import { useTranslation } from "react-i18next";
import CustomSwiper from "../Custom/CustomSwiper";
import CustomCollectionCard from "../Common/CustomCollectionCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CustomIconButton from "../Custom/CustomIconButton";

const Brands = ({ data = [] }) => {
  const { t } = useTranslation();
 const swiperRef = useRef(null);

  const handlePrev = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };
  return (
    <div className="my-6">
      <Heading text={t("Our Top Brands")} >
        <div className="flex gap-2 items-center">
          <CustomIconButton onClick={handlePrev} className="rounded-md border bg-white shadow-sm">
            <ChevronLeft className="w-5 h-5" />
          </CustomIconButton>
          <CustomIconButton onClick={handleNext} className="rounded-md border bg-white shadow-sm">
            <ChevronRight className="w-5 h-5" />
          </CustomIconButton>
        </div></Heading>

      {data.length > 0 ? (
        <CustomSwiper
          data={data}
          autoplay={true}
          navigation={false}
          pagination={false}
          height="auto"
          swiperClass="px-2"
          swiperRef={swiperRef}
          breakpoints={{
            0: { slidesPerView: 2, spaceBetween: 10 },
            640: { slidesPerView: 2, spaceBetween: 10 },
            768: { slidesPerView: 4, spaceBetween: 20 },
            1024: { slidesPerView: 6, spaceBetween: 30 },
          }}
          renderContent={(brand) => (
            <ClientLink href={`/brand/${brand.slug}`}>
              <CustomCollectionCard
                id={brand._id}
                slug={brand.slug}
                image={brand.brand_image}
                title={brand.title}
              />
            </ClientLink>
          )}
        />
      ) : (
        <p className="text-center text-tsecondary">{t("No Brands Found")}</p>
      )
      }
    </div >
  );
};

export default Brands;
