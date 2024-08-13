'use client';

import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography, Card, CardContent } from '@mui/material';
import { useParams } from 'next/navigation';
import { GetProducts } from '@/app/Service/GetProduct';
import CustomButton from '@/app/Common/CustomButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import ProductDetailInfo from '@/app/Common/ProductDetailInfo';

const Page = () => {
    const { productTitle } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState('');

    async function fetchProduct() {
        try {
            const result = await GetProducts({ slug: productTitle });
            setProduct(result.data);
            setSelectedImage(result.data.image);
        } catch (error) {
            console.log("Failed to fetch product", error);
        }
    }

    useEffect(() => {
        fetchProduct();
    }, []);

    if (!product) return <Typography variant="h6">Loading...</Typography>;

    return (
            <Grid container spacing={4}>
                {/* Left side: Image gallery */}
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={2} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {product.detail_image.map((img, index) => (
                                <Card
                                    key={index}
                                    sx={{ 
                                        cursor: 'pointer', 
                                        borderRadius: 2, 
                                        border: '1px solid #ddd',
                                        boxShadow: 1
                                    }}
                                    onClick={() => setSelectedImage(img)}
                                >
                                    <img
                                        src={img}
                                        alt={`Thumbnail ${index + 1}`}
                                        style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '8px' }}
                                    />
                                </Card>
                            ))}
                        </Grid>
                        <Grid item xs={12} md={10}>
                            <Card sx={{ borderRadius: 2, border: '1px solid #ddd', boxShadow: 2 }}>
                                <img
                                    src={selectedImage}
                                    alt={product.name}
                                    style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '8px' }}
                                />
                            </Card>
                            <Box sx={{ mt: 2 }}>
                                <CustomButton
                                    startIcon={<AddShoppingCartIcon />}
                                    variant='outlined'
                                    title="Add To Cart"
                                    className="px-4"
                                    sx={{ mr: 2 }}
                                />
                                <CustomButton
                                    startIcon={<DoubleArrowIcon />}
                                    variant='contained'
                                    title="BUY NOW"
                                    className="px-4"
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Right side: Product details */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ borderRadius: 2, border: '1px solid #ddd', boxShadow: 2 }}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                {product.name}
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                Price: ₹{product.actual_price}
                            </Typography>
                            {product.discounted_price && (
                                <Typography variant="body1" color="text.primary">
                                    Discounted Price: ₹{product.discounted_price}
                                </Typography>
                            )}
                            {product.offer && (
                                <Typography variant="body1" color="primary">
                                    Offer: {product.offer}%
                                </Typography>
                            )}
                            {product.ratings && (
                                <Typography variant="body1" color="text.secondary">
                                    Rating: {product.ratings} ★
                                </Typography>
                            )}
                            {product.special_offer && (
                                <Typography variant="body1" color="primary">
                                    Special Offer: {product.special_offer}
                                </Typography>
                            )}
                        </CardContent>
                    </Card>
                    <Box sx={{ mt: 4 }}>
                        <ProductDetailInfo
                            title="Product Details"
                            details={[
                                `Brand: ${product.brand}`,
                                `Color: ${product.color.join(', ')}`,
                                `GST: ${product.gst_type}`,
                                `Delivery: ${product.delivery.return_policy}, ${product.delivery.free_delivery ? 'Free Delivery' : 'Paid Delivery'}, ${product.delivery.cash_on_delivery ? 'Cash on Delivery' : 'No Cash on Delivery'}`,
                                `Tags: ${product.tags.join(', ')}`,
                                `In Stock: ${product.inStock ? 'Yes' : 'No'}`,
                                `Special Offer: ${product.special_offer}`
                            ]}
                        />
                    </Box>
                </Grid>
            </Grid>
    );
};

export default Page;
