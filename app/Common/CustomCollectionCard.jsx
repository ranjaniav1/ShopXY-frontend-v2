"use client";

import React from "react";

const CustomCollectionCard = ({ image, title, tooltip }) => {
  return (
    <div
      className="group rounded-2xl border border-secondary bg-body shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out hover:border-primary hover:bg-gray-50 cursor-pointer"
      title={tooltip || title}
    >
      {/* Image wrapper */}
      <div className="w-full aspect-[4/3] flex items-center justify-center p-4">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Title */}
      <div className="px-4 pb-4 text-center">
        <h3 className="text-sm font-semibold text-tsecondary group-hover:text-primary truncate">
          {title}
        </h3>
      </div>
    </div>
  );
};

export default CustomCollectionCard;
