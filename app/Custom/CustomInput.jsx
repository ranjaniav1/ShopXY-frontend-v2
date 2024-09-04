import React from 'react';
import { InputBase, IconButton, InputAdornment, useTheme } from '@mui/material';

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
  const theme = useTheme();

  return (
    <InputBase 
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border-btn custom-input ${className}`} // Apply custom and border styles
      {...props}
      startAdornment={startIcon && (
        <InputAdornment position="start">
          <IconButton
            onClick={onClickStartIcon}
            sx={{
              borderRadius: '3px', // Square button
              padding: '4px', // Adjust padding as needed
              color: theme.palette.button.color, // Icon color from theme
              backgroundColor: theme.palette.button.background, // Background color from theme
              '&:hover': {
                backgroundColor: theme.palette.button.hover, // Background color on hover
              },
            }}
          >
            {startIcon}
          </IconButton>
        </InputAdornment>
      )}
      endAdornment={endIcon && (
        <InputAdornment position="end">
          <IconButton
            onClick={onClickEndIcon}
            sx={{
              borderRadius: '3px', // Square button
              padding: '4px', // Adjust padding as needed
              color: theme.palette.button.color, // Icon color from theme
              backgroundColor: theme.palette.button.background, // Background color from theme
              '&:hover': {
                backgroundColor: theme.palette.button.hover, // Background color on hover
              },
            }}
          >
            {endIcon}
          </IconButton>
        </InputAdornment>
      )}
    />
  );
};

export default CustomInput;
