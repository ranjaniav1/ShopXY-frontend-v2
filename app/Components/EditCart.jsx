'use client';
import React, { useState } from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { EdittoCart } from '../Service/Cart';
import CustomButton from '../Custom/CustomButton';

const EditCart = ({ selectedProduct, onClose }) => {
    const [quantity, setQuantity] = useState(selectedProduct?.quantity || 1);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); // New state for error message
    const userId = useSelector((state) => state.auth.user.data.user._id);

    const updateCart = async (newQuantity) => {
        setLoading(true);
        setErrorMessage(''); // Clear previous errors
        try {
            await EdittoCart(userId, selectedProduct._id, newQuantity);
            setQuantity(newQuantity); // Update local state with new quantity
        } catch (err) {
            console.error('Error updating quantity:', err.message || err);
            setErrorMessage(`You can add up to ${selectedProduct.max_qty} units in one order`); // Set error message
        } finally {
            setLoading(false);
        }
    };

    const handleIncrement = () => {
        const newQuantity = quantity + 1;
        updateCart(newQuantity); // Update server
    };

    const handleDecrement = () => {
        const newQuantity = quantity > 1 ? quantity - 1 : 1;
        updateCart(newQuantity); // Update server
    };

    const handleContinue = async () => {
        const newQuantity = quantity;
        await updateCart(newQuantity); // Ensure the quantity is updated before closing
        onClose(); // Close the drawer
    };

    if (!selectedProduct) return null;

    // Calculate the total price based on quantity
    const totalPrice = (selectedProduct.discounted_price || selectedProduct.actual_price) * quantity;

    return (
        <Box sx={{ display: 'flex', flexDirection: "column" }}>
            <Box sx={{ display: 'flex', marginBottom: '16px' }}>
                <img
                    src={selectedProduct.image || 'https://via.placeholder.com/150'}
                    alt={selectedProduct.name}
                    style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', marginRight: '16px' }}
                />
                <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', marginBottom: '8px' }}>
                        {selectedProduct.name}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: '8px' }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            ₹{totalPrice.toFixed(2)}
                        </Typography>

                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                        <Button onClick={handleDecrement} sx={{ minWidth: '40px', height: '40px' }} disabled={loading}>
                            <RemoveIcon />
                        </Button>
                        <Typography variant="h6" sx={{ margin: '0 16px' }}>
                            {quantity}
                        </Typography>
                        <Button onClick={handleIncrement} sx={{ minWidth: '40px', height: '40px' }} disabled={loading}>
                            <AddIcon />
                        </Button>
                    </Box>
                    {errorMessage && (
                        <Typography variant="body2" color="error" sx={{ marginBottom: '16px' }}>
                            {errorMessage}
                        </Typography>
                    )}

                </Box>
            </Box>
            <Divider sx={{ marginY: '16px' }} />
            <Typography variant="body1" sx={{ marginBottom: '16px' }}>
                Total Price: ₹{totalPrice.toFixed(2)}
            </Typography>
            <CustomButton onClick={handleContinue} title={"Continue"} />


        </Box>
    );
};

export default EditCart;
