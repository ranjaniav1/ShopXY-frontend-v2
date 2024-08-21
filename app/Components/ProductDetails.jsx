'use client';

import React from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';

const ProductDetails = ({
    name,
    actual_price,
    discounted_price,
    offer,
    ratings,
    special_offer,
    reviews,
    description,
    full_description,
    delivery,
    size,
    tags
}) => {
    return (
        <Grid container spacing={4} sx=

            {{ display: 'flex', flexDirection: 'column' }}>
            {/* Card 1: Basic Details */}
            <Grid item xs={12} md={2}>
                <Card sx={{ borderRadius: 2, border: '1px solid #ddd', boxShadow: 2 }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Product Details
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            {name}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            Price: ₹{actual_price}
                        </Typography>
                        {discounted_price && (
                            <Typography variant="body1" color="text.primary">
                                Discounted Price: ₹{discounted_price}
                            </Typography>
                        )}
                        <Typography variant="body1" color="text.primary">
                            Offer: {offer}%
                        </Typography>
                        {special_offer && (
                            <Typography variant="body1" color="primary">
                                Special Offer: {special_offer}
                            </Typography>
                        )}
                    </CardContent>
                </Card>
            </Grid>

            {/* Card 2: Additional Information */}
            <Grid item xs={12} md={2}>
                <Card sx={{ borderRadius: 2, border: '1px solid #ddd', boxShadow: 2 }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Additional Information
                        </Typography>
                        {description && (
                            <Typography variant="body1" color="text.secondary">
                                Description: {description}
                            </Typography>
                        )}
                        {full_description && (
                            <Typography variant="body1" color="text.secondary">
                                Full Description: {full_description}
                            </Typography>
                        )}
                        {delivery && (
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="body1" color="text.secondary">
                                    Delivery Info:
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Free Delivery: {delivery.free_delivery ? 'Yes' : 'No'}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Cash on Delivery: {delivery.cash_on_delivery ? 'Yes' : 'No'}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Return Policy: {delivery.return_policy}
                                </Typography>
                            </Box>
                        )}
                    </CardContent>
                </Card>
            </Grid>

            {/* Card 3: Ratings, Reviews & Tags */}
            <Grid item xs={12} md={2}>
                <Card sx={{ borderRadius: 2, border: '1px solid #ddd', boxShadow: 2 }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Ratings & Reviews
                        </Typography>
                        {ratings && (
                            <Typography variant="body1" color="text.secondary">
                                Rating: {ratings} ★
                            </Typography>
                        )}
                        {reviews && reviews.length > 0 && (
                            <Box>
                                <Typography variant="body1" color="text.secondary">
                                    Reviews:
                                </Typography>
                                {reviews.map((review, index) => (
                                    <Box key={index} sx={{ mb: 1 }}>
                                        <Typography variant="body2" color="text.primary">
                                            {review.author}: {review.comment}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        )}
                        {tags && tags.length > 0 && (
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="body1" color="text.secondary">
                                    Tags:
                                </Typography>
                                {tags.map((tag, index) => (
                                    <Typography key={index} variant="body2" color="text.primary" sx={{ mr: 1 }}>
                                        #{tag}
                                    </Typography>
                                ))}
                            </Box>
                        )}
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default ProductDetails;
