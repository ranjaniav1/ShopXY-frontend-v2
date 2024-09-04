'use client';
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { EdittoCart, getCart } from '../Service/Cart';
import CustomButton from '../Custom/CustomButton';
import { setMyCart } from '../redux/reducer/cartReducer';

const EditCart = ({ onClose, setCart }) => {
    const [loading, setLoading] = useState(false);
    const [cart, setCartQty] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const userId = useSelector((state) => state.auth.user.data.user._id);

    const dispatch = useDispatch()

    const fetchCartData = async () => {
        setLoading(true);
        try {
            const response = await getCart(userId);
            setCartQty(response.cart || []);
            dispatch(setMyCart(response))
        } catch (err) {
            setErrorMessage(err.message || "Error fetching cart data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCartData();
    }, [userId]);

    const updateCart = async (productId, newQuantity) => {
        setLoading(true);
        setErrorMessage('');
        try {
            await EdittoCart(userId, productId, newQuantity);
            await fetchCartData(); // Fetch updated cart data
        } catch (err) {
            console.error('Error updating quantity:', err.message || err);
            setErrorMessage('Error updating cart. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleIncrement = (productId, currentQuantity, maxQty) => {
        const newQuantity = currentQuantity + 1;
        if (newQuantity <= maxQty) {
            updateCart(productId, newQuantity);
        } else {
            setErrorMessage(`You can add up to ${maxQty} units in one order`);
        }
    };

    const handleDecrement = (productId, currentQuantity) => {
        const newQuantity = currentQuantity > 1 ? currentQuantity - 1 : 1;
        updateCart(productId, newQuantity);
    };

    const handleCloseDrawer = async () => {
        onClose();
        // get your cart here and set
        const response = await getCart(userId); console.log(response)
        setCart(response?.cart || [])
    }



    // if (loading) return <Typography>Loading...</Typography>;

    // Calculate total price
    const totalPrice = cart.reduce((total, item) => total + (item.product.actual_price * item.quantity), 0);

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {cart.length > 0 ? (
                cart.map((item) => (
                    <Box key={item.product._id} sx={{ display: 'flex', alignItems: 'center', gap: '16px', borderBottom: '1px solid #ddd' }}>
                        <img
                            src={item.product.image}
                            alt={item.product.name}
                            style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                        <Box sx={{ flex: 1 }}>
                            <Typography sx={{ fontWeight: 'bold' }}>
                                {item.product.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                ₹{item.product.actual_price}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                                <Button
                                    onClick={() => handleDecrement(item.product._id, item.quantity)}
                                    sx={{ minWidth: '40px', height: '40px', borderRadius: '4px', borderColor: '#ddd' }}
                                    disabled={loading}
                                >
                                    <RemoveIcon />
                                </Button>
                                <Typography variant="h6" sx={{ margin: '0 16px' }}>
                                    {item.quantity}
                                </Typography>
                                <Button
                                    onClick={() => handleIncrement(item.product._id, item.quantity, item.product.max_qty)}
                                    sx={{ minWidth: '40px', height: '40px', borderRadius: '4px', borderColor: '#ddd' }}
                                    disabled={loading}
                                >
                                    <AddIcon />
                                </Button>
                            </Box>
                            {errorMessage && (
                                <Typography variant="body2" color="error" sx={{ marginTop: '8px' }}>
                                    {errorMessage}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                ))
            ) : (
                <Typography>Your cart is empty.</Typography>
            )}
            <Typography variant="body2">
                Total Price: ₹{totalPrice}
            </Typography>
            <CustomButton onClick={() => handleCloseDrawer()} title={"Continue"} />
        </div>
    );
};

export default EditCart;
