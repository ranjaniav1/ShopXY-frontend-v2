'use client'
import React from 'react';
import Link from 'next/link';
import { Box, Tooltip, Typography, useTheme } from '@mui/material';

const CustomCollectionCard = ({ id, slug, image, title, tooltip }) => {
    const theme = useTheme();

    return (
        <Box
            key={id}
            className="relative flex flex-col items-center rounded-md overflow-hidden shadow-lg"
            sx={{
                border: `1px solid ${theme.palette.card.border}`,
                transition: 'border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                    borderColor: theme.palette.card.hover,
                    transform: 'scale(1.05)', // Optional for a slight zoom effect
                    
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Optional for a hover shadow effect
                },
                background: `${theme.palette.card.background}`,
                overflow: 'hidden', // Ensure children don't overflow outside the rounded corners
            }}
        >
            <Link href={`/categories/collections/${id}/${encodeURIComponent(slug)}`}>
                <Tooltip title={tooltip} arrow>
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-44 object-cover cursor-pointer"
                    />
                </Tooltip>
            </Link>
            <Box
                className="absolute inset-0 flex items-center justify-center"
                sx={{
                    background: 'rgba(0, 0, 0, 0.5)', // Dark background with opacity
                    transition: 'opacity 0.3s ease',
                    opacity: 0,
                    '&:hover': {
                        opacity: 1,
                    },
                }}
            >
                <Typography
                    variant="body1"
                    component="p"
                    className="text-lg font-semibold text-white text-center p-4"
                >
                    {title}
                </Typography>
            </Box>
        </Box>
    );
};

export default CustomCollectionCard;
