// src/components/CartProductCard.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CustomButton from '../Custom/CustomButton';

const CartProductCard = ({ product, quantity, onEdit, onRemove }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'flex-start',
                border: '1px solid #e1e0e0',
                borderRadius: 2,
                padding: '10px',
                marginBottom: 2,
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                position: 'relative',
            }}
        >
            <Box sx={{ flexShrink: 0, marginRight: 2 }}>
                <img
                    src={product.image || 'https://via.placeholder.com/150'}
                    alt={product.name}
                    style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: 2 }}
                />
            </Box>
            <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                        {product.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CustomButton
                            title="Edit"
                            onClick={() => onEdit(product._id)}
                            sx={{ marginRight: 1 }}
                        />
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, mr: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '16px', marginRight: 1 }}>
                        ₹{product.discounted_price || product.actual_price}
                    </Typography>
                    {product.discounted_price && (
                        <Typography variant="body2" color="textSecondary" sx={{ textDecoration: 'line-through' }}>
                            ₹{product.actual_price}
                        </Typography>
                    )}<Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                        {product.offer ? `${product.offer}% off` : 'No offer'}
                    </Typography>
                </Box>

                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                    Size: {product.size.join(', ')}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Qty: {quantity}
                </Typography>
                <CustomButton title="Remove" startIcon={<CloseIcon />} onClick={() => onRemove(product._id)} />
            </Box>
        </Box>
    );
};

export default CartProductCard;
