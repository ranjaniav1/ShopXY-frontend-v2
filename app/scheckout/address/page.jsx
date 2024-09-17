'use client'
import AddressCard from "@/app/Components/AddressCard";
import AddressDrawer from "@/app/Components/AddressDrawer";
import CustomButton from "@/app/Custom/CustomButton";
import CustomDrawer from "@/app/Custom/CustomDrawer";
import { setMyAddress } from "@/app/redux/reducer/addressReducer";
import { getAddress, removeAddress, updateAddress } from "@/app/Service/Address";
import { AddAPhoto } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [isEditing, setEditing] = useState(false);
    const [selectedAddressData, setSelectedAddressData] = useState(null);

    const userId = useSelector((state) => state.auth.user.data.user._id);
    const addressData = useSelector((state) => state.address.data?.data || []);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchAddresses();
    }, []);
    const fetchAddresses = async () => {
        try {
            const response = await getAddress(userId);
            dispatch(setMyAddress(response));

            // Set the primary address ID
            const primaryAddress = response.data.find(address => address.isPrimary);
            setSelectedAddressId(primaryAddress ? primaryAddress._id : null);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError('Failed to load addresses. Please try again.');
        }
    };



    const handleAddAddressClick = () => {
        setEditing(false);
        setSelectedAddressData(null);
        setOpen(true);
    };

    const handleCloseDrawer = () => setOpen(false);

    const handleEditAddress = (addressId) => {
        setOpen(true);
        setEditing(true);
        const address = addressData.find(addr => addr._id === addressId);
        setSelectedAddressData(address);
    };

    const handleRemoveAddress = async (addressId) => {
        try {
            await removeAddress(userId, addressId);
            await fetchAddresses(); // Refresh address list
        } catch (err) {
            console.error("Failed to remove address", err);
            setError('Failed to remove address. Please try again.');
        }
    };

    const handleAddressChange = async (addressId) => {
        try {
            // Update the primary status of the selected address
            const selectedAddress = addressData.find(addr => addr._id === addressId);
            if (selectedAddress) {
                await updateAddress(
                    userId,
                    addressId,
                    selectedAddress.address,
                    selectedAddress.city,
                    selectedAddress.state,
                    selectedAddress.postalCode,
                    selectedAddress.country,
                    selectedAddress.phone,
                    true //set this address as a primary
                );
                // Update the selected address ID
                setSelectedAddressId(addressId);

                // Fetch updated addresses
                await fetchAddresses();
            }
        } catch (err) {
            console.error('Failed to update primary address', err);
            setError('Failed to update primary address. Please try again.');
        }
    };

    return (
        <div>
            <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
                <Typography>Select Delivery Address</Typography>
                <CustomButton title="Add new address" startIcon={<AddAPhoto />} onClick={handleAddAddressClick} />
            </Box>

            <Grid container spacing={2} p={2}>
                {
                    addressData ? (
                        addressData.map((address) => (
                            <Grid item xs={12} sm={6} md={6} key={address._id}>
                                <AddressCard
                                    address={address}
                                    selectedAddressId={selectedAddressId}
                                    handleEdit={handleEditAddress}
                                    handleRemove={handleRemoveAddress}
                                    handleChange={handleAddressChange}
                                />
                            </Grid>
                        ))) : (<p>no address found</p>)
                }

            </Grid>

            <Box sx={{ textAlign: 'end' }}>
                <Link href="/scheckout/payment">
                    <CustomButton title="Continue" />
                </Link>
            </Box>

            {open && (
                <CustomDrawer open={open} onClose={handleCloseDrawer} title={isEditing ? "Edit Address" : "Add Address"}>
                    <AddressDrawer onClose={handleCloseDrawer} isEditing={isEditing} addressData={selectedAddressData} />
                </CustomDrawer>
            )}
        </div>
    );
}

export default Page;
