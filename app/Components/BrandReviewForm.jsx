"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import {
  Star,
  StarOff,
  Trash2,
  ImageIcon
} from "lucide-react";
import { SubmitBrandReview, SubmitProductReview } from "../Service/GetReviews";
import { useUser } from "../context/UserContext";

const BrandReviewForm = ({ brandId, productId, onClose, onSubmitSuccess }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useUser();
  const userId = user?._id;

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleImageRemove = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const reviewData = {
        id: productId || brandId,
        rating,
        review,
        mediaFiles: images,
      };

      if (productId) {
        await SubmitProductReview(reviewData);
        toast.success("Thank you for reviewing our product!");
      } else {
        await SubmitBrandReview(reviewData);
        toast.success("Thank you for reviewing our brand!");
      }

      onSubmitSuccess?.();
      onClose?.();
      setRating(0);
      setReview("");
      setImages([]);
    } catch (error) {
      const msg = error?.response?.data?.message || error?.message || "Something went wrong!";
      toast.error(msg);
      console.error("Review submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5 text-tprimary">
      {/* Rating */}
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((starValue) => (
          <button
            key={starValue}
            type="button"
            onClick={() => setRating(starValue)}
            onMouseEnter={() => setHoverRating(starValue)}
            onMouseLeave={() => setHoverRating(0)}
            className="transition"
          >
            {starValue <= (hoverRating || rating) ? (
              <Star className="w-6 h-6 text-yellow-500 fill-yellow-400" />
            ) : (
              <StarOff className="w-6 h-6 text-gray-400" />
            )}
          </button>
        ))}
      </div>

      {/* Review Input */}
      <textarea
        rows={4}
        className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white placeholder-gray-500"
        placeholder="Write your review here..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />

      {/* Image Upload Button */}
      <div>
        <label className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md text-sm cursor-pointer hover:bg-primary/90">
          <ImageIcon className="w-4 h-4" />
          Upload Images
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>

        {/* Image Preview */}
        {images.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative w-20 h-20 border rounded overflow-hidden"
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt={`uploaded ${index}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleImageRemove(index)}
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        disabled={rating === 0 || !review || loading}
        onClick={handleSubmit}
        className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </div>
  );
};

export default BrandReviewForm;
