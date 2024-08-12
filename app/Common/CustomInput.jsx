import React from 'react';
import { InputBase, IconButton, InputAdornment } from '@mui/material';

const CustomInput = ({
  placeholder,
  startIcon,
  endIcon,
  onChange,
  onClickStartIcon,
  onClickEndIcon,
  value,
  className,
  ...props
}) => {
  return (
    <InputBase
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border-btn custom-input ${className}`} // Apply custom and border styles
      {...props}
      startAdornment={startIcon && (
        <InputAdornment position="start">
          <IconButton onClick={onClickStartIcon} className='btn rounded-none -ml-1'>
            {startIcon}
          </IconButton>
        </InputAdornment>
      )}
      endAdornment={endIcon && (
        <InputAdornment position="end">
          <IconButton onClick={onClickEndIcon} className='btn'>
            {endIcon}
          </IconButton>
        </InputAdornment>
      )}
    />
  );
};

export default CustomInput;
