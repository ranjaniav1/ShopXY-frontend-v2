"use client";
import CustomButton from "@/app/Custom/CustomButton";
import CustomTypography from "@/app/Custom/CustomTypography";
import { clearMyCart, setMyCart } from "@/app/redux/reducer/cartReducer";
import { getCart } from "@/app/Service/Cart";
import { cashOnDelivery, promodCodes } from "@/app/Service/payment";
import { Box, Button, TextField, Typography } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const Page = ({ handleBack }) => {
  const userId = useSelector((state) => state.auth.user.data.user._id);
  const cartId = useSelector((state) => state.cart.cart.data._id);
  const [promoCode, setPromoCode] = useState(""); // State to store promo code input
  const [promoError, setPromoError] = useState(""); // State to store promo code error
  const dispatch = useDispatch();

  // Handle Cash on Delivery Payment
  async function handleCodPay() {
    try {
      const response = await cashOnDelivery(userId, cartId);
      dispatch(clearMyCart()); // Clear cart on successful payment
      toast.success("payment sucess"); // Handle success (e.g., redirect or display success message)
    } catch (error) {
      console.error("Error during COD payment", error);
    }
  }

  // Handle Promo Code Validation
  async function handlePromoCodeApply() {
    try {
      const response = await promodCodes(promoCode, cartId);
      const cart = await getCart(userId); // Send promo code and cart ID to backend
      console.log(cart);

      dispatch(setMyCart(cart)); // Update cart with applied discount

      console.log("Promo code applied successfully:", response);
      toast.success("coupon added!");
      setPromoError(""); // Clear error on successful promo code application
    } catch (error) {
      console.error("Error during promo code application", error);
      setPromoError(
        error.response?.data?.errors || "Unexpected error occurred."
      );
    }
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={2}>
      {/* Payment Method Section */}
      <CustomTypography variant="h5" gutterBottom>
        Select Payment Method
      </CustomTypography>

      {/* Cash On Delivery Button */}
      <CustomButton
        title="Cash On Delivery"
        sx={{ width: "100%", mt: 1 }}
        onClick={handleCodPay}
      />

      {/* Promo Code Section */}
      <Box sx={{ width: "100%", mt: 4 }}>
        <Typography variant="h6">Apply Promo Code</Typography>
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <TextField
            label="Promo Code"
            variant="outlined"
            fullWidth
            sx={{ mr: 2 }}
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)} // Update promo code state on input change
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handlePromoCodeApply}
          >
            Apply
          </Button>
        </Box>
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
        <Link href="/scheckout/carts">
          <CustomButton
            title="Back"
            onClick={handleBack}
            variant="outlined"
            sx={{ flex: 1 }}
          />
        </Link>
      </Box>
    </Box>
  );
};

export default Page;
