"use client";

import React from "react";
import Heading from "../Common/Heading";
import ClientLink from "../Common/ClientClick";
import { useTranslation } from "react-i18next";
import CustomSwiper from "../Custom/CustomSwiper";
import CustomTypography from "../Custom/CustomTypography";

const bgColors = [
  "bg-red-100",
  "bg-blue-100",
  "bg-green-100",
  "bg-yellow-100",
  "bg-purple-100",
  "bg-pink-100",
  "bg-indigo-100",
  "bg-orange-100",
  "bg-teal-100",
  "bg-cyan-100"
];

const Categoy = ({ data = [] }) => {
  const { t } = useTranslation();

  return (
    <div>
      <Heading text={t("Shop by Category")} />

      {/* Mobile: Swiper */}
      {
        data.length > 0 ? (

          <CustomSwiper
            data={data}
            autoplay={true}
            navigation={true}
            pagination={false}
            height="auto"
            swiperClass="px-2"
            breakpoints={{
              0: { slidesPerView: 2, spaceBetween: 10 },
              640: { slidesPerView: 2, spaceBetween: 10 },
              768: { slidesPerView: 4, spaceBetween: 20 },
              1024: { slidesPerView: 6, spaceBetween: 30 },
            }}
            renderContent={(category, idx) => (
              <ClientLink
                href={`/category/${category.slug}`}
                className={`group rounded-xl p-4 flex flex-col items-center text-center cursor-pointer hover:shadow-md transition ${bgColors[idx % bgColors.length]}`}
              >
                <img
                  src={category.category_icon}
                  alt={category.title}
                  className="w-16 h-16 object-contain mb-2 group-hover:scale-105 transition-transform"
                />
                <p className="text-sm font-semibold text-tsecondary group-hover:text-primary truncate">
                  {category.title}
                </p>
              </ClientLink>
            )}
          />
        ) : (
          <CustomTypography textAlign="center" className="text-tsecondary">
            {t("No categpry found")}
          </CustomTypography>
        )
      }
    </div>
  );
};

export default Categoy;
