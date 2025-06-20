'use client';
import React from 'react';

const CustomSkeleton = ({
  type = 'card',
  className = '',
  width = '100%',
  height = '100%',
  gridItem = false,
  gridProps = {}, // not used without MUI but left for compatibility
}) => {
  const skeletonVariants = {
    card: (
      <div className={`bg-white dark:bg-[var(--body)] shadow-sm p-4 rounded-lg w-full max-w-sm animate-pulse ${className}`}>
        <div className="bg-gray-200 dark:bg-gray-700 h-48 w-full rounded-md mb-4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
      </div>
    ),
    image: (
      <div
        className={`bg-gray-300 dark:bg-gray-600 rounded-md animate-pulse ${className}`}
        style={{ width, height }}
      />
    ),
    row: (
      <div
        className={`bg-gray-300 dark:bg-gray-600 h-24 rounded-md animate-pulse ${className}`}
      />
    ),
    text: (
      <div
        className={`bg-gray-300 dark:bg-gray-600 h-5 rounded w-full mb-2 animate-pulse ${className}`}
      />
    ),
    rounded: (
      <div
        className={`bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse ${className}`}
        style={{ width, height }}
      />
    ),
  };

  const skeleton = skeletonVariants[type] || null;

  // Optional: if you want to use this inside a grid manually
  return gridItem ? <div {...gridProps}>{skeleton}</div> : skeleton;
};

export default CustomSkeleton;
