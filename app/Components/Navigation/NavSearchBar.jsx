"use client";

import React from "react";
import { Search,X } from "lucide-react"; // Lucide Search icon
import CustomInput from "@/app/Custom/CustomInput";

const NavSearchBar = ({ searchQuery, setSearchQuery, onSearch }) => {
  return (
    <div className="relative flex-grow mx-4">
      <CustomInput
        startIcon={
          <button
            onClick={onSearch}
            className="focus:outline-none"
            aria-label="Search"
            type="button"
          >
            <Search className="text-primary w-5 h-5" />
          </button>
        }
        placeholder="Search for Products, Brands, and More"
        className="bg-body text-primary py-2 px-3 rounded-md w-full border border-secondary focus:border-primary transition-all duration-200"
        aria-label="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSearch();
        }}
      />
      {/* Clear button when input is not empty */}
      {searchQuery && (
        <button
          type="button"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          onClick={() => setSearchQuery("")}
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default NavSearchBar;
