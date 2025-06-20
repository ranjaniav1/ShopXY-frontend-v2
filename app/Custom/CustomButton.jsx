'use client';
import React from 'react';

const CustomButton = ({
  startIcon,
  endIcon,
  onClick,
  className = '',
  variant = 'contained',
  size = 'medium',
  title,
  type = 'button',
  disabled = false,
  ...props
}) => {
  const baseClasses = `
    inline-flex items-center justify-center
    font-medium rounded-xl
    transition duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const sizeClassesMap = {
    small: 'text-sm px-3 py-1.5',
    medium: 'text-base px-4 py-2',
    large: 'text-lg px-5 py-3',
  };

  const variantClassesMap = {
    contained: 'bg-primary text-white hover:bg-primary/90 focus:ring-primary',
    outlined: 'border border-primary text-primary bg-transparent hover:bg-primary hover:text-white focus:ring-primary',
    text: 'bg-transparent text-primary hover:underline focus:ring-primary',
  };

  const combinedClasses = `
    ${baseClasses}
    ${sizeClassesMap[size] || ''}
    ${variantClassesMap[variant] || ''}
    ${className}
  `.trim();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      {...props}
    >
      {startIcon && <span className="mr-2 flex items-center">{startIcon}</span>}
      {title}
      {endIcon && <span className="ml-2 flex items-center">{endIcon}</span>}
    </button>
  );
};

export default CustomButton;
