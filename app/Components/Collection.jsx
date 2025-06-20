"use client";

import React, { useEffect, useState } from 'react';
import Heading from '../Common/Heading';
import { ArrowRightCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import CustomBox from '../Custom/CustomBox';
import CustomSkeleton from '../Custom/CustomSkeleton';
import CustomCollectionCard from '../Common/CustomCollectionCard';
import { GetCollection } from '../Service/GetCollection';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, A11y, Autoplay } from 'swiper/modules';

const Collection = () => {
  const { t } = useTranslation();
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);
  const pathname = usePathname();
  const showArrowIcon = pathname !== "/categories/collections";

  const getCollection = async () => {
    const response = await GetCollection();
    setCollection(response?.collections);
    setLoading(false);
  };

  useEffect(() => {
    getCollection();
  }, []);

  useEffect(() => {
    if (pathname === "/categories/collections") {
      setVisibleCount(collection?.length || 0);
    }
  }, [pathname, collection]);

  return (
    <CustomBox>
      <Heading text={t("Our Top Collections")}>
        {showArrowIcon && visibleCount < (collection?.length || 0) && (
          <Link
            href="/categories/collections"
            aria-label="See all collections"
            className="text-white hover:text-blue-500 transition"
          >
            <ArrowRightCircle size={28} />
          </Link>
        )}
      </Heading>

      <div>
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <CustomSkeleton
                key={index}
                type="card"
                width="96px"
                height="96px"
              />
            ))}
          </div>
        ) : collection && collection.length > 0 ? (
          <Swiper
            modules={[Navigation, A11y, Autoplay]}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop={true}
            spaceBetween={10}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6, spaceBetween: 30 },
            }}
          >
            {collection.slice(0, visibleCount).map((col, index) => (
              <SwiperSlide key={index}>
                <CustomCollectionCard
                  tooltip={col.title}
                  id={col._id}
                  slug={col.slug}
                  image={col.collection_image}
                  title={col.title}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-gray-700 dark:text-gray-300">
            {t("No collection Found")}
          </p>
        )}
      </div>
    </CustomBox>
  );
};

export default Collection;
