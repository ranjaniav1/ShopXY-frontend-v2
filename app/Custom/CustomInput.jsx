"use client";

import React from "react";

const CustomInput = ({
  placeholder,
  startIcon,
  endIcon,
  onChange,
  value,
  className = "",
  onClickStartIcon,
  onClickEndIcon,
  type = "text",
  ...props
}) => {
  return (
    <div
      className={`relative flex items-center border border-secondary rounded px-2 ${className}`}
    >
      {startIcon && (
        <div
          onClick={onClickStartIcon}
          className="cursor-pointer pr-2 text-tprimary"
        >
          {startIcon}
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
        className="bg-body flex-1 focus:outline-none text-tprimary py-1"
      />
      {endIcon && (
        <div
          onClick={onClickEndIcon}
          className="cursor-pointer pl-2 text-tprimary"
        >
          {endIcon}
        </div>
      )}
    </div>
  );
};

export default CustomInput;
