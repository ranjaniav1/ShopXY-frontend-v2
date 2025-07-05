"use client";

import React from "react";
import Heading from "../Common/Heading";
import CustomCollectionCard from "../Common/CustomCollectionCard";
import ClientLink from "../Common/ClientClick";
import { useTranslation } from "react-i18next";
import CustomTypography from "../Custom/CustomTypography";
import CustomSwiper from "../Custom/CustomSwiper";

const Collection = ({ data = [] }) => {
  const { t } = useTranslation();

  return (
    <div>
      <Heading text={t("Our Top Collections")} />

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
          renderContent={(col) => (
            <ClientLink href={`/${col.slug}`}>
              <CustomCollectionCard
                tooltip={col.title}
                id={col._id}
                slug={col.slug}
                image={col.collection_image}
                title={col.title}
              />
            </ClientLink>
          )}
        />
      ) : (
        <CustomTypography textAlign="center" className="text-tsecondary">
          {t("No collections found")}
        </CustomTypography>
      )}
    </div>
  );
};

export default Collection;
