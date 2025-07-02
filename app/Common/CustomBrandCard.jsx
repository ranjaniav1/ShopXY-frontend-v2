"use client";

import React from "react";

const CustomBrandCard = ({ id, slug, image, title }) => {
  return (
    <div className="group flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300">
      {/* Brand Logo */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-body shadow-sm border border-gray-200  transition duration-300 ease-in-out">
        <img
          src={image}
          alt={title}
          title={title}
          className="object-fill w-full h-full  transition-opacity duration-300"
          loading="lazy"
        />
      </div>

      {/* Brand Title */}
      <h3 className="mt-2 text-sm sm:text-base font-medium text-tsecondary group-hover:text-tprimary transition-colors duration-200 truncate w-28 sm:w-32">
        {title}
      </h3>
    </div>
  );
};

export default CustomBrandCard;
