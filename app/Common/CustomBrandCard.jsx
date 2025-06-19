"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import Link from "next/link";



const CustomBrandCard = ({ id, slug, image, title }) => {
    return (
        <Link href={`/categories/collections/${id}/${slug}`} passHref>
            <Box className="group flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300">
                {/* Brand Logo */}
                <Box className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-white shadow-sm border border-gray-200 group-hover:shadow-md group-hover:border-primary transition duration-300 ease-in-out">
                    <img
                        src={image}
                        alt={title}
                        title={title}
                        className="object-contain w-full h-full opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                        loading="lazy"
                    />
                </Box>

                {/* Brand Title */}
                <Typography
                    component="h3"
                    className="mt-2 text-sm sm:text-base font-medium text-gray-700 group-hover:text-primary transition-colors duration-200 truncate w-28 sm:w-32"
                >
                    {title}
                </Typography>
            </Box>
        </Link>
    );
};

export default CustomBrandCard;
