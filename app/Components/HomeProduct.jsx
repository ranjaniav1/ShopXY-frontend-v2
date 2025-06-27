"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import Heading from "../Common/Heading";
import { GetFilteredProduct, GetAllProducts } from "../Service/GetProduct";
import CustomSkeleton from "../Custom/CustomSkeleton";
import CustomBox from "../Custom/CustomBox";
import CustomTypography from "../Custom/CustomTypography";
import FilterSidebar from "./FilterSidebar";
import ProductCard from "./ProductCard";
import { getWishlist } from "../Service/Profile";
import { useUser } from "../context/UserContext";
import { GetCategories } from "../Service/GetCategory";
import { GetCollectionsByCategory } from "../Service/GetCollection";
import { GetBrandsByCollection } from "../Service/GetBrands";

const HomeProduct = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [ratingRange, setRatingRange] = useState([0, 5]);
  const [inStock, setInStock] = useState(false);
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);
  const [sort, setSort] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [brands, setBrands] = useState([]);

  const { t } = useTranslation();
  const { user } = useUser();
  const userId = user?._id;

  const fetchMetaData = async () => {
    try {
      const categoryData = await GetCategories();
      setCategories(Array.isArray(categoryData) ? categoryData : categoryData?.categories || []);
    } catch (err) {
      console.error("Failed to fetch metadata", err);
    }
  };

  const fetchCollections = async (categorySlug) => {
    if (!categorySlug) return setCollections([]);

    const category = categories.find((cat) => cat.slug === categorySlug);
    const categoryId = category?._id;

    if (!categoryId) return setCollections([]);

    try {
      const res = await GetCollectionsByCategory({ categoryId });
      setCollections(res?.collections || []);
    } catch (err) {
      console.error("Failed to fetch collections", err);
    }
  };

  const fetchBrands = async (collectionSlug) => {
    if (!collectionSlug) return setBrands([]);

    const collection = collections.find((col) => col.slug === collectionSlug);
    const collectionId = collection?._id;

    if (!collectionId) return setBrands([]);

    try {
      const res = await GetBrandsByCollection({ brand_id: collectionId });
      setBrands(res?.brands || []);
    } catch (err) {
      console.error("Failed to fetch brands", err);
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

  const checkIfFiltersApplied = () => (
    selectedCategory ||
    selectedCollection ||
    selectedBrand ||
    priceRange[0] !== 0 ||
    priceRange[1] !== 1000 ||
    ratingRange[0] !== 0 ||
    ratingRange[1] !== 5 ||
    inStock ||
    onlyDiscounted ||
    sort
  );

  const handleFilterChange = useCallback(async () => {
    const filtersUsed = checkIfFiltersApplied();
    setIsFilterApplied(filtersUsed);
    setIsFilterLoading(true);

    try {
      if (filtersUsed) {
        const res = await GetFilteredProduct({
          type: "product",
          category: selectedCategory || undefined,
          collection: selectedCollection || undefined,
          brand: selectedBrand || undefined,
          minPrice: priceRange[0],
          maxPrice: priceRange[1],
          rating: ratingRange[0],
          inStock: inStock ? true : undefined,
          specialOffer: onlyDiscounted ? true : undefined,
          sort,
        });
        setProducts(res?.filters || []);
      } else {
        const res = await GetAllProducts();
        setProducts(res?.products || []);
      }
    } catch (error) {
      console.error("Product fetch failed", error);
    } finally {
      setIsFilterLoading(false);
    }
  }, [
    selectedCategory,
    selectedCollection,
    selectedBrand,
    priceRange,
    ratingRange,
    inStock,
    onlyDiscounted,
    sort,
  ]);

  useEffect(() => {
    fetchMetaData();
    if (userId) fetchWishlist();
  }, [userId]);

  useEffect(() => {
    handleFilterChange();
  }, [handleFilterChange]);

  useEffect(() => {
    setSelectedCollection("");
    setSelectedBrand("");
    fetchCollections(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    setSelectedBrand("");
    fetchBrands(selectedCollection);
  }, [selectedCollection]);

  return (
    <CustomBox>
      <Heading text={t("Products For You")} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        {/* Filter Sidebar */}
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
            selectedCollection={selectedCollection}
            setSelectedCollection={setSelectedCollection}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            categories={categories}
            collections={collections}
            brands={brands}
          />
        </div>

        {/* Product List Section */}
        <div className="md:col-span-3">
          {/* Sorting Dropdown */}
          <div className="mb-4">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 w-full md:w-auto"
            >
              <option value="">Sort By</option>
              <option value="priceLowHigh">Price: Low to High</option>
              <option value="priceHighLow">Price: High to Low</option>
              <option value="ratingHighLow">Rating: High to Low</option>
            </select>
          </div>

          {/* Product Grid */}
          {isFilterLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <CustomSkeleton key={index} type="card" width="100%" height="96px" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <CustomTypography variant="h6" align="center">
              {t("No products found")}
            </CustomTypography>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
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
