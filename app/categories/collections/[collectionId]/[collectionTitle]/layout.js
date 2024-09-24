'use client'
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
  FormControl,
  useTheme,
  FormGroup,
} from "@mui/material";
import { useParams } from "next/navigation";
import { GetSpecificProduct } from "@/app/Service/GetProduct";
import FilterBasedProduct from "@/app/Components/FilterBasedProduct";

const Layout = () => {
  const { collectionTitle, collectionId } = useParams();
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [ratingRange, setRatingRange] = useState([0, 5]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [specialOffersOnly, setSpecialOffersOnly] = useState(false);
  const [freeDeliveryOnly, setFreeDeliveryOnly] = useState(false);
  const [cashOnDeliveryOnly, setCashOnDeliveryOnly] = useState(false);

  const theme = useTheme();

  const fetchProducts = async () => {
    try {
      const response = await GetSpecificProduct({ id: collectionId });
      setAllProducts(response);
      setFilteredProducts(response);

      // Extract colors from the products data
      const productColors = [...new Set(response.data.flatMap((product) => product.color))];
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
  }, [priceRange, ratingRange, inStockOnly, selectedColors, specialOffersOnly, freeDeliveryOnly, cashOnDeliveryOnly, selectedTags, allProducts]);

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleRatingRangeChange = (event, newValue) => {
    setRatingRange(newValue);
  };

  const handleInStockChange = (event) => {
    setInStockOnly(event.target.checked);
  };

  const handleColorChange = (event, color) => {
    const updatedColors = event.target.checked
      ? [...selectedColors, color]
      : selectedColors.filter((c) => c !== color);
    setSelectedColors(updatedColors);
  };

  const handleSpecialOffersChange = (event) => {
    setSpecialOffersOnly(event.target.checked);
  };

  const handleFreeDeliveryChange = (event) => {
    setFreeDeliveryOnly(event.target.checked);
  };

  const handleCashOnDeliveryChange = (event) => {
    setCashOnDeliveryOnly(event.target.checked);
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

    // Filter by stock availability
    if (inStockOnly) {
      filtered = filtered.filter((product) => product.inStock);
    }

    // Filter by selected colors
    if (selectedColors.length > 0) {
      filtered = filtered.filter((product) =>
        product.color.some((color) => selectedColors.includes(color))
      );
    }

    // Filter by special offers
    if (specialOffersOnly) {
      filtered = filtered.filter((product) => product.special_offer);
    }

    // Filter by free delivery
    if (freeDeliveryOnly) {
      filtered = filtered.filter((product) => product.delivery.free_delivery);
    }

    // Filter by cash on delivery
    if (cashOnDeliveryOnly) {
      filtered = filtered.filter((product) => product.delivery.cash_on_delivery);
    }

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
            background: theme.palette.background.main,
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
              max={10000}
              step={100}
              sx={{ mb: 2 }}
            />
            <Typography variant="body2">
              {`₹${priceRange[0]} - ₹${priceRange[1]}`}
            </Typography>
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
            <Typography variant="body2">
              {`Rating: ${ratingRange[0]} - ${ratingRange[1]}`}
            </Typography>
          </Box>

          {/* Stock Availability */}
          <Box sx={{ mb: 3 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={inStockOnly}
                  onChange={handleInStockChange}
                  color="primary"
                />
              }
              label="In Stock Only"
            />
          </Box>

          {/* Color Filter */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1">Colors</Typography>
            <Divider sx={{ my: 2 }} />
            {selectedColors.length > 0 ? (
              selectedColors.map((color) => (
                <FormControlLabel
                  key={color}
                  control={
                    <Checkbox
                      color="primary"
                      checked={selectedColors.includes(color)}
                      onChange={(e) => handleColorChange(e, color)}
                    />
                  }
                  label={color}
                  sx={{ mb: 1 }}
                />
              ))
            ) : (
              <Typography variant="body2">No colors available</Typography>
            )}
          </Box>

          {/* Special Offers */}
          <Box sx={{ mb: 3 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={specialOffersOnly}
                  onChange={handleSpecialOffersChange}
                  color="primary"
                />
              }
              label="Special Offers Only"
            />
          </Box>

          {/* Free Delivery */}
          <Box sx={{ mb: 3 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={freeDeliveryOnly}
                  onChange={handleFreeDeliveryChange}
                  color="primary"
                />
              }
              label="Free Delivery Only"
            />
          </Box>

          {/* Cash on Delivery */}
          <Box sx={{ mb: 3 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={cashOnDeliveryOnly}
                  onChange={handleCashOnDeliveryChange}
                  color="primary"
                />
              }
              label="Cash on Delivery Only"
            />
          </Box>
        </Box>
      </Grid>

      {/* Filtered Products */}
      <Grid item xs={12} md={9}>
        <FilterBasedProduct products={filteredProducts} />
      </Grid>
    </Grid>
  );
};

export default Layout;
