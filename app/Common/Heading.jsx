"use client";
import React from "react";

const Heading = ({ text, className = "", children }) => {
  return (
    <div
      className={`flex justify-between items-center my-4 px-3 py-2 rounded-md font-semibold text-xl  ${className}`}
    >
      <h2 className="text-tprimary font-bold">{text}</h2>
      {children}
    </div>
  );
};

export default Heading;
