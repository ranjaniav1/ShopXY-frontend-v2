import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { Box, Divider, FormControlLabel, Radio, Typography, useTheme } from '@mui/material';
import React from 'react';
import CustomIconButton from '../Custom/CustomIconButton';

const AddressCard = ({ address, selectedAddressId, handleEdit, handleRemove, handleChange }) => {
    const handleRadioChange = () => {
        handleChange(address._id);
    };
    const theme = useTheme()
    return (
        <Box
            sx={{
                alignItems: 'center',
                border: '1px solid #e1e0e0',
                borderRadius: 2,
                padding: '16px',
                marginBottom: 2,
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                position: 'relative',
                background: theme.palette.card.background
            }}
        >

            {/* Edit and delete buttons placed at the top-right corner */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid #ededed',
                    borderRadius: 2,
                    padding: '2px',
                }}
            >
                <CustomIconButton
                    onClick={() => handleEdit(address._id)}
                    sx={{ padding: '4px' }}
                >
                    <ModeEditOutlineOutlinedIcon fontSize="small" />
                </CustomIconButton>

                <Divider orientation='vertical' flexItem sx={{ height: 34, mx: 1 }} />

                <CustomIconButton
                    onClick={() => handleRemove(address._id)}
                    sx={{ padding: '4px' }}
                >
                    <DeleteForeverOutlinedIcon sx={{ color: 'red' }} fontSize='small' />
                </CustomIconButton>
            </Box>
            <Box display="flex" alignItems="flex-start" mt={1}>
                <FormControlLabel
                    control={
                        <Radio
                            checked={address._id === selectedAddressId}
                            value={address._id}
                            onChange={handleRadioChange}
                            sx={{
                                color: '#22aa99', // Meesho's pink color for active radio button
                                '&.Mui-checked': {
                                    color: '#22aa99', // Pink color for checked radio
                                },
                            }}
                        />
                    }
                    label=""
                    sx={{ mr: 1 }}
                />
                <Box >
                    {/* <Typography variant="body1" fontWeight="bold" sx={{ color: '#333', mb: '4px' }}>
                {address.address}
            </Typography> */}
                    <Typography variant="body2" color="textSecondary">
                        {address.city}, {address.state}, {address.postalCode}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" mt={0.5}>
                        {address.country} |  Phone: {address.phone}
                    </Typography>
                </Box>
            </Box>

        </Box >
    );
};

export default AddressCard;
