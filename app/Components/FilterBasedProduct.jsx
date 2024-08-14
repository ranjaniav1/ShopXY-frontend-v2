'use client';
import React from 'react';
import { Typography, Grid, Paper, Box } from '@mui/material';
import ProductCard from './ProductCard';
import Link from 'next/link';
import Heading from '../Common/Heading';

const FilterBasedProduct = ({ products }) => {
    return (
        <Box className="flex-grow p-4 div-body" sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            {/* Heading */}
            <Heading text={"Products for You"} className="text-4xl mb-5 btn p-4 rounded-md" />

            {/* Scrollable container for products */}
            <Box
                sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Grid container spacing={3}>
                    {products && products.length > 0 ? (
                        products.map((product) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                                <Link href={`/product/${encodeURIComponent(product.slug)}`} passHref>
                                    <ProductCard
                                        className="w-full h-60 object-contain"
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
            </Box>
        </Box>
    );
};

export default FilterBasedProduct;
