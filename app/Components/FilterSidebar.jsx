"use client";

import React from "react";
import CustomTypography from "@/app/Custom/CustomTypography";
import Heading from "@/app/Common/Heading";

const FilterSidebar = ({
  priceRange, setPriceRange,
  ratingRange, setRatingRange,
  minPrice, maxPrice, minRating, maxRating,
  inStock, setInStock,
  onlyDiscounted, setOnlyDiscounted,
  selectedCategory, setSelectedCategory,
  selectedCollection, setSelectedCollection,
  selectedBrand, setSelectedBrand,
  sort, setSort,
  categories, collections, brands,
  onClearFilters,
}) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-sm sticky top-24 text-tsecondary bg-white w-full max-w-[300px]">
      <Heading text="Filters" className="text-lg mb-3 text-primary" />

      {/* Sort By */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-tprimary">Sort By</label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 text-sm"
        >
          <option value="">Default</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
          <option value="ratingHighLow">Rating: High to Low</option>
        </select>
      </div>

      {/* Category Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-tprimary">Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 text-sm"
        >
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.slug}>{cat.title}</option>
          ))}
        </select>
      </div>

      {/* Collection Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-tprimary">Collection</label>
        <select
          value={selectedCollection}
          onChange={(e) => setSelectedCollection(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 text-sm"
        >
          <option value="">All</option>
          {collections.map((col) => (
            <option key={col._id} value={col.slug}>{col.title}</option>
          ))}
        </select>
      </div>

      {/* Brand Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-tprimary">Brand</label>
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 text-sm"
        >
          <option value="">All</option>
          {brands.map((brand) => (
            <option key={brand._id} value={brand.slug}>{brand.title}</option>
          ))}
        </select>
      </div>

      {/* Price Range - SLIDER */}

      <div className="mb-4">
        <CustomTypography fontWeight={600} fontSize="1rem" className="mb-1 text-primary">
          Price Range (₹{priceRange[0]})
        </CustomTypography>
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={priceRange[0]}
          onChange={(e) => setPriceRange([parseInt(e.target.value)])}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm text-gray-600 mt-1">
          <span>₹{minPrice}</span>
          <span>₹{priceRange[0]}</span>
          <span>₹{maxPrice}</span>
        </div>
      </div>



      {/* Rating Range - SLIDER */}
      <div className="mb-6">
        <CustomTypography fontWeight={600} fontSize="1rem" className="mb-2 text-primary">
          Minimum Rating ({ratingRange[0]} stars)
        </CustomTypography>
        <input
          type="range"
          min={minRating}
          max={maxRating}
          step={0.5}
          value={ratingRange[0]}
          onChange={(e) => setRatingRange([parseFloat(e.target.value), 5])}
          className="w-full accent-yellow-500"
        />
      </div>

      {/* Stock & Discount Filters */}
      <div className="space-y-2 mb-4">
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

      {/* Clear Filters */}
      <button
        onClick={onClearFilters}
        className="mt-4 w-full text-center text-red-600 text-sm underline hover:text-red-800"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
