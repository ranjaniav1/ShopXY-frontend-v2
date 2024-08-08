'use client';

import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { GetCategories } from '../../Service/GetCategory'; // Adjust the path as needed
import { useParams } from 'next/navigation';

const CategoryPage = () => {
    const { productTitle } = useParams(); // Get the productTitle from the query parameters
console.log(productTitle);

    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (productTitle) {
            async function fetchProduct() {
                try {
                    const result = await GetCategories(); // Fetch all products
                    const selectedProduct = result.product.find(p => p.name === productTitle); // Match by title
                    console.log("singleProduct",selectedProduct)
                    setProduct(selectedProduct);
                } catch (error) {
                    console.log("Failed to fetch product", error);
                }
            }

            fetchProduct();
        }
    }, [productTitle]);

    if (!product) return <p>Loading...</p>;

    return (
        <Container maxWidth="lg" style={{ marginTop: '20px' }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6} style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src={product.image}
                        alt={product.name}
                        style={{
                            width: '100%',
                            height: 'auto',
                            objectFit: 'cover',
                            borderRadius: '8px',
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="body1" paragraph>
                        {product.description}
                    </Typography>
                    <Typography variant="h6">
                        Price: ₹{product.actual_price}
                    </Typography>
                    {product.discounted_price && (
                        <Typography variant="body1" color="textSecondary">
                            Discounted Price: ₹{product.discounted_price}
                        </Typography>
                    )}
                    {product.offer && (
                        <Typography variant="body1" color="primary">
                            Offer: {product.offer}
                        </Typography>
                    )}
                    {/* Add other product details as needed */}
                </Grid>
            </Grid>
        </Container>
    );
};

export default CategoryPage;
