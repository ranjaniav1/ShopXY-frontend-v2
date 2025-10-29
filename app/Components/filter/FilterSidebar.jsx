"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Search, SlidersHorizontal } from "lucide-react";
import CustomMenu from "../../Custom/CustomMenu";
import CustomButton from "../../Custom/CustomButton";
import NavSearchBar from "../navigation/NavSearchBar.jsx";




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
    <div className="bg-body  rounded-xl p-4 shadow-sm flex flex-wrap items-center gap-4 justify-between">
      {/*  Custom Search Input */}
      <div className="flex-grow max-w-sm">
        <NavSearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={onSearch}
        />

      </div>

      {/* Sort Dropdown */}
      <CustomMenu
        value={sort}
        onChange={setSort}
        placeholder={t("Sort: Price Low to High")}
        options={sortOptions}
        className="min-w-[180px]"
      />

      {/* All Categories Dropdown */}
      <CustomMenu
        value={selectedCategory}
        onChange={setSelectedCategory}
        placeholder={t("All Categories")}
        options={[{ value: "", label: t("All Categories") }, ...categoryOptions]}
        className="min-w-[150px]"
      />

      {/*  In Stock Button */}
      <CustomButton
        title={t("In Stock Only")}
        onClick={() => setInStock(!inStock)}
        variant={inStock ? "contained" : "secondary"}
        size="small"
      />

      {/*  Discounted Button */}
      <CustomButton
        title={t("Discounted")}
        onClick={() => setOnlyDiscounted(!onlyDiscounted)}
        variant={onlyDiscounted ? "contained" : "secondary"}
        size="small"
      />

      {/*  More Filters Button */}
      <CustomButton
        title={t("More Filters")}
        startIcon={<SlidersHorizontal size={16} />}
        onClick={() => setShowMoreFilters((prev) => !prev)}
        variant="text"
        className="text-blue-600 hover:bg-blue-50"
      />


      {/* More Filters Section */}
      {showMoreFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2 mt-2">
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