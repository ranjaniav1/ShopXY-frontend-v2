'use client';

import React from 'react';
import CustomTypography from '@/app/Custom/CustomTypography';
import Heading from '@/app/Common/Heading';
import CustomButton from '@/app/Custom/CustomButton';

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
  selectedBrand,
  setSelectedBrand,
  categories,
  brands,
}) => {
  const validPrice = Array.isArray(priceRange) && priceRange.length === 2 ? priceRange : [minPrice, maxPrice];
  const validRating = Array.isArray(ratingRange) && ratingRange.length === 2 ? ratingRange : [minRating, maxRating];

  return (
    <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm sticky top-[100px] text-secondary">
      <Heading text="Filters" className="text-lg mb-4 text-primary" />

      {/* Category Filter */}
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium mb-1 text-primary">
          Category
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full border border-secondary rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-body"
        >
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.slug}>
              {cat.title}
            </option>
          ))}
        </select>
      </div>

      {/* Brand Filter */}
      <div className="mb-4">
        <label htmlFor="brand" className="block text-sm font-medium mb-1 text-primary">
          Brand
        </label>
        <select
          id="brand"
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="w-full border border-secondary rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-body"
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
      <div className="mb-6">
        <CustomTypography variant="body1" className="mb-2 text-primary font-semibold">
          Price Range
        </CustomTypography>
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          step="1"
          value={validPrice[0]}
          onChange={(e) => setPriceRange([+e.target.value, validPrice[1]])}
          className="w-full accent-primary"
        />
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          step="1"
          value={validPrice[1]}
          onChange={(e) => setPriceRange([validPrice[0], +e.target.value])}
          className="w-full accent-primary mt-2"
        />
        <CustomTypography variant="body2" className="mt-1 text-primary">
          ₹{validPrice[0]} - ₹{validPrice[1]}
        </CustomTypography>
      </div>

      {/* Rating Range */}
      <div className="mb-6">
        <CustomTypography variant="body1" className="mb-2 text-primary font-semibold">
          Rating
        </CustomTypography>
        <input
          type="range"
          min={minRating}
          max={maxRating}
          step="0.1"
          value={validRating[0]}
          onChange={(e) => setRatingRange([+e.target.value, validRating[1]])}
          className="w-full accent-primary"
        />
        <input
          type="range"
          min={minRating}
          max={maxRating}
          step="0.1"
          value={validRating[1]}
          onChange={(e) => setRatingRange([validRating[0], +e.target.value])}
          className="w-full accent-primary mt-2"
        />
        <CustomTypography variant="body2" className="mt-1 text-primary">
          {validRating[0]} - {validRating[1]} stars
        </CustomTypography>
      </div>

      {/* Extra Filters */}
      <div className="mt-4 space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
            className="accent-primary"
          />
          <span className="text-sm">Only In Stock</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={onlyDiscounted}
            onChange={(e) => setOnlyDiscounted(e.target.checked)}
            className="accent-primary"
          />
          <span className="text-sm">Only Discounted</span>
        </label>
      </div>
    </div>
  );
};

export default FilterSidebar;
