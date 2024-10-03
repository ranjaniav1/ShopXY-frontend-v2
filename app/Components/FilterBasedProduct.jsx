"use client";

import React from "react";
import {  Grid } from "@mui/material";
import ProductCard from "./ProductCard";
import CustomBox from "../Custom/CustomBox";
import CustomSkeleton from "../Custom/CustomSkeleton";
import { useSelector } from "react-redux";

const FilterBasedProduct = ({ products }) => {
  const truncateText = (text, maxLength) => {
    return text?.length <= maxLength ? text : `${text.slice(0, maxLength)}...`;
  };
  const { userId } = useSelector((state) => {
    const isAuth = state.auth.isAuthenticated;
    return {
      userId: isAuth ? state.auth.user?.data?.user?._id : null
    };
  });
  return (
      <Grid container spacing={3}>
        {products && products.length > 0 ? (
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
              <ProductCard
                className="w-full h-40 object-contain"
                imgSrc={product.image}
                title={product.name}
                price={product.actual_price}
                discountPrice={product.discounted_price}
                rating={product.ratings}
                description={truncateText(product.description, 50)}
                offer={product.offer}
                userId={userId}
                productId={product._id}
                slug={product.slug}
              />
            </Grid>
          ))
        ) : (
          <Grid container spacing={2}>
            {Array.from({ length: 6 }).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <CustomSkeleton type="card" width="96px" height="96px" />
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
  );
};

export default FilterBasedProduct;
