'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import CustomButton from './CustomButton';

const CustomDrawer = ({ open, onClose, title, children }) => {
    const { t } = useTranslation();

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${open ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-base-100 z-50 transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Header */}
                <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 bg-base-100">
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <CustomButton
                        onClick={onClose}
                        variant="text"
                        size="small"
                        className="p-1"
                        startIcon={<X className="w-5 h-5" />}
                    />
                </div>

                {/* Content */}
                <div className="p-4 bg-secondary/10 h-full overflow-y-auto">
                    {children}
                </div>
            </div>
        </>
    );
};

export default CustomDrawer;
