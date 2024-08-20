'use client';
import React from 'react';
import { Typography, Grid, Box } from '@mui/material';
import ProductCard from './ProductCard';
import Link from 'next/link';

const FilterBasedProduct = ({ products }) => {
  return (
    <Box sx={{  marginTop: 2 }}>
      <Grid container spacing={3}>
        {products && products.length > 0 ? (
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Link href={`/product/${encodeURIComponent(product.slug)}`} passHref>
                <ProductCard                                         className="w-full h-60 object-contain"
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
          <Box sx={{ padding: 4 }}>
            <Typography>No products found</Typography>
          </Box>
        )}
      </Grid>
    </Box>
  );
};

export default FilterBasedProduct;
