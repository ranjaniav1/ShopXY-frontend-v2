"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "@/app/Service/Cart";
import { Box, Divider, Grid, Typography } from "@mui/material";
import PriceDetails from "@/app/Components/PriceDetail";
import CustomBox from "@/app/Custom/CustomBox";
import { setMyCart } from "../redux/reducer/cartReducer";
import CustomButton from "../Custom/CustomButton";
import Link from "next/link";

const Layout = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId =
    useSelector((state) => state.auth?.user?.data?.user?._id) || "test";
  const dispatch = useDispatch();

  const isCart = useSelector((state) => state.cart);

  const fetchCartData = async () => {
    try {
      const response = await getCart(userId);
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
  }, [userId, dispatch]);
  // user id in dependency remove
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  // Calculate total product price
  const totalProductPrice = isCart.cart.reduce(
    (total, item) => total + item.itemTotalPrice,
    0
  );
  const totalDiscount = isCart.cart.reduce(
    (total, item) => total + item.itemDiscountAmount,
    0
  );
  const finalPrice = totalProductPrice - totalDiscount;
  return (
    <CustomBox>
      <Grid container spacing={2}>
        {isCart.cart?.length > 0 ? (
          <>
            {/* Grid for children (cart items) */}
            <Grid item xs={12} md={7}>
              {children}
            </Grid>

            {/* Vertical Divider */}
            <Grid
              item
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "stretch"
              }}
            >
              <Box
                sx={{ height: "100%", display: "flex", alignItems: "stretch" }}
              >
                <Divider orientation="vertical" flexItem />
              </Box>
            </Grid>

            {/* Price Details Section */}
            <Grid item xs={12} md={4}>
              <PriceDetails
                totalProductPrice={totalProductPrice}
                totalDiscount={totalDiscount}
                orderTotal={finalPrice}
              />
            </Grid>
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%", // Adjust this value as needed
              width: "100%", // Adjust this value as needed
              textAlign: "center",
              paddingBottom: 2
            }}
          >
            <img
              src="https://cdn1.vectorstock.com/i/1000x1000/43/85/young-man-pushing-a-shopping-empty-cart-vector-13494385.jpg"
              alt="Your cart is empty"
              style={{
                height: "500px",
                maxWidth: "100%",
                objectFit: "cover"
              }}
            />{" "}
            <Typography>
              Don&apos;t worry , you can add your products here ..simply click
              on start shopping{" "}
            </Typography>
            <Link href="/categories/collections" passHref>
              <CustomButton title="Start Shopping" />
            </Link>
          </Box>
        )}
      </Grid>
    </CustomBox>
  );
};

export default Layout;
