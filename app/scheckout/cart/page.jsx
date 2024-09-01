'use client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCart } from '@/app/Service/Cart';
import CartProductCard from '@/app/Components/CardProductCard';

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
            setError(err.message || 'Error fetching cart data');
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

    const handleRemove = (itemId) => {
        // Implement remove functionality here
        console.log('Remove item with ID:', itemId);
    };
    return (
        <div>
            <h1>Product Details</h1>
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
