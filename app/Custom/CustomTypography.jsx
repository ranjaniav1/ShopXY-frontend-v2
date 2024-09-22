'use client';

import React from 'react';

// Create a mapping between variant and actual HTML elements or styles
const typographyVariantMap = {
  h1: 'text-4xl font-bold',
  h2: 'text-3xl font-semibold',
  h3: 'text-2xl font-medium',
  h4: 'text-xl font-medium',
  h5: 'text-lg font-normal',
  h6: 'text-base font-normal',
  body1: 'text-base',
  body2: 'text-sm',
  caption: 'text-xs text-gray-500',
  overline: 'text-xs uppercase text-gray-500 tracking-wider',
};

const CustomTypography = ({ variant, children, className = '', sx = {} }) => {

  const typographyClass = typographyVariantMap[variant];

  return React.createElement(
    variant.startsWith('h') ? variant : 'p', 
    {
      className: `${typographyClass} ${className}`,
      style: sx, 
    },
    children
  );
};

export default CustomTypography;
