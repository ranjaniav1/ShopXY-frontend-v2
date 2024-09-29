'use client';

import React from 'react';
import { Typography, Box, Grid, useTheme, Card } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ReviewComponents from './RatindReview';
import BrandRating from './BrandRating';
import CustomTypography from '../Custom/CustomTypography';

const ProductDetails = ({
    name,
    actual_price,
    discounted_price,
    offer,
    description,
    colors = [], // Default to an empty array if undefined
    sizes = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'], // Default to an empty array if undefined
    full_description, special_offer, gst_type,
    productId, brand
}) => {
    const theme = useTheme();
    const { t } = useTranslation()
    return (
        <Grid container spacing={4}>
            {/* Card 1: Product Description, Price */}
            <Grid item xs={12}>
                <Card sx={{ p: 2 }}>
                    <CustomTypography variant="h4" sx={{ color: theme.palette.card.text }}>
                        {name}
                    </CustomTypography>
                    <CustomTypography variant="body2" sx={{ color: theme.palette.card.text }}>
                        {description}
                    </CustomTypography>
                    <CustomTypography variant="h5" className="text-green-600 mb-2">
                        ₹{discounted_price}{' '}
                        {discounted_price && (
                            <span style={{ textDecoration: 'line-through', marginLeft: '8px', color: 'red' }}>
                                ₹{actual_price}
                            </span>
                        )} {offer}% OFF
                    </CustomTypography>
                    <CustomTypography variant="body2" className="mt-2">
                        {t('Free Delivery')}
                    </CustomTypography>
                </Card>
            </Grid>

            {/* Card 3: Product Details */}
            <Grid item xs={12}>
                <Card sx={{ p: 2 }}>
                    <CustomTypography variant="h4" sx={{ color: theme.palette.card.text }}>
                        {t('Product details')}:
                    </CustomTypography>
                    <CustomTypography variant="body2" sx={{ color: theme.palette.card.text }}>
                        {t('Sizes')}: {sizes.join(', ')}
                    </CustomTypography>
                    <CustomTypography variant="body2" sx={{ color: theme.palette.card.text }}>
                        {t('Description')}: {full_description}
                    </CustomTypography>
                    <CustomTypography variant="body2" sx={{ color: theme.palette.card.text }}>
                        {t('Special Offer')}: {special_offer}
                    </CustomTypography>
                    <CustomTypography variant="body2" sx={{ color: theme.palette.card.text }}>
                        {t('GST Type')}: {gst_type}
                    </CustomTypography>
                </Card>
            </Grid>
            {/* card 4 brand rating review */}
            <Grid item xs={12}>
                <BrandRating brand={brand} brandId={productId} sx={{ p: 2 }} />
            </Grid>
            {/* Card 5: Ratings and Reviews */}
            <Grid item xs={12}>
                <Card theme={theme} sx={{ p: 2 }}>
                    <CustomTypography variant="h4" sx={{ color: theme.palette.card.text }}>
                        {t('Rating & Reviews')}
                    </CustomTypography>
                    <ReviewComponents productId={productId} sx={{ p: 2 }} />
                </Card>
            </Grid>
        </Grid >
    );
};

export default ProductDetails;
