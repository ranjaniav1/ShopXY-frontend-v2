'use client';

import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useParams } from 'next/navigation';
import CustomButton from '@/app/Common/CustomButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { GetSingleProduct } from '@/app/Service/GetProduct';
import ProductGallery from '@/app/Components/ProductGallery';
import ProductDetails from '@/app/Components/ProductDetails';

const Page = () => {
    const { productTitle } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState('');
    const [loading, setLoading] = useState(true);

    async function fetchProduct() {
        try {
            const result = await GetSingleProduct({ slug: productTitle });
            const productData = result.data;
            setProduct(productData);
            setProduct(productData);
            if (productData && productData.length > 0) {
                setSelectedImage(productData[0].image); // Set the default selected image to the main image
            }
            setLoading(false);
        } catch (error) {
            console.log("Failed to fetch product", error);
        }
    }

    useEffect(() => {
        fetchProduct();
    }, []);

    if (loading) return <Typography variant="h6">Loading...</Typography>;

    const handleImageClick = (img) => {
        setSelectedImage(img);
    };

    return (
        <Grid container spacing={2}>
            {product?.map((pr, index) => (
                <React.Fragment key={index}>
                    {/* Left side: Image gallery */}
                    <Grid item xs={12} md={6}>
                        <ProductGallery
                            detailImages={pr.detail_image}
                            selectedImage={selectedImage}
                            onImageClick={handleImageClick}
                            productName={pr.name}
                        />
                    </Grid>

                    {/* Right side: Product details */}
                    <Grid item xs={12} md={6}>
                        <ProductDetails
                            name={pr.name}
                            actual_price={pr.actual_price}
                            discounted_price={pr.discounted_price}
                            offer={pr.offer}
                            ratings={pr.ratings}
                            special_offer={pr.special_offer}
                            reviews={pr.reviews}
                            description={pr.description}
                            full_description={pr.full_description}
                            delivery={pr.delivery}
                            size={pr.size}
                            tags={pr.tags}
                        />
                    </Grid>
                </React.Fragment>
            ))}
        </Grid>
    );
};

export default Page;
