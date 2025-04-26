"use client";

import React, { useRef, useState } from "react";
import { Grid, Card, Box } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import CustomButton from "../Custom/CustomButton";
import { useSelector } from "react-redux";
import { handleAddToCart } from "../helper/cartUtils";
import Link from "next/link";

const ProductGallery = ({
  detailImages,
  selectedImage,
  onImageClick,
  productName,
  productId
}) => {
const userId=useSelector((state)=>state.auth?.user?.user?._id) 

// 🔹 Magnifier Effect
const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
const [isHovering, setIsHovering] = useState(false);
const imgRef = useRef(null);
  // img magnifier on mouse 
  const handleMouseMove = (e) => {
    if (!imgRef.current) return;

    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setLensPosition({ x, y });
  };
  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={2}
        md={2}
        sx={{ display: "flex", flexDirection: "column", gap: 1 }}
      >
        {detailImages.map((img, id) => (
          <Card
            key={id}
            sx={{
              cursor: "pointer",
              borderRadius: 2,
              border: "1px solid #ddd",
              boxShadow: 1
            }}
            onClick={() => onImageClick(img)}
          >
            <img
              src={img}
              alt={`Thumbnail ${id + 1}`}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                borderRadius: "8px"
              }}
            />
          </Card>
        ))}
      </Grid>
      <Grid item xs={10} md={10}>
      <Card
          sx={{
            borderRadius: 2,
            border: "1px solid #ddd",
            boxShadow: 1,
            overflow: "hidden",
            position: "relative",
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onMouseMove={handleMouseMove}
        >
          {/* 🔹 Main Product Image */}
          <img
            ref={imgRef}
            src={selectedImage}
            alt={productName}
            style={{
              width: "100%",
              height: "30%",
              objectFit: "cover",
              borderRadius: "8px",
              transition: "transform 0.3s ease-in-out"
            }}
          />

          {/* 🔹 Magnifier Effect */}
          {isHovering && (
            <Box
              sx={{
                position: "absolute",
                top: `${lensPosition.y}%`,
                left: `${lensPosition.x}%`,
                transform: "translate(-50%, -50%)",
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                border: "2px solid #000",
                background: `url(${selectedImage})`,
                backgroundSize: "200% 200%",
                backgroundPosition: `${lensPosition.x}% ${lensPosition.y}%`,
                pointerEvents: "none"
              }}
            />
          )}
        </Card>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <CustomButton
            startIcon={<AddShoppingCartIcon />}
            variant="contained"
            title="Cart It"
            className="w-full"
            onClick={()=>handleAddToCart({userId:userId,productId:productId})}
          />
        </Grid>
        <Grid item xs={12}>
        <Link href="/scheckout/carts" className="w-full">
          <CustomButton
            startIcon={<DoubleArrowIcon />}
            variant="contained"
            title="Buy Now"
            className="w-full"
            onClick={()=>handleAddToCart({userId:userId,productId:productId})}

          /></Link>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductGallery;
