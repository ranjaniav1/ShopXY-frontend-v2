"use client";

import React, { useState } from "react";
import {
  Typography,
  Box,
  Grid,
  Card,
  IconButton,
  Tooltip
} from "@mui/material";
import { useTranslation } from "react-i18next";
import ReviewComponents from "./RatindReview";
import CustomTypography from "../Custom/CustomTypography";
import RateReviewIcon from "@mui/icons-material/RateReview"; // Icon for submitting review
import CustomModal from "../Custom/CustomModal";
import BrandReviewForm from "./BrandReviewForm";
import toast from "react-hot-toast";
import BrandRating from "./BrandRating";

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
  brand, userId
}) => {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false); // For the modal

  return (
    <Grid container spacing={4}>
      {/* Card 1: Product Description, Price */}
      <Grid item xs={12}>
        <Card className="bg-body">
          <CustomTypography
            variant="h4"
            className="text-secondary"
          >
            {name}
          </CustomTypography>
          <CustomTypography
            variant="body2"
            className="text-secondary"          >
            {description}
          </CustomTypography>
          <CustomTypography variant="h5" className="text-green-600 mb-2">
            ₹{discounted_price}{" "}
            {discounted_price && (
              <span
                style={{
                  textDecoration: "line-through",
                  marginLeft: "8px",
                  color: "red"// Theme-based color for struck-through price
                }}
              >
                ₹{actual_price}
              </span>
            )}{" "}
            {offer}% OFF
          </CustomTypography>
          <CustomTypography variant="body2" className="mt-2 text-secondary"
          >
            {t("Free Delivery")}
          </CustomTypography>
        </Card>
      </Grid>

      {/* Card 2: Product Details */}
      <Grid item xs={12}>
        <Card sx={{ p: 2, }} className="text-body">
          <CustomTypography
            variant="h4"
            className="text-secondary"          >
            {t("Product details")}:
          </CustomTypography>

          <CustomTypography
            variant="body2"
            className="text-secondary"          >
            {t("Description")}: {full_description}
          </CustomTypography>
          <CustomTypography
            variant="body2"
            className="text-secondary"          >
            {t("Special Offer")}: {special_offer}
          </CustomTypography>
          <CustomTypography
            variant="body2"
            className="text-secondary"          >
            {t("GST Type")}: {gst_type}
          </CustomTypography>
        </Card>
      </Grid>
      {/* card 3 brand rating review */}
      <Grid item xs={12}>
        <BrandRating brand={brand} brandId={productId} sx={{ p: 2 }} />
      </Grid>
      {/* Card 4: Ratings and Reviews */}
      <Grid item xs={12}>
        <Card
          sx={{ p: 2 }} className="text-secondary"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <CustomTypography
              variant="h4"
              className="text-secondary"            >
              {t("Rating & Reviews")}
            </CustomTypography>
            <Tooltip title="Submit a Review">
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();

                  setModalOpen(true); // Open modal for submitting review
                }}
                className="text-primary"
              >
                <RateReviewIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <ReviewComponents productId={productId} sx={{ p: 2 }} />
        </Card>
      </Grid>
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
    </Grid>
  );
};

export default ProductDetails;
