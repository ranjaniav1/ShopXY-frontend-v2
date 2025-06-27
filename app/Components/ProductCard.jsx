import React, { useEffect, useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { addWishlist, deleteWishlistItem } from "../Service/Profile";
import toast from "react-hot-toast";
import Link from "next/link";
import { handleAddToCart } from "../helper/cartUtils";
import ClientLink from "../Common/ClientClick";

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
  const [isWished, setIsWished] = useState(isWishlistedFromParent);

  useEffect(() => {
    setIsWished(isWishlistedFromParent);
  }, [isWishlistedFromParent]);

  const handleAddToWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!userId) {
      toast.error("Please login first to use wishlist!");
      return;
    }

    try {
      if (isWished) {
        await deleteWishlistItem(productId);
        toast.success("Removed from wishlist!");
      } else {
        await addWishlist(productId);
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
    <div className="relative rounded-lg p-2 bg-white shadow-sm border hover:shadow-md transition duration-200">
      {/* Offer Badge */}
      {offer && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-2 py-[2px] rounded font-semibold z-10">
          {offer}% OFF
        </div>
      )}

      {/* Wishlist Icon */}
      <div className="absolute top-2 right-2 z-20">
        <ThumbUpIcon
          color={isWished ? "success" : "action"}
          onClick={handleAddToWishlist}
          sx={{ cursor: "pointer", fontSize: 18 }}
        />
      </div>

      {/* Product Image (Link) */}
      <ClientLink href={`/product/${productId}/${encodeURIComponent(slug)}`}>
        <div className="w-full h-36 bg-gray-50 rounded-md overflow-hidden flex items-center justify-center mb-2">
          <img
            src={imgSrc}
            alt={title}
            className="object-contain w-full h-full transition-transform duration-200 hover:scale-105"
          />
        </div>
      </ClientLink>

      {/* Title (Link) */}
      <ClientLink href={`/product/${productId}/${encodeURIComponent(slug)}`}>
        <h3 className="text-xs font-medium text-gray-800 line-clamp-2 mb-1 min-h-[32px] hover:underline">
          {title}
        </h3>
      </ClientLink>

      {/* Rating */}
      {rating > 0 && <div>{renderStars(rating)}</div>}

      {/* Price + Add */}
      <div className="flex items-center justify-between mt-2">
        <div>
          <span className="text-green-600 font-semibold text-sm">
            ₹{discountPrice}
          </span>
          <span className="line-through text-gray-400 text-xs ml-1">
            ₹{price}
          </span>
        </div>

        {inStock ? (
          <button
            className="bg-green-600 hover:bg-green-700 text-white text-[10px] px-3 py-[3px] rounded"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAddToCart({ userId, productId });
            }}
          >
            Add
          </button>
        ) : (
          <span className="text-red-500 text-[10px] font-medium">
            Out of Stock
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
