'use client';

import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, useTheme } from '@mui/material';
import ProductCard from './ProductCard';
import Brands from '../Common/Brands';
import Heading from '../Common/Heading';
import Link from 'next/link';
import CustomSkeleton from '../Common/CustomSkeleton';
import { GetAllProducts } from '../Service/GetProduct';

const HomeProduct = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();

    async function fetchCategories() {
        try {
            const result = await GetAllProducts();
            setProducts(result.data);
            setLoading(false);
        } catch (error) {
            console.log("Failed to fetch products", error);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <>
            <Heading text={"Products for You"} />
            <Box sx={{ display: 'flex', flexDirection: "row" }}>
                <Grid container spacing={4} sx={{ marginTop: 2 }}>
                    <Grid item xs={12} md={3} sx={{ background: theme.palette.background.main, borderRadius: '5px' }}>
                        <Brands />
                    </Grid>
                    <Grid item xs={12} md={9} sx={{
                        borderRadius: '5px', background: theme.palette.background.main
                    }}>
                        <Grid container spacing={4} sx={{ paddingRight: '20px' }}>
                            {
                                loading ? (<CustomSkeleton type="card" />) : (
                                    products.length > 0 ? (
                                        products.map((product) => (
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
                                    )
                                )
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default HomeProduct;
