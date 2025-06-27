"use client";

import React, { useState } from "react";
import { Star, StarHalf, StarOff } from "lucide-react";

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`full-${i}`} className="w-4 h-4 text-yellow-500 fill-yellow-500" />);
  }

  if (hasHalf) {
    stars.push(<StarHalf key="half" className="w-4 h-4 text-yellow-500 fill-yellow-500" />);
  }

  while (stars.length < 5) {
    stars.push(<StarOff key={`empty-${stars.length}`} className="w-4 h-4 text-gray-300" />);
  }

  return stars;
};

const ReviewItem = ({ reviews = [] }) => {
  const [visibleCount, setVisibleCount] = useState(1);

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <div>
      {reviews.slice(0, visibleCount).map((review, index) => (
        <div key={review.id} className="p-4 mb-4 border border-gray-200 rounded-md">
          <div className="flex items-center gap-4">
            {review.userAvatar ? (
              <img
                src={review.userAvatar}
                alt={review.userName}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 flex items-center justify-center bg-primary text-white rounded-full text-sm font-bold">
                {review.userName ? review.userName.charAt(0) : "?"}
              </div>
            )}
            <div>
              <p className="font-semibold text-tprimary">{review.userName}</p>
              <div className="flex items-center space-x-1">{renderStars(review.rating)}</div>
              <p className="text-xs text-tsecondary">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <p className="mt-3 text-sm text-tsecondary">{review.review}</p>

          {review.media?.length > 0 && (
            <div className="mt-2 flex gap-2">
              {review.media.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="Review Media"
                  className="w-20 h-auto rounded-md object-cover"
                />
              ))}
            </div>
          )}

          {index === 0 && reviews.length > 1 && <div className="my-4 border-t border-gray-300" />}
        </div>
      ))}

      {visibleCount < reviews.length && (
        <button
          onClick={handleViewMore}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 mt-2"
        >
          View More
        </button>
      )}
    </div>
  );
};

export default ReviewItem;
