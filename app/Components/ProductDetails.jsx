"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ReviewComponents from "./RatindReview";
import BrandReviewForm from "./BrandReviewForm";
import BrandRating from "./BrandRating";
import CustomModal from "../Custom/CustomModal";
import { MessageSquare } from "lucide-react"; // Lucide icon

const ProductDetails = ({
  name,
  actual_price,
  discounted_price,
  offer,
  description,
  full_description,
  special_offer,
  gst_type,
  productId,
  brand,
  userId,
}) => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Basic Info */}
      <div className="bg-body p-4 rounded shadow">
        <h2 className="text-xl font-bold text-tprimary mb-2">{name}</h2>
        <p className="text-sm text-tsecondary mb-4">{description}</p>

        <div className="text-sm mb-2">
          <span className="text-green-600 font-semibold text-base">
            ₹{discounted_price}
          </span>
          {actual_price && (
            <span className="line-through text-red-500 text-sm ml-2">
              ₹{actual_price}
            </span>
          )}
          {offer && (
            <span className="ml-2 text-xs font-medium bg-red-100 text-red-600 px-2 py-1 rounded">
              {offer}% OFF
            </span>
          )}
        </div>

        <p className="text-xs text-tactive">{t("Free Delivery")}</p>
      </div>

      {/* Product Details */}
      <div className="bg-body p-4 rounded shadow space-y-2">
        <h3 className="text-lg font-semibold text-tprimary mb-2">
          {t("Product details")}:
        </h3>
        <p className="text-sm text-tsecondary">
          <span className="font-medium">{t("Description")}:</span>{" "}
          {full_description}
        </p>
        <p className="text-sm text-tsecondary">
          <span className="font-medium">{t("Special Offer")}:</span>{" "}
          {special_offer ? "Yes" : "No"}
        </p>
        <p className="text-sm text-tsecondary">
          <span className="font-medium">{t("GST Type")}:</span> {gst_type}
        </p>
      </div>

      {/* Brand Rating */}
      <BrandRating brand={brand} brandId={productId} />

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
        <ReviewComponents productId={productId} />
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
