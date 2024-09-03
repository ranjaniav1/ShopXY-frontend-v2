'use client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCart, removetoCart } from '@/app/Service/Cart';
import CartProductCard from '@/app/Components/CardProductCard';
import { Box, Typography } from '@mui/material';
import CustomDrawer from '@/app/Custom/CustomDrawer';
import EditCart from '@/app/Components/EditCart';
import toast from 'react-hot-toast';

const Page = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editDrawer, setEditDrawer] = useState(false);
    const userId = useSelector((state) => state.auth.user.data.user._id);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const fetchCartData = async () => {
        setLoading(true);
        try {
            const response = await getCart(userId);
            console.log("API Response:", response);
            if (response && Array.isArray(response.cart)) {
                setCart(response.cart);
            } else {
                console.error('Unexpected response format:', response);
            }
        } catch (err) {
            console.error('Error fetching cart data:', err.message || err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchCartData();
        } else {
            console.error('User ID is not available');
        }
    }, [userId]);

    const handleRemove = async (productId) => {
        try {
            const response = await removetoCart(userId, productId);

            setCart(response.cart); // Directly set the cart from the API response
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

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
                Product Details
            </Typography>
            {cart.length > 0 ? (
                cart.map((item) => (
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
                    <EditCart selectedProduct={selectedProduct} />
                </CustomDrawer>
            </Box>
        </div>
    );
};

export default Page;
