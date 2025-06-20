'use client';
import React from 'react';
import { X } from 'lucide-react'; // ✅ Lucide close icon
import CustomIconButton from './CustomIconButton';
import CustomTypography from './CustomTypography';

const CustomModal = ({ open, onClose, title, children, height = 'auto' }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className={`bg-white dark:bg-[var(--body)] rounded-lg shadow-lg w-[90%] sm:w-[400px] md:w-[500px] max-w-full p-5`}
        style={{ height }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <CustomTypography className="text-lg font-semibold text-primary dark:text-white">
            {title}
          </CustomTypography>
          <CustomIconButton onClick={onClose}>
            <X className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          </CustomIconButton>
        </div>

        {/* Content */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default CustomModal;
