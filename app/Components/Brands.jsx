"use client";

import React, { useEffect, useState } from "react";
import Heading from "../Common/Heading";
import { ArrowRightCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import CustomBox from "../Custom/CustomBox";
import CustomSkeleton from "../Custom/CustomSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Navigation, A11y, Autoplay } from "swiper/modules";
import { GetBrands } from "../Service/GetBrands";
import CustomBrandCard from "../Common/CustomBrandCard";

const BrandSection = () => {
  const { t } = useTranslation();
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);
  const pathname = usePathname();
  const showArrowIcon = pathname !== "/categories/collections";

  const getBrandsData = async () => {
    const response = await GetBrands();
    setBrands(response?.brands);
    setLoading(false);
  };

  useEffect(() => {
    getBrandsData();
  }, []);

  useEffect(() => {
    if (pathname === "/categories/collections") {
      setVisibleCount(brands?.length || 0);
    }
  }, [pathname, brands]);

  return (
    <CustomBox>
      <Heading text={t("Our Top Brands")}>
        {showArrowIcon && visibleCount < (brands?.length || 0) && (
          <Link
            href="/categories/collections"
            aria-label="See all brands"
            className="text-white hover:text-blue-400 transition-colors"
          >
            <ArrowRightCircle size={28} />
          </Link>
        )}
      </Heading>

      <div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <CustomSkeleton
                key={index}
                type="card"
                width="96px"
                height="96px"
              />
            ))}
          </div>
        ) : brands && brands.length > 0 ? (
          pathname === "/categories/collections" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {brands.map((brand, index) => (
                <CustomBrandCard
                  key={index}
                  id={brand._id}
                  slug={brand.slug}
                  image={brand.brand_image}
                  title={brand.title}
                />
              ))}
            </div>
          ) : (
            <Swiper
              modules={[Navigation, A11y, Autoplay]}
              spaceBetween={10}
              slidesPerView={2}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 6, spaceBetween: 30 },
              }}
            >
              {brands.slice(0, visibleCount).map((brand, index) => (
                <SwiperSlide key={index}>
                  <CustomBrandCard
                    id={brand._id}
                    slug={brand.slug}
                    image={brand.brand_image}
                    title={brand.title}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )
        ) : (
          <p className="text-center text-gray-700 dark:text-gray-300">
            {t("No Brands Found")}
          </p>
        )}
      </div>
    </CustomBox>
  );
};

export default BrandSection;
