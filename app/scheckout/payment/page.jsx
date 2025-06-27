"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";

import { useUser } from "@/app/context/UserContext";
import { cashOnDelivery, promodCodes } from "@/app/Service/payment";
import { httpAxios } from "@/app/httpAxios";

import CustomButton from "@/app/Custom/CustomButton";
import CustomTypography from "@/app/Custom/CustomTypography";
import ClientLink from "@/app/Common/ClientClick";

const PaymentPage = ({ handleBack, cartData, loadCart }) => {
  const { user } = useUser();
  const userId = user?._id;
  const [promoCode, setPromoCode] = useState("");
  const [promoError, setPromoError] = useState("");
  const router = useRouter();

  async function handleCodPay(paymentType, cartId, userId) {
    try {
      const response = await cashOnDelivery(userId, cartId);
      toast.success(response.message || "Order placed successfully");
      router.push("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "COD payment failed");
    }
  }

  async function handlePromoCodeApply() {
    try {
      await promodCodes(promoCode, cartData._id);
      await loadCart(userId);
      toast.success("Coupon applied!");
      setPromoError("");
    } catch (error) {
      const errMsg =
        error.response?.data?.message ||
        error.response?.data?.errors ||
        "Unexpected error occurred.";
      setPromoError(errMsg);
    }
  }

  async function handleStripePay(paymentType, cartId, userId) {
    try {
      const { data } = await httpAxios.post(
        "/user/payment/order",
        {
          paymentMethod: "stripe",
          metadata: { userId, cartId },
        },
        { headers: { "Content-Type": "application/json" } }
      );

      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
      if (stripe) {
        const result = await stripe.redirectToCheckout({ sessionId: data.id });
        if (result.error) {
          console.error("Stripe Checkout error:", result.error.message);
        }
      }
    } catch (error) {
      console.error("Stripe Checkout creation failed:", error.message);
    }
  }

  return (
    <div className="min-h-screen bg-body px-4 py-6 md:px-8">
      <div className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-2xl p-6">
        {/* Title */}
        <CustomTypography className="text-xl font-semibold text-tprimary mb-6">
          Payment Methods
        </CustomTypography>

        {/* Payment Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <CustomButton
            title="Cash On Delivery"
            className="flex-1 bg-primary hover:bg-tprimary text-white"
            onClick={() => handleCodPay("cod", cartData._id, userId)}
          />
          <CustomButton
            title="Pay with Stripe"
            className="flex-1 bg-[#6772e5] hover:bg-[#5469d4] text-white"
            onClick={() => handleStripePay("Stripe", cartData._id, userId)}
          />
        </div>

        {/* Promo Code */}
        <div className="mt-6">
          <CustomTypography className="text-base font-medium text-tprimary mb-2">
            Enter Promo Code
          </CustomTypography>
          <div className="flex">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Promo Code"
              className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handlePromoCodeApply}
              className="bg-primary text-white px-4 rounded-r-md hover:bg-tprimary"
            >
              Apply
            </button>
          </div>
          {promoError && (
            <CustomTypography className="text-red-500 mt-2 text-sm">
              {promoError}
            </CustomTypography>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <ClientLink href="/scheckout/address" className="w-full">
            <CustomButton
              title="Back"
              onClick={handleBack}
              variant="outlined"
              className="w-full border border-primary text-tprimary"
            />
          </ClientLink>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
