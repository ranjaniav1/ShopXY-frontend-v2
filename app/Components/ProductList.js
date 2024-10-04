"use client";

import React from "react";
import { Grid, Typography, useTheme } from "@mui/material";
import ProductCard from "./ProductCard";
import CustomSkeleton from "../Custom/CustomSkeleton";
import { useSelector } from "react-redux";

const ProductList = ({ products, loading }) => {
  const { userId } = useSelector((state) => {
    const isAuth = state.auth.isAuthenticated;
    return {
      userId: isAuth ? state.auth.user?.data?.user?._id : null
    };
  });
  const theme=useTheme()
  return (
    <Grid container spacing={2}>
      {loading ? (
        <Grid container spacing={2}>
          {Array.from({ length: 6 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <CustomSkeleton type="card" width="96px" height="96px" />
            </Grid>
          ))}
        </Grid>
      ) : products && products.length > 0 ? ( // Ensure products is an array and has items
        products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id} >
            <ProductCard
              className="w-full h-48 object-contain "
              imgSrc={product.image}
              title={product.name}
              price={product.actual_price}
              discountPrice={product.discounted_price}
              rating={product.ratings}
              description={product.description}
              offer={product.offer}
              userId={userId}
              productId={product._id}
              slug={product.slug}
            />
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Typography variant="h6" align="center" color="textSecondary">
            No products found
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default ProductList;
