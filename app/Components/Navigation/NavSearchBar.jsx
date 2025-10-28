"use client";

import React from "react";
import { Search, X } from "lucide-react";
import CustomInput from "@/app/Custom/CustomInput";

const NavSearchBar = (props) => {
  // Support both prop naming styles (for reuse in multiple components)
  const value = props.value ?? props.searchQuery ?? "";
  const onChange = props.onChange ?? ((e) => props.setSearchQuery?.(e.target.value));
  const onSearch = props.onSearch ?? (() => {});

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
        endIcon={
          value && (
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600"
              onClick={() => onChange({ target: { value: "" } })}
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )
        }
        placeholder="Search Products, Brands, and More"
        className="bg-body text-tsecondary px-3 rounded-md w-full border border-secondary focus:border-primary transition-all py-1 duration-200"
        aria-label="Search"
        value={value}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSearch();
        }}
      />
    </div>
  );
};

export default NavSearchBar;
