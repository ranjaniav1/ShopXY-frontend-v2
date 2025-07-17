"use client";

import React from "react";

const Heading = ({ text, className = "", children }) => {
  return (
    <div
      className={`flex justify-between items-center rounded-lg text-xl text-tprimary font-bold ${className}`}
    >
      <h2 className="py-4">{text}</h2>
      {children}
    </div>
  );
};

export default Heading;
