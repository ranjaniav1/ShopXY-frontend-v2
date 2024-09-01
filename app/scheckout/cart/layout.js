"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getCart } from "@/app/Service/Cart";
import { Box, Divider, Grid } from "@mui/material";
import PriceDetails from "@/app/Components/PriceDetail";

const Layout = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = useSelector((state) => state.auth.user.data.user._id);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await getCart(userId);
        setCart(response.cart);
      } catch (err) {
        setError(err.message || "Error fetching cart data");
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, [userId]);

  // Calculate price details
  const numberOfItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalProductPrice = cart.reduce(
    (acc, item) =>
      acc +
      (item.product.discounted_price || item.product.actual_price) *
        item.quantity,
    0
  );
  const totalDiscount = cart.reduce(
    (acc, item) =>
      acc +
      (item.product.actual_price - item.product.discounted_price || 0) *
        item.quantity,
    0
  );
  const orderTotal = totalProductPrice - totalDiscount;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
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
          numberOfItems={numberOfItems}
          totalProductPrice={totalProductPrice}
          totalDiscount={totalDiscount}
          orderTotal={orderTotal}
        />
      </Grid>
    </Grid>
  );
};

export default Layout;
