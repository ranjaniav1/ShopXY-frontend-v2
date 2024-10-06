"use client";

import React, { useEffect, useState } from "react";
import { Grid, Typography, useTheme } from "@mui/material";
import FilterSection from "./FilterSection";
import ProductList from "./ProductList";
import Heading from "../Common/Heading";
import { GetAllProducts } from "../Service/GetProduct";
import { useTranslation } from "react-i18next";
import CustomSkeleton from "../Custom/CustomSkeleton";
import CustomBox from "../Custom/CustomBox";
import  AOS  from "aos";
import "aos/dist/aos.css";
const HomeProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const { t } = useTranslation();

  async function fetchProducts() {
    try {
      const result = await GetAllProducts();
      setProducts(result.data);
      setFilteredProducts(result.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = products
        .filter(
          (p) =>
            p.discounted_price >= priceRange[0] &&
            p.discounted_price <= priceRange[1]
        )
        .filter((p) => {
          return (
            selectedRatings.length === 0 ||
            selectedRatings.some((range) => {
              return p.ratings >= range[0] && p.ratings <= range[1];
            })
          );
        });

      setFilteredProducts(filtered);
    };
    applyFilters();
  }, [selectedRatings, priceRange, products]);
  useEffect(() => {
    AOS.init({
      duration: 600, // Animation duration
      easing: 'ease-in-out', // Animation easing
      once: true, // Whether animation should happen only once
    });
  }, []);
  return (
    <CustomBox>
      <Heading text={t("Products For You")} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={3} sx={{ mt: 3.5 }}  data-aos="fade-right">
          <FilterSection
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedRatings={selectedRatings}
            setSelectedRatings={setSelectedRatings}
            handleResetFilters={() => {
              setSelectedRatings([]);
              setPriceRange([0, 1000]);
            }}
          />
        </Grid>
        <Grid item xs={12} md={9} sx={{ mt: 3.5 }} data-aos="fade-left">
          {loading ? (
            <Grid container spacing={2}>
              {Array.from({ length: 6 }).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <CustomSkeleton type="card" width="96px" height="96px" />
                </Grid>
              ))}
            </Grid>
          ) : filteredProducts.length === 0 ? (
            <Typography variant="h6" align="center">
              {t("No products found")}
            </Typography>
          ) : (
            <ProductList products={filteredProducts} loading={loading} />
          )}
        </Grid>
      </Grid>
    </CustomBox>
  );
};

export default HomeProduct;
