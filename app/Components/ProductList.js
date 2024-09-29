"use client";

import React from "react";
import { Grid, Typography, useTheme } from "@mui/material";
import ProductCard from "./ProductCard";
import Link from "next/link";
import CustomSkeleton from "../Custom/CustomSkeleton";

const ProductList = ({ products, loading }) => {
  const theme = useTheme(); // Use theme inside the component


  return (
    <Grid container spacing={2}>
      {loading ? (
        <CustomSkeleton type="card" />
      ) : products && products.length > 0 ? ( // Ensure products is an array and has items
        products.map((product, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={product.id}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <Link
              href={`/product/${product._id}/${encodeURIComponent(product.slug)}`}
              passHref
            >
              <ProductCard
                className="w-full h-48 object-contain "
                imgSrc={product.image}
                title={product.name}
                price={product.actual_price}
                discountPrice={product.discounted_price}
                rating={product.ratings}
                description={product.description}
                offer={product.offer}
              />
            </Link>
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
