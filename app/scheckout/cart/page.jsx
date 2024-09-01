'use client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCart } from '@/app/Service/Cart';
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
            setLoading(false)
        } catch (err) {
            console.log(err.message || 'Error fetching cart data');
        }
    };
    useEffect(() => {


        fetchCartData();
    }, [userId]);


    const handleEdit = (itemId) => {
        // Implement edit functionality here
        console.log('Edit item with ID:', itemId);
    };

    const handleRemove = (itemId) => {
        // Implement remove functionality here
        console.log('Remove item with ID:', itemId);
    };
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
                        onRemove={handleRemove}
                    />
                ))
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default Page;
