'use client';

import React from 'react';

const typographyVariantMap = {
  h1: 'text-4xl font-bold text-gray-900',
  h2: 'text-3xl font-semibold text-gray-900',
  h3: 'text-2xl font-medium text-gray-900',
  h4: 'text-xl font-medium text-gray-900',
  h5: 'text-lg font-normal text-gray-900',
  h6: 'text-base font-normal text-gray-800',
  body1: 'text-base text-gray-800',
  body2: 'text-sm text-gray-700',
  caption: 'text-xs text-gray-700',
  overline: 'text-xs uppercase text-gray-700 tracking-wider',
};

const tagMap = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body1: 'p',
  body2: 'p',
  caption: 'span',
  overline: 'span',
};

const CustomTypography = ({ variant = 'body1', children, className = '', sx = {} }) => {
  const tag = tagMap[variant] || 'p';
  const typographyClass = typographyVariantMap[variant] || '';

  return React.createElement(
    tag,
    {
      className: `${typographyClass} ${className}`.trim(),
      style: sx,
    },
    children
  );
};

export default CustomTypography;
