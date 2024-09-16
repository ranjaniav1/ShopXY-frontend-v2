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

const CustomTypography = ({ variant, children, className = '' }) => {
  // Determine the class for the typography based on the variant
  const typographyClass = typographyVariantMap[variant];

  // Use dynamic HTML tags based on variant or custom styles
  switch (variant) {
    case 'h1':
      return <h1 className={`${typographyClass} ${className}`}>{children}</h1>;
    case 'h2':
      return <h2 className={`${typographyClass} ${className}`}>{children}</h2>;
    case 'h3':
      return <h3 className={`${typographyClass} ${className}`}>{children}</h3>;
    case 'h4':
      return <h4 className={`${typographyClass} ${className}`}>{children}</h4>;
    case 'h5':
      return <h5 className={`${typographyClass} ${className}`}>{children}</h5>;
    case 'h6':
      return <h6 className={`${typographyClass} ${className}`}>{children}</h6>;
    case 'body1':
      return <p className={`${typographyClass} ${className}`}>{children}</p>;
    case 'body2':
      return <p className={`${typographyClass} ${className}`}>{children}</p>;
    case 'caption':
      return <span className={`${typographyClass} ${className}`}>{children}</span>;
    case 'overline':
      return <span className={`${typographyClass} ${className}`}>{children}</span>;
    default:
      return <p className={className}>{children}</p>;
  }
};

export default CustomTypography;
