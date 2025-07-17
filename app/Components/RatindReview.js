"use client";

import React, { useEffect, useState } from "react";
import { GetSpecificProductReview } from "../Service/GetReviews";
import RatingReview from "./Rating";
import ReviewItem from "./Review";

const ReviewComponents = ({ productId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await GetSpecificProductReview(productId);
        if (data && Array.isArray(data.reviews)) {
          setReviews(data.reviews);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [productId]);

  // Calculate review counts per star rating
  const ratingCounts = Array(5).fill(0);
  reviews.forEach((review) => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingCounts[review.rating - 1]++;
    }
  });

  return (
    <div className="bg-body rounded-lg p-4">
      {/* Ratings Summary */}
      <div className="space-y-2 mb-4">
        {ratingCounts.map((count, index) => (
          <RatingReview
            key={index + 1}
            starCount={index + 1}
            reviewCount={count}
          />
        ))}
      </div>

      <hr className="border-secondary my-4" />

      {/* Review List */}
      <ReviewItem reviews={reviews} />
    </div>
  );
};

export default ReviewComponents;
