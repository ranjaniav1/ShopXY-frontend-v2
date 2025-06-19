"use client";

import {
  Box,
  Slider,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Divider,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
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
  inStock,
  setInStock,
  onlyDiscounted,
  setOnlyDiscounted,
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
  categories,
  brands,
}) => {
  const validPrice = Array.isArray(priceRange) && priceRange.length === 2 ? priceRange : [minPrice, maxPrice];
  const validRating = Array.isArray(ratingRange) && ratingRange.length === 2 ? ratingRange : [minRating, maxRating];

  return (
    <Box
      className="bg-white border border-gray-200 text-secondary"
      sx={{
        p: 2,
        borderRadius: 2,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        position: "sticky",
        top: "100px",
      }}
    >
      <Heading text="Filters" className="text-lg mb-3 text-primary" />

      {/* Category Filter */}
      <FormControl fullWidth margin="normal" size="small">
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          value={selectedCategory}
          label="Category"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat._id} value={cat.slug}>
              {cat.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Brand Filter */}
      <FormControl fullWidth margin="normal" size="small">
        <InputLabel id="brand-select-label">Brand</InputLabel>
        <Select
          labelId="brand-select-label"
          value={selectedBrand}
          label="Brand"
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          {brands.map((brand) => (
            <MenuItem key={brand._id} value={brand.slug}>
              {brand.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Price Range */}
      <Box my={3}>
        <CustomTypography fontWeight={600} fontSize="1rem" className="mb-1 text-primary">
          Price Range
        </CustomTypography>
        <Slider
          size="small"
          min={minPrice}
          max={maxPrice}
          step={1}
          marks
          value={validPrice}
          onChange={(_, newValue) => setPriceRange(newValue)}
          valueLabelDisplay="auto"
        />
        <CustomTypography fontSize="0.875rem" className="text-primary">
          ₹{validPrice[0]} - ₹{validPrice[1]}
        </CustomTypography>
      </Box>

      {/* Rating */}
      <Box mb={3}>
        <CustomTypography fontWeight={600} fontSize="1rem" className="mb-1 text-primary">
          Rating
        </CustomTypography>
        <Slider
          size="small"
          min={minRating}
          max={maxRating}
          step={0.1}
          marks
          value={validRating}
          onChange={(_, newValue) => setRatingRange(newValue)}
          valueLabelDisplay="auto"
        />
        <CustomTypography fontSize="0.875rem" className="text-primary">
          {validRating[0]} - {validRating[1]} stars
        </CustomTypography>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Extra Filters */}
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={inStock} onChange={(e) => setInStock(e.target.checked)} />}
          label="Only In Stock"
        />
        <FormControlLabel
          control={<Checkbox checked={onlyDiscounted} onChange={(e) => setOnlyDiscounted(e.target.checked)} />}
          label="Only Discounted"
        />
      </FormGroup>
    </Box>
  );
};

export default FilterSidebar;
