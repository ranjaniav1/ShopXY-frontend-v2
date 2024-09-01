'use client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCart, removetoCart } from '@/app/Service/Cart';
import CartProductCard from '@/app/Components/CardProductCard';
import { Typography } from '@mui/material';

const Page = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = useSelector((state) => state.auth.user.data.user._id);

    const fetchCartData = async () => {
        try {
            const response = await getCart(userId);
            setCart(response.cart);
        } catch (err) {
            console.log(err.message || 'Error fetching cart data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCartData();
    }, [userId]);

    const handleEdit = (itemId) => {
        // Implement edit functionality here
        console.log('Edit item with ID:', itemId);
    };

    const handleRemove = async (productId, quantity) => {
        try {
            await removetoCart(userId, productId, quantity); // Ensure quantity is passed correctly
            setCart((prevCart) => prevCart.filter(item => item._id !== productId)); // Update cart state
            alert("Item removed successfully");
        } catch (err) {
            console.log(err.message || 'Error removing item from cart');
        }
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
                        product={item.product}
                        quantity={item.quantity}
                        onEdit={handleEdit}
                        onRemove={() => handleRemove(item._id, item.quantity)} // Pass productId and quantity here
                    />
                ))
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default Page;
