"use client";

import React from "react";
import CustomTypography from "../Custom/CustomTypography";

const CustomCollectionCard = ({  image, title, tooltip }) => {
  return (
    <>
      {/* Image */}
      < div className="relative h-44 bg-gray-100 flex items-center justify-center overflow-hidden" >
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="object-fill w-full h-full scale-100 group-hover:scale-105 transition-transform duration-300 ease-in-out"
        />
        {/* Subtle overlay effect */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition duration-300" />
      </div >

      {/* Title */}
      < div className="p-4 text-center" >
        <CustomTypography
          component="h3"
          className="text-primary transition-colors duration-200 truncate"
          title={tooltip || title}
        >
          {title}
        </CustomTypography>
      </div >
    </>
  );
};

export default CustomCollectionCard;
