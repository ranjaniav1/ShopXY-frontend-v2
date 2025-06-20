'use client';
import React from 'react';
import CustomButton from './CustomButton';

const CustomInput = ({
  placeholder,
  startIcon,
  endIcon,
  onChange,
  value,
  className = '',
  onClickStartIcon,
  onClickEndIcon,
  type = 'text',
  name,
  ...props
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      {/* Start Icon (left) */}
      {startIcon && (
        <CustomButton
          variant="text"
          size="small"
          className="absolute left-2 top-1/2 -translate-y-1/2 p-1"
          onClick={onClickStartIcon}
          startIcon={startIcon}
        />
      )}

      {/* Input */}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`
          w-full py-2 
          ${startIcon ? 'pl-10' : 'pl-3'} 
          ${endIcon ? 'pr-10' : 'pr-3'} 
          bg-body border border-secondary text-gray-800
          rounded-md focus:outline-none focus:ring-2 focus:ring-primary
        `}
        {...props}
      />

      {/* End Icon (right) */}
      {endIcon && (
        <CustomButton
          variant="text"
          size="small"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
          onClick={onClickEndIcon}
          startIcon={endIcon}
        />
      )}
    </div>
  );
};

export default CustomInput;
