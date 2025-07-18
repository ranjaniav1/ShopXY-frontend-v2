"use client";

import React from "react";
import CustomTypography from "@/app/Custom/CustomTypography";
import Heading from "@/app/Common/Heading";
import CustomMenu from "../Custom/CustomMenu";

const FilterSidebar = ({
  isCompact = false,
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
    <div className={`bg-body ${isCompact ? 'flex flex-wrap gap-4 items-center' : 'border border-gray-200 rounded-md p-4 shadow-sm sticky top-24 w-full max-w-[300px] text-tsecondary'}`}>
      {!isCompact && (
        <Heading text="Filters" className="text-lg mb-3 text-primary" />
      )}

      {/* Sort */}
      <CustomMenu
        label={isCompact ? undefined : "Sort By"}
        className={isCompact ? "min-w-[130px]" : "w-full mb-3"}
        value={sort}
        onChange={setSort}
        placeholder="Sort"
        options={[
          { value: "priceLowHigh", label: "Price: Low to High" },
          { value: "priceHighLow", label: "Price: High to Low" },
          { value: "ratingHighLow", label: "Rating: High to Low" },
        ]}
      />

      {/* Category */}
      <CustomMenu
        label={isCompact ? undefined : "Category"}
        className={isCompact ? "min-w-[130px]" : "w-full mb-3"}
        value={selectedCategory}
        onChange={setSelectedCategory}
        placeholder="All"
        options={categories}
      />

      {/* Collection */}
      <CustomMenu
        label={isCompact ? undefined : "Collection"}
        className={isCompact ? "min-w-[130px]" : "w-full mb-3"}
        value={selectedCollection}
        onChange={setSelectedCollection}
        placeholder="All"
        options={collections}
      />

      {/* Brand */}
      <CustomMenu
        label={isCompact ? undefined : "Brand"}
        className={isCompact ? "min-w-[130px]" : "w-full mb-3"}
        value={selectedBrand}
        onChange={setSelectedBrand}
        placeholder="All"
        options={brands}
      />

      {/* Price Range */}
      <div className={isCompact ? "min-w-[180px]" : "w-full mb-4"}>
        <CustomTypography fontWeight={600} fontSize="1rem" className="mb-1 text-primary">
          Price Range (₹{priceRange[0]})
        </CustomTypography>
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={priceRange[0]}
          onChange={(e) => setPriceRange([parseInt(e.target.value)])}
          className="w-full h-2 bg-secondary rounded-md appearance-none cursor-pointer"
        />
        {!isCompact && (
          <div className="flex justify-between text-sm text-tsecondary mt-1">
            <span>₹{minPrice}</span>
            <span>₹{priceRange[0]}</span>
            <span>₹{maxPrice}</span>
          </div>
        )}
      </div>

      {/* Rating */}
      <div className={isCompact ? "min-w-[180px]" : "w-full mb-6"}>
        <CustomTypography fontWeight={600} fontSize="1rem" className="mb-2 text-primary">
          Min Rating ({ratingRange[0]} stars)
        </CustomTypography>
        <input
          type="range"
          min={minRating}
          max={maxRating}
          step={0.5}
          value={ratingRange[0]}
          onChange={(e) => setRatingRange([parseFloat(e.target.value), 5])}
          className="w-full h-2 bg-secondary rounded-md appearance-none cursor-pointer"
        />
      </div>

      {/* Stock & Discount */}
      <div className={`space-y-2 ${isCompact ? "" : "mb-4"}`}>
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

      {/* Clear All */}
      {!isCompact && (
        <button
          onClick={onClearFilters}
          className="mt-4 w-full text-center text-red-600 text-sm underline hover:text-red-800"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
};

export default FilterSidebar;
