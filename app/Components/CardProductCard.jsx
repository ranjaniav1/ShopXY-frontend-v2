import React from 'react';
import { Box, Divider } from '@mui/material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import CustomIconButton from '../Custom/CustomIconButton';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import CustomTypography from '../Custom/CustomTypography';
const CartProductCard = ({ onEdit, onRemove, image, name, offer, actual_price, discounted_price, quantity, size }) => {

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #e1e0e0',
                borderRadius: 2,
                padding: '16px',
                marginBottom: 2,
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                position: 'relative',
            }}
        >
            <Box sx={{ flexShrink: 0, marginRight: 2 }}>
                <img
                    src={image || 'https://via.placeholder.com/150'}
                    alt={name}
                    style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: 2 }}
                />
            </Box>

            {/* product details */}
            <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <CustomTypography variant="body1" sx={{ fontWeight: 500 }}>{name}</CustomTypography>

                    {/* edit and delete btn with divider */}
                    <Box sx={{ display: 'flex', alignItems: 'center', border: "1px solid gray ", borderRadius: 2 }}>
                        <CustomIconButton
                            onClick={onEdit}
                      
                        ><ModeEditOutlineOutlinedIcon /></CustomIconButton>

                        <Divider orientation='vertical' flexItem sx={{ height: 48, backgroundColor: 'gray' }} />

                        <CustomIconButton onClick={onRemove} ><DeleteForeverOutlinedIcon sx={{ color: "red" }} /></CustomIconButton>
                    </Box>
                </Box>

                {/* price and offer section */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CustomTypography variant="body1" sx={{ fontWeight: 'bold', fontSize: '16px', marginRight: 1 }}>
                        ₹{discounted_price || actual_price}
                    </CustomTypography>
                    {discounted_price && (
                        <CustomTypography variant="body2" sx={{ textDecoration: 'line-through', marginRight: 1 }}>
                            ₹{actual_price}
                        </CustomTypography>
                    )}

                    <CustomTypography variant="body2" color="textSecondary">
                        {offer ? `${offer}% off` : 'No offer'}
                    </CustomTypography>
                </Box>
                {/* size and qty section */}
                <Box sx={{ display: "flex", alignItems: "center" }}>

                    <CustomTypography variant="body2" sx={{ marginRight: 1 }}>
                        Size: {size}
                    </CustomTypography>
                    <Divider orientation='vertical' flexItem sx={{ height: 28, marginX: 1, backgroundColor: 'gray' }} />
                    <CustomTypography variant="body2">
                        Quantity: {quantity}
                    </CustomTypography>
                </Box>

            </Box>
        </Box >
    );
};

export default CartProductCard;
