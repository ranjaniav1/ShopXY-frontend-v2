'use client';
import React, { useEffect, useState } from 'react';
import { GetAllProducts } from '../Service/GetProduct';
import { Typography, Grid, Paper } from '@mui/material';
import ProductCard from './ProductCard';
import Link from 'next/link';

const FilterBasedProduct = ({products}) => {
   

    return (
        <div className="flex-grow p-4">
            <Typography variant="h4" gutterBottom>
                Products for You
            </Typography>
            <Grid container spacing={3}>
                {products && products.length > 0 ? (
                    products.map((product) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                            <Link href={`/product/${encodeURIComponent(product.slug)}`} passHref>
                                    <ProductCard className="w-full h-60 object-contain"
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
                    <Paper className="p-4" elevation={1}>
                        <Typography>No products found</Typography>
                    </Paper>
                )}
            </Grid>
        </div>
    );
};

export default FilterBasedProduct;
