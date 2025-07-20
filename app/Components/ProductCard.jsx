"use client";

import React from "react";
import { handleAddToCart } from "../helper/cartUtils";

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
  category, // Assuming category.title and category.slug exist
}) => {
  const renderStars = (rating) => (
    <div className="flex items-center text-yellow-400 text-lg">
      {"★".repeat(Math.floor(rating))}
      {"☆".repeat(5 - Math.floor(rating))}
      {rating > 0 && (
        <span className="ml-1 text-tsecondary text-[15px]">({rating.toFixed(1)})</span> // Slightly smaller text for rating number
      )}
    </div>
  );


  return (
    <div
      className={`relative rounded-lg overflow-hidden border border-secondary bg-body shadow-lg transition-all duration-200
       
      `}
    >
      {/* Offer Badge */}
      {offer && (
        <div className="absolute top-3 left-3 bg-red-500 text-white text-[11px] px-2.5 py-[3px] rounded font-semibold z-10">
          {offer}% OFF
        </div>
      )}

      {/* Product Image Link Wrapper */}
      <ClientLink href={`/product/${productId}/${encodeURIComponent(slug)}`}>
        <div className="w-full h-40  flex items-center justify-center overflow-hidden"> {/* Changed to gray-50 for image background */}
          <img
            src={imgSrc}
            alt={title}
            className="object-contain w-full h-full p-4 transition-transform duration-300 hover:scale-105"
          />
        </div>
      </ClientLink>

      {/* White Content Block */}
      <div className="bg-body p-4 flex flex-col gap-2">
        {/* Row 1: Category + Stars */}
        <div className="flex items-center justify-between text-xs">
          {category?.title ? (
            <ClientLink href={`/category/${category.slug}`}>
              <span className="bg-primary text-white px-2 py-[2px] rounded text-[11px] font-medium hover:bg-blue-200 transition">
                {category.title}
              </span>
            </ClientLink>
          ) : (
            <span /> // Empty span to maintain spacing if no category
          )}
          {rating > 0 && renderStars(rating)}
        </div>

        {/* Row 2: Title */}
        <ClientLink href={`/product/${productId}/${encodeURIComponent(slug)}`}>
          <h3 className="text-base font-semibold text-gray-800 hover:underline line-clamp-2 min-h-[1em] text-tprimary"> {/* Increased text size to base, min-h for 2 lines */}
            {title}
          </h3>
        </ClientLink>

        {/* Row 3: Price & Stock Status */}
        <div className="flex items-baseline justify-between mt-1 mb-2"> {/* Adjusted margin for spacing */}
          <div className="flex items-baseline gap-1">
            {discountPrice && discountPrice !== price ? (
              <>
                <span className="text-tactive font-bold text-lg">
                  ₹{discountPrice}
                </span>
                <span className="line-through text-tsecondary text-sm">
                  ₹{price}
                </span>
              </>
            ) : (
              <span className="text-gray-900 font-bold text-lg">₹{price}</span>
            )}
          </div>
          {/* Stock Status text aligned right */}
          {inStock && stock_qty > 0 ? (
            <span className="text-green-600 text-[13px] font-medium">
              In Stock
            </span>
          ) : (
            <span className="text-red-600 text-[13px] font-medium">
              Out of Stock
            </span>
          )}
        </div>

        {/* Full-width Add to Cart / Out of Stock Button */}
        {inStock && stock_qty > 0 ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAddToCart({ userId, productId });
            }}
            className="w-full bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300 text-base py-2.5 rounded-md font-medium transition-colors duration-200"
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