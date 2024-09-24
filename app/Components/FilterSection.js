import React from "react";
import {
  Box,
  Typography,
  Slider,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";

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
    [4.5, 5],
  ];

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

      {/* Price Range Slider */}
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
      <FormGroup>
        {ratingRanges.map((range, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={selectedRatings.some(r => r[0] === range[0] && r[1] === range[1])}
                onChange={(e) => {
                  const updatedRatings = e.target.checked
                    ? [...selectedRatings, range]
                    : selectedRatings.filter(r => !(r[0] === range[0] && r[1] === range[1]));
                  setSelectedRatings(updatedRatings);
                }}
              />
            }
            label={`${range[0]} - ${range[1]}`}
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
