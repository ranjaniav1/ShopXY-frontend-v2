"use client";

import React from "react";

const CustomMenu = ({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Select",
  className = "",
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-sm font-medium mb-1 text-tprimary">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 text-sm"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt._id || opt.value} value={opt.slug || opt.value}>
            {opt.title || opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomMenu;
