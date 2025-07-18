"use client";

import React, { useEffect, useState } from "react";
import { Heart, Plus } from "lucide-react";
import { addWishlist, deleteWishlistItem } from "../Service/Profile";
import toast from "react-hot-toast";
import { handleAddToCart } from "../helper/cartUtils";
import ClientLink from "../Common/ClientClick";
import { GetCollectionsByCategory } from "../Service/GetCollection";

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
  stockQty,
  description,
  category,
  brand,
  collection,
  shipping_charges,
  color,
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
    <div className="relative rounded-lg p-2 bg-body border shadow-sm hover:shadow-md transition duration-200 text-tprimary hover:border-primary">
      {/* Offer Badge */}
      {offer && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-2 py-[2px] rounded font-semibold z-10">
          {offer}% OFF
        </div>
      )}

      {/* Wishlist Icon */}
      <div className="absolute top-2 right-2 z-20">
        <button onClick={handleAddToWishlist} aria-label="Toggle wishlist">
          {isWished ? (
            <Heart className="w-4 h-4 text-green-600 fill-green-600" />
          ) : (
            <Heart className="w-4 h-4 text-tmuted hover:text-red-500 transition" />
          )}
        </button>
      </div>

      {/* Product Image */}
      <ClientLink href={`/product/${productId}/${encodeURIComponent(slug)}`}>
        <div className="w-full h-36 bg-body-light rounded-lg overflow-hidden flex items-center justify-center mb-2">
          <img
            loading="lazy"
            src={imgSrc}
            alt={title}
            className="object-contain w-full h-full transition-transform duration-200 hover:scale-105"
          />
        </div>
      </ClientLink>

      {/* Title */}
      <ClientLink href={`/product/${productId}/${encodeURIComponent(slug)}`}>
        <h3 className="text-xs font-medium text-tprimary  hover:underline">
          {title}
        </h3>


      </ClientLink>

      {/* Rating */}
      {rating > 0 && <div>{renderStars(rating)}</div>}



      {/* Brand & Collection */}
      <div className="flex flex-wrap gap-1 mt-2 mb-1">
        {brand?.title && brand?.slug && (
          <ClientLink href={`/brand/${brand.slug}`}>
            <span className="cursor-pointer bg-blue-100 text-blue-700 text-[10px] font-medium px-2 py-[2px] rounded-full hover:bg-blue-200 transition">
              {brand.title}
            </span>
          </ClientLink>
        )}
        {collection?.title && collection?.slug && (
          <ClientLink href={`/collection/${collection.slug}`}>
            <span className="cursor-pointer bg-purple-100 text-purple-700 text-[10px] font-medium px-2 py-[2px] rounded-full hover:bg-purple-200 transition">
              {collection.title}
            </span>
          </ClientLink>
        )}

        {category?.title && category?.slug && (
          <ClientLink href={`/category/${category.slug}`}>
            <span className="cursor-pointer bg-green-100 text-green-700 text-[10px] font-medium px-2 py-[2px] rounded-full hover:bg-green-200 transition">
              {category.title}
            </span>
          </ClientLink>
        )}
      </div>



      {/* Price + Add to Cart / Out of Stock */}
      <div className="flex items-center justify-between mt-2">
        <div>
          {discountPrice !== price ? (
            <>
              <span className="text-success font-semibold text-sm">₹{discountPrice}</span>
              <span className="line-through text-tsecondary text-xs ml-1">₹{price}</span>
            </>
          ) : (
            <span className="text-success font-semibold text-sm">₹{price}</span>
          )}
        </div>

        {stockQty > 0 ? (
          <button
            className="bg-green-600 hover:bg-green-700 text-white text-[10px] px-2 py-[3px] rounded flex items-center gap-1"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAddToCart({ userId, productId });
            }}
          >
            <Plus size={12} />
            Add
          </button>
        ) : (
          <span className="bg-red-100 text-red-600 text-[10px] px-2 py-[2px] rounded font-semibold">
            Out of Stock
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
