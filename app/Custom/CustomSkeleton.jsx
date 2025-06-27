"use client";
import React from "react";

const CustomSkeleton = ({
  type = "card",
  className = "",
  width = "100%",
  height = "100%",
  gridProps = {},
  gridItem = false,
}) => {
  const basePulse = "animate-pulse bg-tsecondary/30";

  const skeletonElements = {
    card: (
      <div
        className={`w-full max-w-sm p-4 rounded-xl shadow-md border border-tsecondary/50 bg-body ${className}`}
      >
        <div className={`${basePulse} w-full h-48 rounded-lg`} />
        <div className={`${basePulse} h-5 mt-4 rounded-md`} />
      </div>
    ),
    image: (
      <div
        className={`${basePulse} rounded-xl ${className}`}
        style={{
          width,
          height,
        }}
      />
    ),
    row: (
      <div
        className={`${basePulse} w-full h-24 rounded-md ${className}`}
        style={{ width }}
      />
    ),
    text: (
      <div
        className={`${basePulse} w-full h-5 rounded-md mb-2 ${className}`}
        style={{ width }}
      />
    ),
    rounded: (
      <div
        className={`${basePulse} rounded-full ${className}`}
        style={{ width, height }}
      />
    ),
  };

  const skeletonContent = skeletonElements[type] || null;

  if (gridItem) {
    return (
      <div {...gridProps} className={`grid-item ${gridProps.className || ""}`}>
        {skeletonContent}
      </div>
    );
  }

  return skeletonContent;
};

export default CustomSkeleton;
