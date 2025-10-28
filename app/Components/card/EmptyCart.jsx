'use client';
import React from 'react';
import CustomButton from '../../Custom/CustomButton';
import CustomTypography from '../../Custom/CustomTypography';
import ClientLink from '../../Common/ClientClick';

const EmptyCart = ({
  src,
  title,
  buttonHref = "/categories/collections",
  buttonText = "Start Shopping",
  subtitle
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center w-full h-full pt-8 pb-24 bg-body text-tprimary">
      {/* Animated Image */}
      <img
        src={src}
        alt="empty content"
        className="h-[250px] object-cover animate-scaleUp"
      />

      {/* Title */}
      <CustomTypography variant="h6" className="mb-1 text-tprimary">
        {title}
      </CustomTypography>

      {/* Subtitle */}
      {subtitle && (
        <CustomTypography variant="body2" className="mb-4 max-w-md text-tsecondary">
          {subtitle}
        </CustomTypography>
      )}

      {/* CTA Button */}
      <ClientLink href={buttonHref} passHref>
        <CustomButton title={buttonText} />
      </ClientLink>

      {/* Animation */}
      <style>
        {`
          @keyframes scaleUp {
            0% {
              transform: scale(1);
            }
            100% {
              transform: scale(1.05);
            }
          }

          .animate-scaleUp {
            animation: scaleUp 2s infinite alternate;
          }
        `}
      </style>
    </div>
  );
};

export default EmptyCart;
