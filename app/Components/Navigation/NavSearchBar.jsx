import React, { useState, useEffect } from "react";
import { Search } from "@mui/icons-material";
import CustomInput from "@/app/Custom/CustomInput";
import { searchProduct } from "@/app/Service/search";
import { useRouter } from "next/navigation";

const NavSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [disableSuggestions, setDisableSuggestions] = useState(false); // New state
  const router = useRouter();

  useEffect(() => {
    if (!disableSuggestions && searchQuery.trim().length > 0) {
      fetchSuggestions(searchQuery);
    } else {
      setSuggestions([]); // Clear suggestions when input is empty or disabled
    }
  }, [searchQuery, disableSuggestions]);

  const fetchSuggestions = async (query) => {
    try {
      console.log(query);
      const results = await searchProduct(query.trim());
      console.log(results);
      setSuggestions(results.products);
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search/${encodeURIComponent(searchQuery.trim())}`);
      setSuggestions([]); // Hide suggestions after search
      setDisableSuggestions(true); // Disable suggestions after search
    }
  };

  return (
    <div className="relative flex-grow mx-4">
      <CustomInput
        startIcon={<Search className="cursor-pointer" onClick={handleSearch} />}
        placeholder="Search for Products, Brands, and More"
        className="bg-blue-100 py-1 rounded-md w-full"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setDisableSuggestions(false); // Enable suggestions when typing
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      {suggestions.length > 0 && !disableSuggestions && (
        <ul className="absolute left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 z-50 max-h-[300px] overflow-y-auto">
          {suggestions.map((item) => (
            <li
              key={item._id}
              className="px-4 py-2 hover:bg-green-100 cursor-pointer transition-all"
              onClick={() => {
                setSearchQuery(item.name);
                setSuggestions([]); // Hide suggestions after click
                setDisableSuggestions(true); // Disable auto-suggestions after clicking
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
