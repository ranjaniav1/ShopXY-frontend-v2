"use client";
import React, { useEffect, useState } from "react";
import Heading from "../Common/Heading";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { Grid, Box, Typography, useTheme } from "@mui/material";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import CustomBox from "../Custom/CustomBox";
import CustomSkeleton from "../Custom/CustomSkeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, A11y } from "swiper/modules";
import { GetBrands } from "../Service/GetBrands";
import CustomBrandCard from "../Common/CustomBrandCard";

const BrandSection = () => {
  const { t } = useTranslation();
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  const getBrandsData = async () => {
    const response = await GetBrands();
    setBrands(response?.brands);
    setLoading(false);
  };

  useEffect(() => {
    getBrandsData();
  }, []);



  return (
    <CustomBox>
      <Heading text={t("Our Top Brands")} />


      <Box>
        {loading ? (
          <Grid container spacing={2}>
            {Array.from({ length: 6 }).map((_, index) => (
              <CustomSkeleton
                gridItem
                gridProps={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                key={index}
                type="card"
                width="96px"
                height="96px"
              />
            ))}
          </Grid>
        ) : brands && brands.length > 0 ? (

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
            {brands.map((brand, index) => (
              <SwiperSlide key={index}>
                <Link href={`/brand/${brand.slug}`}>
                  <CustomBrandCard
                    id={brand._id}
                    slug={brand.slug}
                    image={brand.brand_image}
                    title={brand.title}
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

        ) : (
          <Typography textAlign="center" sx={{ color: theme.palette.text.primary }}>
            {t("No Brands Found")}
          </Typography>
        )}
      </Box>
    </CustomBox >
  );
};

export default BrandSection;
