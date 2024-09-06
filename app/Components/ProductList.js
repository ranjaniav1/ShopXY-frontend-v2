'use client';

import React from 'react';
import { Grid, useTheme, Typography } from '@mui/material';
import ProductCard from './ProductCard';
import Link from 'next/link';
import CustomSkeleton from '../Custom/CustomSkeleton';

const ProductList = ({ products, loading }) => {
    const theme = useTheme(); // Use theme inside the component

    return (
        <Grid container spacing={2} sx={{ background: theme.palette.background.main }}>
            {loading ? (
                <CustomSkeleton type="card" />
            ) : products.length ? (
                products.map(product => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                        <Link href={`/product/${encodeURIComponent(product.slug)}`} passHref>
                            <ProductCard
                                className="w-full h-48 object-contain"
                                imgSrc={product.image}
                                title={product.name}
                                price={product.actual_price}
                                discountPrice={product.discounted_price}
                                rating={product.ratings}
                                description={product.description}
                                offer={product.offer}
                            />
                        </Link>
                    </Grid>
                ))
            ) : (
                <Grid item xs={12}>
                    <Typography variant="h6" align="center" color="textSecondary">
                        No products found
                    </Typography>
                </Grid>
            )}
        </Grid>
    );
};

export default ProductList;
