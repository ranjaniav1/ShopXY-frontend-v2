"use client";

import React, { useState } from "react"; // useState is needed for the search input
import { useTranslation } from "react-i18next";
// Import icons if you use them for search or filters, e.g., from lucide-react
import { Search, ChevronDown, SlidersHorizontal } from "lucide-react"; // Importing icons for search and "More Filters"

// Assuming these are custom components you have.
// I'll provide simplified mockups for them if you don't have them handy,
// but for a real app, ensure your actual components are used.
// import CustomTypography from "@/app/Custom/CustomTypography";
// import Heading from "@/app/Common/Heading";
// import CustomMenu from "../Custom/CustomMenu";

// --- MOCK CUSTOM COMPONENTS (Replace with your actual components) ---
const CustomTypography = ({ children, className }) => <p className={className}>{children}</p>;
const Heading = ({ text, className }) => <h2 className={className}>{text}</h2>;

// Simplified CustomMenu for the compact bar.
// In a real app, this would be a proper dropdown/select component.
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
  // These props are less relevant for the *compact bar* UI but kept for completeness
  // if this component is also responsible for the full sidebar.
  // priceRange, setPriceRange,
  // ratingRange, setRatingRange,
  // minPrice, maxPrice, minRating, maxRating,
  // selectedCollection, setSelectedCollection,
  // selectedBrand, setSelectedBrand,
  // collections, brands,
  // onClearFilters,

  // Props relevant to the compact filter bar
  sort, setSort,
  categories,
  selectedCategory, setSelectedCategory,
  inStock, setInStock,
  onlyDiscounted, setOnlyDiscounted,
  onSearch, // New prop for search functionality
  searchQuery, setSearchQuery, // New props for search input state
  onShowMoreFilters, // New prop for the "More Filters" button action (e.g., open a modal)
}) => {
  const { t } = useTranslation();

  // State for the search input
  // const [internalSearchQuery, setInternalSearchQuery] = useState(""); // If not controlled by parent
  // Assuming searchQuery and setSearchQuery are passed as props

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
        onClick={onShowMoreFilters}
        className="flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors duration-200"
      >
        <SlidersHorizontal size={16} /> {/* Or ChevronDown if you prefer a dropdown icon */}
        {t("More Filters")}
      </button>
    </div>
  );
};

export default FilterBar;