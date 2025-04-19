import React from "react";
import { Grid, Typography } from "@mui/material";
import ProductCard from "./ProductCard";
import CustomSkeleton from "../Custom/CustomSkeleton";
import { useSelector } from "react-redux";

const FilterBasedProduct = ({ products }) => {
  console.log("props", products);
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
    <Grid container spacing={2}>
      {products && products.length > 0 ? (
        products.map((product) => (
          <Grid item xs={12} sm={8} md={6} lg={4} key={product._id}>
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
        <Typography
          variant="body1"
          sx={{ padding: "16px", textAlign: "center" }}
        >
          No products found.
        </Typography>
      )}
    </Grid>
  );
};

export default FilterBasedProduct;
