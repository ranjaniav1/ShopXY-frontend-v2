"use client";

import React, { useEffect, useState } from "react";
import Heading from "../Common/Heading";
import { useTranslation } from "react-i18next";
import CustomBox from "../Custom/CustomBox";
import CustomSkeleton from "../Custom/CustomSkeleton";
import CustomCollectionCard from "../Common/CustomCollectionCard";
import { GetCollection } from "../Service/GetCollection";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, A11y } from "swiper/modules";
import CustomTypography from "../Custom/CustomTypography";
import ClientLink from "../Common/ClientClick";

const Collection = () => {
  const { t } = useTranslation();
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCollection = async () => {
    const response = await GetCollection();
    setCollection(response?.collections || []);
    setLoading(false);
  };

  useEffect(() => {
    getCollection();
  }, []);

  return (
    <div className="px-4 py-6">
      <Heading text={t("Our Top Collections")} />

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-4">
          {Array.from({ length: 10 }).map((_, idx) => (
            <CustomSkeleton key={idx} width="100%" height={120} type="card" />
          ))}
        </div>
      ) : collection?.length > 0 ? (
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
          {collection.map((col, index) => (
            <SwiperSlide key={index}>
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
