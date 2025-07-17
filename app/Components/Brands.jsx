"use client";

import React from "react";
import Heading from "../Common/Heading";
import ClientLink from "../Common/ClientClick";

import { useTranslation } from "react-i18next";
import CustomSwiper from "../Custom/CustomSwiper";
import CustomCollectionCard from "../Common/CustomCollectionCard";

const Brands = ({ data = [] }) => {
  const { t } = useTranslation();

  return (
    <div>
      <Heading text={t("Our Top Brands")} />
      {data.length > 0 ? (
        <CustomSwiper
          data={data}
          autoplay={false}
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
