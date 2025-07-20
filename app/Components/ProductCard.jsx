"use client";

import React from "react";
// No Plus icon needed for the new UI, so it's removed
// import { Plus } from "lucide-react";

// Assuming these are external helper functions/components
// You MUST ensure these paths and functionalities are correct in your project:
// import { handleAddToCart } from "../helper/cartUtils"; // This is crucial for add to cart
// import ClientLink from "../Common/ClientClick"; // This is crucial for navigation

// Placeholder for ClientLink and handleAddToCart if you don't have them set up yet.
// In a real application, you'd replace these with your actual implementations.
const ClientLink = ({ href, children, className = "" }) => (
  <a href={href} className={className}>{children}</a>
);
const handleAddToCart = ({ userId, productId }) => {
  console.log(`Simulating Add to Cart: Product ID ${productId} for User ID ${userId}`);
  // Implement your actual add to cart logic here (e.g., API call, state management)
  // Example: toast.success("Product added to cart!");
};

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
  stockQty,
  category, // Assuming category.title and category.slug exist
}) => {
  const renderStars = (rating) => (
    <div className="flex items-center text-yellow-400 text-xs">
      {"★".repeat(Math.floor(rating))}
      {"☆".repeat(5 - Math.floor(rating))}
      {rating > 0 && (
        <span className="ml-1 text-gray-500 text-[11px]">({rating.toFixed(1)})</span> // Slightly smaller text for rating number
      )}
    </div>
  );

  const isOutOfStock = stockQty <= 0;

  return (
    <div
      className={`relative rounded-lg overflow-hidden border border-gray-100 bg-white shadow-lg transition-all duration-200
       
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
        <div className="w-full h-40 bg-gray-50 flex items-center justify-center overflow-hidden"> {/* Changed to gray-50 for image background */}
          <img
            src={imgSrc}
            alt={title}
            className="object-contain w-full h-full p-4 transition-transform duration-300 hover:scale-105"
          />
        </div>
      </ClientLink>

      {/* White Content Block */}
      <div className="bg-white p-4 flex flex-col gap-2">
        {/* Row 1: Category + Stars */}
        <div className="flex items-center justify-between text-xs">
          {category?.title ? (
            <ClientLink href={`/category/${category.slug}`}>
              <span className="bg-blue-100 text-blue-700 px-2 py-[2px] rounded text-[10px] font-medium hover:bg-blue-200 transition">
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
          <h3 className="text-base font-semibold text-gray-800 hover:underline line-clamp-2 min-h-[1em]"> {/* Increased text size to base, min-h for 2 lines */}
            {title}
          </h3>
        </ClientLink>

        {/* Row 3: Price & Stock Status */}
        <div className="flex items-baseline justify-between mt-1 mb-2"> {/* Adjusted margin for spacing */}
          <div className="flex items-baseline gap-1">
            {discountPrice && discountPrice !== price ? (
              <>
                <span className="text-primary font-bold text-lg">
                  ₹{discountPrice}
                </span>
                <span className="line-through text-gray-500 text-sm">
                  ₹{price}
                </span>
              </>
            ) : (
              <span className="text-gray-900 font-bold text-lg">₹{price}</span>
            )}
          </div>
          {/* Stock Status text aligned right */}
          {!isOutOfStock ? (
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
        {isOutOfStock ? (
          <button
            disabled
            className="w-full bg-gray-200 text-gray-500 text-base py-2.5 rounded-md font-medium cursor-not-allowed"
          >
            Out of Stock
          </button>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default ProductCard;