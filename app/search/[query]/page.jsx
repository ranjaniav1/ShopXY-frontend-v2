'use client';
import React, { useEffect, useState } from "react";
import {
  Grid,
  useTheme,
} from "@mui/material";
import { useParams } from "next/navigation";
import { searchProduct } from "@/app/Service/search";
import ProductCard from "@/app/Components/ProductCard";
import CustomTypography from "@/app/Custom/CustomTypography";
import { useSelector } from "react-redux";
import CustomBox from "@/app/Custom/CustomBox";
import Heading from "@/app/Common/Heading";
import { useProductFilter } from "@/app/helper/useProductFilter";
import FilterSidebar from "@/app/Components/FilterSidebar";
import CustomSkeleton from "@/app/Custom/CustomSkeleton";
import EmptyCart from "@/app/Components/EmptyCart";
import { useUser } from "@/app/context/UserContext";

const SearchResults = () => {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
 const { user } = useUser(); // 👈 Get user from context
    const userId = user?._id; 


  const {
    filteredProducts,
    priceRange,
    setPriceRange,
    ratingRange,
    setRatingRange,
    minPrice,
    maxPrice,
    minRating,
    maxRating,
  } = useProductFilter(results);

  useEffect(() => {
    const fetchResults = async () => {

      try {
        const data = await searchProduct(query);
        setResults(data.products);
        setLoading(false);

      } catch (err) {
        setError("Failed to fetch results.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

const theme=useTheme()
  return (
    <CustomBox>
      <Heading text={query} />
      <Grid container spacing={2}>
      {filteredProducts.length > 0 && (
        <Grid item xs={12} md={3}>
          <FilterSidebar
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            ratingRange={ratingRange}
            setRatingRange={setRatingRange}
            minPrice={minPrice}
            maxPrice={maxPrice}
            minRating={minRating}
            maxRating={maxRating}
          />
        </Grid>
      )}

        {/* Search Results */}
        <Grid item xs={12} md={filteredProducts.length > 0 ? 9 : 12} sx={{ mt: 3.5 }} data-aos="fade-left">
        {loading && page === 1 ? (
            <Grid container spacing={2}>
              {Array.from({ length: 6 }).map((_, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <CustomSkeleton type="card" width="96px" height="96px" />
                </Grid>
              ))}
            </Grid>
          ) : filteredProducts.length === 0 ? (
            <EmptyCart
            title="We couldn’t find anything for your search. 😕"
            subtitle="No worries — simply click below to explore our full collection or try searching again."
            src="/search-not-found.png"
            buttonText="Browse All Collections"
            buttonHref="/categories/collections"
          />
          
          
          ) : (
            <Grid container spacing={2}>
              {filteredProducts.map((product) => (
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
          )}
        </Grid>

      </Grid>
    </CustomBox >
  );
};

export default SearchResults;
