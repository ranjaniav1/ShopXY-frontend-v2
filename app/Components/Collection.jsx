"use client";

import React from "react";
import Heading from "../Common/Heading";
import CustomCollectionCard from "../Common/CustomCollectionCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, A11y } from "swiper/modules";
import ClientLink from "../Common/ClientClick";
import { useTranslation } from "react-i18next";
import CustomTypography from "../Custom/CustomTypography";

const Collection = ({ data = [] }) => {
  const { t } = useTranslation();

  return (
    <div >
      <Heading text={t("Our Top Collections")} />
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
          {data.map((col) => (
            <SwiperSlide key={col._id}>
              <ClientLink href={`/collection/${col.slug}`}>
                <CustomCollectionCard
                  tooltip={col.title}
                  id={col._id}
                  slug={col.slug}
                  image={col.collection_image}
                  title={col.title}
                />
              </ClientLink>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <CustomTypography textAlign="center" className="text-tsecondary">
          {t("No collections found")}
        </CustomTypography>
      )}
    </div>
  );
};

export default Collection;
