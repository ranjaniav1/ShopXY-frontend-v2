'use client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCart, removetoCart } from '@/app/Service/Cart';
import CartProductCard from '@/app/Components/CardProductCard';
import { Box, Typography } from '@mui/material';
import CustomDrawer from '@/app/Custom/CustomDrawer';
import EditCart from '@/app/Components/EditCart';

const Page = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editDrawer, setEditDrawer] = useState(false);
    const userId = useSelector((state) => state.auth.user.data.user._id);
    const [selectedProduct, setSelectedProduct] = useState(null); // State to store selected product details

    const fetchCartData = async () => {
        setLoading(true); // Set loading to true before starting the fetch
        try {
            const response = await getCart(userId);
            console.log("API Response:", response); // Log the full response
            if (response && Array.isArray(response.cart)) {
                setCart(response.cart);
            } else {
                console.error('Unexpected response format:', response);
            }
        } catch (err) {
            console.error('Error fetching cart data:', err.message || err);
        } finally {
            setLoading(false); // Set loading to false after the fetch
        }
    };

    useEffect(() => {
        if (userId) {
            fetchCartData();
        } else {
            console.error('User ID is not available');
        }
    }, [userId]); // Fetch data if userId changes

    const handleRemove = async (productId, quantity) => {
        try {
            await removetoCart(userId, productId, quantity); // Ensure quantity is passed correctly
            setCart((prevCart) => prevCart.filter(item => item._id !== productId)); // Update cart state
            alert("Item removed successfully");
        } catch (err) {
            console.error('Error removing item from cart:', err.message || err);
        }
    };

    const handleEdit = (product) => {
        setSelectedProduct(product); // Set the selected product details
        setEditDrawer(true); // Open the drawer
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
                        onEdit={() => handleEdit(item.product)} // Pass the product to handleEdit
                        actual_price={item.product.actual_price}
                        discounted_price={item.product.discounted_price}
                        onRemove={() => handleRemove(item.productId, item.quantity)} // Pass productId and quantity here
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
                ><EditCart selectedProduct={selectedProduct} /></CustomDrawer>

            </Box>

        </div>
    );
};

export default Page;
