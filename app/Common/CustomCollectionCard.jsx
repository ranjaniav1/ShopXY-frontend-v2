import React from 'react';
import Link from 'next/link';
import { Box, Typography, useTheme } from '@mui/material';

const CustomCollectionCard = ({ id, slug, image, title }) => {
    const theme = useTheme();

    return (
        <Box
            key={id}
            className="flex flex-col items-center rounded-md overflow-hidden shadow-lg transition: 'transform 0.3s ease, box-shadow 0.3s ease',
" 
            sx={{
                border: `1px solid ${theme.palette.card.border}`,
                transition: 'border-color 0.3s ease',
                '&:hover': {
                    borderColor: theme.palette.card.hover,
                }, background: `${theme.palette.card.background}`
            }}        >
            <Link href={`/categories/collections/${id}/${encodeURIComponent(slug)}`}>
                <img
                    src={image}
                    alt={title}
                    className="w-full h-56 object-cover"
                />
            </Link>
            <Typography variant="body1" component="p" className="text-lg font-semibold text-center p-4">
                {title}
            </Typography>
        </Box>
    );
};

export default CustomCollectionCard;
