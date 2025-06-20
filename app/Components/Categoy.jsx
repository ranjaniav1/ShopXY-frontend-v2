"use client";

import React, { useEffect, useState } from "react";
import { GetCategories } from "../Service/GetCategory";
import Link from "next/link";
import CustomSkeleton from "../Custom/CustomSkeleton";
import Heading from "../Common/Heading";
import { useTheme } from "../context/ThemeContext";

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
  const theme = useTheme();

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
    <div>
      <Heading text="Shop by Category" />

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, idx) => (
            <div key={idx}>
              <CustomSkeleton width="100%" height={120} type="card" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((category, idx) => (
            <Link
              key={category._id}
              href={`/${"category"}/${category._id}/${category.slug}`}
              className={`
                group rounded-xl p-4 flex flex-col items-center text-center cursor-pointer 
                hover:shadow-md transition duration-300
                ${bgColors[idx % bgColors.length]}
              `}
            >
              <img
                src={category.category_icon}
                alt={category.title}
                className="w-16 h-16 object-contain mb-2 group-hover:scale-105 transition-transform duration-200"
              />
              <h3 className="text-sm font-semibold text-gray-700 group-hover:text-blue-600">
                {category.title}
              </h3>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySection;
