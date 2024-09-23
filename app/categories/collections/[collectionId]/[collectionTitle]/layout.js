"use client";

import React, { useEffect, useState } from "react";
import Heading from "@/app/Common/Heading";
import {
  Grid,
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  Divider,
  Slider,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  useTheme
} from "@mui/material";
import { useParams } from "next/navigation";
import { GetAllProducts, GetSpecificProduct } from "@/app/Service/GetProduct";
import FilterBasedProduct from "@/app/Components/FilterBasedProduct";

const Layout = ({ children }) => {
  const { collectionTitle } = useParams();
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { collectionId } = useParams();
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [brands, setBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [ratingRange, setRatingRange] = useState([0, 5]);
  const theme = useTheme();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await GetSpecificProduct({ id: collectionId });
        setAllProducts(response);
        setFilteredProducts(response);

        // Extract brands from the products data
        const productBrands = [
          ...new Set(response.data.map((product) => product.brand))
        ];
        setBrands(productBrands);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [selectedBrands, priceRange, ratingRange, allProducts]);

  const handleBrandChange = (event, brand) => {
    const updatedSelectedBrands = event.target.checked
      ? [...selectedBrands, brand]
      : selectedBrands.filter((b) => b !== brand);

    setSelectedBrands(updatedSelectedBrands);
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleRatingRangeChange = (event, newValue) => {
    setRatingRange(newValue);
  };

  const applyFilters = () => {
    let filtered = allProducts;

    // Filter by selected brands
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

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
    <Grid container spacing={2} sx={{ marginTop: 2 }}>
      <Grid item xs={12} md={3}>
        <Heading text={collectionTitle} />

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

          {/* Brand Filter */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1">Brands</Typography>
            <Divider sx={{ my: 2 }} />
            {brands.length > 0 ? (
              brands.map((brand) => (
                <FormControlLabel
                  key={brand}
                  control={
                    <Checkbox
                      color="primary"
                      checked={selectedBrands.includes(brand)}
                      onChange={(e) => handleBrandChange(e, brand)}
                    />
                  }
                  label={brand}
                  sx={{ mb: 1 }}
                />
              ))
            ) : (
              <Typography variant="body2">No brands available</Typography>
            )}
          </Box>

          {/* Price Range Filter */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1">Price Range</Typography>
            <Divider sx={{ my: 2 }} />
            <Slider
              value={priceRange}
              onChange={handlePriceRangeChange}
              valueLabelDisplay="auto"
              min={0}
              max={10000}
              step={100}
              sx={{ mb: 2 }}
            />
            <Typography variant="body2">
              {`₹${priceRange[0]} - ₹${priceRange[1]}`}
            </Typography>
          </Box>

          {/* Rating Range Filter */}
          <Box>
            <Typography variant="subtitle1">Ratings</Typography>
            <Divider sx={{ my: 2 }} />
            <Slider
              value={ratingRange}
              onChange={handleRatingRangeChange}
              valueLabelDisplay="auto"
              min={0}
              max={5}
              step={0.1}
              sx={{ mb: 2 }}
            />
            <Typography variant="body2">
              {`Rating: ${ratingRange[0]} - ${ratingRange[1]}`}
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={9} sx={{ mt: 5.5 }}>
        <FilterBasedProduct products={filteredProducts} />
      </Grid>
    </Grid>
  );
};

export default Layout;
