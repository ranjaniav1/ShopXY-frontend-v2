// ReviewComponents.js
import React, { useEffect, useState } from "react";
import { Box, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { GetSpecificProductReview } from "../Service/GetReviews";
import RatingReview from "./Rating";
import ReviewItem from "./Review";

const ReviewComponents = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await GetSpecificProductReview({ id: productId });
        if (data) {
          setReviews(data.reviews);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [productId]);

  // Calculate the number of reviews per rating
  const ratingCounts = Array(5).fill(0);
  reviews.forEach((review) => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingCounts[review.rating - 1] += 1;
    }
  });

  return (
    <Box>
      {/* Display Ratings */}
      {ratingCounts.map((count, index) => (
        <RatingReview
          key={index + 1}
          starCount={index + 1}
          reviewCount={count}
        />
      ))}
      <Divider />
      {/* Display Review Items */}
      {reviews.map((review) => (
        <ReviewItem key={review._id} review={review} theme={theme} />
      ))}
    </Box>
  );
};

export default ReviewComponents;
