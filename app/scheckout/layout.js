"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "@/app/Service/Cart";
import { Box, Divider, Grid } from "@mui/material";
import PriceDetails from "@/app/Components/PriceDetail";
import CustomBox from "@/app/Custom/CustomBox";
import { setMyCart } from "../redux/reducer/cartReducer";
import CustomButton from "../Custom/CustomButton";
import Link from "next/link";

const Layout = ({ children }) => {
  const [cart, setCart] = useState({
    items: [],
    totalProductActualPrice: 0,
    totalDiscount: 0,
    finalPrice: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = useSelector((state) => state.auth.user.data.user._id);
  const dispatch = useDispatch();

  const isCart = useSelector((state) => state.cart);
  const fetchCartData = async () => {
    try {
      const response = await getCart(userId);
      setCart(response);
      dispatch(setMyCart(response));
      console.log("sfj", response);
    } catch (err) {
      setError(err.message || "Error fetching cart data");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCartData();
  }, [userId]);
// user id in dependency remove 
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <CustomBox>
      <Grid container spacing={2}>
        {/* Grid for children (cart items) */}
        <Grid item xs={12} md={7}>
          {children}
        </Grid>

        {/* Vertical Divider */}
        <Grid
          item
          sx={{ display: { xs: "none", md: "flex" }, alignItems: "stretch" }}
        >
          <Box sx={{ height: "100%", display: "flex", alignItems: "stretch" }}>
            <Divider orientation="vertical" flexItem />
          </Box>
        </Grid>

        {/* Price Details Section */}
        <Grid item xs={12} md={4}>
          <PriceDetails
            // numberOfItems={cart.items.length}
            totalProductPrice={isCart.totalPrice ? isCart.totalPrice : 0}
            totalDiscount={isCart.totalDiscount ? isCart.totalDiscount : 0}
            orderTotal={isCart.finalPrice ? isCart.finalPrice : 0}
          />
          <Link href="/scheckout/address">
            <CustomButton title="Continue" />
          </Link>
        </Grid>
      </Grid>
    </CustomBox>
  );
};

export default Layout;
