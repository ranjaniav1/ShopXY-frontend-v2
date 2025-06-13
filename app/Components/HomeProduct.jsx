import React, { useEffect, useState, useCallback } from "react";
import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";


import Heading from "../Common/Heading";
import { GetAllProducts } from "../Service/GetProduct";
import CustomSkeleton from "../Custom/CustomSkeleton";
import CustomBox from "../Custom/CustomBox";
import CustomTypography from "../Custom/CustomTypography";
import FilterSidebar from "./FilterSidebar";
import ProductCard from "./ProductCard";
import { useProductFilter } from "../helper/useProductFilter";
import { getWishlist } from "../Service/Profile";
import { useUser } from "../context/UserContext";

const HomeProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [wishlist, setWishlist] = useState([]);

  const { t } = useTranslation();

 const { user } = useUser(); // 👈 Get user from context
    const userId = user?._id;
  console.log("userid", userId)

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
  } = useProductFilter(products);

  const fetchProducts = async (page) => {
    setLoading(true);
    try {
      const result = await GetAllProducts(page, 10);
      const newProducts = result.products;

      if (page === 1) {
        setProducts(newProducts);
      } else {
        setProducts((prev) => {
          const existingIds = new Set(prev.map((p) => p._id));
          const uniqueNew = newProducts.filter((p) => !existingIds.has(p._id));
          return [...prev, ...uniqueNew];
        });
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchWishlist = async () => {
    if (!userId) return;
    try {
      const response = await getWishlist(userId);
      console.log("wish res", response)
      const wishlistIds = response?.products?.map(item => item.product._id) || [];
      console.log("wish resndjs", wishlistIds)

      setWishlist(wishlistIds);
    } catch (err) {
      console.error("Failed to fetch wishlist", err);
      setWishlist([]); // fallback to empty array
    }
  };


  useEffect(() => {
    if (userId) fetchWishlist();
  }, [userId]);

  const isInWishlist = (id) => wishlist.includes(id);


  const handleScroll = useCallback(() => {
    const bottom =
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 10;
    if (bottom && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading]);

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);



  return (
    <CustomBox>
      <Heading text={t("Products For You")} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={3} sx={{ mt: 3.5 }} data-aos="fade-right">
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
          {loading && page === 1 ? (
            <Grid container spacing={2}>
              {Array.from({ length: 6 }).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <CustomSkeleton type="card" width="96px" height="96px" />
                </Grid>
              ))}
            </Grid>
          ) : filteredProducts.length === 0 ? (
            <CustomTypography variant="h6" align="center">
              {t("No products found")}
            </CustomTypography>
          ) : (
            <Grid container spacing={2}>
              {filteredProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                  <ProductCard
                    className="h-40 w-full"
                    imgSrc={product.detail_image[0]}
                    title={product.name}
                    price={product.actual_price}
                    discountPrice={product.discounted_price}
                    rating={product.ratings}
                    description={product.description}
                    offer={product.offer}
                    userId={userId}
                    productId={product._id}
                    slug={product.slug}
                    isInWishlist={isInWishlist(product._id)}
                    inStock={product.inStock > 0}
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

export default HomeProduct;
