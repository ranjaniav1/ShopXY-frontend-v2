'use client'
import React, { useEffect, useState } from 'react';
import CustomButton from '../Custom/CustomButton';
import { LocationCity, PhoneCallback } from '@mui/icons-material';
import { TextField, Box } from '@mui/material';
import { CreateAddress, getAddress } from '../Service/Address';
import { useDispatch, useSelector } from 'react-redux';
import { setMyAddress } from '../redux/reducer/addressReducer';

const AddressDrawer = ({ onClose }) => {
    const userId = useSelector((state) => state.auth.user.data.user._id);
    const [name, setName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [houseNo, setHouseNo] = useState('');
    const [roadName, setRoadName] = useState('');
    const [pincode, setPincode] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAddressId, setSelectedAddressId] = useState(null); // State to manage selected address
    const dispatch = useDispatch()


    // Fetch the updated address list after adding a new address
    const fetchAddresses = async () => {
        try {
            const response = await getAddress(userId);
            return response.data;  // Return the list of addresses
        } catch (err) {
            console.error("Error fetching addresses", err);
            return [];
        }
    };
    const addAddress = async () => {
        try {
            const addressData = {
                address: `${houseNo} ${roadName}`,
                city,
                state,
                postalCode: pincode,
                country: 'USA', // Assuming country is constant; adjust as needed
                phone: contactNumber,
                isPrimary: false // Assuming new addresses are not primary; adjust if needed
            };
            // Create the address in the backend
            await CreateAddress(userId, addressData);

            // Fetch the updated list of addresses after creating the new one
            const updatedAddresses = await fetchAddresses();

            // Dispatch the updated list of addresses to Redux
            dispatch(setMyAddress(updatedAddresses));

            // Close the drawer after adding the address
            onClose();
        } catch (error) {
            console.error("Error creating address", error);
        }
    };


    return (
        <Box>
            {/* Contact Details Section */}
            <Box mb={2}>
                <CustomButton title="Contact Details" startIcon={<PhoneCallback />} />
            </Box>
            <Box mb={2}>
                <TextField
                    placeholder="Name"
                    variant="standard"
                    fullWidth
                    sx={{ mb: 1 }}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <TextField
                    placeholder="Contact Number"
                    variant="standard"
                    fullWidth
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                />
            </Box>

            {/* Address Section */}
            <Box mb={2}>
                <CustomButton title="Address" startIcon={<LocationCity />} />
            </Box>
            <Box mb={2}>
                <TextField
                    placeholder="House no./ Building name"
                    variant="standard"
                    fullWidth
                    sx={{ mb: 1 }}
                    value={houseNo}
                    onChange={(e) => setHouseNo(e.target.value)}
                />
                <TextField
                    placeholder="Road name / Area / Colony"
                    variant="standard"
                    fullWidth
                    sx={{ mb: 1 }}
                    value={roadName}
                    onChange={(e) => setRoadName(e.target.value)}
                />
                <TextField
                    placeholder="Pincode"
                    variant="standard"
                    fullWidth
                    sx={{ mb: 1 }}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                />
                <TextField
                    placeholder="City"
                    variant="standard"
                    fullWidth
                    sx={{ mb: 1 }}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <TextField
                    placeholder="State"
                    variant="standard"
                    fullWidth
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                />
            </Box>
            <Box mt={2}>
                <CustomButton title="Save Address and Continue" onClick={addAddress} />
            </Box>
        </Box>
    );
};

export default AddressDrawer;
