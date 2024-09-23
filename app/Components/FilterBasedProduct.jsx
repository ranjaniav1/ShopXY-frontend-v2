'use client';

import React from 'react';
import { Typography, Grid, Box } from '@mui/material';
import ProductCard from './ProductCard';
import Link from 'next/link';
import CustomBox from '../Custom/CustomBox';
import CustomSkeleton from '../Custom/CustomSkeleton';

const FilterBasedProduct = ({ products }) => {
    const truncateText = (text, maxLength) => {
        if (!text) return '';
        return text.length <= maxLength ? text : `${text.slice(0, maxLength)}...`;
    };

    return (
        <CustomBox>
            <Grid container spacing={3}>
                {products && products.length > 0 ? (
                    products.map((product) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                            <Link href={`/product/${product.product_id}/${encodeURIComponent(product.slug)}`} passHref>
                                <ProductCard className="w-full h-40 object-contain"
                                    imgSrc={product.image}
                                    title={product.name}
                                    price={product.actual_price}
                                    discountPrice={product.discounted_price}
                                    rating={product.ratings}
                                    description={truncateText(product.description, 50)}
                                    offer={product.offer}
                                />
                            </Link>
                        </Grid>
                    ))
                ) : (
                    <Grid container spacing={2}>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                <CustomSkeleton type="card" width="96px" height="96px" />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Grid>
        </CustomBox>
    );
};

export default FilterBasedProduct;
