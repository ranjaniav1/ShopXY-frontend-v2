"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import Heading from "../Common/Heading";
import { GetFilteredProduct, GetAllProducts } from "../Service/GetProduct";
import CustomSkeleton from "../Custom/CustomSkeleton";
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
  const [infoMessage, setInfoMessage] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [ratingRange, setRatingRange] = useState([0, 5]);
  const [defaultPriceRange, setDefaultPriceRange] = useState([0, 1000]);

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

  const observer = useRef();
  const debounceTimer = useRef(null);

  const fetchMetaData = async () => {
    try {
      const categoryData = await GetCategories();
      setCategories(Array.isArray(categoryData) ? categoryData : categoryData?.categories || []);
    } catch (err) {
      console.error("Failed to fetch categories", err);
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
      const res = await GetBrandsByCollection({ collectionId });
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

  const checkIfFiltersApplied = () =>
    selectedCategory || selectedCollection || selectedBrand ||
    priceRange[0] !== 0 || priceRange[1] !== 1000 ||
    ratingRange[0] !== 0 || ratingRange[1] !== 5 ||
    inStock || onlyDiscounted || sort;

  const handleFilterChange = useCallback(() => {
  if (debounceTimer.current) clearTimeout(debounceTimer.current);

  debounceTimer.current = setTimeout(async () => {
    const filtersUsed = checkIfFiltersApplied();
    setIsFilterLoading(true);

    try {
      if (filtersUsed) {
        const res = await GetFilteredProduct({
          type: "product",
          category: selectedCategory || undefined,
          collection: selectedCollection || undefined,
          brand: selectedBrand || undefined,
          ...(priceRange.length === 1 && {
            minPrice: defaultPriceRange[0],
            maxPrice: priceRange[0],
          }),
          ...(ratingRange[0] > 0 && { rating: ratingRange[0] }),
          ...(inStock && { inStock: "true" }),
          ...(onlyDiscounted && { specialOffer: "true" }),
          ...(sort && { sort }),
        });

        const filteredProducts = res?.filters || [];
        setProducts(filteredProducts);
        setHasMore(false);
        setInfoMessage(`Filtered ${filteredProducts.length} products`);

        if (res?.minPrice !== undefined && res?.maxPrice !== undefined && page === 1) {
          const min = Math.floor(res.minPrice);
          const max = Math.ceil(res.maxPrice);
          setDefaultPriceRange([min, max]);

          // Reset slider only if user didn't touch it yet
          setPriceRange((prev) => (prev[0] === 1000 ? [max] : prev));
        }
      } else {
        const res = await GetAllProducts(page, 12);
        const newProducts = res?.products || [];
        setProducts((prev) => (page === 1 ? newProducts : [...prev, ...newProducts]));
        setHasMore(newProducts.length === 12);
        setInfoMessage(`Showing ${page * 12} products`);
      }
    } catch (error) {
      console.error("Product fetch failed", error);
      setInfoMessage("Failed to fetch products");
      setProducts([]);
    } finally {
      setIsFilterLoading(false);
    }
  }, 300);
}, [
  selectedCategory, selectedCollection, selectedBrand,
  priceRange, ratingRange, inStock, onlyDiscounted, sort, page
]);


 const onClearFilters = () => {
  setSelectedCategory("");
  setSelectedCollection("");
  setSelectedBrand("");
  setPriceRange([defaultPriceRange[1]]);
  setRatingRange([0, 5]);
  setInStock(false);
  setOnlyDiscounted(false);
  setSort("");
  setPage(1);
  setHasMore(true);
};


  useEffect(() => {
    setPage(1);
  }, [
    selectedCategory, selectedCollection, selectedBrand,
    priceRange, ratingRange, inStock, onlyDiscounted, sort
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

  const lastProductRef = useCallback((node) => {
    if (isFilterLoading || !hasMore || checkIfFiltersApplied()) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, [isFilterLoading, hasMore, selectedCategory, selectedCollection, selectedBrand]);

  return (
    <div>
      <Heading text={t("Products For You")} />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        <div className="md:col-span-1">
          <FilterSidebar
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            ratingRange={ratingRange}
            setRatingRange={setRatingRange}
            minPrice={defaultPriceRange[0]}
            maxPrice={defaultPriceRange[1]}
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
            sort={sort}
            setSort={setSort}
            categories={categories}
            collections={collections}
            brands={brands}
            onClearFilters={onClearFilters}
          />
        </div>

        <div className="md:col-span-3">
          {isFilterLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <CustomSkeleton key={i} type="card" width="100%" height="96px" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <CustomTypography variant="h6" align="center">
              {t("No products found")}
            </CustomTypography>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product, index) => {
                const isLast = index === products.length - 1;
                return (
                  <div ref={isLast ? lastProductRef : null} key={product._id}>
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
                      inStock={product.stock_qty > 0}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeProduct;
