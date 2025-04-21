"use client";
import CustomButton from "@/app/Custom/CustomButton";
import CustomTypography from "@/app/Custom/CustomTypography";
import {
  cashOnDelivery,
  handleStripePayment,
  promodCodes
} from "@/app/Service/payment";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { loadStripe } from "@stripe/stripe-js";
import { httpAxios } from "@/app/httpAxios";

const PaymentPage = ({ handleBack, cartData, loadCart }) => {
  console.log("cart for pay",cartData)
  const userId = useSelector((state) => state.auth.user.data.user._id);

  const [promoCode, setPromoCode] = useState(""); // State to store promo code input
  const [promoError, setPromoError] = useState(""); // State to store promo code error
  const dispatch = useDispatch();
  const theme = useTheme();
  const router = useRouter();

  // Handle Cash on Delivery Payment
  async function handleCodPay(paymentType, cartId, userId) {
    try {
      const response = await cashOnDelivery(userId, cartId);
      console.log("COD Response:", response); // ✅ Now you’ll see the actual response
      toast.success(response.message || "Order placed successfully");
      router.push("/");
    } catch (error) {
      console.error("Error during COD payment", error);
      toast.error(error.response?.data?.message || "COD payment failed");
    }
  }
  

  // Handle Promo Code Validation
  async function handlePromoCodeApply() {
    try {
      const response = await promodCodes(promoCode, cartData._id); // Send promo code to backend
      await loadCart(userId)
      toast.success("coupon added!");

      console.log("Promo code applied successfully:", response);
      setPromoError(""); // Clear error on successful promo code application
    } catch (error) {
      console.error("Error during promo code application", error);
      setPromoError(
        error.response?.data?.errors || "Unexpected error occurred."
      );
    }
  }
  
  async function handleStripePay(paymentType,cartId,userId) {
    if (paymentType === "Stripe") {
      console.log("Initiating Stripe...");
      try {
        // Create a checkout session by calling your backend API
        const { data } = await httpAxios.post(
          "/user/payment/order",
          {
            paymentMethod: "stripe",
            metadata: {
              userId,
              cartId,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        // Load Stripe and create an instance
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  
        if (stripe) {
          const result = await stripe.redirectToCheckout({ sessionId: data.id });
          if (result.error) {
            console.error("Stripe Checkout error:", result.error.message);
          }
        } else {
          console.error("Stripe is not available.");
        }
      } catch (error) {
        console.error("Error creating checkout session:", error.message);
      }
    }
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={2}
      sx={{
        backgroundColor: theme.palette.background.body,
        borderRadius: 2,
        boxShadow: theme.shadows[3],
        width: "100%",
        maxWidth: "600px",
        margin: "auto"
      }}
    >
      {/* Payment Method Section */}
      <CustomTypography
        variant="h5"
        gutterBottom
        sx={{ color: theme.palette.text.primary }}
      >
        Payment Methods: 
      </CustomTypography>

     {/* Payment Buttons Section */}
<Box
  sx={{
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    gap: 2,
    width: "100%",
    mt: 2,
  }}
>
  {/* Cash On Delivery Button */}
  <CustomButton
    title="Cash On Delivery"
    sx={{
      flex: 1,
      backgroundColor: theme.palette.button.background,
      ":hover": {
        backgroundColor: theme.palette.button.hover,
      },
    }}
    onClick={() => handleCodPay("cod", cartData._id, userId)}
  />

  {/* Stripe Payment Button */}
  <CustomButton
    title="Pay with Stripe"
    sx={{
      flex: 1,
      backgroundColor: "#6772e5",
      ":hover": {
        backgroundColor: "#5469d4",
      },
    }}
    onClick={() => handleStripePay("Stripe", cartData._id, userId)}
  />
</Box>

      {/* Promo Code Section */}
      <Box sx={{ width: "100%", mt: 4 }}>
        <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
          Enter Promo code
        </Typography>
        <TextField
          label="Promo Code"
          variant="outlined"
          fullWidth
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          sx={{ mt: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlePromoCodeApply}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    ":hover": {
                      backgroundColor: theme.palette.primary.dark
                    }
                  }}
                >
                  Apply
                </Button>
              </InputAdornment>
            )
          }}
        />
        {promoError && (
          <Typography color="error" mt={2}>
            {promoError}
          </Typography>
        )}
      </Box>

      {/* Navigation Buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          mt: 5
        }}
      >
        <Link href="/scheckout/address">
          <CustomButton
            title="Back"
            onClick={handleBack}
            variant="outlined"
            sx={{
              flex: 1,
              color: theme.palette.text.primary,
              borderColor: theme.palette.primary.main
            }}
          />
        </Link>
      </Box>
    </Box>
  );
};

export default PaymentPage;
