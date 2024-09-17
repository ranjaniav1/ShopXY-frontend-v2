'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Divider, useTheme, ButtonGroup, CircularProgress } from '@mui/material';
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
    const theme = useTheme();
    const dispatch = useDispatch();

    const fetchCartData = async () => {
        setLoading(true);
        try {
            const response = await getCart(userId);
            setCartQty(response.cart || []);
            dispatch(setMyCart(response));
        } catch (err) {
            setErrorMessage(err.message || 'Error fetching cart data');
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
        const response = await getCart(userId);
        setCart(response?.cart || []);
    };

    if (loading) return <CircularProgress />;

    // Calculate total price
    const totalPrice = cart.reduce((total, item) => total + (item.product.actual_price * item.quantity), 0);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2 }}>
            {cart.length > 0 ? (
                cart.map((item) => (
                    <Box
                        key={item.product._id}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            borderBottom: '1px solid #ddd',
                            background: theme.palette.background.paper,
                            borderRadius: 2,
                            padding: 2,
                            marginBottom: 2,
                        }}
                    >
                        <img
                            src={item.product.image}
                            alt={item.product.name}
                            style={{
                                width: 80,
                                height: 80,
                                objectFit: 'cover',
                                borderRadius: 8,
                            }}
                        />
                        <Box sx={{ flex: 1 }}>
                            <Typography sx={{ fontWeight: 'bold' }}>
                                {item.product.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                ₹{item.product.actual_price}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                                <ButtonGroup
                                    variant="outlined"
                                    aria-label="quantity controls"
                                    sx={{
                                        border: `1px solid ${theme.palette.primary.main}`,
                                        borderRadius: 2,
                                    }}
                                >
                                    <Button
                                        sx={{ background: theme.palette.primary.main, color: 'white' }}
                                        onClick={() => handleDecrement(item.product._id, item.quantity)}
                                        disabled={loading}
                                    >
                                        <RemoveIcon />
                                    </Button>
                                    <Typography variant="h6" sx={{ margin: '0px 10px' }}>
                                        {item.quantity}
                                    </Typography>
                                    <Button
                                        sx={{ background: theme.palette.primary.main, color: 'white' }}
                                        onClick={() => handleIncrement(item.product._id, item.quantity, item.product.max_qty)}
                                        disabled={loading}
                                    >
                                        <AddIcon />
                                    </Button>
                                </ButtonGroup>
                            </Box>
                            {errorMessage && (
                                <Typography variant="body2" color="error" sx={{ marginTop: 1 }}>
                                    {errorMessage}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                ))
            ) : (
                <Typography>Your cart is empty.</Typography>
            )}
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2">
                Total Price: ₹{totalPrice.toFixed(2)}
            </Typography>
            <CustomButton onClick={handleCloseDrawer} title="Continue" sx={{ mt: 2 }} />
        </Box>
    );
};

export default EditCart;
