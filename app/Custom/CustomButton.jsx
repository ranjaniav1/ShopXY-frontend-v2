"use client";
import React from "react";

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
  let sizeClass = "text-base px-4 py-2";
  if (size === "small") sizeClass = "text-sm px-3 py-1";
  else if (size === "large") sizeClass = "text-lg px-5 py-3";

  let variantClass = "bg-primary text-white hover:opacity-90";
  if (variant === "outlined")
    variantClass = "border border-primary text-primary bg-transparent hover:bg-primary hover:text-white";
  else if (variant === "text")
    variantClass = "bg-transparent text-primary hover:underline";

  const combinedClasses = `
    inline-flex items-center justify-center
    font-semibold rounded transition duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-primary
    ${sizeClass} ${variantClass} ${className}
  `;

  return (
    <button
      type={type}
      onClick={onClick}
      className={combinedClasses}
      {...props}
    >
      {startIcon && <span className="mr-2">{startIcon}</span>}
      {title}
      {endIcon && <span className="ml-2">{endIcon}</span>}
    </button>
  );
};

export default CustomButton;
