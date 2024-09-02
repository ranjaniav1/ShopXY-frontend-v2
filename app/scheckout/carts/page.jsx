'use client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCart, removetoCart } from '@/app/Service/Cart';
import CartProductCard from '@/app/Components/CardProductCard';
import { Typography } from '@mui/material';
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
            console.log("API Response:", response.cart); // Log the full response
            if (response && response.cart) {
                setCart(response.cart);
                setLoading(false)
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

    if (loading) {
        return <p>Loading...</p>;
    }
    const handleEdit = (product) => {
        setSelectedProduct(product); // Set the selected product details
        setEditDrawer(true); // Open the drawer
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
                        image={item.image}
                        offer={item.offer}
                        quantity={item.quantity}
                        name={item.name}
                        product={item.product}
                        size={item.size}
                        onEdit={() => handleEdit(item.product)} // Pass the product to handleEdit
                        actual_price={item.actual_price}
                        discounted_price={item.discounted_price}
                        onRemove={() => handleRemove(item._id, item.quantity)} // Pass productId and quantity here
                    />

                ))
            ) : (
                <p>Your cart is empty.</p>
            )}
            <CustomDrawer
                open={editDrawer}
                onClose={() => setEditDrawer(false)}
                title="Edit Product"
            >
                <EditCart selectedProduct={selectedProduct} onClose={() => setEditDrawer(false)} />
            </CustomDrawer>
        </div>
    );
};

export default Page;
