"use client";
import React, { useEffect, useState } from "react";
import { Store, MessageSquare } from "lucide-react";
import CustomDrawer from "../../Custom/CustomDrawer";
import CustomModal from "../../Custom/CustomModal";
import BrandReviewDrawer from "./BrandReviewDrawer";
import { GetSpecificBrandReview } from "../../Service/GetReviews";
import { useUser } from "../../context/UserContext";
import BrandReviewForm from "./BrandReviewForm";

const BrandRating = ({ brand, brandId }) => {
  const [reviews, setReviews] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useUser();
  const userId = user?._id;

  const fetchReviews = async () => {
    try {
      const data = await GetSpecificBrandReview({ id: brandId });
      if (data?.success) {
        setReviews(data.data.reviews);
        setAnalytics(data.data.analytics.analytics);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [brandId]);

  const averageRating = analytics.averageRating || 0;
  const reviewCount = analytics.totalReviews || 0;

  return (
    <>
      <div
        className="flex items-center justify-between bg-secondary  p-4 rounded shadow cursor-pointer hover:shadow-md transition"
        onClick={() => setDrawerOpen(true)}
      >
        <div className="flex items-center gap-3">
          <Store className="text-primary w-6 h-6" />
          <h3
            className="font-bold text-tprimary text-lg"
            onClick={(e) => {
              e.stopPropagation();
              setModalOpen(true);
            }}
          >
            {brand?.title}
          </h3>
        </div>
        <div className="text-center text-yellow-500 font-semibold">
          {averageRating.toFixed(1)} ⭐
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-tsecondary">{reviewCount} Review{reviewCount !== 1 ? "s" : ""}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setModalOpen(true);
            }}
            className="p-1 rounded hover:bg-gray-100 text-tactive"
            title="Submit a Review"
          >
            <MessageSquare className="w-5 h-5" />
          </button>
        </div>
      </div>

      <CustomDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={`Reviews for ${brand?.title}`}
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
        title={`Review ${brand?.title}`}
      >
        <BrandReviewForm
          brandId={brandId}
          onClose={() => setModalOpen(false)}
          onSubmitSuccess={fetchReviews}
        />
      </CustomModal>
    </>
  );
};

export default BrandRating;
