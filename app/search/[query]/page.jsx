'use client';
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Slider
} from "@mui/material";
import { useParams } from "next/navigation";
import { searchProduct } from "@/app/Service/search";
import ProductCard from "@/app/Components/ProductCard";
import CustomTypography from "@/app/Custom/CustomTypography";
import { useSelector } from "react-redux";
import CustomBox from "@/app/Custom/CustomBox";
import Heading from "@/app/Common/Heading";

const SearchResults = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [priceLimits, setPriceLimits] = useState([0, 89]); // Dynamic min/max for slider

  const [filters, setFilters] = useState({
    priceRange: [0, 89],
    ratingRange: [0, 5]
  });

  const { userId } = useSelector((state) => {
    const isAuth = state.auth.isAuthenticated;
    return {
      userId: isAuth ? state.auth.user?.data?.user?._id : null,
    };
  });

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await searchProduct(query);
        setResults(data.products);

        const allPrices = data.products.map((product) => product.actual_price);
        const minPrice = Math.floor(Math.min(...allPrices));
        const maxPrice = Math.ceil(Math.max(...allPrices));

        setFilters((prevFilters) => ({
          ...prevFilters,
          priceRange: [minPrice, maxPrice],
        }));
        setPriceLimits([minPrice, maxPrice]);

        applyFilters(data.products, [minPrice, maxPrice], filters.ratingRange);

      } catch (err) {
        setError("Failed to fetch results.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  useEffect(() => {
    applyFilters(results, filters.priceRange, filters.ratingRange);
  }, [filters, results]);

  const applyFilters = (products, priceRange = filters.priceRange, ratingRange = filters.ratingRange) => {
    const filtered = products
      .filter(
        (product) =>
          product.actual_price >= priceRange[0] &&
          product.actual_price <= priceRange[1]
      )
      .filter(
        (product) =>
          product.ratings >= ratingRange[0] &&
          product.ratings <= ratingRange[1]
      );

    setFilteredResults(filtered);
  };

  const handlePriceRangeChange = (event, newValue) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: newValue,
    }));
  };

  const handleRatingRangeChange = (event, newValue) => {
    setFilters((prev) => ({ ...prev, ratingRange: newValue }));
  };

  return (
    <CustomBox>
      <Grid container spacing={2} sx={{ px: { xs: 1, sm: 2 } }}>
        {/* Filter Sidebar */}
        <Grid item xs={12} md={3}>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              boxShadow: 1,
              position: "sticky",
              top: "100px",
            }}
          >
            <Heading text="Filter By" />

            {/* Price Filter */}
            <Box my={2}>
              <CustomTypography fontWeight={600} fontSize="1rem">
                Price Range
              </CustomTypography>
              <Slider
                size="small"
                min={priceLimits[0]}
                max={priceLimits[1]}
                step={1}
                marks
                value={filters.priceRange}
                onChange={handlePriceRangeChange}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `₹${value}`}
              />
              <CustomTypography fontSize="0.875rem">
                ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
              </CustomTypography>
            </Box>

            {/* Rating Filter */}
            <Box my={2}>
              <CustomTypography fontWeight={600} fontSize="1rem">
                Rating Range
              </CustomTypography>
              <Slider
                size="small"
                min={0}
                max={5}
                step={0.1}
                marks
                value={filters.ratingRange}
                onChange={handleRatingRangeChange}
                valueLabelDisplay="auto"
              />
              <CustomTypography fontSize="0.875rem">
                {filters.ratingRange[0]} - {filters.ratingRange[1]} Stars
              </CustomTypography>
            </Box>
          </Box>
        </Grid>

        {/* Search Results */}
        <Grid item xs={12} sm={9}>
          {loading && <CircularProgress />}
          {error && <CustomTypography color="error">{error}</CustomTypography>}

          {/* Product List */}
          <Grid container spacing={2}>
            {filteredResults.length > 0 ? (
              filteredResults.map((product) => (
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
              ))
            ) : (
              <CustomTypography>No results found.</CustomTypography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </CustomBox>
  );
};

export default SearchResults;
