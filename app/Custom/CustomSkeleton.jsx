'use client';
import React from 'react';
import { Box, Skeleton, Grid, useTheme } from '@mui/material';

const CustomSkeleton = ({
  type = 'card',
  className = '',
  width = '100%',
  height = '100%',
  gridProps = {},  // Add props for Grid if needed
  gridItem = false // Indicate if this skeleton should be wrapped in a Grid item
}) => {
  const theme = useTheme();  // Use theme for dynamic styling

  // Define common styles for different skeleton types
  const skeletonStyles = {
    card: {
      wrapper: {
        width: '100%',
        maxWidth: 'sm',
        padding: '16px',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: '10px',
        boxShadow: theme.shadows[1],
        backgroundColor: theme.palette.background.paper,
      },
      image: {
        width: '100%',
        height: '12rem',
        backgroundColor: theme.palette.background.default,
        borderRadius: '10px',
      },
      text: {
        width: '100%',
        height: '1.25rem',
        backgroundColor: theme.palette.action.hover,
        marginBottom: '0.5rem',
        borderRadius: '4px',
      },
    },
    image: {
      width,
      height,
      borderRadius: '10px',
    },
    row: {
      width: '100%',
      height: '6rem',
      backgroundColor: theme.palette.action.hover,
      borderRadius: '4px',
    },
    text: {
      width: '100%',
      height: '1.25rem',
      backgroundColor: theme.palette.action.hover,
      borderRadius: '4px',
      marginBottom: '0.5rem',
    },
    rounded: {
      borderRadius: '50%',
      backgroundColor: theme.palette.action.hover,
    },
  };

  // Define skeleton elements for each type
  const skeletonElements = {
    card: (
      <Box sx={skeletonStyles.card.wrapper} className={className}>
        <div className="animate-pulse">
          <Box sx={skeletonStyles.card.image}></Box>
          <Box mt={2}>
            <Box sx={skeletonStyles.card.text}></Box>
          </Box>
        </div>
      </Box>
    ),
    image: (
      <Box className={`flex-shrink-0 skeleton ${className}`} sx={skeletonStyles.image}>
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{ borderRadius: '10px' }}
        />
      </Box>
    ),
    row: <Box sx={skeletonStyles.row} className={className}></Box>,
    text: <Box sx={skeletonStyles.text} className={className}></Box>,
    rounded: (
      <Skeleton
        variant="circular"
        width={width}
        height={height}
        sx={skeletonStyles.rounded}
      />
    ),
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
