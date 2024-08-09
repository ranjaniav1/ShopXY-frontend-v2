'use client';

import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import { GetProducts } from '@/app/Service/GetProduct';
import CustomButton from '@/app/Common/CustomButton';
import ProductCard from '@/app/Components/ProductCard';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import ProductDetailInfo from '@/app/Common/ProductDetailInfo';
const CategoryPage = () => {
    const { productTitle } = useParams(); // Extract productTitle from URL
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState('');

    async function fetchProduct() {
        try {
            const result = await GetProducts({ slug: productTitle });
            setProduct(result.data);
            setSelectedImage(result.data.image); // Set default selected image
        } catch (error) {
            console.log("Failed to fetch product", error);
        }
    }

    useEffect(() => {
        fetchProduct();
    }, [productTitle]);

    if (!product) return <p>Loading...</p>;

    return (
        <div style={{ marginTop: '20px' }}>
            <Grid container spacing={4}>
                {/* Left side: Image gallery */}
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={1.5} sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            {product.detail_image.map((img) => (
                                <ProductCard imgSrc={img} className="w-full h-auto object-cover cursor-pointer rounded-md border-white" onClick={() => setSelectedImage(img)}
                                />
                            ))}
                        </Grid>
                        <Grid item xs={12} md={10}>
                            <ProductCard imgSrc={selectedImage} className="w-full h-auto object-cover  rounded-md border-white" />
                            <CustomButton startIcon={<AddShoppingCartIcon />} variant='outlined' title="Add To Cart" className="px-20 mt-4 mr-4  text-xl" />
                            <CustomButton startIcon={<DoubleArrowIcon />} variant='contained' title="BUY NOW" className="px-20 mt-4 text-xl" />
                        </Grid>
                    </Grid>
                </Grid>

                {/* Right side: Product details */}
                <Grid item xs={12} md={6}>
                    <ProductCard title={product.name} price={product.actual_price} discountPrice={product.discounted_price} offer={product.offer} rating={product.ratings} description={product.delivery.free_delivery}/>
                    

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


                </Grid>
            </Grid>
        </div>
    );
};

export default CategoryPage;
