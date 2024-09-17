'use client';

import React from 'react';
import { Grid, Card, Box } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import CustomButton from '../Custom/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { addtoCart } from '../Service/Cart';
import { setMyCart } from '../redux/reducer/cartReducer';
import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const ProductGallery = ({ detailImages, selectedImage, onImageClick, productName, productId }) => {
    const userId = useSelector((state) => state?.auth?.user?.data?.user._id)
    const dispatch = useDispatch()
    const { productTitle } = useParams()
    const cartData = useSelector((state) => state.cart.cart) || [];

    const handleAddToCart = async () => {
        try {
            const quantity=1;//default qty is 1

            const isProductInCart = cartData.some(item => item.productId === productId);
            if (isProductInCart) {
                toast.error(`Product ${productTitle} is already in your cart.`);
                return;
            }

            if (!userId) {
                toast.error('You need to log in to add items to the cart.');
                return;
            }

            const response = await addtoCart(userId, productId, quantity);
            console.log("res", response)
            dispatch(setMyCart(response));
            toast.success(`${productTitle} added to cart Successfully!`);
        } catch (error) {
            toast.error(`Failed to add product to cart: ${error.message}`);
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
                <Card sx={{ borderRadius: 2, border: '1px solid #ddd', boxShadow: 1 }}>
                    <img
                        src={selectedImage}
                        alt={productName}
                        style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '8px' }}
                    />
                </Card>

            </Grid>
            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12}>
                    <CustomButton
                        startIcon={<AddShoppingCartIcon />}
                        variant="outlined"
                        title="Cart It"
                        className="w-full"
                        onClick={handleAddToCart}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Link href="/scheckout/carts">
                        <CustomButton
                            startIcon={<DoubleArrowIcon />}
                            variant="contained"
                            title="Buy Now"
                            className="w-full"
                        />
                    </Link>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProductGallery;
