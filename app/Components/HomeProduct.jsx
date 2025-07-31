"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import Heading from "../Common/Heading";
import { GetFilteredProduct, GetAllProducts } from "../Service/GetProduct";
import CustomSkeleton from "../Custom/CustomSkeleton";
import CustomTypography from "../Custom/CustomTypography";
import FilterSidebar from "./FilterSidebar"; // This is ONLY for the full modal/drawer on mobile
import ProductCard from "./ProductCard";
import { useUser } from "../context/UserContext";
import { GetCategories } from "../Service/GetCategory";
import { GetBrandsByCollection } from "../Service/GetBrands";
import { GetCollectionsByCategory } from "../Service/GetCollection";
import { getWishlist } from "../Service/Profile"; // Re-added this import

import { X } from "lucide-react"; // For the close button in the mobile filter modal

const HomeProduct = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [searchQuery, setSearchQuery] = useState(""); // New state for search input
  const [showMobileFilters, setShowMobileFilters] = useState(false); // State to control mobile filter modal

  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [ratingRange, setRatingRange] = useState([0, 5]);
  const [defaultPriceRange, setDefaultPriceRange] = useState([0, 1000]);

  const [inStock, setInStock] = useState(false);
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);
  const [sort, setSort] = useState("priceLowHigh"); // Set a default sort as seen in the UI
  const [isLoading, setIsLoading] = useState(false); // <- new to avoid multiple requests

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [brands, setBrands] = useState([]);

  const { t } = useTranslation();
  const { user } = useUser();
  const userId = user?._id;

  const debounceTimer = useRef(null);

  // --- Filter Bar Callbacks ---
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleShowMoreFilters = () => {
    setShowMobileFilters(true);
  };

  const handleCloseMobileFilters = () => {
    setShowMobileFilters(false);
    // When filters are closed, trigger a refetch to apply any changes made in the modal
    // This will be handled by the useEffect on `handleFilterChange` which monitors filter states.
  };
  // --- End Filter Bar Callbacks ---

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

  const checkIfFiltersApplied = useCallback(() =>
    selectedCategory || selectedCollection || selectedBrand ||
    priceRange[0] !== defaultPriceRange[0] || priceRange[1] !== defaultPriceRange[1] ||
    ratingRange[0] !== 0 || ratingRange[1] !== 5 ||
    inStock || onlyDiscounted || sort !== "priceLowHigh" ||
    searchQuery.trim() !== "",
    [
      selectedCategory, selectedCollection, selectedBrand,
      priceRange, defaultPriceRange, ratingRange,
      inStock, onlyDiscounted, sort, searchQuery
    ]);

  const handleFilterChange = useCallback(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(async () => {
      const filtersUsed = checkIfFiltersApplied();
      setIsFilterLoading(true);

      try {
        if (filtersUsed) {
          const res = await GetFilteredProduct({
            type: "product",
            search: searchQuery.trim() || undefined,
            category: selectedCategory || undefined,
            collection: selectedCollection || undefined,
            brand: selectedBrand || undefined,
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
            ...(ratingRange[0] > 0 && { rating: ratingRange[0] }),
            ...(inStock && { inStock: "true" }),
            ...(onlyDiscounted && { specialOffer: "true" }),
            ...(sort && { sort }),
          });

          const filteredProducts = (res?.filters || []).filter(
            (p) => !inStock || (p.stock_qty > 0 && p.inStock === true)
          );
          setProducts(filteredProducts);
          setHasMore(false); // Disable "Show More" if filtered

          if (res?.minPrice !== undefined && res?.maxPrice !== undefined) {
            const min = Math.floor(res.minPrice);
            const max = Math.ceil(res.maxPrice);
            setDefaultPriceRange([min, max]);
            setPriceRange((prev) =>
              prev[0] === 0 && prev[1] === 1000 ? [min, max] : prev
            );
          }
        } else {
          // On unfiltered initial load or reset
          const res = await GetAllProducts(1, 4);
          setProducts(res?.products || []);
          setPage(2); // Start from next page
          setHasMore((res?.products?.length || 0) === 4);
        }
      } catch (error) {
        console.error("Product fetch failed", error);
        setProducts([]);
      } finally {
        setIsFilterLoading(false);
      }
    }, 300);
  }, [
    selectedCategory, selectedCollection, selectedBrand,
    priceRange, ratingRange, inStock, onlyDiscounted, sort,
    searchQuery, checkIfFiltersApplied, defaultPriceRange, t
  ]);


  const onClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedCollection("");
    setSelectedBrand("");
    setPriceRange([defaultPriceRange[0], defaultPriceRange[1]]);
    setRatingRange([0, 5]);
    setInStock(false);
    setOnlyDiscounted(false);
    setSort("priceLowHigh");
    setPage(1);
    setHasMore(true);
  };

  useEffect(() => {
    setPage(1);
    setHasMore(true);
  }, [
    selectedCategory, selectedCollection, selectedBrand,
    priceRange[0], priceRange[1], ratingRange[0], ratingRange[1],
    inStock, onlyDiscounted, sort, searchQuery
  ]);

  useEffect(() => {
    fetchMetaData();
    if (userId) fetchWishlist();
  }, [userId]);

  useEffect(() => {
    handleFilterChange();
  }, [handleFilterChange]);
  // Handles pagination ONLY when no filters are applied
  useEffect(() => {
    const fetchMoreUnfilteredProducts = async () => {
      if (checkIfFiltersApplied() || page === 1) return;

      setIsLoading(true);
      try {
        const res = await GetAllProducts(page, 4);
        const newProducts = res?.products || [];
        if (newProducts.length === 0) {
          setHasMore(false);
          return;
        }
        setProducts((prev) => [...prev, ...newProducts]);

        setHasMore(newProducts.length === 4);
      } catch (error) {
        console.error("Pagination fetch failed", error);
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMoreUnfilteredProducts();
  }, [page, checkIfFiltersApplied]);

  useEffect(() => {
    setSelectedCollection("");
    setSelectedBrand("");
    fetchCollections(selectedCategory);
  }, [selectedCategory, categories]);

  useEffect(() => {
    setSelectedBrand("");
    fetchBrands(selectedCollection);
  }, [selectedCollection, collections]);



  const filterProps = {
    priceRange, setPriceRange,
    ratingRange, setRatingRange,
    minPrice: defaultPriceRange[0],
    maxPrice: defaultPriceRange[1],
    minRating: 0,
    maxRating: 5,
    inStock, setInStock,
    onlyDiscounted, setOnlyDiscounted,
    selectedCategory, setSelectedCategory,
    selectedCollection, setSelectedCollection,
    selectedBrand, setSelectedBrand,
    sort, setSort,
    categories, collections, brands,
    onClearFilters,
    searchQuery, setSearchQuery,
    onSearch: handleSearch,
    onShowMoreFilters: handleShowMoreFilters,


  };


  return (
    <div className="bg-secondary">
      <div className="py-12 max-w-screen-xl mx-auto px-4">
        <Heading title={t("Products For You")} subtitle={t("Discover amazing products at unbeatable prices")} />


        {/* Horizontal Filter Bar - Assuming FilterBar component exists and handles this layout */}
        <div className="mb-6">
          <FilterSidebar {...filterProps} /> {/* Using FilterBar here */}
        </div>

        <div className="mt-6">
          {isFilterLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => ( // Show more skeletons for initial loading
                <CustomSkeleton key={i} type="card" width="100%" height="280px" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <CustomTypography variant="h6" align="center" className="text-gray-600 text-center py-10">
              {t("No products found matching your criteria.")}
            </CustomTypography>
          ) : (
            <>

              {/* Product Grid: Displays all fetched products */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                {products.map((product, index) => { // Removed .slice(0,4)
                  return (
                    <div key={product._id}>
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
                        stockQty={product.stock_qty}
                        category={product.category}
                        inStock={product.stock_qty > 0 && product.inStock === true}
                        stock_qty={product.stock_qty}
                        


                      />
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Conditional loading skeletons for when more products are being fetched */}
          {isFilterLoading && hasMore && products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <CustomSkeleton key={`loading-${i}`} type="card" width="100%" height="280px" />
              ))}
            </div>
          )}

          {/* Load More Products Button (Infinite scroll fallback/alternative) */}
          {/* Show this button only if:
              - Not currently loading
              - There are more products available (hasMore is true)
              - No filters are applied (we want Load More for general Browse, not filtered results usually)
              - There are some products currently displayed (products.length > 0)
          */}
          {!isFilterLoading && hasMore && !checkIfFiltersApplied() && products.length > 0 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setPage((prev) => prev + 1)}
                className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? t("Loading...") : t("Show More")}
              </button>

            </div>
          )}

        </div>
      </div>

      {/* Mobile Filter Modal/Drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-end">
          <div className="bg-white w-full max-w-sm h-full overflow-y-auto shadow-lg relative">
            <button
              onClick={handleCloseMobileFilters}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 z-10"
              aria-label="Close filters"
            >
              <X size={24} />
            </button>
            <div className="p-4 pt-12">
              <Heading text={t("Filters")} className="text-lg mb-3 text-primary" />
              <FilterSidebar isCompact={false} {...filterProps} />
              <div className="mt-6 p-4 border-t border-gray-200">
                <button
                  onClick={handleCloseMobileFilters}
                  className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
                >
                  {t("Apply Filters")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeProduct;