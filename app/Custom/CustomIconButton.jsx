'use client';
import React from 'react';

const CustomIconButton = ({ children, onClick, className = '', ...props }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`
        p-2 rounded-md transition-colors duration-200
        hover:bg-black/10
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomIconButton;
