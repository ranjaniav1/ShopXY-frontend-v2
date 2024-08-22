'use client';

import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, useTheme } from '@mui/material';
import ProductCard from './ProductCard';
import Brands from '../Common/Brands';
import Heading from '../Common/Heading';
import Link from 'next/link';
import CustomSkeleton from '../Common/CustomSkeleton';
import { GetAllProducts } from '../Service/GetProduct';
import FilterSidebar from './FilterSidebar';
import CustomBox from '../Common/CustomBox';

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
            <Grid container spacing={2} >
                <Grid item xs={12} md={3} sx={{ mt: 3.5 }} >
                    <Brands />
                    {/* <FilterSidebar /> */}
                </Grid>
                <Grid item xs={12} md={9}>
                    <CustomBox>
                        <Grid container spacing={2} >
                            {
                                loading ? (<CustomSkeleton type="card" />) : (
                                    products.length > 0 ? (
                                        products.map((product) => (
                                            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                                                <Link href={`/product/${encodeURIComponent(product.slug)}`}>
                                                    <ProductCard
                                                        className="w-full h-60 object-contain "
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
                        </Grid></CustomBox>
                </Grid>
            </Grid>
        </>
    );
};

export default HomeProduct;
