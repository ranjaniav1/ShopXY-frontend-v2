'use client';

import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { useParams } from 'next/navigation';
import { GetSingleProduct } from '@/app/Service/GetProduct';
import ProductGallery from '@/app/Components/ProductGallery';
import ProductDetails from '@/app/Components/ProductDetails';
import CustomBox from '@/app/Custom/CustomBox';
import CustomTypography from '@/app/Custom/CustomTypography';

const Page = () => {
    const params = useParams();
    const productId = params?.productId;
    const productTitle = params?.productTitle;
    const [product, setProduct] = useState(null);
    const [brand, setBrand] = useState(null);
    const [selectedImage, setSelectedImage] = useState('');
    const [loading, setLoading] = useState(true);
    async function fetchProduct() {
        if (!productTitle) return;
        try {
            const result = await GetSingleProduct({ slug: productTitle });
            const productData = result.product;

            setProduct(productData);
            setBrand(result.brand);

            if (productData) {
                setSelectedImage(productData.detail_image[0]); // Set the default selected image to the main image
            }
        } catch (error) {
            console.log("Failed to fetch product", error);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProduct();
    }, []);

    if (loading) return <CustomTypography variant="h6">Loading...</CustomTypography>;

    const handleImageClick = (img) => {
        setSelectedImage(img);
    };
    return (
        <CustomBox>
            <Grid container spacing={2}>


                {/* Left side: Image gallery */}
                <Grid item xs={12} md={4}>
                    <ProductGallery
                        detailImages={product?.detail_image || []}
                        selectedImage={selectedImage}
                        onImageClick={handleImageClick}
                        productName={product.name}
                        productId={product._id}

                    />
                </Grid>

                {/* Right side: Product details */}
                <Grid item xs={12} md={8}>
                    <ProductDetails
                        name={product.name}
                        actual_price={product.actual_price}
                        discounted_price={product.discounted_price}
                        offer={product.offer}
                        ratings={product.ratings}
                        special_offer={product.special_offer}
                        reviews={product.reviews}
                        description={product.description}
                        full_description={product.full_description}
                        productId={product._id}
                        size={product.size}
                        tags={product.tags}
                        gst_type={product.gst_type}
                        brand={product.brand}
                        product_id={product._id}
                        product={product}

                    />
                </Grid>
            </Grid>
        </CustomBox>
    );
};

export default Page;
