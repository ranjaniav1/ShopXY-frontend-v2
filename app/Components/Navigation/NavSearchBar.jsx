import React, { useState, useEffect, useRef } from "react";
import { Search } from "@mui/icons-material";
import CustomInput from "@/app/Custom/CustomInput";
import { searchProduct } from "@/app/Service/search";
import { useRouter, usePathname } from "next/navigation"; // ✅ using App Router
import { useTheme } from "@mui/material";

const NavSearchBar = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [disableSuggestions, setDisableSuggestions] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // ✅ watch path change
  const theme = useTheme();
  const searchRef = useRef(null);

  // ✅ close modal when route changes
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
      console.error("Error fetching search suggestions:", error);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search/${encodeURIComponent(searchQuery.trim())}`);
      setSuggestions([]);
      setDisableSuggestions(true); // this triggers modal close in useEffect
    }
  };

  return (
    <div ref={searchRef} className="relative flex-grow mx-4">
      <CustomInput
        startIcon={<Search className="cursor-pointer" onClick={handleSearch} />}
        placeholder="Search for Products, Brands, and More"
        className="bg-blue-100 py-1 rounded-md w-full"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setDisableSuggestions(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      {suggestions.length > 0 && !disableSuggestions && (
        <ul
          className="absolute left-0 w-full border border-gray-300 rounded-md shadow-lg mt-1 z-50 max-h-[300px] overflow-y-auto"
          style={{
            background: theme.palette.background.main,
            color: theme.palette.text.primary,
          }}
        >
          {suggestions.map((item) => (
            <li
              key={item._id}
              className="px-4 py-2 cursor-pointer transition-all hover:bg-gray-100"
              onClick={() => {
                setSearchQuery(item.name);
                setSuggestions([]);
                setDisableSuggestions(true); // triggers modal close
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
