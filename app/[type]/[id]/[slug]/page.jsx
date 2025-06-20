'use client';
import React, { useEffect, useState, useCallback } from "react";
import { useParams, usePathname } from "next/navigation";
import CustomSkeleton from "@/app/Custom/CustomSkeleton";
import Heading from "@/app/Common/Heading";
import CustomTypography from "@/app/Custom/CustomTypography";
import FilterSidebar from "@/app/Components/FilterSidebar";
import ProductCard from "@/app/Components/ProductCard";
import { useUser } from "@/app/context/UserContext";
import { getWishlist } from "@/app/Service/Profile";
import { GetFilteredProduct } from "@/app/Service/GetProduct";
import { GetBrands } from "@/app/Service/GetBrands";
import { GetCategories } from "@/app/Service/GetCategory";

const FilteredProductPage = () => {
  const { id, slug } = useParams();
  const pathname = usePathname();
  const segments = pathname?.split("/").filter(Boolean);
  const type = segments?.[0];

  const { user } = useUser();
  const userId = user?._id;

  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isFilterLoading, setIsFilterLoading] = useState(false);

  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [ratingRange, setRatingRange] = useState([0, 5]);
  const [inStock, setInStock] = useState(false);
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);
  const [sort, setSort] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchMetaData = async () => {
    try {
      const [categoryData, brandData] = await Promise.all([
        GetCategories(),
        GetBrands(),
      ]);
      setCategories(categoryData?.categories || []);
      setBrands(brandData?.brands || []);
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
    }
  };

  const isInWishlist = (id) => wishlist.includes(id);

  const fetchFilteredProducts = useCallback(async () => {
    if (!id || !type) return;

    setIsFilterLoading(true);
    try {
      const data = await GetFilteredProduct({
        type,
        id,
        brand: selectedBrand || undefined,
        category: selectedCategory || undefined,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        rating: ratingRange[0],
        inStock: inStock || undefined,
        specialOffer: onlyDiscounted || undefined,
        sort,
      });
      setProducts(data?.products || []);
    } catch (err) {
      console.error("❌ Failed to fetch filtered products", err);
    } finally {
      setIsFilterLoading(false);
    }
  }, [type, id, selectedBrand, selectedCategory, priceRange, ratingRange, inStock, onlyDiscounted, sort]);

  useEffect(() => {
    fetchMetaData();
    if (userId) fetchWishlist();
  }, [userId]);

  useEffect(() => {
    fetchFilteredProducts();
  }, [fetchFilteredProducts]);

  return (
    <div className="my-6 mx-4 md:mx-8">
      <Heading text={slug} />

      <div className="flex flex-col md:flex-row gap-4 mt-6">
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
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
            selectedCategory={type === "category" ? id : selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedBrand={type === "brand" ? id : selectedBrand}
            setSelectedBrand={setSelectedBrand}
            categories={categories}
            brands={brands}
          />
        </div>

        {/* Product Grid */}
        <div className="w-full md:w-3/4">
          {isFilterLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <CustomSkeleton key={index} type="card" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <CustomTypography variant="h6" align="center">
              No products found
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
    </div>
  );
};

export default FilteredProductPage;
