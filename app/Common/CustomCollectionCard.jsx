"use client";

import React from "react";

const CustomCollectionCard = ({ image, title, tooltip }) => {
  return (
    <div className="group rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300 bg-body">
      {/* Image wrapper */}
      <div className="w-full h-20 sm:h-10 md:h-20 lg:h-36 relative">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-fill transition-transform duration-300"
        />
        <div className="absolute inset-0 transition duration-300" />
      </div>

      {/* Title */}
      <div className="p-3 text-center">
        <h3
          title={tooltip || title}
          className="text-tsecondary text-sm font-medium truncate"
        >
          {title}
        </h3>
      </div>
    </div>
  );
};

export default CustomCollectionCard;
