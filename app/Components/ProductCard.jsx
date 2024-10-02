"use client";

import { useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { addWishlist, deleteWishlistItem } from "../Service/Profile";
import toast from "react-hot-toast";
import Link from "next/link";

const ProductCard = ({
  imgSrc,
  title,
  price,
  discountPrice,
  rating,
  description,
  offer,
  className,
  userId,
  productId,
  slug
}) => {
  const theme = useTheme();
  const [isWished, setIsWished] = useState(false);

  // Check if the product is already in the wishlist when the component mounts
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setIsWished(savedWishlist.includes(productId));
  }, [productId]);

  const handleAddToWishlist = async (e) => {
    e.stopPropagation(); // Prevent navigation to product page

    const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    try {
      if (!isWished) {
        // Adding to wishlist
        await addWishlist(userId, productId);
        localStorage.setItem(
          "wishlist",
          JSON.stringify([...savedWishlist, productId])
        );
        setIsWished(true);
        toast.success("Product added to wishlist!");
      } else {
        // Removing from wishlist
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

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <div className="flex items-center">
        {"★".repeat(fullStars)}
        {halfStar ? "☆" : ""}
        {"☆".repeat(emptyStars)}
      </div>
    );
  };

  return (
    <div
      className="relative border border-gray-200 rounded-lg overflow-hidden shadow-md p-2"
      style={{
        background: theme.palette.card.background
      }}
    >
      {/* Ribbon-style offer display */}
      {offer && (
        <div className="ribbon ribbon-top-right">
          <span>{offer}% OFF</span>
        </div>
      )}

      <Link href={`/product/${productId}/${encodeURIComponent(slug)}`} passHref>
        <img
          src={imgSrc}
          alt={title}
          className={className}
          style={{ cursor: "pointer" }}
        />
      </Link>
      <h3 className="text-sm font-bold truncate">{title}</h3>
      <div className="mb-2">
        {discountPrice ? (
          <div className="flex justify-between items-baseline">
            <p className="text-red-500 font-bold text-sm line-through">
              ₹{price}
            </p>
            <p className="text-green-500 font-bold text-sm">₹{discountPrice}</p>
          </div>
        ) : (
          <p className="text-green-500 font-bold text-lg">{price}</p>
        )}
      </div>
      {rating && (
        <div className="flex items-center mb-2">
          {renderStars(rating)}
          {userId ? (
            <ThumbUpIcon
              color={isWished ? "success" : "action"}
              onClick={handleAddToWishlist} // Use the defined function
              sx={{ cursor: "pointer", marginLeft: "8px" }}
            />
          ) : (
            <></>
          )}
          <span className="text-gray-500 ml-1">({rating.toFixed(1)})</span>
        </div>
      )}
      {description && <p className="text-gray-500 text-sm">{description}</p>}
    </div>
  );
};

export default ProductCard;
