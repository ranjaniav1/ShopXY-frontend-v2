"use client";
import CustomButton from "@/app/Custom/CustomButton";
import CustomTypography from "@/app/Custom/CustomTypography";
import { clearMyCart, setMyCart } from "@/app/redux/reducer/cartReducer";
import { getCart } from "@/app/Service/Cart";
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
import PaypalButton from "../../Common/PaypalButton";
import { loadStripe } from "@stripe/stripe-js";

const Page = ({ handleBack }) => {
  const userId = useSelector((state) => state.auth.user.data.user._id);
  const cartId = useSelector((state) => state.cart.cart.data._id);
  const cartData = useSelector((state) => state.cart.cart.data.products);
  console.log("Cart Data from Redux:", cartData); // Modify based on your reducer structure
  const [stripePromise, setStripePromise] = useState(null);

  const [promoCode, setPromoCode] = useState(""); // State to store promo code input
  const [promoError, setPromoError] = useState(""); // State to store promo code error
  const dispatch = useDispatch();
  const theme = useTheme();
  const router = useRouter();
  useEffect(() => {
    const stripe = loadStripe(
      "pk_test_51PxLryRrN241bQ7Plo5ZmfXZqbcdcPPkaeMhCjYGPlr1kcCKvnWApXpNh1r9vfOTp6ZIWc0nOgv5sK4Ec3hbvVJj00vEdntnWT"
    );
    setStripePromise(stripe);
  }, []);
  // Handle Cash on Delivery Payment
  async function handleCodPay() {
    try {
      const response = await cashOnDelivery(userId, cartId);
      dispatch(clearMyCart());
      toast.success("payment sucess");
      router.push("/");
    } catch (error) {
      console.error("Error during COD payment", error);
    }
  }

  // Handle Promo Code Validation
  async function handlePromoCodeApply() {
    try {
      const response = await promodCodes(promoCode, cartId);
      const cart = await getCart(userId); // Send promo code and cart ID to backend
      dispatch(setMyCart(cart)); // Update cart with applied discount
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
  async function handleStripePay() {
    try {
      if (!stripePromise) {
        toast.error("Stripe is not initialized");
        return;
      }

      const stripe = await stripePromise; // Use the stripePromise from state

      const result = await handleStripePayment(
        userId,
        cartId,
        cartData,
        // stripe
      );

      if (result.error) {
        toast.error("Payment failed: " + result.error.message);
      } else {
        toast.success("Payment successful!");
        router.push("/");
      }
    } catch (error) {
      console.error("Error during Stripe payment", error);
      toast.error("Payment failed");
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
        Payment Method: Cash on Delivery{" "}
      </CustomTypography>

      {/* Cash On Delivery Button */}
      <CustomButton
        title="Cash On Delivery"
        sx={{
          width: "100%",
          mt: 1,
          backgroundColor: theme.palette.button.background,
          ":hover": {
            backgroundColor: theme.palette.button.hover
          }
        }}
        onClick={handleCodPay}
      />
      <PaypalButton />

      {/* Stripe Payment Button */}
      <CustomButton
        title="Pay with Stripe"
        sx={{
          width: "100%",
          mt: 2,
          backgroundColor: "#6772e5",
          ":hover": {
            backgroundColor: "#5469d4"
          }
        }}
        onClick={handleStripePay}
      />
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

export default Page;
