"use client";
import React from "react";
import { Box, Tooltip, Typography, useTheme } from "@mui/material";
import CustomTypography from "../Custom/CustomTypography";
import Image from "next/image";

const CustomCollectionCard = ({ id, slug, image, title, tooltip }) => {
  const theme = useTheme();

  return (
    <Box
      key={id}
      className="relative flex flex-col items-center rounded-md overflow-hidden shadow-lg"
      sx={{
        border: `1px solid ${theme.palette.card.border}`,
        transition:
          "border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          borderColor: theme.palette.card.hover,
          transform: "scale(1.05)",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)"
        },
        background: `${theme.palette.card.background}`,
        overflow: "hidden"
      }}
    >
      <Tooltip title={tooltip} arrow>
        <Image
          src={image}
          alt={`Collection image of ${title}`}
          width={500} // specify the width you want
          height={200} // specify the height you want
          className="w-full h-48 object-cover cursor-pointer"
        />
      </Tooltip>
      <Box
        className="absolute inset-0 flex items-center justify-center"
        sx={{
          background: "rgba(0, 0, 0, 0.5)",
          transition: "opacity 0.3s ease",
          opacity: 0,
          "&:hover": {
            opacity: 1
          }
        }}
      >
        <CustomTypography
          variant="body2"
          component="p"
          className=" text-white text-center p-4"
        >
          {title}
        </CustomTypography>
      </Box>
    </Box>
  );
};

export default CustomCollectionCard;
