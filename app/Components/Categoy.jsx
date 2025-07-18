"use client";

import React, { useRef } from "react";
import Heading from "../Common/Heading";
import ClientLink from "../Common/ClientClick";
import { useTranslation } from "react-i18next";
import CustomSwiper from "../Custom/CustomSwiper";
import CustomTypography from "../Custom/CustomTypography";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CustomIconButton from "../Custom/CustomIconButton";

const bgColors = [
  "bg-red-100", "bg-blue-100", "bg-green-100", "bg-yellow-100",
  "bg-purple-100", "bg-pink-100", "bg-indigo-100", "bg-orange-100",
  "bg-teal-100", "bg-cyan-100",
];

const Categoy = ({ data = [] }) => {
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
      <Heading text={t("Shop by Category")}>
        <div className="flex gap-2 items-center">
          <CustomIconButton
            onClick={handlePrev}
            className="bg-white border border-transparent hover:border-primary transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </CustomIconButton>
          <CustomIconButton
            onClick={handleNext}
            className="bg-white border border-transparent hover:border-primary transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </CustomIconButton>
        </div>
      </Heading>


      {data.length > 0 ? (
        <CustomSwiper
          data={data}
          autoplay={true}
          navigation={false} // disable default arrows
          pagination={false}
          height="auto"
          swiperClass="px-2"
          swiperRef={swiperRef} // pass ref to control from outside
          breakpoints={{
            0: { slidesPerView: 2, spaceBetween: 10 },
            640: { slidesPerView: 2, spaceBetween: 10 },
            768: { slidesPerView: 4, spaceBetween: 20 },
            1024: { slidesPerView: 6, spaceBetween: 30 },
          }}
          renderContent={(category, idx) => {
            const bgColor = bgColors[idx % bgColors.length];
            return (
              <ClientLink
                key={category.id || idx}
                href={`/category/${category.slug}`}
                className={`group rounded-xl p-4 flex flex-col items-center text-center cursor-pointer shadow-sm hover:shadow-md transition duration-300 ${bgColor}`}
              >
                <div className="w-16 h-16 mb-3 rounded-full bg-white p-2 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={category.category_icon}
                    alt={category.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-sm font-semibold text-tsecondary group-hover:text-primary truncate">
                  {category.title}
                </p>
              </ClientLink>
            );
          }}
        />
      ) : (
        <CustomTypography textAlign="center" className="text-tsecondary">
          {t("No category found")}
        </CustomTypography>
      )}
    </div>
  );
};

export default Categoy;
