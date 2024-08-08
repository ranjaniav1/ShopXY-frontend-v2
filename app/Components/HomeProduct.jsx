'use client';

import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import { GetCategories } from '../Service/GetCategory';
import ProductCard from './ProductCard';
import Brands from '../Common/Brands';
import Heading from '../Common/Heading';

const HomeProduct = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortOption, setSortOption] = useState('');

    async function fetchCategories() {
        try {
            const result = await GetCategories();
            setProducts(result.product);
            setFilteredProducts(result.product); 
        } catch (error) {
            console.log("Failed to fetch products", error);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        let sortedProducts = [...products];

        // Apply sorting
        if (sortOption === 'Price: Low to High') {
            sortedProducts.sort((a, b) => a.actual_price - b.actual_price);
        } else if (sortOption === 'Price: High to Low') {
            sortedProducts.sort((a, b) => b.actual_price - a.actual_price);
        } else if (sortOption === 'Newest Arrivals') {
            // Assume you have a date property to sort by newest arrivals
            sortedProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
        }

        setFilteredProducts(sortedProducts);
    }, [sortOption, products]);

    const handleSortChange = (option) => {
        setSortOption(option);
    };

    return (
        <Container maxWidth="xl" sx={{ my: 4 }}>
            <Heading text="Products for you" />
            <Grid container spacing={4}>
                <Grid item xs={12} md={3}>
                    <Brands onSortChange={handleSortChange} />
                </Grid>
                <Grid item xs={12} md={9}>
                    <Grid container spacing={4}>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                                    <ProductCard
                                        imgSrc={product.image}
                                        title={product.name}
                                        price={product.actual_price}
                                        discountPrice={product.discounted_price}
                                        rating={product.ratings}
                                        description={product.description}
                                        offer={product.offer}
                                    />
                                </Grid>
                            ))
                        ) : (
                            <Grid item xs={12}>
                                <p className="text-center text-gray-500">No products found</p>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default HomeProduct;
