// RatingReview.js
import React from "react";
import { Box, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";

const RatingReview = ({ starCount, reviewCount }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      mb: 1
    }}
  >
    <Rating value={starCount} readOnly size="small" />
    <Typography variant="body2" color="text.secondary">
      {reviewCount} {reviewCount === 1 ? "Review" : "Reviews"}
    </Typography>
  </Box>
);

export default RatingReview;
