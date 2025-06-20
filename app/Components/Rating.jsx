import React from "react";
import { Box, useTheme } from "@mui/material";
import Rating from "@mui/material/Rating";
import CustomTypography from "../Custom/CustomTypography";

const RatingReview = ({ starCount, reviewCount }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 1,
      }}
    >
      <Rating value={starCount} readOnly size="small" />
      <CustomTypography
        variant="body2"
        sx={{ color: theme.palette.text.secondary }}
      >
        {reviewCount} {reviewCount === 1 ? "Review" : "Reviews"}
      </CustomTypography>
    </Box>
  );
};

export default RatingReview;
