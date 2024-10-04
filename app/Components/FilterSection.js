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
  handleResetFilters
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
    <Box
      sx={{
        padding: 2,
        bgcolor: theme.palette.background.default,
        boxShadow: 1,
        borderRadius: "8px",
        boxShadow: 1
      }}
    >
      <Typography variant="h6">{t("Filters")}</Typography>

      {/* Price Range Slider */}
      <CustomTypography
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
        min={0}
        max={1000}
        sx={{
          color: theme.palette.primary.main // Slider color based on theme
        }}
      />

      {/* Rating Filter */}
      <Typography
        variant="subtitle1"
        gutterBottom
        color={theme.palette.text.secondary}
      >
        {t("Filter by Rating")}
      </Typography>
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
                sx={{
                  color: theme.palette.primary.main, // Checkbox color based on theme
                  "&.Mui-checked": {
                    color: theme.palette.primary.main
                  }
                }}
              />
            }
            label={`${range[0]} - ${range[1]}`}
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
