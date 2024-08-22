'use client';

import React from 'react';
import { Card, CardContent, Typography, Box, Grid, Avatar, Button, Divider, Chip, useTheme } from '@mui/material';
import Rating from '@mui/material/Rating';
import { useTranslation } from 'react-i18next';

// Reusable ProductCard Component
const ProductCard = ({ title, children, theme }) => (
    <Card sx={{ borderRadius: 2, boxShadow: 2, backgroundColor: theme.palette.card.background, mb: 2 }}>
        <CardContent>
            <Typography variant="h6">
                {title}
            </Typography>
            {children}
        </CardContent>
    </Card>
);

// Reusable RatingReview Component
const RatingReview = ({ starCount, reviewCount }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Rating value={starCount} readOnly size="small" />
        <Typography variant="body2" color="text.secondary">
            {reviewCount} {reviewCount === 1 ? 'Review' : 'Reviews'}
        </Typography>
    </Box>
);

// Reusable ReviewItem Component
const ReviewItem = ({ review, theme }) => (
    <Card sx={{ p: 2, backgroundColor: theme.palette.card.background, boxShadow: 1, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar>{review.name ? review.name.charAt(0) : '?'}</Avatar>
            <Box>
                <Typography variant="body2" fontWeight="bold">
                    {review.name}
                </Typography>
                <Rating value={review.rating} readOnly size="small" />
                <Typography variant="body2" color="text.secondary">
                    {review.date}
                </Typography>
            </Box>
        </Box>
        <Typography variant="body2" mt={2}>
            {review.description}
        </Typography>
        {review.image && (
            <img src={review.image} alt="Review" style={{ width: '100%', height: 'auto', marginTop: '8px', borderRadius: '4px' }} />
        )}
    </Card>
);

const ProductDetails = ({
    name,
    actual_price,
    discounted_price,
    offer,
    ratings,
    reviews = [], // Default to an empty array if undefined
    description,
    colors = [], // Default to an empty array if undefined
    sizes = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'], // Default to an empty array if undefined
    full_description,
    delivery,
}) => {
    const theme = useTheme();
    const { t } = useTranslation()
    return (
        <Grid container spacing={4}>
            {/* Card 1: Product Description, Price, Rating */}
            <Grid item xs={12}>
                <ProductCard title={name} theme={theme}>
                    <Typography variant="body2" color="gray">
                        {description}
                    </Typography>
                    <Typography variant="h5" color="seagreen" gutterBottom>
                        ₹{discounted_price}{' '}
                        {discounted_price && (
                            <span style={{ textDecoration: 'line-through', marginLeft: '8px', color: 'red' }}>
                                ₹{actual_price}
                            </span>
                        )}
                    </Typography>
                    <Rating value={ratings} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary">
                        {reviews.length}{t(" Reviews")}
                    </Typography>
                    <Typography variant="body2" mt={2}>
                        Free Delivery
                    </Typography>
                </ProductCard>
            </Grid>

            {/* Card 2: Select Size */}
            <Grid item xs={12}>
                <ProductCard title={t("Select Size")} theme={theme}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {sizes.map((size, index) => (
                            <Button key={index} variant="outlined" sx={{ background: theme.palette.card.background, color: theme.palette.card.border, border: theme.palette.card.border }}>
                                {size}
                            </Button>
                        ))}
                    </Box>
                </ProductCard>
            </Grid>

            {/* Card 3: Product Details */}
            <Grid item xs={12}>
                <ProductCard title="Product Details" theme={theme}>
                    <Typography variant="body2" color="text.secondary">
                        Name: {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Colors: {colors.join(', ')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Sizes: {sizes.join(', ')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Description: {full_description}
                    </Typography>
                </ProductCard>
            </Grid>

            {/* Card 4: Ratings and Reviews */}
            <Grid item xs={12}>
                <ProductCard title="Ratings & Reviews" theme={theme}>
                    {Array.from({ length: 5 }, (_, i) => (
                        <RatingReview
                            key={i + 1}
                            starCount={i + 1}
                            reviewCount={reviews.filter((review) => review.rating === i + 1).length}
                        />
                    ))}
                    <Divider />
                    {reviews.map((review, index) => (
                        <ReviewItem key={index} review={review} theme={theme} />
                    ))}
                </ProductCard>
            </Grid>
        </Grid>
    );
};

export default ProductDetails;
