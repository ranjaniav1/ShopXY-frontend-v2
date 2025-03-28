import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import CustomInput from "@/app/Custom/CustomInput";
import { Search } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { searchProduct } from "@/app/Service/search"; // ✅ Import Fixed

const SearchModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // ✅ Prevent rendering when not open

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (searchQuery.trim()) {
      fetchSuggestions(searchQuery);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const fetchSuggestions = async (query) => {
    try {
      const results = await searchProduct(query);
      if (results.success && results.products) {
        setSuggestions(results.products.map((product) => product.name));
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search/${encodeURIComponent(searchQuery.trim())}`);
      setSuggestions([]);
      onClose(); // ✅ Close Modal after search
    }
  };

  return (
    <Box display="flex" flexDirection="column" width="100%" p={2}>
      <Box display="flex" flexDirection="row" mb={2}>
        <CustomInput
          endIcon={<Search onClick={handleSearch} />}
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
      </Box>
      {suggestions.length > 0 && (
        <ul className="bg-white border border-gray-300 rounded-md shadow-lg mt-2 max-h-60 overflow-y-auto">
          {suggestions.map((item, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-green-100 cursor-pointer"
              onClick={() => {
                setSearchQuery(item);
                handleSearch();
                onClose(); // ✅ Close modal after selecting suggestion
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </Box>
  );
};

export default SearchModal;
