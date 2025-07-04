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

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Thumbnails */}
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
              className="w-full h-16 object-cover rounded-md"
            />
          </div>
        ))}
      </div>

      {/* Main Image */}
      <div className="col-span-10">
        <div className="border rounded-lg shadow overflow-hidden w-full md:w-[400px] h-[400px]">
          <img
            src={selectedImage}
            alt={productName}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Cart & Buy Buttons */}
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
