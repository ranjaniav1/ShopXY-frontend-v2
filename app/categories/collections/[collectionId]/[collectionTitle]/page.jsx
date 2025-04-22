"use client";
import React, { useEffect, useState } from "react";
import Heading from "@/app/Common/Heading";
import {
  Grid,
} from "@mui/material";
import { useParams } from "next/navigation";
import { GetSpecificProduct } from "@/app/Service/GetProduct";
import CustomBox from "@/app/Custom/CustomBox";
import CustomTypography from "@/app/Custom/CustomTypography";
import { useProductFilter } from "@/app/helper/useProductFilter";
import FilterSidebar from "@/app/Components/FilterSidebar";
import ProductCard from "@/app/Components/ProductCard";
import CustomSkeleton from "@/app/Custom/CustomSkeleton";
import { useSelector } from "react-redux";

const Page = () => {
  const { collectionTitle, collectionId } = useParams();
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useSelector((state) => {
    const isAuth = state.auth.isAuthenticated;
    return {
      userId: isAuth ? state.auth.user?.data?.user?._id : null
    };
  });
  const {
    filteredProducts,
    priceRange,
    setPriceRange,
    ratingRange,
    setRatingRange,
    minPrice,
    maxPrice,
    minRating,
    maxRating,
  } = useProductFilter(allProducts);

  const fetchProducts = async () => {
    try {
      const response = await GetSpecificProduct({ id: collectionId });
      console.log("Fetched products:", response);
      
      setAllProducts(response);
      setLoading(false); 

     
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [collectionId]);

 


  return (
    <CustomBox>
      <Heading text={collectionTitle} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={3} sx={{ mt: 3.5 }}>
          <FilterSidebar
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            ratingRange={ratingRange}
            setRatingRange={setRatingRange}
            minPrice={minPrice}
            maxPrice={maxPrice}
            minRating={minRating}
            maxRating={maxRating}
          />
        </Grid>
        <Grid item xs={12} md={9} sx={{ mt: 3.5 }} data-aos="fade-left">
          {loading ? (
            <Grid container spacing={2}>
              {Array.from({ length: 6 }).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <CustomSkeleton type="card" width="96px" height="96px" />
                </Grid>
              ))}
            </Grid>
          ) : filteredProducts.length === 0 ? (
            <CustomTypography variant="h6" align="center">
              No products found
            </CustomTypography>
          ) : (
            <Grid container spacing={2}>
              {filteredProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                  <ProductCard
                    className="h-40 w-full object-cover"
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
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </CustomBox>
  );
};

export default Page;
