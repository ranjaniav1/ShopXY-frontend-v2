"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { A11y } from "swiper/modules";
import { GetCategories } from "../Service/GetCategory";
import Link from "next/link";
import { Box, Grid, Tooltip, Typography, useTheme } from "@mui/material";
import CustomSkeleton from "../Custom/CustomSkeleton";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  async function GetCategory() {
    try {
      const result = await GetCategories();
      setCategories(result);
    } catch (error) {
      console.log("failed to fetch categories", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    GetCategory();
  }, []);

  const theme = useTheme();

  return (
    <Box
      className="p-4 rounded-md "
      style={{
        background: theme.palette.background.main,
        color: theme.palette.text.primary
      }}
    >
      {loading ? (
        <Grid container spacing={2} className="p-4">
          {Array.from({ length: categories.length || 9 }).map((_, index) => (
            <Grid item xs={4} sm={3} md={2} lg={1} key={index}>
              <CustomSkeleton
                type="rounded"
                width={100}
                height={100}
                className="mx-auto"
              />
            </Grid>
          ))}
        </Grid>
      ) : categories && categories.length > 0 ? (
        <Swiper
          modules={[A11y]}
          spaceBetween={10}
          slidesPerView={2}
          breakpoints={{
            640: {
              slidesPerView: 4
            },
            768: {
              slidesPerView: 5
            },
            1024: {
              slidesPerView: 9,
              spaceBetween: 30
            }
          }}
        >
          {categories.map((category, index) => (
            <SwiperSlide key={index} className="text-center">
              <Link href={`/categories/${category.id}/${category.slug}`}>
                <Tooltip title={category.title}>
                  <Box
                    component="img"
                    src={category.category_icon}
                    alt={category.title}
                    className="w-20 h-20 rounded-full object-cover mb-2 mx-auto"
                    sx={{
                      border: `2px solid ${theme.palette.primary.main}`,
                      "&:hover": {
                        borderColor: theme.palette.primary.main,
                        transform: "scale(1.00)",
                        transition: "transform 0.3s ease-in-out"
                      }

                    }}
                  />
                </Tooltip>
              </Link>{" "}

            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
 <CustomTypography textAlign="center" sx={{color:theme.palette.text.primary}}>{t('no categories Found')}</CustomTypography>      )}
    </Box>
  );
};

export default Category;
