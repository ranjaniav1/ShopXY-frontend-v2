"use client";

import React, { useRef, useState } from "react";
import { ShoppingCart, MoveRight } from "lucide-react";
import CustomButton from "../Custom/CustomButton";
import { handleAddToCart } from "../helper/cartUtils";
import { useUser } from "../context/UserContext";
import ClientLink from "../Common/ClientClick";

const ProductGallery = ({
  detailImages,
  selectedImage,
  onImageClick,
  productName,
  productId,
}) => {
  const { user } = useUser();
  const userId = user?._id;

  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!imgRef.current) return;
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setLensPosition({ x, y });
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Side Thumbnails */}
      <div className="col-span-2 flex flex-col gap-2">
        {detailImages.map((img, id) => (
          <div
            key={id}
            className="border rounded-lg shadow cursor-pointer"
            onClick={() => onImageClick(img)}
          >
            <img
              src={img}
              alt={`Thumbnail ${id + 1}`}
              className="w-full object-cover rounded-md"
            />
          </div>
        ))}
      </div>

      {/* Main Image + Magnifier */}
      <div className="col-span-10 relative">
        <div
          className="relative border rounded-lg shadow overflow-hidden"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onMouseMove={handleMouseMove}
        >
          <img
            ref={imgRef}
            src={selectedImage}
            alt={productName}
            className="w-full h-auto object-cover rounded-lg transition-transform duration-300"
          />

          {isHovering && (
            <div
              className="absolute border border-black rounded-full pointer-events-none"
              style={{
                top: `${lensPosition.y}%`,
                left: `${lensPosition.x}%`,
                transform: "translate(-50%, -50%)",
                width: "150px",
                height: "150px",
                backgroundImage: `url(${selectedImage})`,
                backgroundSize: "200% 200%",
                backgroundPosition: `${lensPosition.x}% ${lensPosition.y}%`,
              }}
            />
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="col-span-12 mt-4 space-y-3">
        <CustomButton
          startIcon={<ShoppingCart size={16} />}
          variant="contained"
          title="Cart It"
          className="w-full"
          onClick={() => handleAddToCart({ userId, productId })}
        />

        <ClientLink href="/scheckout/carts" className="block w-full">
          <CustomButton
            startIcon={<MoveRight size={16} />}
            variant="contained"
            title="Buy Now"
            className="w-full"
            onClick={() => handleAddToCart({ userId, productId })}
          />
        </ClientLink>
      </div>
    </div>
  );
};

export default ProductGallery;
