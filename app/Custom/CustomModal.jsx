"use client";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const CustomModal = ({ open, onClose, title, children, height = "400px" }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-xl w-[90%] sm:w-[400px] md:w-[500px]"
        style={{ height }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-primary">{title}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-red-500">
            <CloseIcon />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto h-full">{children}</div>
      </div>
    </div>
  );
};

export default CustomModal;
