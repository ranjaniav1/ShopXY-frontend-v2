"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import Heading from "../Common/Heading";
import { GetFilteredProduct } from "../Service/GetProduct";
import CustomSkeleton from "../Custom/CustomSkeleton";
import CustomBox from "../Custom/CustomBox";
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
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
        </div>

        {/* Products Section */}
        <div className="md:col-span-3">
          {isFilterLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <CustomSkeleton
                  key={index}
                  type="card"
                  width="96px"
                  height="96px"
                />
              ))}
            </div>
          ) : products.length === 0 ? (
            <p className="text-center text-gray-700 dark:text-gray-300 text-lg font-medium mt-6">
              {t("No products found")}
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
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
              ))}
            </div>
          )}
        </div>
      </div>
    </CustomBox>
  );
};

export default HomeProduct;
