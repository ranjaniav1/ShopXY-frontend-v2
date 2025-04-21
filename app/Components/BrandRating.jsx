"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  IconButton,
  Tooltip,
  Typography,
  useTheme
} from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CustomDrawer from "../Custom/CustomDrawer";
import BrandReviewDrawer from "./BrandReviewDrawer";
import { GetSpecificBrandReview } from "../Service/GetReviews";
import CustomModal from "../Custom/CustomModal";
import BrandReviewForm from "./BrandReviewForm";
import RateReviewIcon from "@mui/icons-material/RateReview"; // Icon for submitting review
import CustomTypography from "../Custom/CustomTypography";

const BrandRating = ({ brand, brandId }) => {
  const [reviews, setReviews] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false); // For the drawer
  const [modalOpen, setModalOpen] = useState(false); // For the modal

  const fetchReviews = async () => {
    try {
      const data = await GetSpecificBrandReview({ id: brandId });
      console.log("Fetched data:", data);

      if (data && data.success) {
        setReviews(data.data.reviews);
        setAnalytics(data.data.analytics.analytics); // Access the nested analytics object
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [brandId]);

  // Extract rating and review count safely
  const averageRating = analytics.averageRating || 0;
  const reviewCount = analytics.totalReviews || 0;

  return (
    <>
      <Card
        sx={{
          padding: 2,
          boxShadow: 2,
          display: "flex",
          alignItems: "center",
          background: theme.palette.background.paper,
          cursor: "pointer" // Make the card clickable
        }}
        onClick={() => setDrawerOpen(true)}
      >
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <StorefrontIcon
            sx={{ fontSize: 50, color: theme.palette.button.background }}
          />
          <CustomTypography
            variant="h6"
            sx={{ marginLeft: 1, fontWeight: "bold" ,color: theme.palette.text.primary}}
            onClick={() => setModalOpen(true)}
          >
            {brand.title}
          </CustomTypography>
        </Box>
        <Box sx={{ flexGrow: 1, textAlign: "center" }}>
          <CustomTypography
            variant="body2"
            sx={{ fontWeight: "bold", color: "#ff9800" }}
          >
            {averageRating.toFixed(1)} ⭐
          </CustomTypography>
        </Box>
        <Box sx={{ textAlign: "right", display: "flex", alignItems: "center" }}>
          <CustomTypography
            variant="body2"
            sx={{ color: theme.palette.text.secondary, marginRight: 1 }}
          >
            {reviewCount} Review{reviewCount !== 1 ? "s" : ""}
          </CustomTypography>
          {/* Icon button to submit a review */}
          <Tooltip title="Submit a Review">
            <IconButton
              onClick={(e) => {
                e.stopPropagation(); // Prevents drawer from opening
                setModalOpen(true); // Open modal for submitting review
              }}
            >
              <RateReviewIcon sx={{ color: theme.palette.primary.main }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Card>

      <CustomDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={`Reviews for ${brand.title}`}
      >
        <BrandReviewDrawer
          brand={brand}
          reviews={reviews}
          analytics={analytics}
        />
      </CustomDrawer>

      <CustomModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`Review ${brand.title}`}
      >
        <BrandReviewForm brandId={brandId} onClose={() => setModalOpen(false)} onSubmitSuccess={fetchReviews}/>
      </CustomModal>
    </>
  );
};

export default BrandRating;
