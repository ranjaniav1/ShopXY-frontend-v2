"use client";
import React, { useEffect, useState } from "react";
import { GetCategories } from "../Service/GetCategory";
import Link from "next/link";
import CustomSkeleton from "../Custom/CustomSkeleton";
import Heading from "../Common/Heading";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
    <div className="px-4 py-6">
      <Heading text={t("Shop by Category")} />

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-4">
          {Array.from({ length: 10 }).map((_, idx) => (
            <CustomSkeleton key={idx} width="100%" height={120} type="card" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-4">
          {categories.map((category, idx) => (
            <Link
              href={`/category/${category.slug}`}
              key={category._id}
              className={`group rounded-xl p-4 flex flex-col items-center text-center cursor-pointer hover:shadow-md transition ${bgColors[idx % bgColors.length]}`}
            >
              <img
                src={category.category_icon}
                alt={category.title}
                className="w-16 h-16 object-contain mb-2 group-hover:scale-105 transition-transform"
              />
              <p className="text-sm font-semibold text-tsecondary group-hover:text-primary truncate">
                {category.title}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySection;
