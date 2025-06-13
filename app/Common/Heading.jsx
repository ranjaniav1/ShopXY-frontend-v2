"use client";
import React from "react";

const Heading = ({ text, className = "", children }) => {
  return (
    <div
      className={`flex justify-between items-center mb-2 text-black px-3 py-2 rounded-md font-semibold text-xl ${className}`}
    >
      <h2 className="font-bold">{text}</h2>
      {children && <div className="ml-4">{children}</div>}
    </div>
  );
};

export default Heading;
