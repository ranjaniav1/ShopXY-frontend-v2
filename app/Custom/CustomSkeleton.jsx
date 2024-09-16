'use client';
import React from 'react';
import { Box, Skeleton, Grid } from '@mui/material';

const CustomSkeleton = ({ 
  type = 'card', 
  className = '', 
  width = '100%', 
  height = '100%',
  gridProps = {},  // Add props for Grid if needed
  gridItem = false // Indicate if this skeleton should be wrapped in a Grid item
}) => {
  // Define common styles for different skeleton types
  const skeletonStyles = {
    card: "w-full max-w-sm div-body border border-gray-200 rounded-lg shadow-md p-4",
    image: "", // We will apply width and height dynamically
    row: "w-full h-6 bg-gray-300 rounded-lg my-2",
    text: "w-full h-4 bg-gray-300 rounded-lg my-2",
    rounded: "w-full h-full bg-gray-300 rounded-full"
  };

  // Define skeleton elements for each type
  const skeletonElements = {
    card: (
      <div className={`${skeletonStyles.card} ${className}`}>
        <div className="animate-pulse">
          <div className="w-full h-48 bg-gray-200 rounded-lg"></div>
          <div className="mt-4">
            <div className={`${skeletonStyles.text} mb-2`} />
          </div>
        </div>
      </div>
    ),
    image: (
      <Box className={`flex-shrink-0 skeleton ${className}`} style={{ width, height }}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{ borderRadius: '10px' }}
        />
      </Box>
    ),
    row: <div className={`${skeletonStyles.row} ${className}`}></div>,
    text: <div className={`${skeletonStyles.text} ${className}`}></div>,
    rounded: (
      <Skeleton
        variant="circular"
        width={width}
        height={height}
      />
    )
  };

  const skeletonContent = skeletonElements[type] || null;

  // Wrap the skeleton content in a Grid item if needed
  if (gridItem) {
    return (
      <Grid item {...gridProps}>
        {skeletonContent}
      </Grid>
    );
  }

  return skeletonContent;
};

export default CustomSkeleton;
