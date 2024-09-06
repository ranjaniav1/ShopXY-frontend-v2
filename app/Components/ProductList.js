'use client';

import React from 'react';
import { Grid } from '@mui/material';
import ProductCard from './ProductCard';
import Link from 'next/link';
import CustomSkeleton from '../Custom/CustomSkeleton';

const ProductList = ({ products, loading }) => (
    <Grid container spacing={2}>
        {loading ? (
            <CustomSkeleton type="card" />
        ) : products.length ? (
            products.map(product => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                    <Link href={`/product/${encodeURIComponent(product.slug)}`}>
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
            <Grid item xs={12}>
                <p className="text-center text-gray-500">No products found</p>
            </Grid>
        )}
    </Grid>
);

export default ProductList;
