import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Divider, useTheme, ButtonGroup, CircularProgress } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { EdittoCart, getCart } from '../Service/Cart';
import CustomButton from '../Custom/CustomButton';
import { setMyCart } from '../redux/reducer/cartReducer';

const EditCart = ({ onClose, selectedProduct }) => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [localQuantity, setLocalQuantity] = useState(selectedProduct?.quantity || 1); // Manage quantity locally

    const userId = useSelector((state) => state.auth.user.data.user._id);
    const theme = useTheme();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.items);

    const fetchCartData = async () => {
        setLoading(true);
        try {
            const response = await getCart(userId);
            dispatch(setMyCart(response));
        } catch (e) {
            console.error("Error fetching cart:", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (selectedProduct) {
            setLocalQuantity(selectedProduct.quantity || 1);
        }
        fetchCartData();
    }, [selectedProduct]);

    const updateCart = async (userId, productId, newQuantity) => {
        setLoading(true);
        setErrorMessage('');
        try {
            await EdittoCart(userId, productId, newQuantity);
            setLocalQuantity(newQuantity); // Update local quantity
            await fetchCartData();
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
            updateCart(userId, productId, newQuantity);
        } else {
            setErrorMessage(`You can add up to ${maxQty} units in one order`);
        }
    };

    const handleDecrement = (productId, currentQuantity) => {
        const newQuantity = currentQuantity > 1 ? currentQuantity - 1 : 1;
        updateCart(userId, productId, newQuantity);
    };

    const handleCloseDrawer = async () => {
        onClose();
        await fetchCartData();
    };

    if (loading) return <CircularProgress />;

    // Calculate total price using local quantity state
    const totalPrice = (selectedProduct?.product?.actual_price || 0) * localQuantity;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2 }}>
            {selectedProduct ? (
                <Box
                    key={selectedProduct._id}
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
                        src={selectedProduct.product?.image}
                        alt={selectedProduct.product?.name}
                        style={{
                            width: 80,
                            height: 80,
                            objectFit: 'cover',
                            borderRadius: 8,
                        }}
                    />
                    <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontWeight: 'bold' }}>
                            {selectedProduct.product?.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            ₹{selectedProduct.product?.actual_price}
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
                                    onClick={() => handleDecrement(selectedProduct.product?._id, localQuantity)}
                                    disabled={loading}
                                >
                                    <RemoveIcon />
                                </Button>
                                <Typography variant="h6" sx={{ margin: '0px 10px' }}>
                                    {localQuantity}
                                </Typography>
                                <Button
                                    sx={{ background: theme.palette.primary.main, color: 'white' }}
                                    onClick={() => handleIncrement(selectedProduct.product?._id, localQuantity, selectedProduct.product?.max_qty)}
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
            ) : (
                <Typography variant="body2" color="textSecondary">
                    No product selected.
                </Typography>
            )}

            <Divider sx={{ my: 2 }} />
            <Typography variant="body2">
                Total Price: ₹{totalPrice}
            </Typography>
            <CustomButton onClick={handleCloseDrawer} title="Continue" sx={{ mt: 2 }} />
        </Box>
    );
};

export default EditCart;
