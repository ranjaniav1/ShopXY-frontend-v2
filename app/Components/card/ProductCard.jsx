"use client";

import React, { useState } from "react";
import { handleAddToCart } from "../../helper/cartUtils";
import { Heart } from "lucide-react";
import { addWishlist, deleteWishlistItem } from "../../Service/Profile";
import { useUser } from "../../context/UserContext";
import toast from "react-hot-toast";

const ClientLink = ({ href, children, className = "" }) => (
  <a href={href} className={className}>{children}</a>
);

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
  stock_qty,
  inStock,
  category,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showEffect, setShowEffect] = useState(false);
  const { user } = useUser()

  const renderStars = (rating) => (
    <div className="flex items-center text-yellow-400 text-lg">
      {"★".repeat(Math.floor(rating))}
      {"☆".repeat(5 - Math.floor(rating))}
      {rating > 0 && (
        <span className="ml-1 text-tsecondary text-[13px]">({rating.toFixed(1)})</span>
      )}
    </div>
  );
  const handleWishlistToggle = async (e) => {
    e.preventDefault();

    if (!user || !user._id) {
      toast.error("Please login to add items to wishlist.");
      return;
    }

    try {
      setIsLiked(!isLiked);
      if (!isLiked) {
        await addWishlist(productId);
        setShowEffect(true)
        setTimeout(() => setShowEffect(false), 600);
      } else {
        await deleteWishlistItem(productId);
      }
    } catch (err) {
      toast.error("Something went wrong with the wishlist.");
    }
  };


  return (
    <div
      className={`relative rounded-xl overflow-hidden  bg-body shadow-sm hover:shadow-lg transition-all duration-300 group`}

    >
      {/* Offer Badge */}
      {offer && (
        <div className="absolute top-3 left-3 bg-red-500 text-white text-[11px] px-2.5 py-[3px] rounded font-semibold z-10">
          {offer}% OFF
        </div>
      )}

      {/* Wishlist Icon (Top right) */}
      <button
        onClick={handleWishlistToggle}
        className="absolute top-2 right-2 z-10 text-red-500"
      >
        <Heart
          fill={isLiked ? "red" : "transparent"}
          strokeWidth={2}
          className="w-6 h-6 transition-transform duration-300"
        />

        {/* Star Sparkle Effect */}
        {showEffect && (
          <div className="absolute inset-0 w-10 h-10 -top-3 -right-3 pointer-events-none">
            {Array.from({ length: 8 }).map((_, i) => {
              const colors = ['#FFD700', '#FF69B4', '#00FFFF', '#00FF00', '#FF4500', '#1E90FF'];
              const color = colors[Math.floor(Math.random() * colors.length)];

              return (
                <svg
                  key={i}
                  viewBox="0 0 24 24"
                  className="absolute w-3 h-3"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${i * 45}deg) translate(0, -18px)`,
                    animation: 'sparkle-star-burst 0.6s ease-out forwards',
                    animationDelay: `${i * 0.03}s`,
                    fill: color,
                  }}
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              );
            })}
          </div>
        )}
      </button>




      {/* Product Image */}
      <ClientLink href={`/product/${productId}/${encodeURIComponent(slug)}`}>
        <div className="w-full h-40 sm:h-48 md:h-52 flex items-center justify-center overflow-hidden bg-gray-50">
          <img
            src={imgSrc}
            alt={title}
            className="object-contain w-full h-full p-4 transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </ClientLink>

      {/* Info Section */}
      <div className="bg-body p-4 flex flex-col gap-2 relative">
        {/* Category + Rating */}
        <div className="flex items-center justify-between text-xs">
          {category?.title && (
            <ClientLink href={`/category/${category.slug}`}>
              <span className="bg-primary text-white px-2 py-[2px] rounded text-[11px] font-medium hover:bg-primary/90 transition">
                {category.title}
              </span>
            </ClientLink>
          )}
          {rating > 0 && renderStars(rating)}
        </div>

        {/* Title */}
        <ClientLink href={`/product/${productId}/${encodeURIComponent(slug)}`}>
          <h3 className="text-base font-semibold text-tprimary hover:underline line-clamp-2">
            {title}
          </h3>
        </ClientLink>

        {/* Price & Stock */}
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-1">
            {discountPrice && discountPrice !== price ? (
              <>
                <span className="text-tactive font-bold text-lg">₹{discountPrice}</span>
                <span className="line-through text-tsecondary text-sm">₹{price}</span>
              </>
            ) : (
              <span className="text-gray-900 font-bold text-lg">₹{price}</span>
            )}
          </div>
          <span
            className={`text-[13px] font-medium ${inStock && stock_qty > 0 ? "text-green-600" : "text-red-600"
              }`}
          >
            {inStock && stock_qty > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Hover Add to Cart */}
        {inStock && stock_qty > 0 ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAddToCart({ userId, productId });
            }}
            className="w-full bg-green-100 text-gray-700  active:bg-gray-300 text-base py-2.5 rounded-md font-medium transition-colors duration-200"
          >
            Add to Cart
          </button>
        ) : (
          <button
            disabled
            className="w-full bg-gray-200 text-gray-500 text-base py-2.5 rounded-md font-medium cursor-not-allowed"
          >
            Out of Stock
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
