'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, removetoCart } from '@/app/Service/Cart';
import CartProductCard from '@/app/Components/CardProductCard';
import { Box, Typography } from '@mui/material';
import CustomDrawer from '@/app/Custom/CustomDrawer';
import EditCart from '@/app/Components/EditCart';
import toast from 'react-hot-toast';
import { setMyCart } from '@/app/redux/reducer/cartReducer';
import CustomButton from '@/app/Custom/CustomButton';
import Link from 'next/link';

const Page = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editDrawer, setEditDrawer] = useState(false);
    const userId = useSelector((state) => state.auth.user.data.user._id);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const dispatch = useDispatch()
    const cartData = useSelector((state) => state.cart.cart)
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const result = await getCart(userId);
                dispatch(setMyCart(result));
            } catch (err) {
                console.error('Error fetching cart:', err.message || err);
                toast.error("Failed to fetch cart");
            }
        };
        fetchCart();
    }, [dispatch, userId]);

    const handleRemove = async (productId) => {
        try {
            const response = await removetoCart(userId, productId);

            setCart(response.cart); // Directly set the cart from the API response
            const result = await getCart(userId);

            dispatch(setMyCart(result))
            toast.success("Item removed successfully");

        } catch (err) {
            console.error('Error removing item from cart:', err.message || err);
            toast.error("Failed to remove item");
        }
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setEditDrawer(true);
    };

    // if (loading) {
    //     return <p>Loading...</p>;
    // }
    useEffect(() => {
        setCart(cartData)
        setLoading(false)
    }, [])
    return (
        <div>
            <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
                Product Details
            </Typography>
            {cartData.length > 0 ? (
                cartData.map((item) => (
                    <>
                        <CartProductCard
                            key={item._id}
                            image={item.product.image}
                            offer={item.product.offer}
                            quantity={item.quantity}
                            name={item.product.name}
                            product={item.product}
                            size={item.product.size}
                            onEdit={() => handleEdit(item.product)}
                            actual_price={item.product.actual_price}
                            discounted_price={item.product.discounted_price}
                            onRemove={() => handleRemove(item.product._id)} // Ensure correct ID
                        />
                        <Box sx={{ textAlign: 'end' }}>
                            <Link href="/scheckout/address">
                                <CustomButton title="Continue" />
                            </Link>

                        </Box>
                    </>
                ))
            ) : (
                <p>Your cart is empty.</p>
            )}
            <Box width="200">
                <CustomDrawer
                    open={editDrawer}
                    onClose={() => setEditDrawer(false)}
                    title="Edit Product"
                >
                    <EditCart setCart={setCart} onClose={() => setEditDrawer(false)} selectedProduct={selectedProduct} />
                </CustomDrawer>
            </Box>
        </div>
    );
};

export default Page;
