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
       p.discounted_price 
    );
    const ratings = products.map((p) => p.ratings ?? 0);

    const minP = Math.min(...prices);
    const maxP = Math.max(...prices);
    const minR = Math.min(...ratings);
    const maxR = Math.max(...ratings);

    // Only update ranges if limits changed
    if (minP !== minPrice || maxP !== maxPrice) {
      setMinPrice(minP);
      setMaxPrice(maxP);
      setPriceRange([minP, maxP]);
    }

    if (minR !== minRating || maxR !== maxRating) {
      setMinRating(minR);
      setMaxRating(maxR);
      setRatingRange([minR, maxR]);
    }
  }, [products]);

  useEffect(() => {
    const filtered = products.filter((p) => {
      const price =  p.discounted_price;
      const rating = p.ratings;

      return (
        price >= priceRange[0] &&
        price <= priceRange[1] &&
        rating >= ratingRange[0] &&
        rating <= ratingRange[1]
      );
    });
    setFilteredProducts(filtered);
  }, [priceRange, ratingRange, products, useDiscounted]);

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
