"use client";

import React from "react";
import Link from "next/link";
import CustomTypography from "../Custom/CustomTypography";

const CustomCollectionCard = ({ id, slug, image, title, tooltip }) => {
  return (
    <Link
      href={`/collection/${slug}`}
      className="group relative flex flex-col rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-white hover:shadow-xl hover:border-primary transition-all duration-300 ease-in-out"
    >
      {/* Image */}
      <div className="relative h-44 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="object-fill w-full h-full scale-100 group-hover:scale-105 transition-transform duration-300 ease-in-out"
        />
        {/* Subtle overlay effect */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition duration-300" />
      </div>

      {/* Title */}
      <div className="p-4 text-center">
        <CustomTypography
          component="h3"
          className="text-primary transition-colors duration-200 truncate"
          title={tooltip || title}
        >
          {title}
        </CustomTypography>
      </div>
    </Link>
  );
};

export default CustomCollectionCard;
