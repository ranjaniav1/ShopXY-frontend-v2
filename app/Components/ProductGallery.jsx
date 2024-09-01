'use client';

import React from 'react';
import { Grid, Card, Box } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import CustomButton from '../Custom/CustomButton';
import { useSelector } from 'react-redux';
import { addtoCart } from '../Service/Cart';

const ProductGallery = ({ detailImages, selectedImage, onImageClick, productName, productId }) => {
    let user = useSelector((state) => state?.auth?.user?.data?.user._id)
    if (!user) {
        user = "test"
    }
    console.log('user', user)
    const handleAddToCart = async () => {
        try {
            const userId = user; // Replace with actual user ID from context or props
            await addtoCart(userId, productId);
            alert('Product added to cart successfully!');
        } catch (error) {
            console.log(error)
        }
    };
    return (
        <Grid container spacing={2}>
            <Grid item xs={2} md={2} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {detailImages.map((img, id) => (
                    <Card
                        key={id}
                        sx={{
                            cursor: 'pointer',
                            borderRadius: 2,
                            border: '1px solid #ddd',
                            boxShadow: 1,
                        }}
                        onClick={() => onImageClick(img)}
                    >
                        <img
                            src={img}
                            alt={`Thumbnail ${id + 1}`}
                            style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '8px' }}
                        />
                    </Card>
                ))}
            </Grid>
            <Grid item xs={10} md={10}>
                <Card sx={{ borderRadius: 2, border: '1px solid #ddd', boxShadow: 2 }}>
                    <img
                        src={selectedImage}
                        alt={productName}
                        style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '8px' }}
                    />
                </Card>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={6}>
                        <CustomButton
                            startIcon={<AddShoppingCartIcon />}
                            variant="outlined"
                            title="Cart It"
                            className="w-full"
                            onClick={handleAddToCart}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <CustomButton
                            startIcon={<DoubleArrowIcon />}
                            variant="contained"
                            title="Buy Now"
                            className="w-full"
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProductGallery;
