"use client";
import React from "react";

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
    <div className={`relative flex items-center border border-secondary rounded px-2 ${className}`}>
      {startIcon && (
        <div
          onClick={onClickStartIcon}
          className="cursor-pointer pr-2 text-primary"
        >
          {startIcon}
        </div>
      )}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
        className="bg-body flex-1 focus:outline-none text-primary py-1"
        onKeyDown={(e) => e.key === "Enter" && props.onKeyDown?.(e)}
      />
      {endIcon && (
        <div
          onClick={onClickEndIcon}
          className="cursor-pointer pl-2 text-primary"
        >
          {endIcon}
        </div>
      )}
    </div>
  );
};

export default CustomInput;
