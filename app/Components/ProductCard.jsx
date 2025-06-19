"use client";

import React, { useEffect, useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { addWishlist, deleteWishlistItem } from "../Service/Profile";
import toast from "react-hot-toast";
import Link from "next/link";
import { handleAddToCart } from "../helper/cartUtils";

const ProductCard = ({
  imgSrc,
  title,
  price,
  discountPrice,
  rating,
  offer,
  userId,
  productId,
  slug,
  isInWishlist: isWishlistedFromParent,
  inStock,
}) => {
  console.log("init")
  const [isWished, setIsWished] = useState(isWishlistedFromParent);

  useEffect(() => {
    setIsWished(isWishlistedFromParent);
  }, [isWishlistedFromParent]);

  const handleAddToWishlist = async (e) => {
    e.stopPropagation();
    if (!userId) {
      toast.error("Please login first to use wishlist!");
      return;
    }

    try {
      if (isWished) {
        await deleteWishlistItem({ userId, productId });
        toast.success("Removed from wishlist!");
      } else {
        await addWishlist(userId, productId);
        toast.success("Added to wishlist!");
      }
      setIsWished(!isWished);
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  const renderStars = (rating) => (
    <div className="text-yellow-400 text-sm">
      {"★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating))}
    </div>
  );

  return (
    <div className="relative rounded-md p-3  border border-secondary bg-body">
      <h1>ii</h1>
      {/* Offer Badge */}
      {offer && (
        <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] px-2 py-1 rounded-md font-semibold z-10">
          {offer}% OFF
        </div>
      )}

      {/* Wishlist Icon */}
      <div className="absolute top-2 right-2 z-10">
        <ThumbUpIcon
          color={isWished ? "success" : "action"}
          onClick={handleAddToWishlist}
          sx={{ cursor: "pointer", fontSize: 20 }}
        />
      </div>

      {/* Product Image */}
      <Link href={`/product/${productId}/${encodeURIComponent(slug)}`}>
        <div className="w-full h-full bg-white rounded-md  flex items-center justify-center mb-3">
          <img
            src={imgSrc}
            alt={title}
            className="object-contain w-full h-full transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>

      {/* Title */}
      <h3 className="text-[13px] sm:text-sm font-semibold truncate text-secondary">
        {title}
      </h3>

      {/* Rating */}
      <div className="flex items-center gap-1 mt-1">{renderStars(rating)}</div>

      {/* Price & Add to Cart */}
      <div className="flex items-center justify-between mt-2">
        <div>
          <span className="text-green-600 font-bold text-sm sm:text-base">
            ₹{discountPrice}
          </span>
          <span className="line-through text-gray-400 text-xs ml-2">
            ₹{price}
          </span>
        </div>

        {inStock == true ? (
          <button
            className="bg-green-600 hover:bg-green-700 text-white text-[10px] sm:text-xs px-2 sm:px-3 py-[5px] rounded-md"
            onClick={() => handleAddToCart({ userId, productId })}
          >
            Add
          </button>
        ) : (
          <span className="text-red-500 text-xs font-medium">Out of Stock</span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
