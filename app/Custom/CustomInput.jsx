"use client";
import React from "react";
import { InputBase, IconButton, InputAdornment } from "@mui/material";

const CustomInput = ({
  placeholder,
  startIcon,
  endIcon,
  onChange,
  value,
  className,
  onClickStartIcon,
  onClickEndIcon,
  ...props
}) => {
  return (
    <InputBase
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`
        custom-input 
        w-full 
        bg-body 
        border border-secondary 
        rounded px-2 py-1 
        text-gray-800
        focus:outline-none focus:ring-2 focus:ring-primary 
        ${className}
      `}
      {...props}
      startAdornment={
        startIcon && (
          <InputAdornment position="start">
            <IconButton
              tabIndex={-1}
              onClick={onClickStartIcon}
              className="
                bg-primary text-white 
                hover:opacity-90 
                rounded-sm p-1
              "
            >
              {startIcon}
            </IconButton>
          </InputAdornment>
        )
      }
      endAdornment={
        endIcon && (
          <InputAdornment position="end">
            <IconButton
              tabIndex={-1}
              onClick={onClickEndIcon}
              className="
                bg-primary text-white 
                hover:opacity-90 
                rounded-sm p-1
              "
            >
              {endIcon}
            </IconButton>
          </InputAdornment>
        )
      }
    />
  );
};

export default CustomInput;
