'use client';

import React, { useEffect, useState } from 'react';
import { Box, Container, Grid } from '@mui/material';
import ProductCard from './ProductCard';
import Brands from '../Common/Brands';
import Heading from '../Common/Heading';
import Link from 'next/link';
import { GetHomeScreenData } from '../Service/GetHomeScreenData';
import { TroubleshootOutlined } from '@mui/icons-material';
import CustomSkeleton from '../Common/CustomSkeleton';
import FilterSidebar from './FilterSidebar';

const HomeProduct = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const [loading, setLoading] = useState(true);

    async function fetchCategories() {
        try {
            const result = await GetHomeScreenData();
            setProducts(result.product);
            setFilteredProducts(result.product);
            setLoading(false)
        } catch (error) {
            console.log("Failed to fetch products", error);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        let sortedProducts = [...products];

        if (sortOption === 'Price: Low to High') {
            sortedProducts.sort((a, b) => a.actual_price - b.actual_price);
        } else if (sortOption === 'Price: High to Low') {
            sortedProducts.sort((a, b) => b.actual_price - a.actual_price);
        } else if (sortOption === 'Newest Arrivals') {
            // Assuming a date property to sort by newest arrivals
            sortedProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
        }

        setFilteredProducts(sortedProducts);
    }, [sortOption, products]);

    const handleSortChange = (option) => {
        setSortOption(option);
    };

    return (
        <>
            <Heading text={"Products for You"} />            <Box sx={{ display: 'flex', flexDirection: "row" }}>

                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                    <Grid item xs={12} md={3}>
                        <Brands onSortChange={handleSortChange} />
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Grid container spacing={4}>
                            {
                                loading ? (<CustomSkeleton type="card" />) : (
                                    filteredProducts.length > 0 ? (
                                        filteredProducts.map((product) => (
                                            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}  >
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
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default HomeProduct;
