"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Slider,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Button
} from "@mui/material";
import { useParams } from "next/navigation";
import { searchProduct } from "@/app/Service/search"; // Adjust the import based on your structure
import ProductCard from "@/app/Components/ProductCard";
import Link from "next/link";
import { useSelector } from "react-redux";

const SearchResults = () => {
  const { query } = useParams(); // Get the query from the URL
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    categories: []
  });
  const [categories, setCategories] = useState([]);
  const { userId } = useSelector((state) => {
    const isAuth = state.auth.isAuthenticated;
    return {
      userId: isAuth ? state.auth.user?.data?.user?._id : null
    };
  });

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await searchProduct(query);
        setResults(data.products); // Adjust based on your response structure

        const uniqueBrands = [...new Set(data.products.map(p => p.name))];
        setCategories(uniqueBrands);

        // Apply filters initially
        applyFilters(data.products);
      } catch (err) {
        setError("Failed to fetch results.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  useEffect(() => {
    // Apply filters whenever filters state or results change
    applyFilters(results);
  }, [filters, results]);

  const applyFilters = (products) => {
    const filtered = products
      .filter(
        (product) =>
          product.actual_price >= filters.priceRange[0] &&
          product.actual_price <= filters.priceRange[1]
      )
      .filter(
        (product) =>
          filters.categories.length === 0 ||
          filters.categories.some((category) => product.name===category)
      );

    setFilteredResults(filtered);
  };

  const handlePriceRangeChange = (event, newValue) => {
    setFilters((prev) => ({ ...prev, priceRange: newValue }));
  };

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    setFilters((prev) => ({
      ...prev,
      categories: checked
        ? [...prev.categories, value]
        : prev.categories.filter((cat) => cat !== value)
    }));
  };

  return (
    <Box display="flex" p={2}>
      {/* Filter Sidebar */}
      <Box width="20%" p={2} borderRight="1px solid #ddd">
        <Typography variant="h6" mb={2}>
          Filters
        </Typography>

        <Typography variant="body1" mb={1}>
          Price Range
        </Typography>
        <Slider
          value={filters.priceRange}
          onChange={handlePriceRangeChange}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
          step={10}
        />

        <FormGroup mt={2}>
          <Typography variant="body1" mb={1}>
            Categories
          </Typography>
          {categories.map((brand) => (
            <FormControlLabel
              key={brand}
              control={
                <Checkbox
                  checked={filters.categories.includes(brand)}
                  onChange={handleCategoryChange}
                  value={brand}
                />
              }
              label={brand}
            />
          ))}
        </FormGroup>

        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            setFilters({ ...filters, priceRange: [0, 1000], categories: [] })
          }
          sx={{ mt: 2 }}
        >
          Reset Filters
        </Button>
      </Box>

      {/* Search Results */}
      <Box width="80%" p={2}>
        {loading && <CircularProgress />}

        {error && <Typography color="error">{error}</Typography>}

        {filteredResults.length > 0 ? (
          <Grid container spacing={2}>
            {filteredResults.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
               
                  <ProductCard
                    className="h-40 w-full object-cover"
                    imgSrc={product.image}
                    title={product.name}
                    price={product.actual_price}
                    discountPrice={product.discounted_price}
                    rating={product.ratings}
                    description={product.description}
                    offer={product.offer}
                    userId={userId}
                    productId={product._id}
                    slug={product.slug}
                  />
                
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography>No results found.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default SearchResults;
