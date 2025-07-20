"use client";

import React, { useState } from "react"; // useState is needed for the search input
import { useTranslation } from "react-i18next";
// Import icons if you use them for search or filters, e.g., from lucide-react
import { Search, ChevronDown, SlidersHorizontal } from "lucide-react"; // Importing i
const CustomTypography = ({ children, className }) => <p className={className}>{children}</p>;


const CustomMenu = ({ value, onChange, placeholder, options, className }) => (
  <div className={`relative ${className}`}>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
      <ChevronDown size={16} />
    </div>
  </div>
);

// --- END MOCK CUSTOM COMPONENTS ---

const FilterBar = ({ // Renamed from FilterSidebar for clarity when used as a bar
  sort, setSort,
  categories, collections, brands,
  selectedCategory, setSelectedCategory,
  selectedCollection, setSelectedCollection,
  selectedBrand, setSelectedBrand,
  inStock, setInStock,
  onlyDiscounted, setOnlyDiscounted,
  searchQuery, setSearchQuery,
  onSearch,
}) => {
  const { t } = useTranslation()
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const sortOptions = [
    { value: "priceLowHigh", label: t("Price: Low to High") },
    { value: "priceHighLow", label: t("Price: High to Low") },
    { value: "ratingHighLow", label: t("Rating: High to Low") },
  ];

  // Map categories to CustomMenu options format
  const categoryOptions = categories?.map(cat => ({
    value: cat.slug,
    label: cat.title
  })) || [];
  const collectionOptions = collections?.map(col => ({
    value: col.slug,
    label: col.title
  })) || [];

  const brandOptions = brands?.map(brand => ({
    value: brand.slug,
    label: brand.title
  })) || [];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-wrap items-center gap-4 justify-between">
      {/* Search Input */}
      <div className="relative flex-grow max-w-sm"> {/* max-w-sm for the search input width */}
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder={t("Search products...")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          // If you need to trigger search on enter or button click
          onKeyDown={(e) => { if (e.key === 'Enter' && onSearch) onSearch(searchQuery); }}
          className="w-full pl-10 pr-4 py-2.5 rounded-md bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-500"
        />
      </div>

      {/* Sort Dropdown */}
      <CustomMenu
        value={sort}
        onChange={setSort}
        placeholder={t("Sort: Price Low to High")} // Default placeholder as seen in image
        options={sortOptions}
        className="min-w-[180px]" // Adjust width to match image
      />

      {/* All Categories Dropdown */}
      <CustomMenu
        value={selectedCategory}
        onChange={setSelectedCategory}
        placeholder={t("All Categories")}
        options={[{ value: "", label: t("All Categories") }, ...categoryOptions]} // Add 'All Categories' as an option
        className="min-w-[150px]"
      />

      {/* In Stock Only Button */}
      <button
        onClick={() => setInStock(!inStock)}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
          ${inStock ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
        `}
      >
        {t("In Stock Only")}
      </button>

      {/* Discounted Button */}
      <button
        onClick={() => setOnlyDiscounted(!onlyDiscounted)}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200
          ${onlyDiscounted ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
        `}
      >
        {t("Discounted")}
      </button>

      {/* More Filters Button */}
      <button
        onClick={() => setShowMoreFilters(prev => !prev)}
        className="flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium text-blue-600 hover:bg-blue-50"
      >
        <SlidersHorizontal size={16} />
        {t("More Filters")}
      </button>
      {/* More Filters Section */}
      {showMoreFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2 border-t mt-2">
          <CustomMenu
            value={selectedCollection}
            onChange={setSelectedCollection}
            placeholder={t("Select Collection")}
            options={[{ value: "", label: t("All Collections") }, ...collectionOptions]}
          />

          <CustomMenu
            value={selectedBrand}
            onChange={setSelectedBrand}
            placeholder={t("Select Brand")}
            options={[{ value: "", label: t("All Brands") }, ...brandOptions]}
          />
        </div>
      )}
    </div>
  );
};

export default FilterBar;