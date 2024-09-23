import React from 'react';
import { Box, Typography, Divider, Avatar, Rating } from '@mui/material';

const BrandReview = ({ brand }) => {
    const reviews = brand.reviews || []; // Assuming reviews are part of the brand object

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
                Reviews for {brand.title}
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />

            {reviews.length === 0 ? (
                <Typography variant="body2">No reviews available.</Typography>
            ) : (
                reviews.map((review, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', marginBottom: 2 }}>
                        <Avatar alt={review.name} src={review.avatarUrl} sx={{ marginRight: 2 }} />
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                {review.name}
                            </Typography>
                            <Rating value={review.rating} readOnly precision={0.5} sx={{ marginBottom: 1 }} />
                            <Typography variant="body2">{review.description}</Typography>
                        </Box>
                    </Box>
                ))
            )}
        </Box>
    );
};

export default BrandReview;
