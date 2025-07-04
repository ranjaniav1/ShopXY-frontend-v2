"use client";

import React from "react";

const Heading = ({ text, className = "", children }) => {
  return (
    <div
      className={`flex justify-between items-center  px-3 py-2 rounded-md text-xl text-tprimary font-bold ${className}`}
    >
      <h2>{text}</h2>
      {children}
    </div>
  );
};

export default Heading;
