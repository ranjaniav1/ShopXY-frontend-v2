'use client';

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react'; // Lucide icon for close
import { useTranslation } from 'react-i18next';

const CustomDrawer = ({ open, onClose, title, children }) => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full bg-body z-50 transform transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        } w-full sm:w-[450px] shadow-xl flex flex-col`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-secondary text-primary">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 focus:outline-none"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex-grow overflow-y-auto">{children}</div>
      </div>
    </>
  );
};

export default CustomDrawer;
