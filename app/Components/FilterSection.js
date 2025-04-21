import React from "react";
import {
  Box,
  Typography,
  Slider,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  useTheme
} from "@mui/material";
import { useTranslation } from "react-i18next";
import CustomButton from "../Custom/CustomButton";
import CustomTypography from "../Custom/CustomTypography";

const FilterSection = ({
  priceRange,
  setPriceRange,
  selectedRatings,
  setSelectedRatings,
  handleResetFilters, priceMinMax,
  ratingMinMax
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const ratingRanges = [
    [0, 2.5],
    [2.5, 3.5],
    [3.5, 4.5],
    [4.5, 5]
  ];

  return (
    <Box role="region" aria-label="Filter Section"
      sx={{
        padding: 2,
        bgcolor: theme.palette.background.default,
        boxShadow: 1,
        borderRadius: "8px",
      }}
    >
<CustomTypography variant="h6" sx={{color:theme.palette.text.primary}}>{t("Filters")}</CustomTypography>

      {/* Price Range Slider */}
      <CustomTypography
      id="price-slider-label"
        variant="subtitle1"
        gutterBottom
        color={theme.palette.text.secondary}
      >
        {t("Price Range")}
      </CustomTypography>
      <Slider
        size="small"
        value={priceRange}
        onChange={(e, newValue) => setPriceRange(newValue)}
        valueLabelDisplay="auto"
        min={priceMinMax[0]}
        max={priceMinMax[1]}
         aria-labelledby="price-slider-label"
        sx={{
          color: theme.palette.primary.main // Slider color based on theme
        }}
      />

      {/* Rating Filter */}
      <CustomTypography
        variant="subtitle1"
        gutterBottom
        color={theme.palette.text.secondary}
      >
        {t("Filter by Rating")}
      </CustomTypography>
      <FormGroup>
        {ratingRanges.map((range, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={selectedRatings.some(
                  (r) => r[0] === range[0] && r[1] === range[1]
                )}
                onChange={(e) => {
                  const updatedRatings = e.target.checked
                    ? [...selectedRatings, range]
                    : selectedRatings.filter(
                        (r) => !(r[0] === range[0] && r[1] === range[1])
                      );
                  setSelectedRatings(updatedRatings);
                }}
                inputProps={{ 'aria-label': `Rating from ${range[0]} to ${range[1]}` }}

                sx={{
                  color: theme.palette.primary.main, // Checkbox color based on theme
                  "&.Mui-checked": {
                    color: theme.palette.primary.main
                  }
                }}
              />
            }
            label={
              range[0] === 0
                ? t("Below") + " 2.5"
                : range[1] === 5
                ? t("Above") + " 4.5"
                : `${range[0]} - ${range[1]}`
            }
                      />
        ))}
      </FormGroup>

      {/* Reset Filters */}
      <CustomButton
        title={t("Reset Filters")}
        size="md"
        onClick={handleResetFilters}
      />
    </Box>
  );
};

export default FilterSection;
