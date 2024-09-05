import React, { useState, useEffect } from 'react';
import CustomButton from '../Custom/CustomButton';
import { LocationCity, PhoneCallback } from '@mui/icons-material';
import { TextField, Box } from '@mui/material';
import { CreateAddress, getAddress, updateAddress } from '../Service/Address';
import { useDispatch, useSelector } from 'react-redux';
import { setMyAddress } from '../redux/reducer/addressReducer';

const AddressDrawer = ({ onClose, isEditing, addressData }) => {
    const userId = useSelector((state) => state.auth.user.data.user._id);
    const [name, setName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [houseNo, setHouseNo] = useState('');
    const [roadName, setRoadName] = useState('');
    const [pincode, setPincode] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        if (isEditing && addressData) {
            setName(addressData.name );
            setContactNumber(addressData.phone );
            setHouseNo(addressData.address.split(' ')[0] );
            setRoadName(addressData.address.split(' ').slice(1).join(' ') );
            setPincode(addressData.postalCode);
            setCity(addressData.city);
            setState(addressData.state );
        } else {
            // Clear form when not editing
            setName('');
            setContactNumber('');
            setHouseNo('');
            setRoadName('');
            setPincode('');
            setCity('');
            setState('');
        }
    }, [isEditing, addressData]);

    const fetchAddresses = async () => {
        try {
            const response = await getAddress(userId);
            return response.data;
        } catch (err) {
            console.error("Error fetching addresses", err);
            return [];
        }
    };

    const handleSaveAddress = async () => {
        try {
            const addressPayload = {
                address: `${houseNo} ${roadName}`,
                city,
                state,
                postalCode: pincode,
                country: 'USA',
                phone: contactNumber,
                isPrimary: false, // Adjust as needed
                name
            };
    
            if (isEditing && addressData?._id) {
                await updateAddress(userId, {
                    addressId: addressData._id,
                    ...addressPayload
                });
            } else {
                await CreateAddress(userId, addressPayload); // Create address expects an array
            }
    
            const updatedAddresses = await fetchAddresses();
            dispatch(setMyAddress(updatedAddresses));
            onClose();
        } catch (error) {
            console.error("Error saving address", error);
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
                <CustomButton title="Save Address and Continue" onClick={handleSaveAddress} />
            </Box>
        </Box>
    );
};

export default AddressDrawer;
