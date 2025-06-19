"use client";

import { Box, Slider } from "@mui/material";
import CustomTypography from "@/app/Custom/CustomTypography";
import Heading from "@/app/Common/Heading";

const FilterSidebar = ({
  priceRange,
  setPriceRange,
  ratingRange,
  setRatingRange,
  minPrice,
  maxPrice,
  minRating,
  maxRating,
}) => {

  return (
    <Box className="bg-body text-secondary border border-secondary"
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
        <CustomTypography fontWeight={600} className="text-primary" fontSize="1rem">
          Price Range
        </CustomTypography>
        <Slider
          size="small"
          min={minPrice}
          max={maxPrice}
          step={1}
          marks
          value={Array.isArray(priceRange) && priceRange.length === 2 && priceRange.every(v => typeof v === 'number') ? priceRange : [minPrice, maxPrice]}
          onChange={(_, newValue) => setPriceRange(newValue)}
          valueLabelDisplay="auto"
          className="text-primary"
        />
        <CustomTypography fontSize="0.875rem" className="text-primary">
          ₹{priceRange[0]} - ₹{priceRange[1]}
        </CustomTypography>
      </Box>

      {/* Rating Filter */}
      <Box my={2}>
        <CustomTypography fontWeight={600} fontSize="1rem" className="text-primary">
          Rating Range
        </CustomTypography>
        <Slider
          size="small"
          min={minRating}
          max={maxRating}
          step={0.1}
          marks
          value={Array.isArray(ratingRange) && ratingRange.length === 2 && ratingRange.every(v => typeof v === 'number') ? ratingRange : [minRating, maxRating]}
          onChange={(_, newValue) => setRatingRange(newValue)}
          valueLabelDisplay="auto"
          className="text-primary"
        />
        <CustomTypography fontSize="0.875rem" className="text-primary">
          {ratingRange[0]} - {ratingRange[1]} Stars
        </CustomTypography>
      </Box>
    </Box>
  );
};

export default FilterSidebar;
