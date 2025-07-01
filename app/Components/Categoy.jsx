"use client";

import React from "react";
import Heading from "../Common/Heading";
import ClientLink from "../Common/ClientClick";
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

const Categoy = ({ data = [] }) => {
  const { t } = useTranslation();

  if (!data.length) return null;

  return (
    <div >
      <Heading text={t("Shop by Category")} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-4">
        {data.map((category, idx) => (
          <ClientLink
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
          </ClientLink>
        ))}
      </div>
    </div>
  );
};

export default Categoy;
