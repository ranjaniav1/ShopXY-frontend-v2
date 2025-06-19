"use client";
import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { GetCategories } from "../Service/GetCategory";
import Link from "next/link";
import CustomSkeleton from "../Custom/CustomSkeleton";
import Heading from "../Common/Heading";

const bgColors = [
  "bg-red-100",
  "bg-blue-100",
  "bg-green-100",
  "bg-yellow-100",
  "bg-purple-100",
  "bg-pink-100",
  "bg-indigo-100",
  "bg-orange-100",
  "bg-teal-100",
  "bg-cyan-100"
];

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const result = await GetCategories();
        setCategories(result?.categories || []);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Box >
      <Heading text="Shop by Category" />

      {loading ? (
        <Grid container spacing={2}>
          {Array.from({ length: 10 }).map((_, idx) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={idx}>
              <CustomSkeleton width="100%" height={120} type="card" />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={3}>
          {categories.map((category, idx) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={category._id}>
              <Link href={`/${'category'}/${category._id}/${category.slug}`}>
                <Box
                  className={`
                    group rounded-xl p-4 flex flex-col items-center text-center cursor-pointer hover:shadow-md transition
                    ${bgColors[idx % bgColors.length]}
                  `}
                >
                  <img
                    src={category.category_icon}
                    alt={category.title}
                    className="w-16 h-16 object-contain mb-2 group-hover:scale-105 transition-transform"
                  />
                  <Typography
                    variant="subtitle2"
                    className="text-sm font-semibold text-gray-700 group-hover:text-primary"
                  >
                    {category.title}
                  </Typography>
                </Box>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default CategorySection;
