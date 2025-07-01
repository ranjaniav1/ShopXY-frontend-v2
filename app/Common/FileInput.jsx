"use client";

import React from "react";
import { ImagePlus } from "lucide-react"; // Lucide icon for photo upload

const FileInput = ({ t, avatar, handleFileClick, handleFileChange }) => (
  <div
    className="flex items-center border border-dashed border-gray-300 rounded px-3 py-2 cursor-pointer mb-2"
    onClick={handleFileClick}
  >
    <input
      type="file"
      id="avatar-upload"
      accept="image/*"
      className="hidden"
      onChange={handleFileChange}
    />
    <button
      type="button"
      className="p-1 text-primary hover:bg-gray-100 rounded"
    >
      <ImagePlus className="w-5 h-5" />
    </button>
    <span className="ml-2 text-sm text-tsecondary">
      {avatar ? avatar.name : t("Upload Avatar")}
    </span>
  </div>
);

export default FileInput;
