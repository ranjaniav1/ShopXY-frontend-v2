"use client";

import React from "react";
import {
  Box,
  Typography,
  Slider,
  Select,
  MenuItem,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  useTheme
} from "@mui/material";
import { useTranslation } from "react-i18next";

const FilterSection = ({
  brands,
  selectedBrands,
  setSelectedBrands,
  priceRange,
  setPriceRange,
  rating,
  setRating,
  sortOrder,
  setSortOrder,
  handleResetFilters
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <Box
      sx={{
        padding: 2,
        bgcolor: theme.palette.background.main,
        boxShadow: 1
      }}
      className="rounded-md"
    >
      <Typography variant="h6">{t("Filters")}</Typography>

      {/* Price Range */}
      <Typography variant="subtitle1" gutterBottom>
        {t("Price Range")}
      </Typography>
      <Slider
        value={priceRange}
        onChange={(e, newValue) => setPriceRange(newValue)}
        valueLabelDisplay="auto" 
        min={0}
        max={1000}
        step={10}
      />

      {/* Rating Filter */}
      <Typography variant="subtitle1" gutterBottom>
        {t("Filter by Rating")}
      </Typography>
      <Select
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        fullWidth
      >
        <MenuItem value="">{t("All Ratings")}</MenuItem>
        {[2, 3, 4, 4.5].map((r) => (
          <MenuItem key={r} value={r}>{`${r} and above`}</MenuItem>
        ))}
      </Select>

      {/* Sort By Dropdown */}
      <Typography variant="subtitle1" gutterBottom>
        {t("Sort By")}
      </Typography>
      <Select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        fullWidth
      >
        <MenuItem value="">{t("None")}</MenuItem>
        <MenuItem value="price-low-to-high">{t("Price: Low to High")}</MenuItem>
        <MenuItem value="price-high-to-low">{t("Price: High to Low")}</MenuItem>
        <MenuItem value="rating-based">{t("Rating Based")}</MenuItem>
        <MenuItem value="discount-based">{t("Discount Based")}</MenuItem>
      </Select>

      {/* Brand Filters */}
      <Typography variant="subtitle1" gutterBottom>
        {t("Brands")}
      </Typography>
      <FormGroup>
        {brands.map((brand) => (
          <FormControlLabel
            key={brand}
            control={
              <Checkbox
                value={brand}
                checked={selectedBrands.includes(brand)}
                onChange={(e) => {
                  const updatedBrands = e.target.checked
                    ? [...selectedBrands, brand]
                    : selectedBrands.filter((b) => b !== brand);
                  setSelectedBrands(updatedBrands);
                }}
              />
            }
            label={brand}
          />
        ))}
      </FormGroup>

      {/* Reset Filters */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleResetFilters}
        sx={{ mt: 2 }}
      >
        {t("Reset Filters")}
      </Button>
    </Box>
  );
};

export default FilterSection;
