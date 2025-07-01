"use client";

import React from "react";
import { Search } from "lucide-react"; // Lucide Search icon
import CustomInput from "@/app/Custom/CustomInput";

const NavSearchBar = ({ searchQuery, setSearchQuery, onSearch }) => {
  return (
    <div className="relative flex-grow mx-4">
      <CustomInput
        startIcon={
          <Search
            className="cursor-pointer text-primary w-5 h-5"
            onClick={onSearch}
          />
        }
        placeholder="Search for Products, Brands, and More"
        className="bg-body text-primary py-1 rounded-md w-full border border-secondary"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSearch();
        }}
      />
    </div>
  );
};

export default NavSearchBar;
