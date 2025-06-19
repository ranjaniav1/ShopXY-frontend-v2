// HomeProduct.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import Heading from "../Common/Heading";
import { GetFilteredProduct } from "../Service/GetProduct";
import CustomSkeleton from "../Custom/CustomSkeleton";
import CustomBox from "../Custom/CustomBox";
import CustomTypography from "../Custom/CustomTypography";
import FilterSidebar from "./FilterSidebar";
import ProductCard from "./ProductCard";
import { getWishlist } from "../Service/Profile";
import { useUser } from "../context/UserContext";
import { GetBrands } from "../Service/GetBrands";
import { GetCategories } from "../Service/GetCategory";

const HomeProduct = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFilterLoading, setIsFilterLoading] = useState(false);

  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [ratingRange, setRatingRange] = useState([0, 5]);
  const [inStock, setInStock] = useState(false);
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const limit = 12;

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const { t } = useTranslation();
  const { user } = useUser();
  const userId = user?._id;

  const fetchMetaData = async () => {
    try {
      const [categoryData, brandData] = await Promise.all([
        GetCategories(),
        GetBrands()
      ]);
      setCategories(Array.isArray(categoryData) ? categoryData : categoryData?.categories || []);
      setBrands(Array.isArray(brandData) ? brandData : brandData?.brands || []);
    } catch (err) {
      console.error("Failed to fetch metadata", err);
    }
  };

  const fetchWishlist = async () => {
    if (!userId) return;
    try {
      const response = await getWishlist(userId);
      const wishlistIds = response?.products?.map((item) => item.product._id) || [];
      setWishlist(wishlistIds);
    } catch (err) {
      console.error("Failed to fetch wishlist", err);
      setWishlist([]);
    }
  };

  const isInWishlist = (id) => wishlist.includes(id);

  const handleFilterChange = useCallback(async () => {
    setIsFilterLoading(true);
    try {
      const res = await GetFilteredProduct({
        category: selectedCategory || undefined,
        brand: selectedBrand || undefined,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        rating: ratingRange[0],
        inStock: inStock ? true : undefined,
        specialOffer: onlyDiscounted ? true : undefined,
        sort: sort,
        page: page,
        limit: limit,
      });
      setProducts(res.products || []);
    } catch (error) {
      console.error("Filter fetch failed", error);
    } finally {
      setIsFilterLoading(false);
    }
  }, [selectedCategory, selectedBrand, priceRange, ratingRange, inStock, onlyDiscounted, sort, page]);

  useEffect(() => {
    fetchMetaData();
    if (userId) fetchWishlist();
  }, [userId]);

  useEffect(() => {
    handleFilterChange();
  }, [handleFilterChange]);

  return (
    <CustomBox>
      <Heading text={t("Products For You")} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={3} sx={{ mt: 3.5 }}>
          <FilterSidebar
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            ratingRange={ratingRange}
            setRatingRange={setRatingRange}
            minPrice={0}
            maxPrice={1000}
            minRating={0}
            maxRating={5}
            inStock={inStock}
            setInStock={setInStock}
            onlyDiscounted={onlyDiscounted}
            setOnlyDiscounted={setOnlyDiscounted}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            categories={categories}
            brands={brands}
          />
        </Grid>

        <Grid item xs={12} md={9} sx={{ mt: 3.5 }}>
          {isFilterLoading ? (
            <Grid container spacing={2}>
              {Array.from({ length: 6 }).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <CustomSkeleton type="card" width="96px" height="96px" />
                </Grid>
              ))}
            </Grid>
          ) : products.length === 0 ? (
            <CustomTypography variant="h6" align="center">
              {t("No products found")}
            </CustomTypography>
          ) : (
            <Grid container spacing={2}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                  <ProductCard
                    imgSrc={product.detail_image[0]}
                    title={product.name}
                    price={product.actual_price}
                    discountPrice={product.discounted_price}
                    rating={product.ratings}
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
