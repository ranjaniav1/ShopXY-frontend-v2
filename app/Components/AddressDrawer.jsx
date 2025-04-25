import React, { useState, useEffect } from "react";
import CustomButton from "../Custom/CustomButton";
import { TextField, Box } from "@mui/material";
import { CreateAddress, updateAddress } from "../Service/Address";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const AddressDrawer = ({ onClose, isEditing, addressData, onAddressSaved = () => {} }) => {
  const userId = useSelector((state) => state.auth.user._id);

  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [roadName, setRoadName] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  useEffect(() => {
    if (isEditing && addressData) {
      setName(addressData.name || "");
      setContactNumber(addressData.phone || "");

      let addressParts = addressData.address?.split("|");
      if (!addressParts || addressParts.length < 2) {
        addressParts = addressData.address?.split(" ") || [];
        setHouseNo(addressParts[0] || "");
        setRoadName(addressParts.slice(1).join(" ") || "");
      } else {
        setHouseNo(addressParts[0] || "");
        setRoadName(addressParts[1] || "");
      }

      setPincode(addressData.postalCode || "");
      setCity(addressData.city || "");
      setState(addressData.state || "");
    } else {
      setName("");
      setContactNumber("");
      setHouseNo("");
      setRoadName("");
      setPincode("");
      setCity("");
      setState("");
    }
  }, [isEditing, addressData]);

  const validateFields = () => {
    if (!name) return "Name is required.";
    if (!/^\d{10}$/.test(contactNumber)) return "Contact number must be 10 digits.";
    if (!houseNo) return "House number is required.";
    if (!/^\d{6}$/.test(pincode)) return "Pincode must be 6 digits.";
    if (!city) return "City is required.";
    if (!state) return "State is required.";
    return "";
  };

  const handleSaveAddress = async () => {
    const error = validateFields();
    if (error) {
      toast.error(error);
      return;
    }

    const fullAddress = `${houseNo} ${roadName}`;
    const payload = {
      address: fullAddress,
      city,
      state,
      postalCode: pincode,
      country: "USA",
      phone: contactNumber,
      name,
    };

    try {
      if (isEditing && addressData?._id) {
        await updateAddress(userId, addressData._id, payload.address, payload.city, payload.state, payload.postalCode, payload.country, payload.phone, false);
        toast.success("Address updated successfully!");
      } else {
        await CreateAddress(userId, payload.address, payload.city, payload.state, payload.postalCode, payload.country, payload.phone);
        toast.success("Address added successfully!");
      }

      onAddressSaved(); // Trigger refresh in parent
      onClose(); // Close drawer after save
    } catch (err) {
      console.error("Failed to save address", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField label="Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
      <TextField label="Contact Number" fullWidth value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
      <TextField label="House No." fullWidth value={houseNo} onChange={(e) => setHouseNo(e.target.value)} />
      <TextField label="Road Name" fullWidth value={roadName} onChange={(e) => setRoadName(e.target.value)} />
      <TextField label="Pincode" fullWidth value={pincode} onChange={(e) => setPincode(e.target.value)} />
      <TextField label="City" fullWidth value={city} onChange={(e) => setCity(e.target.value)} />
      <TextField label="State" fullWidth value={state} onChange={(e) => setState(e.target.value)} />

      <Box display="flex" justifyContent="space-between">
        <CustomButton title="Cancel" variant="outlined" onClick={onClose} />
        <CustomButton title="Save Address" onClick={handleSaveAddress} />
      </Box>
    </Box>
  );
};

export default AddressDrawer;
