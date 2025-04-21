"use client";
import React, { useEffect, useState } from "react";
import Heading from "../Common/Heading";
import { GetHomeScreenData } from "../Service/GetHomeScreenData";
import { Box, Grid, Skeleton, Typography } from "@mui/material";
import DiscountCard from "./DiscountCard";
import { useTranslation } from "react-i18next";
import CustomBox from "../Custom/CustomBox";

const SaleAndDiscount = () => {
  const { t } = useTranslation();
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchCollection() {
    try {
      const result = await GetHomeScreenData();
      setCollection(
        Array.isArray(result.sale_and_discount_product)
          ? result.sale_and_discount_product
          : []
      );
    } catch (error) {
      console.log("failed to fetch collection", error);
      setCollection([]); // Ensure fallback to an empty array in case of an error
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCollection();
  }, []);

  return (
    <CustomBox>
      <Heading text={t("Best Discount Products")} />
      <Box>
        {loading ? (
          <Grid container spacing={2}>
            {Array.from({ length: 6 }).map((_, index) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                <Skeleton variant="rectangular" width="100%" height={200} />
              </Grid>
            ))}
          </Grid>
        ) : collection?.length > 0 ? (
          <Grid container spacing={2}>
            {collection.slice(0, 6).map((category) => (
                <DiscountCard key={category._id}
                  image={category.banner_image}
                  title={category.title}
                  alt={category.title}
                />
            ))}
          </Grid>
        ) : (
          <Typography textAlign="center">{t("No collection found")}</Typography>
        )}
      </Box>
    </CustomBox>
  );
};

export default SaleAndDiscount;
