"use client";

import React from "react";
import { Star, StarHalf, StarOff } from "lucide-react";



const renderStars = (count) => {
  const stars = [];
  const fullStars = Math.floor(count);
  const hasHalfStar = count % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`star-${i}`} className="w-4 h-4 text-yellow-500 fill-yellow-500" />);
  }

  if (hasHalfStar) {
    stars.push(<StarHalf key="half-star" className="w-4 h-4 text-yellow-500 fill-yellow-500" />);
  }

  while (stars.length < 5) {
    stars.push(<StarOff key={`empty-${stars.length}`} className="w-4 h-4 text-gray-300" />);
  }

  return stars;
};

const RatingReview= ({ starCount, reviewCount }) => {
  return (
    <div className="flex items-center justify-between mb-1">
      <div className="flex space-x-1">
        {renderStars(starCount)}
      </div>
      <p className="text-sm text-tsecondary">
        {reviewCount} {reviewCount === 1 ? "Review" : "Reviews"}
      </p>
    </div>
  );
};

export default RatingReview;
