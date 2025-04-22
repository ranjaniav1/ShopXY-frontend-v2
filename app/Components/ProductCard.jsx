"use client";

import { useTheme } from "@mui/material";
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
  slug
}) => {
  const theme = useTheme();
  const [isWished, setIsWished] = useState(false);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setIsWished(savedWishlist.includes(productId));
  }, [productId]);

  const handleAddToWishlist = async (e) => {
    e.stopPropagation();
    if (!userId) {
      toast.error("Please login first to add to wishlist!");
      return;
    }

    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    try {
      if (!isWished) {
        await addWishlist(userId, productId);
        localStorage.setItem(
          "wishlist",
          JSON.stringify([...savedWishlist, productId])
        );
        setIsWished(true);
        toast.success("Product added to wishlist!");
      } else {
        await deleteWishlistItem(userId, productId);
        const updatedWishlist = savedWishlist.filter((id) => id !== productId);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        setIsWished(false);
        toast.success("Product removed from wishlist!");
      }
    } catch (error) {
      console.error("Failed to update wishlist:", error);
      toast.error("Failed to update wishlist");
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="text-yellow-400 text-sm">
        {"★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating))}
      </div>
    );
  };

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
      <h3
        className="text-sm font-semibold truncate"
        style={{ color: theme.palette.card.text }}
      >
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

        {/* add to cart Button */}


        <button
          className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded-md flex items-center gap-1" onClick={() => handleAddToCart({ userId: userId, productId: productId })}
        >
          <span className="material-icons text-sm">Add</span>

        </button>
      </div>
    </div>
  );
};

export default ProductCard;
