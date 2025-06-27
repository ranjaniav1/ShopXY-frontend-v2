"use client";

import React from "react";
import CustomTypography from "@/app/Custom/CustomTypography";
import Heading from "@/app/Common/Heading";

const FilterSidebar = ({
  priceRange,
  setPriceRange,
  ratingRange,
  setRatingRange,
  minPrice,
  maxPrice,
  minRating,
  maxRating,
  inStock,
  setInStock,
  onlyDiscounted,
  setOnlyDiscounted,
  selectedCategory,
  setSelectedCategory,
  selectedCollection,
  setSelectedCollection,
  selectedBrand,
  setSelectedBrand,
  categories,
  collections,
  brands,
}) => {
  const validPrice = Array.isArray(priceRange) && priceRange.length === 2 ? priceRange : [minPrice, maxPrice];
  const validRating = Array.isArray(ratingRange) && ratingRange.length === 2 ? ratingRange : [minRating, maxRating];

  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-sm sticky top-24 text-tsecondary bg-white w-full max-w-[300px]">
      <Heading text="Filters" className="text-lg mb-3 text-primary" />

      {/* Category Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-tprimary">Category</label>
        <select
          className="w-full border border-gray-300 rounded-md p-2 text-sm"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.slug}>
              {cat.title}
            </option>
          ))}
        </select>
      </div>

      {/* Collection Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-tprimary">Collection</label>
        <select
          className="w-full border border-gray-300 rounded-md p-2 text-sm"
          value={selectedCollection}
          onChange={(e) => setSelectedCollection(e.target.value)}
        >
          <option value="">All</option>
          {collections.map((col) => (
            <option key={col._id} value={col.slug}>
              {col.title}
            </option>
          ))}
        </select>
      </div>

      {/* Brand Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-tprimary">Brand</label>
        <select
          className="w-full border border-gray-300 rounded-md p-2 text-sm"
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          <option value="">All</option>
          {brands.map((brand) => (
            <option key={brand._id} value={brand.slug}>
              {brand.title}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <CustomTypography fontWeight={600} fontSize="1rem" className="mb-1 text-primary">
          Price Range
        </CustomTypography>
        {/* Replace this with your custom slider component */}
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={validPrice[1]}
          onChange={(e) => setPriceRange([minPrice, Number(e.target.value)])}
          className="w-full"
        />
        <p className="text-sm text-primary mt-1">₹{validPrice[0]} - ₹{validPrice[1]}</p>
      </div>

      {/* Rating Range */}
      <div className="mb-4">
        <CustomTypography fontWeight={600} fontSize="1rem" className="mb-1 text-primary">
          Rating
        </CustomTypography>
        {/* Replace with your custom rating slider */}
        <input
          type="range"
          min={minRating}
          max={maxRating}
          step={0.1}
          value={validRating[1]}
          onChange={(e) => setRatingRange([minRating, parseFloat(e.target.value)])}
          className="w-full"
        />
        <p className="text-sm text-primary mt-1">{validRating[0]} - {validRating[1]} stars</p>
      </div>

      {/* Divider */}
      <hr className="my-4" />

      {/* Extra Filters */}
      <div className="space-y-2">
        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
            className="form-checkbox rounded border-gray-300 text-primary"
          />
          <span className="text-sm">Only In Stock</span>
        </label>

        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={onlyDiscounted}
            onChange={(e) => setOnlyDiscounted(e.target.checked)}
            className="form-checkbox rounded border-gray-300 text-primary"
          />
          <span className="text-sm">Only Discounted</span>
        </label>
      </div>
    </div>
  );
};

export default FilterSidebar;
