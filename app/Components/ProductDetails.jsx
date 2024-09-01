'use client';

import React from 'react';
import { Card, CardContent, Typography, Box, Grid, Avatar, Button, Divider, Chip, useTheme } from '@mui/material';
import Rating from '@mui/material/Rating';
import { useTranslation } from 'react-i18next';
import CustomButton from '../Custom/CustomButton';

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
            {reviewCount} {reviewCount === 1 ? ('Review') : ('Reviews')}
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
                    {review.user}
                </Typography>
                <Rating value={review.rating} readOnly size="small" />
                <Typography variant="body2" color="text.secondary">
                    {review.date}
                </Typography>
            </Box>
        </Box>
        <Typography variant="body2" mt={2}>
            {review.comment}
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
    full_description, special_offer, gst_type,
    delivery, brand
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
                        )}  {offer}%OFF
                    </Typography>
                    <Rating value={ratings} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary">
                        {reviews.length}{t(" Reviews")}
                    </Typography>
                    <Typography variant="body2" mt={2}>
                        {t('Free Delivery')}
                    </Typography>
                </ProductCard>
            </Grid>

            {/* Card 2: Select Size */}
            <Grid item xs={12}>
                <ProductCard title={t("Select Size")} theme={theme}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {sizes.map((size) => (
                            <CustomButton title={size} key={size}/>
                        ))}
                    </Box>
                </ProductCard>
            </Grid>

            {/* Card 3: Product Details */}
            <Grid item xs={12}>
                <ProductCard title={t("Product Details")} theme={theme}>
                    <Typography variant="body2" color="text.secondary">
                        {t('Name')}: {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {t('Colors')}: {colors.join(', ')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {t('Sizes')}: {sizes.join(', ')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {t('Description')}: {full_description}
                    </Typography><Typography variant="body2" color="text.secondary">
                        {t('Special Offer')}: {special_offer}
                    </Typography><Typography variant="body2" color="text.secondary">
                        {t('GST Type')}: {gst_type}
                    </Typography><Typography variant="body2" color="text.secondary">
                        {t('Brand')}: {brand}
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
            {/* Card 5: Delivery Options */}
            <Grid item xs={12}>
                <ProductCard title={t("Delivery Options")} theme={theme}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {delivery.free_delivery && (
                            <Chip label={t('Free Delivery')} color="success" />
                        )}
                        {delivery.cash_on_delivery && (
                            <Chip label={t('Cash on Delivery')} color="primary" />
                        )}
                        {delivery.return_policy && (
                            <Typography variant="body2" color="text.secondary">
                                {t('Return Policy')}: {delivery.return_policy}
                            </Typography>
                        )}
                    </Box>
                </ProductCard>
            </Grid>
        </Grid >
    );
};

export default ProductDetails;
