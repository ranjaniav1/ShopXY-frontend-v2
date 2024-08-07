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
      className={className}
      {...props}
      startAdornment={startIcon && (
        <InputAdornment position="start">
          <IconButton onClick={onClickStartIcon}>
            {startIcon}
          </IconButton>
        </InputAdornment>
      )}
      endAdornment={endIcon && (
        <InputAdornment position="end">
          <IconButton onClick={onClickEndIcon}>
            {endIcon}
          </IconButton>
        </InputAdornment>
      )}
      style={{ padding: '8px', borderRadius: '4px', backgroundColor: '#f0f5ff', width: '100%' }}
    />
  );
};


export default CustomInput;
