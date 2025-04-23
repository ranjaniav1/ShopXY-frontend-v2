"use client";

import { useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { addWishlist, deleteWishlistItem, getWishlist } from "../Service/Profile";
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
  isInWishlist: isWishlistedFromParent
}) => {
  const theme = useTheme();
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
      console.error("Wishlist update error:", err);
      toast.error("Something went wrong!");
    }
  };

  const renderStars = (rating) => (
    <div className="text-yellow-400 text-sm">
      {"★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating))}
    </div>
  );

  return (
    <div
      className="relative rounded-xl p-3 shadow-md transition hover:shadow-lg"
      style={{ background: theme.palette.card.background }}
    >
      {/* Offer Ribbon */}
      {offer && (
        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-md font-semibold z-10">
          {offer}% OFF
        </div>
      )}

      {/* Product Image */}
      <Link href={`/product/${productId}/${encodeURIComponent(slug)}`}>
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-40 object-contain mb-2 rounded-lg cursor-pointer bg-white"
        />
      </Link>

      {/* Title */}
      <h3 className="text-sm font-semibold truncate" style={{ color: theme.palette.card.text }}>
        {title}
      </h3>

      {/* Rating */}
      <div className="flex items-center gap-1 mt-1">
        {renderStars(rating)}
        <ThumbUpIcon
          color={isWished ? "success" : "action"}
          onClick={handleAddToWishlist}
          sx={{ cursor: "pointer", fontSize: 18 }}
        />

      </div>

      {/* Price Section */}
      <div className="flex items-baseline gap-2 mt-2">
        <span className="text-green-400 font-bold text-base">₹{discountPrice}</span>
        <span className="line-through text-gray-400 text-sm">₹{price}</span>

        {/* Add to Cart Button */}
        <button
          className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded-md flex items-center gap-1"
          onClick={() => handleAddToCart({ userId, productId })}
        >
          <span className="material-icons text-sm">Add</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
