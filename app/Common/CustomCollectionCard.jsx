"use client";
import React from "react";
import Image from "next/image";
import CustomTypography from "../Custom/CustomTypography";

const CustomCollectionCard = ({ id, slug, image, title, tooltip }) => {
  return (
    <div
      key={id}
      className="group relative flex flex-col items-center rounded-md overflow-hidden bg-secondary border border-secondary shadow-md hover:shadow-xl transition duration-300"
    >
      {/* Fixed Image Box */}
      <div className="relative w-full h-48 sm:h-56 md:h-64 bg-body flex items-center justify-center p-4">
        <Image
          src={image}
          alt={`Collection image of ${title}`}
          fill
          className="object-contain "
          title={tooltip}
        />
      </div>

      {/* Title */}
      <div className="w-full bg-body text-center p-3">
        <CustomTypography
          component="h3"
          className="text-lg font-semibold text-primary truncate"
        >
          {title}
        </CustomTypography>
      </div>

    
    </div>
  );
};

export default CustomCollectionCard;
