'use client';

import CustomTypography from "@/app/Custom/CustomTypography";
import React from "react";

const tabs = [
  "Notifications",
  "Wishlist",
  "Orders",
  "Address",
  "Logout",
  "Delete Account",
];

const TabSection = ({ activeTab, handleTabChange }) => {
  return (
    <div className="p-4 bg-body text-tprimary rounded-lg shadow-md w-full">
      <div className="flex flex-col space-y-2">
        {tabs.map((label, index) => (
          <button
            key={index}
            onClick={() => handleTabChange(null, index)}
            className={`text-left w-full px-4 py-2 rounded-md transition-colors duration-200
              ${activeTab === index
                ? "text-primary font-semibold bg-primary/10"
                : "text-tprimary hover:bg-secondary/10"}`}
          >
            <CustomTypography variant="body2">{label}</CustomTypography>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabSection;
