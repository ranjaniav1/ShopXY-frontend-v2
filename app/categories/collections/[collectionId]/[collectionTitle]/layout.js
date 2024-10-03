"use client";
import React, { useEffect, useState } from "react";
import Heading from "@/app/Common/Heading";
import {
  Grid,
  Box,
  Typography,
  Divider,
  Slider,
  useTheme,
} from "@mui/material";
import { useParams } from "next/navigation";
import { GetSpecificProduct } from "@/app/Service/GetProduct";
import FilterBasedProduct from "@/app/Components/FilterBasedProduct";
import CustomBox from "@/app/Custom/CustomBox";

const Layout = () => {
  const { collectionTitle, collectionId } = useParams();
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [ratingRange, setRatingRange] = useState([0, 5]);
  const [selectedColors, setSelectedColors] = useState([]);


  const theme = useTheme();

  const fetchProducts = async () => {
    try {
      const response = await GetSpecificProduct({ id: collectionId });
      setAllProducts(response);
      setFilteredProducts(response);

      // Extract colors from the products data
      const productColors = [
        ...new Set(response.data.flatMap((product) => product.color))
      ];
      setSelectedColors(productColors);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [collectionId]);

  useEffect(() => {
    applyFilters();
  }, [
    priceRange,
    ratingRange,
    allProducts
  ]);

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleRatingRangeChange = (event, newValue) => {
    setRatingRange(newValue);
  };

  const applyFilters = () => {
    let filtered = allProducts;

    // Filter by price range
    filtered = filtered.filter(
      (product) =>
        product.actual_price >= priceRange[0] &&
        product.actual_price <= priceRange[1]
    );

    // Filter by rating range
    filtered = filtered.filter(
      (product) =>
        product.ratings >= ratingRange[0] && product.ratings <= ratingRange[1]
    );

    setFilteredProducts(filtered);
  };

  return (
    <CustomBox>
      <Heading text={collectionTitle} />
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={12} md={3}>
          {/* Filters */}
          <Box
            sx={{
              padding: "16px",
              border: "1px solid #e0e0e0",
              borderRadius: "10px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              background: theme.palette.background.main
            }}
          >
            <Typography variant="h6">Filters</Typography>
            <Divider sx={{ my: 2 }} />

            {/* Price Range Filter */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1">Price Range</Typography>
              <Divider sx={{ my: 2 }} />
              <Slider
                value={priceRange}
                onChange={handlePriceRangeChange}
                valueLabelDisplay="auto"
                min={0}
                max={1000}
                step={10}
              />
            </Box>

            {/* Rating Filter */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1">Ratings</Typography>
              <Divider sx={{ my: 2 }} />
              <Slider
                value={ratingRange}
                onChange={handleRatingRangeChange}
                valueLabelDisplay="auto"
                min={0}
                max={5}
                step={0.5}
                sx={{ mb: 2 }}
              />
            </Box>
          </Box>
        </Grid>

        {/* Filtered Products */}
        <Grid item xs={12} md={9}>
          <FilterBasedProduct products={filteredProducts} />
        </Grid>
      </Grid>
    </CustomBox>
  );
};

export default Layout;
