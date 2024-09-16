// ReviewItem.js
import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import Rating from "@mui/material/Rating";

const ReviewItem = ({ review, theme }) => (
  <Box sx={{ p: 2, backgroundColor: theme.palette.card.background, mb: 2 }}>
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Avatar src={review.userAvatar} alt={review.userName}>
        {!review.userAvatar && (review.userName ? review.userName.charAt(0) : "?")}
      </Avatar>
      <Box>
        <Typography variant="body2" fontWeight="bold">
          {review.userName}
        </Typography>
        <Rating value={review.rating} readOnly size="small" />
        <Typography variant="body2" color="text.secondary">
          {new Date(review.createdAt).toLocaleDateString()}
        </Typography>
      </Box>
    </Box>
    <Typography variant="body2" mt={2}>
      {review.review}
    </Typography>
    {review.media &&
      review.media.map((img, index) => (
        <img
          key={index}
          src={img}
          alt="Review"
          style={{
            width: "10%",
            height: "auto",
            marginTop: "8px",
            borderRadius: "4px"
          }}
        />
      ))}
  </Box>
);

export default ReviewItem;
