'use client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCart, updateCartItem } from '@/app/Service/Cart';
import CartProductCard from './CardProductCard';

const EditCart = ({ selectedProduct, onClose }) => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = useSelector((state) => state.auth.user.data.user._id);

    const fetchCartData = async () => {
        setLoading(true);
        try {
            const response = await getCart(userId);
            if (response && response.cart) {
                setCart(response.cart);
                setLoading(false);
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

    const handleQuantityChange = async (productId, newQuantity) => {
        if (newQuantity < 1) return; // Prevent setting quantity to less than 1
        try {
            await updateCartItem(userId, productId, newQuantity);
            fetchCartData(); // Refresh cart data
        } catch (err) {
            console.error('Error updating cart item:', err.message || err);
        }
    };

    const handleIncrement = (productId) => {
        const item = cart.find((item) => item._id === productId);
        if (item) {
            handleQuantityChange(productId, item.quantity + 1);
        }
    };

    const handleDecrement = (productId) => {
        const item = cart.find((item) => item._id === productId);
        if (item && item.quantity > 1) {
            handleQuantityChange(productId, item.quantity - 1);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {cart.length > 0 ? (
                cart.map((item) => (
                    <CartProductCard
                        key={item._id}
                        product={item.product}
                        quantity={item.quantity}
                        increment={handleIncrement}
                        decrement={handleDecrement}
                    />
                ))
            ) : (
                <p>Your cart is empty.</p>
            )}
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default EditCart;
