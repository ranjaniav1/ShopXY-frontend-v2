"use client";
import React from "react";
import clsx from "clsx"; // Optional: for cleaner conditional class handling

const CustomButton = ({
  startIcon,
  endIcon,
  onClick,
  className = "",
  variant = "contained",
  size = "medium",
  title,
  type = "button",
  ...props
}) => {
  const baseClasses = `
    inline-flex items-center justify-center 
    font-semibold rounded px-4 py-2 
    transition duration-200 ease-in-out 
    focus:outline-none focus:ring-2 focus:ring-primary
  `;

  const sizeClasses = {
    small: "text-sm px-3 py-1",
    medium: "text-base px-4 py-2",
    large: "text-lg px-5 py-3",
  };

  const variantClasses = {
    contained: "bg-primary text-white hover:opacity-90",
    outlined: "border border-primary text-primary bg-transparent hover:bg-primary hover:text-white",
    text: "bg-transparent text-primary hover:underline",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {startIcon && <span className="mr-2">{startIcon}</span>}
      {title}
      {endIcon && <span className="ml-2">{endIcon}</span>}
    </button>
  );
};

export default CustomButton;
