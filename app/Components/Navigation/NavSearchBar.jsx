import React, { useState, useEffect } from "react";
import { Search } from "@mui/icons-material";
import CustomInput from "@/app/Custom/CustomInput";
import { searchProduct } from "@/app/Service/search";
import { useRouter } from "next/navigation";
import slugify from "slugify";
import Link from "next/link";

const NavSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      fetchSuggestions(searchQuery);
    } else {
      setSuggestions([]); // Clear suggestions when input is empty
    }
  }, [searchQuery]);

  const fetchSuggestions = async (query) => {
    try {
      console.log(query);
      const results = await searchProduct(query.trim()); // API call
      console.log(results);
      setSuggestions(results.products); // Set suggestions
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search/${encodeURIComponent(searchQuery.trim())}`);
      setSuggestions([]); // Hide suggestions after search
    }
  };

  return (
    <div className="relative flex-grow mx-4">
      <CustomInput
        startIcon={<Search className="cursor-pointer" onClick={handleSearch} />}
        placeholder="Search for Products, Brands, and More"
        className="bg-blue-100 py-1 rounded-md w-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
            setSuggestions([]); // Hide suggestions on Enter
          }
        }}
      />
      {suggestions.length > 0 && (
        <ul className="absolute left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 z-50 max-h-[300px] overflow-y-auto">
          {suggestions.map((item, index) => (
            <Link key={index} href={`/product/${item._id}/${encodeURIComponent(item.slug)}`}>
              <li
                className="px-4 py-2 hover:bg-green-100 cursor-pointer transition-all"
                onClick={() => setSearchQuery(item.name)}
              >
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NavSearchBar;
