"use client";
import Heading from "@/app/Common/Heading";
import FilterSidebar from "@/app/Components/FilterSidebar";
import { Grid } from "@mui/material";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const Layout = ({ children }) => {
  const { collectionId } = useParams();
  const [allProducts, setAllProducts] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const handleBrandChange = (brands) => {
    setSelectedBrands(brands);

    if (brands.length > 0) {
      const filteredProducts = allProducts.filter((product) =>
        brands.includes(product.product_id)
      );
      setAllProducts(filteredProducts);
    } else {
      setAllProducts(allProducts);
    }
  };
  const { collectionTitle } = useParams();
  console.log("collection", collectionTitle);
  return (
    <Grid container spacing={2} sx={{ marginTop: 2 }}>
      <Grid item xs={12} md={3}>
        <Heading text={collectionTitle} />
        <FilterSidebar
          onBrandChange={handleBrandChange}
          brand_id={collectionId}
        />
      </Grid>
      <Grid item xs={12} md={9} sx={{mt:5.5}}>
        {children}
      </Grid>
    </Grid>
  );
};

export default Layout;
