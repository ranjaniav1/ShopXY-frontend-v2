"use client";
import React, { useState, useEffect, useRef } from "react";
import { Search } from "@mui/icons-material";
import CustomInput from "@/app/Custom/CustomInput";
import { searchProduct } from "@/app/Service/search";
import { useRouter, usePathname } from "next/navigation";

const NavSearchBar = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [disableSuggestions, setDisableSuggestions] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchRef = useRef(null);

  // Close modal when route changes
  useEffect(() => {
    if (disableSuggestions) {
      onClose?.();
    }
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSuggestions([]);
        setDisableSuggestions(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!disableSuggestions && searchQuery.trim().length > 0) {
      fetchSuggestions(searchQuery);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery, disableSuggestions]);

  const fetchSuggestions = async (query) => {
    try {
      const results = await searchProduct(query.trim());
      setSuggestions(results.products);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search/${encodeURIComponent(searchQuery.trim())}`);
      setSuggestions([]);
      setDisableSuggestions(true);
    }
  };

  return (
    <div ref={searchRef} className="relative flex-grow mx-4">
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
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setDisableSuggestions(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
      />

      {suggestions.length > 0 && !disableSuggestions && (
        <ul className="absolute left-0 w-full border border-secondary bg-body text-primary rounded-md shadow-lg mt-1 z-50 max-h-[300px] overflow-y-auto">
          {suggestions.map((item) => (
            <li
              key={item._id}
              className="px-4 py-2 cursor-pointer transition-colors duration-200 hover:bg-secondary hover:text-white"
              onClick={() => {
                setSearchQuery(item.name);
                setSuggestions([]);
                setDisableSuggestions(true);
                router.push(`/product/${item._id}/${encodeURIComponent(item.slug)}`);
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NavSearchBar;
