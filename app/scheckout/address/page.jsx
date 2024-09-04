'use client'
import AddressDrawer from '@/app/Components/AddressDrawer'
import CustomButton from '@/app/Custom/CustomButton'
import CustomDrawer from '@/app/Custom/CustomDrawer'
import { getAddress, removeAddress } from '@/app/Service/Address'
import { AddAPhoto, Edit, Delete } from '@mui/icons-material'
import { Box, Typography, Grid, IconButton, Radio, FormControlLabel } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const Page = () => {
    const [open, setOpen] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedAddressId, setSelectedAddressId] = useState(null); // State to manage selected address
    const userId = useSelector((state) => state.auth.user.data.user._id); // Replace with dynamic user ID

    const fetchAddresses = async () => {
        try {
            const response = await getAddress(userId);
            const { data } = response; // Access the data property of the response

            setAddresses(data);
            const primaryAddress = data.find(address => address.isPrimary);
            if (primaryAddress) {
                setSelectedAddressId(primaryAddress._id);
            }

            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, [userId]);

    const handleAddAddressClick = () => {
        setOpen(true);
    }

    const handleCloseDrawer = () => {
        setOpen(false);
    }

    const handleEditAddress = (addressId) => {
        // Logic for editing an address
        console.log("Edit address with ID:", addressId);
    };

    const handleRemoveAddress = async (addressId) => {
        try {
            await removeAddress(userId, addressId);
            // After successful removal, update the addresses state
            setAddresses(prevAddresses => prevAddresses.filter(address => address._id !== addressId));
        } catch (err) {
            setError('Failed to remove address. Please try again.');
        }
    };

    const handleAddressChange = (event) => {
        setSelectedAddressId(event.target.value);
        // Optionally, you can update the backend to set the selected address as primary
    };

    return (
        <div>
            <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
                <Typography>Select Delivery Address</Typography>
                <CustomButton title="Add new address" startIcon={<AddAPhoto />} onClick={handleAddAddressClick} />
            </Box>
            {/* Display Addresses */}
            <Grid container spacing={2} p={2}>
                {loading && <Typography>Loading...</Typography>}
                {error && <Typography color="error">{error}</Typography>}
                {!loading && !error && addresses.length > 0 ? (
                    addresses.map((address) => (
                        <Grid item xs={12} sm={6} md={6} key={address._id}>
                            <Box
                                sx={{
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    p: 2,
                                    position: 'relative',
                                    minHeight: '150px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 8,
                                        right: 8,
                                        display: 'flex',
                                        gap: '8px',
                                    }}
                                >
                                    <IconButton onClick={() => handleEditAddress(address._id)} color="primary">
                                        <Edit />
                                    </IconButton>
                                    <IconButton onClick={() => handleRemoveAddress(address._id)} color="error">
                                        <Delete />
                                    </IconButton>
                                </Box>
                                <Box display="flex" alignItems="center" mb={1}>
                                    <FormControlLabel
                                        control={
                                            <Radio
                                                checked={address._id === selectedAddressId}
                                                value={address._id}
                                                onChange={handleAddressChange}
                                            />
                                        }
                                        label=""
                                    />
                                    <Box ml={2}>
                                        <Typography>{address.address}</Typography>
                                        <Typography variant="body1">{address.city}, {address.state}, {address.postalCode}, {address.country}</Typography>
                                        <Typography variant="body2">Phone: {address.phone}</Typography>
                                        <Typography variant="body2" color={address.isPrimary ? 'primary' : 'textSecondary'}>
                                            {address.isPrimary ? 'Primary Address' : 'Secondary Address'}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    ))
                ) : (
                    <Typography>No addresses found.</Typography>
                )}
            </Grid>
            <CustomDrawer open={open} onClose={handleCloseDrawer} title="Add Delivery Address">
                <AddressDrawer onClose={handleCloseDrawer} />
            </CustomDrawer>
        </div>
    );
}

export default Page;
