import React, { useEffect, useState, useCallback } from "react";
import { Grid, Typography, useTheme } from "@mui/material";
import FilterSection from "./FilterSection";
import ProductList from "./ProductList";
import Heading from "../Common/Heading";
import { GetAllProducts } from "../Service/GetProduct";
import { useTranslation } from "react-i18next";
import CustomSkeleton from "../Custom/CustomSkeleton";
import CustomBox from "../Custom/CustomBox";
import AOS from "aos";
import "aos/dist/aos.css";

const HomeProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Track the current page
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [priceMinMax, setPriceMinMax] = useState([0, 1000]);
  const [ratingMinMax, setRatingMinMax] = useState([0, 5]);
  const { t } = useTranslation();

  // Fetch products from API
  const fetchProducts = async (page) => {
    setLoading(true);
    try {
      const result = await GetAllProducts(page, 10);
      const newProducts = result.data.products;
  
      if (page === 1) {
        setProducts(newProducts);
      } else {
        // Merge without duplicates
        setProducts((prev) => {
          const existingIds = new Set(prev.map((p) => p._id));
          const uniqueNew = newProducts.filter((p) => !existingIds.has(p._id));
          return [...prev, ...uniqueNew];
        });
      }
  
      // No need to setFilteredProducts here – filters will be applied in useEffect
  
      setLoading(false);
  
      const prices = newProducts.map((p) => p.discounted_price);
      setPriceMinMax([Math.min(...prices), Math.max(...prices)]);
  
      const ratings = newProducts.map((p) => p.ratings);
      setRatingMinMax([Math.min(...ratings), Math.max(...ratings)]);
    } catch (error) {
      console.error("Failed to fetch products", error);
      setLoading(false);
    }
  };
  
  // Handle scroll and detect when the user reaches the bottom of the page
  const handleScroll = useCallback(() => {
    const bottom =
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight-10;
    if (bottom && !loading) {
      setPage((prevPage) => prevPage + 1); // Increment the page number when reaching the bottom
    }
  }, [loading]);

  // Trigger fetchProducts when the page changes
  useEffect(() => {
    fetchProducts(page); // Fetch products based on the current page
  }, [page]);

  // Add event listener for scroll
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // Initialize AOS for animations
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  // Apply filters to the products based on selected price range and ratings
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

  return (
    <CustomBox>
      <Heading text={t("Products For You")} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={3} sx={{ mt: 3.5 }} data-aos="fade-right">
          <FilterSection
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedRatings={selectedRatings}
            setSelectedRatings={setSelectedRatings}
            priceMinMax={priceMinMax}
            ratingMinMax={ratingMinMax}
            handleResetFilters={() => {
              setSelectedRatings([]);
              setPriceRange([priceMinMax[0], priceMinMax[1]]);
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
