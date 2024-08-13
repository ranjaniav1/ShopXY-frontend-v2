'use client';
import React from 'react';
import { Box, Skeleton } from '@mui/material';

const CustomSkeleton = ({ type = 'card', className, width = '100%', height = '100%' }) => {
  const skeletonStyles = {
    card: "w-full max-w-sm div-body border border-gray-200 rounded-lg shadow-md p-4",
    image: `${width} ${height}`, // Dynamic size for image skeleton
    row: "w-full h-6 bg-gray-300 rounded-lg my-2",
    text: "w-full h-4 bg-gray-300 rounded-lg my-2"
  };

  const skeletonElements = {
    card: (
      <div className={`${skeletonStyles.card} ${className}`}>
        <div className="animate-pulse">
          <div className="w-full h-48 skeleton rounded-lg"></div>
          <div className="mt-4">
            <div className={`${skeletonStyles.text} mb-2`} />
          </div>
        </div>
      </div>
    ),
    image: (
      <Box className={`flex-shrink-0  skeleton ${skeletonStyles.image} ${className}`}>
        <Skeleton
          variant="rectangular"
          width={width}
          height={height}
          sx={{  borderRadius: '10px' }}
        />
      </Box>
    ),
    row: <div className={`${skeletonStyles.row} ${className}`}></div>,
    text: <div className={`${skeletonStyles.text} ${className}`}></div>
  };

  return skeletonElements[type] || null;
};

export default CustomSkeleton;
