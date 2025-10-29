import React, { useState, useEffect } from "react";
import CustomButton from "../../Custom/CustomButton";
import { CreateAddress, updateAddress } from "../../Service/Address";
import toast from "react-hot-toast";
import { useUser } from "../../context/UserContext";

const AddressDrawer = ({ onClose, isEditing, addressData, onAddressSaved = () => { } }) => {
  const { user } = useUser()
  const userId = user?._id

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
      country: "India",
      phone: contactNumber,
      name,
    };

    try {
      if (isEditing && addressData?._id) {
        await updateAddress(
          userId,
          addressData._id,
          payload.address,
          payload.city,
          payload.state,
          payload.postalCode,
          payload.country,
          payload.phone,
          false
        );
        toast.success("Address updated successfully!");
      } else {
        await CreateAddress(
          userId,
          payload.address,
          payload.city,
          payload.state,
          payload.postalCode,
          payload.country,
          payload.phone
        );
        toast.success("Address added successfully!");
      }

      onAddressSaved();
      onClose();
    } catch (err) {
      console.error("Failed to save address", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-body px-4 py-6 rounded">
      <input
        type="text"
        placeholder="Name"
        className="bg-secondary text-tsecondary px-4 py-2 rounded border border-secondary focus:outline-none focus:ring-2 focus:ring-primary"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Contact Number"
        className="bg-secondary text-tsecondary px-4 py-2 rounded border border-secondary focus:outline-none focus:ring-2 focus:ring-primary" value={contactNumber}
        onChange={(e) => setContactNumber(e.target.value)}
      />

      <input
        type="text"
        placeholder="House No."
        className="bg-secondary text-tsecondary px-4 py-2 rounded border border-secondary focus:outline-none focus:ring-2 focus:ring-primary" value={houseNo}
        onChange={(e) => setHouseNo(e.target.value)}
      />

      <input
        type="text"
        placeholder="Road Name"
        className="bg-secondary text-tsecondary px-4 py-2 rounded border border-secondary focus:outline-none focus:ring-2 focus:ring-primary" value={roadName}
        onChange={(e) => setRoadName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Pincode"
        className="bg-secondary text-tsecondary px-4 py-2 rounded border border-secondary focus:outline-none focus:ring-2 focus:ring-primary" value={pincode}
        onChange={(e) => setPincode(e.target.value)}
      />

      <input
        type="text"
        placeholder="City"
        className="bg-secondary text-tsecondary px-4 py-2 rounded border border-secondary focus:outline-none focus:ring-2 focus:ring-primary" value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <input
        type="text"
        placeholder="State"
        className="bg-secondary text-tsecondary px-4 py-2 rounded border border-secondary focus:outline-none focus:ring-2 focus:ring-primary" value={state}
        onChange={(e) => setState(e.target.value)}
      />

      <div className="flex justify-between mt-4">
        <CustomButton title="Cancel" variant="outlined" onClick={onClose} />
        <CustomButton title="Save Address" onClick={handleSaveAddress} />
      </div>
    </div>
  );
};

export default AddressDrawer;
