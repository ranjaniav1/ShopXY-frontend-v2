"use client";
import React from "react";
import {
  Box,
  Slider,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Button,
} from "@mui/material";
import CustomTypography from "@/app/Custom/CustomTypography";



const ProductFilters = ({
  priceRange,
  onPriceChange,
  minPrice,
  maxPrice,
  categories,
  selectedCategories,
  onCategoryChange,
  onReset,
  showCategory = true,
  showRating = false,
  ratingRange = [0, 5],
  onRatingChange,
  minRating = 0,
  maxRating = 5,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        p: 2,
        borderRadius: 2,
        boxShadow: 1,
        position: "sticky",
        top: "100px",
      }}
    >
      <CustomTypography variant="h6" mb={2}>
        Filters
      </CustomTypography>

      {/* Price Filter */}
      <Box mb={2}>
        <CustomTypography fontWeight={600} fontSize="1rem">
          Price Range
        </CustomTypography>
        <Slider
          value={priceRange}
          onChange={onPriceChange}
          min={minPrice}
          max={maxPrice}
          step={10}
          valueLabelDisplay="auto"
        />
        <CustomTypography fontSize="0.875rem">
          ₹{priceRange[0]} - ₹{priceRange[1]}
        </CustomTypography>
      </Box>

      {/* Rating Filter (optional) */}
      {showRating && onRatingChange && (
        <Box mb={2}>
          <CustomTypography fontWeight={600} fontSize="1rem">
            Rating
          </CustomTypography>
          <Slider
            value={ratingRange}
            onChange={onRatingChange}
            min={minRating}
            max={maxRating}
            step={0.1}
            valueLabelDisplay="auto"
          />
          <CustomTypography fontSize="0.875rem">
            {ratingRange[0]} - {ratingRange[1]} Stars
          </CustomTypography>
        </Box>
      )}

      {/* Category Filter */}
      {showCategory && (
        <Box mb={2}>
          <CustomTypography fontWeight={600} fontSize="1rem" mb={1}>
            Categories
          </CustomTypography>
          <FormGroup>
            {categories.map((cat) => (
              <FormControlLabel
                key={cat}
                control={
                  <Checkbox
                    checked={selectedCategories.includes(cat)}
                    onChange={onCategoryChange}
                    value={cat}
                  />
                }
                label={cat}
              />
            ))}
          </FormGroup>
        </Box>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={onReset}
        fullWidth
      >
        Reset Filters
      </Button>
    </Box>
  );
};

export default ProductFilters;
