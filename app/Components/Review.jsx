"use client"; // Ensure this component runs client-side in Next.js

import React, { useState } from "react";
import { Box, Typography, Avatar, Divider, Button } from "@mui/material";
import Rating from "@mui/material/Rating";

const ReviewItem = ({ reviews = [], theme }) => {  // Ensure reviews is always an array
  const [visibleCount, setVisibleCount] = useState(1); // Initially show 1 review

  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 5); // Show 5 more reviews
  };

  return (
    <Box>
      {/* Loop through the visible reviews */}
      {reviews.slice(0, visibleCount).map((review, index) => (
        <Box key={review.id}>
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
                    borderRadius: "4px",
                  }}
                />
              ))}

            {/* Only show the divider if there's more than one review */}
            {index === 0 && reviews.length > 1 && <Divider sx={{ my: 2 }} />}
          </Box>
        </Box>
      ))}

      {/* "View More" button logic */}
      {visibleCount < reviews.length && (
        <Button onClick={handleViewMore} variant="contained" sx={{ mt: 2 }}>
          View More
        </Button>
      )}
    </Box>
  );
};

export default ReviewItem;
