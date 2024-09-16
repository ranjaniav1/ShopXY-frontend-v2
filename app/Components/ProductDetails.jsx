'use client';

import React from 'react';
import { Card, CardContent, Typography, Box, Grid, Avatar, Button, Divider, Chip, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CustomButton from '../Custom/CustomButton';
import ReviewComponents from './RatindReview';
import BrandRating from './BrandRating';

// Reusable ProductCard Component
const ProductCard = ({ title, children, theme }) => (
    <Card sx={{ borderRadius: 2, backgroundColor: theme.palette.card.background, mb: 2 }}>
        <CardContent>
            <Typography variant="h6">
                {title}
            </Typography>
            {children}
        </CardContent>
    </Card>
);

const ProductDetails = ({
    name,
    actual_price,
    discounted_price,
    offer,
    description,
    colors = [], // Default to an empty array if undefined
    sizes = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'], // Default to an empty array if undefined
    full_description, special_offer, gst_type,
    delivery, brand, productId, product_id
}) => {
    const theme = useTheme();
    const { t } = useTranslation()
    return (
        <Grid container spacing={4}>
            {/* Card 1: Product Description, Price */}
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
                    <Typography variant="body2" mt={2}>
                        {t('Free Delivery')}
                    </Typography>
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
            {/* card 4 brand rating review */}
            <Grid item xs={12}>

                <BrandRating BrandId={product_id} />            </Grid>
            {/* Card 5: Ratings and Reviews */}
            <Grid item xs={12}>
                <ProductCard title="Ratings & Reviews" theme={theme}>
                    <ReviewComponents productId={productId} />
                </ProductCard>
            </Grid>

        </Grid >
    );
};

export default ProductDetails;
