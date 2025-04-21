"use client";
import React, { useEffect, useState } from "react";
import Heading from "@/app/Common/Heading";
import {
  Grid,
  Box,
  Slider,
  useTheme,
} from "@mui/material";
import { useParams } from "next/navigation";
import { GetSpecificProduct } from "@/app/Service/GetProduct";
import FilterBasedProduct from "@/app/Components/FilterBasedProduct";
import CustomBox from "@/app/Custom/CustomBox";
import CustomTypography from "@/app/Custom/CustomTypography";

const Layout = () => {
  const { collectionTitle, collectionId } = useParams();
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [ratingRange, setRatingRange] = useState([0, 5]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minRating, setMinRating] = useState(0);
  const [maxRating, setMaxRating] = useState(5);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();

  const fetchProducts = async () => {
    try {
      const response = await GetSpecificProduct({ id: collectionId });
      setAllProducts(response);

      // Extract price and rating arrays
      const prices = response.map((p) => p.actual_price || 0);
      const ratings = response.map((p) => p.ratings || 0);

      // Calculate min/max for price and rating
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      const minR = Math.min(...ratings);
      const maxR = Math.max(...ratings);

      setMinPrice(min);
      setMaxPrice(max);
      setPriceRange([min, max]);

      setMinRating(minR);
      setMaxRating(maxR);
      setRatingRange([minR, maxR]);

      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [collectionId]);

  useEffect(() => {
    applyFilters();
  }, [priceRange, ratingRange, allProducts]);

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleRatingRangeChange = (event, newValue) => {
    setRatingRange(newValue);
  };

  const applyFilters = () => {
    if (!allProducts.length) return;

    let filtered = [...allProducts];

    // Filter by price range
    filtered = filtered.filter(
      (product) =>
        product.actual_price >= priceRange[0] &&
        product.actual_price <= priceRange[1]
    );

    // Filter by rating range
    filtered = filtered.filter(
      (product) =>
        product.ratings >= ratingRange[0] &&
        product.ratings <= ratingRange[1]
    );

    setFilteredProducts(filtered);
  };

  return (
    <CustomBox>
      <Heading text={collectionTitle} />
      <Grid container spacing={2} sx={{ px: { xs: 1, sm: 2 } }}>
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              boxShadow: 1,
              position: "sticky",
              top: "100px",
            }}
          >
            <Heading text="Filter By" />

            {/* Price Filter */}
            <Box my={2}>
              <CustomTypography fontWeight={600} fontSize="1rem">
                Price Range
              </CustomTypography>
              <Slider
                size="small"
                min={minPrice}
                max={maxPrice}
                step={10}
                marks
                value={priceRange}
                onChange={handlePriceRangeChange}
                valueLabelDisplay="auto"
              />
              <CustomTypography fontSize="0.875rem">
                ₹{priceRange[0]} - ₹{priceRange[1]}
              </CustomTypography>
            </Box>

            {/* Rating Filter */}
            <Box my={2}>
              <CustomTypography fontWeight={600} fontSize="1rem">
                Rating Range
              </CustomTypography>
              <Slider
                size="small"
                min={minRating}
                max={maxRating}
                step={0.1}
                marks
                value={ratingRange}
                onChange={handleRatingRangeChange}
                valueLabelDisplay="auto"
              />
              <CustomTypography fontSize="0.875rem">
                {ratingRange[0]} - {ratingRange[1]} Stars
              </CustomTypography>
            </Box>
          </Box>
        </Grid>

        {/* PRODUCT LISTING */}
        <Grid item xs={12} md={9}>
          {loading ? (
            <CustomTypography variant="h6" color="text.secondary" mt={2}>
              Loading products...
            </CustomTypography>
          ) : filteredProducts.length === 0 ? (
            <CustomTypography variant="h6" color="text.secondary" mt={2}>
              No products match the selected filters.
            </CustomTypography>
          ) : (
            <FilterBasedProduct products={filteredProducts} />
          )}
        </Grid>
      </Grid>
    </CustomBox>
  );
};

export default Layout;
