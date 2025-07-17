"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ReviewComponents from "./RatindReview";
import BrandReviewForm from "./BrandReviewForm";
import BrandRating from "./BrandRating";
import CustomModal from "../Custom/CustomModal";
import {
  MessageSquare,
  Truck,
  BadgePercent,
  CheckCircle,
  XCircle,
  Boxes,
  Palette,
  Tag,
  Ruler,
  AlertCircle,
  PackageCheck,
} from "lucide-react";
import ClientLink from "../Common/ClientClick";

const ProductDetails = ({
  name,
  actual_price,
  discounted_price,
  offer,
  description,
  full_description,
  productId,
  brand,
  size = [],
  color = [],
  stock_qty = 0,
  shipping_charges = 0,
  ratings,
  reviews,
  category,
  collection,
}) => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);

  const isInStock = stock_qty > 0;

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Basic Info */}
      <div className="bg-body p-4 rounded shadow">
        <h2 className="text-xl font-bold text-tprimary mb-2">{name}</h2>
        <p className="text-sm text-tsecondary mb-3">{description}</p>
        <p className="text-sm text-tsecondary">{full_description}</p>

        {/* Pricing */}
        <div className="text-sm mb-2 space-x-2">
          <span className="text-green-600 font-semibold text-xl">
            ₹{discounted_price}
          </span>
          {actual_price && actual_price !== discounted_price && (
            <>
              <span className="line-through text-red-500 text-sm">
                ₹{actual_price}
              </span>
              <span className="text-xs font-medium bg-red-100 text-red-600 px-2 py-1 rounded">
                {offer}% OFF
              </span>
            </>
          )}
        </div>

        {/* Delivery */}
        <div className="text-xs text-tactive flex items-center gap-2 mt-1">
          <Truck className="w-4 h-4" />
          {shipping_charges === 0 ? "Free Delivery" : `Shipping: ₹${shipping_charges}`}
        </div>

        {/* Stock Status */}
        <div className="mt-2 flex items-center text-sm">
          {isInStock ? (
            <span className="text-green-600 flex items-center gap-1">
              <PackageCheck size={16} /> In Stock ({stock_qty})
            </span>
          ) : (
            <span className="text-red-600 flex items-center gap-1">
              <AlertCircle size={16} /> Out of Stock
            </span>
          )}
        </div>
      </div>

      {/* Tags: Brand, Category, Collection, Size, Color */}
      <div className="bg-body p-4 rounded shadow space-y-3 text-sm text-tsecondary">
        <div className="flex flex-wrap gap-3">
          {brand?.title && (
            <ClientLink
              href={`/brand/${brand.slug || brand.id}`}
              className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded hover:bg-primary/20 transition"
            >
              <Tag size={14} /> Brand: {brand.title}
            </ClientLink>
          )}

          {category?.title && (
            <ClientLink
              href={`/category/${category.slug || category.id}`}
              className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded hover:bg-yellow-200 transition"
            >
              <Boxes size={14} /> Category: {category.title}
            </ClientLink>
          )}

          {collection?.title && (
            <ClientLink
              href={`/collection/${collection.slug || collection.id}`}
              className="flex items-center gap-1 bg-purple-100 text-purple-800 px-2 py-1 rounded hover:bg-purple-200 transition"
            >
              <Tag size={14} /> Collection: {collection.title}
            </ClientLink>
          )}
        </div>
      </div>

      {/* Brand Rating */}
      {brand && <BrandRating brand={brand} brandId={productId} />}

      {/* Reviews */}
      <div className="bg-body p-4 rounded shadow">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-tprimary">
            {t("Rating & Reviews")}
          </h3>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center text-sm text-tactive hover:text-primary transition"
          >
            <MessageSquare className="w-4 h-4 mr-1" />
            {t("Write a Review")}
          </button>
        </div>
        <ReviewComponents productId={productId} reviews={reviews} />
      </div>

      {/* Review Modal */}
      <CustomModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`Review ${name}`}
      >
        <BrandReviewForm
          productId={productId}
          onClose={() => setModalOpen(false)}
        />
      </CustomModal>
    </div>
  );
};

export default ProductDetails;
