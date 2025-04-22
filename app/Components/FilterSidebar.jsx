// components/FilterSidebar.tsx
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
          onChange={(_, newValue) => setPriceRange(newValue )}
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
          onChange={(_, newValue) => setRatingRange(newValue )}
          valueLabelDisplay="auto"
        />
        <CustomTypography fontSize="0.875rem">
          {ratingRange[0]} - {ratingRange[1]} Stars
        </CustomTypography>
      </Box>
    </Box>
  );
};

export default FilterSidebar;
