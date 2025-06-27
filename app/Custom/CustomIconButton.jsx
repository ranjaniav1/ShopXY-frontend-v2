'use client';

import React from 'react';

const CustomIconButton = ({ children, onClick, className = '', ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-[5px] p-2 hover:bg-black/10 transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomIconButton;
