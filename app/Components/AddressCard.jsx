import { Delete, Edit } from '@mui/icons-material';
import { Box, FormControlLabel, IconButton, Radio, Typography } from '@mui/material';
import React from 'react';
import CustomIconButton from '../Custom/CustomIconButton';

const AddressCard = ({ address, selectedAddressId, handleEdit, handleRemove, handleChange }) => {
    const handleRadioChange = () => {
        handleChange(address._id);
    };
    return (
        <Box
            sx={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                p: 2,
                position: 'relative',
                minHeight: '150px',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 1,
                '&:hover': {
                    boxShadow: 3,
                },
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    display: 'flex',
                    gap: 1,
                }}
            >
                <CustomIconButton onClick={() => handleEdit(address._id)}>
                    <Edit />
                </CustomIconButton>

                <CustomIconButton sx={{ color: 'red' }} onClick={() => handleRemove(address._id)}>
                    <Delete />
                </CustomIconButton>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
                <FormControlLabel
                    control={
                        <Radio
                            checked={address._id === selectedAddressId}
                            value={address._id}
                            onChange={handleRadioChange}
                        />
                    }
                    label=""
                    sx={{ mr: 1 }}
                />
                <Box ml={2}>
                    <Typography variant="body1" fontWeight="bold">{address.address}</Typography>
                    <Typography variant="body2" color="textSecondary">
                        {address.city}, {address.state}, {address.postalCode}, {address.country}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Phone: {address.phone}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default AddressCard;
