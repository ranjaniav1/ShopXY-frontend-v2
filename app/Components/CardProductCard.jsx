import React from 'react';
import { Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CustomButton from '../Custom/CustomButton';

const CartProductCard = ({ onEdit, onRemove, image, name, offer, actual_price, discounted_price, quantity, size }) => {

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
                    src={image || 'https://via.placeholder.com/150'}
                    alt={name}
                    style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: 2 }}
                />
            </Box>
            <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                        {name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CustomButton
                            title="Edit"
                            onClick={onEdit} // Pass the clicked product here
                            sx={{ marginRight: 1 }}
                        />
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, mr: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '16px', marginRight: 1 }}>
                        ₹{discounted_price || actual_price}
                    </Typography>
                    {discounted_price && (
                        <Typography variant="body2" color="textSecondary" sx={{ textDecoration: 'line-through', marginRight: 1 }}>
                            ₹{actual_price}
                        </Typography>
                    )}
                    <Typography variant="body2" color="textSecondary">
                        {offer ? `${offer}% off` : 'No offer'}
                    </Typography>
                </Box>

                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                    Size: {size}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Qty: {quantity}
                </Typography>
                <CustomButton title="Remove" startIcon={<CloseIcon />} onClick={onRemove} />
            </Box>
        </Box>
    );
};

export default CartProductCard;
