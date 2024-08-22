'use client';

import React from 'react';
import { Grid, Card, Box } from '@mui/material';
import CustomButton from '@/app/Common/CustomButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

const ProductGallery = ({ detailImages, selectedImage, onImageClick, productName }) => {
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
                <Box sx={{ mt: 2, display: 'flex', width: '100%' }}>
                    <CustomButton
                        startIcon={<AddShoppingCartIcon />}
                        variant="outlined"
                        title="Add To Cart"
                        className="px-4"
                        sx={{ mr: 1, flex: 1 }}
                    />
                    <CustomButton
                        startIcon={<DoubleArrowIcon />}
                        variant="contained"
                        title="BUY NOW"
                        className="px-4" sx={{ flex: 1 }}
                    />
                </Box>
            </Grid>
        </Grid>
    );
};

export default ProductGallery;
