"use client";

import React, { useRef } from "react";
import Heading from "../Common/Heading";
import CustomCollectionCard from "../Common/CustomCollectionCard";
import ClientLink from "../Common/ClientClick";
import { useTranslation } from "react-i18next";
import CustomTypography from "../Custom/CustomTypography";
import CustomSwiper from "../Custom/CustomSwiper";
import CustomIconButton from "../Custom/CustomIconButton";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Collection = ({ data = [] }) => {
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
      <Heading text={t("Our Top Collections")} >  <div className="flex gap-2 items-center">
        <CustomIconButton onClick={handlePrev} className="rounded-md border bg-body shadow-sm">
          <ChevronLeft className="w-5 h-5" />
        </CustomIconButton>
        <CustomIconButton onClick={handleNext} className="rounded-md border bg-body shadow-sm">
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
          renderContent={(col) => (
            <ClientLink href={`/collection/${col.slug}`}>
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
