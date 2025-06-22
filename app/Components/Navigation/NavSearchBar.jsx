"use client";
import React, { useState } from "react";
import { Search } from "@mui/icons-material";
import CustomInput from "@/app/Custom/CustomInput";
import { useRouter } from "next/navigation";

const NavSearchBar = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/product/${encodeURIComponent(searchQuery.trim())}`);
      onClose?.(); // optional: close modal or drawer if needed
    }
  };

  return (
    <div className="relative flex-grow mx-4">
      <CustomInput
        startIcon={
          <Search
            className="cursor-pointer text-primary"
            onClick={handleSearch}
          />
        }
        placeholder="Search for Products, Brands, and More"
        className="bg-body text-primary py-1 rounded-md w-full border border-secondary"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
      />
    </div>
  );
};

export default NavSearchBar;
