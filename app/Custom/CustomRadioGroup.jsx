"use client";
import React from "react";

const CustomRadioGroup = ({
  name,
  options = [],
  value,
  onChange,
  label,
}) => {
  return (
    <div className="mb-4">
      {label && <label className="text-md font-medium mb-2 block">{label}</label>}
      <div className="flex flex-wrap gap-4">
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={onChange}
              className="accent-primary"
            />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default CustomRadioGroup;
