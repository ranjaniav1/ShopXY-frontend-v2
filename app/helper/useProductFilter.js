// hooks/useProductFilter.ts
"use client";
import { useEffect, useState } from "react";

export const useProductFilter = (products, useDiscounted = false) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [ratingRange, setRatingRange] = useState([0, 5]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minRating, setMinRating] = useState(0);
  const [maxRating, setMaxRating] = useState(5);

  useEffect(() => {
    if (!products.length) return;

    const prices = products.map((p) =>
      useDiscounted ? p.discounted_price || 0 : p.actual_price || 0
    );
    const ratings = products.map((p) => p.ratings || 0);

    const minP = Math.min(...prices);
    const maxP = Math.max(...prices);
    const minR = Math.min(...ratings);
    const maxR = Math.max(...ratings);

    setMinPrice(minP);
    setMaxPrice(maxP);
    setPriceRange([minP, maxP]);

    setMinRating(minR);
    setMaxRating(maxR);
    setRatingRange([minR, maxR]);
  }, [products]);

  useEffect(() => {
    const filtered = products.filter((p) => {
      const price = useDiscounted ? p.discounted_price : p.actual_price;
      return (
        price >= priceRange[0] &&
        price <= priceRange[1] &&
        p.ratings >= ratingRange[0] &&
        p.ratings <= ratingRange[1]
      );
    });
    setFilteredProducts(filtered);
  }, [priceRange, ratingRange, products]);

  return {
    filteredProducts,
    priceRange,
    setPriceRange,
    ratingRange,
    setRatingRange,
    minPrice,
    maxPrice,
    minRating,
    maxRating,
  };
};
