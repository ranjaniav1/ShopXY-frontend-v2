'use client';
import React from 'react';
import { ImagePlus } from 'lucide-react'; // optional: use heroicons or any icon lib
import CustomTypography from '../Custom/CustomTypography';

const FileInput = ({ t, avatar, handleFileClick, handleFileChange }) => (
    <div
        className="flex items-center border border-dashed border-gray-300 rounded-md p-2 cursor-pointer mb-4 hover:bg-gray-50 transition"
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
            className="text-primary hover:opacity-80 focus:outline-none"
        >
            <ImagePlus className="w-6 h-6" />
        </button>

        <CustomTypography variant="body2" className="ml-2 text-gray-700">
            {avatar ? avatar.name : t('Upload Avatar')}
        </CustomTypography>
    </div>
);

export default FileInput;
