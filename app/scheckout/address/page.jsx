"use client";

import AddressCard from "@/app/Components/AddressCard";
import AddressDrawer from "@/app/Components/AddressDrawer";
import CustomButton from "@/app/Custom/CustomButton";
import CustomDrawer from "@/app/Custom/CustomDrawer";
import { getAddress, removeAddress, updateAddress } from "@/app/Service/Address";
import { Box, Container, Grid, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import { Add } from "@mui/icons-material"; // For add icon
import CustomIconButton from "@/app/Custom/CustomIconButton";
import CustomTypography from "@/app/Custom/CustomTypography";
import CustomBox from "@/app/Custom/CustomBox";
import { usePathname } from "next/navigation";
import { useUser } from "@/app/context/UserContext";

const AddressPage = ({ handleNext, handleBack }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isEditing, setEditing] = useState(false);
  const [selectedAddressData, setSelectedAddressData] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const pathname = usePathname();
  const isCheckoutAddressRoute = pathname === "/scheckout/address";
  console.log("path", isCheckoutAddressRoute)
  const { user } = useUser()
  const userId = user._id;
  const { t } = useTranslation();

  useEffect(() => {
    if (userId) {
      fetchAddresses();
    }
  }, [userId]);

  const fetchAddresses = async () => {
    setLoading(true);
    setError(null); // Reset error before fetching
    try {
      const response = await getAddress(userId);
      const fetchedAddresses = response?.data || [];
      const primaryExists = fetchedAddresses.some((addr) => addr.isPrimary);

      if (!primaryExists && fetchedAddresses.length > 0) {
        const addr = fetchedAddresses[0];
        await updateAddress(userId, addr._id, addr.address, addr.city, addr.state, addr.postalCode, addr.country, addr.phone, true);
        addr.isPrimary = true;
      }

      const updatedResponse = await getAddress(userId);
      const updatedAddresses = updatedResponse?.data || [];
      const primaryAddress = updatedAddresses.find((addr) => addr.isPrimary);

      setAddresses(updatedAddresses);
      setSelectedAddressId(primaryAddress ? primaryAddress._id : null);
    } catch (err) {
      setAddresses([])
      console.error("Failed to load addresses", err);
      setError("Failed to load addresses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddAddressClick = () => {
    if (addresses.length >= 5) {
      toast.error("You can only add up to 5 addresses.");
      return;
    }
    setEditing(false);
    setSelectedAddressData(null);
    setOpen(true);
  };

  const handleCloseDrawer = () => setOpen(false);

  const handleEditAddress = (addressId) => {
    setEditing(true);
    setOpen(true);
    const address = addresses.find((addr) => addr._id === addressId);
    setSelectedAddressData(address);
  };

  const handleRemoveAddress = async (addressId) => {
    try {
      await removeAddress(userId, addressId);
      await fetchAddresses(); // Refresh address list
    } catch (err) {
      console.error("Failed to remove address", err);
      setError("Failed to remove address. Please try again.");
    }
  };

  const handleAddressChange = async (addressId) => {
    try {
      const selectedAddress = addresses.find((addr) => addr._id === addressId);
      if (selectedAddress) {
        await updateAddress(userId, addressId, selectedAddress.address, selectedAddress.city, selectedAddress.state, selectedAddress.postalCode, selectedAddress.country, selectedAddress.phone, true);
        setSelectedAddressId(addressId);
        await fetchAddresses();
      }
    } catch (err) {
      console.error("Failed to update primary address", err);
      setError("Failed to update primary address. Please try again.");
    }
  };

  return (
    <CustomBox>
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-2">
        <CustomTypography className="text-tprimary font-medium text-lg">
          {t("Select Delivery Address")}
        </CustomTypography>

        <div className="block sm:hidden">
          <CustomIconButton
            onClick={handleAddAddressClick}
            className="bg-primary text-white p-2 rounded-md"
          >
            <Add />
          </CustomIconButton>
        </div>

        <div className="hidden sm:block">
          <CustomButton title={t("Add Address")} onClick={handleAddAddressClick} />
        </div>
      </div>

      {/* Address List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
        {loading ? (
          <CustomTypography>{t("Loading addresses...")}</CustomTypography>
        ) : addresses.length > 0 ? (
          addresses.map((address) => (
            <AddressCard
              key={address._id}
              address={address}
              selectedAddressId={selectedAddressId}
              handleEdit={handleEditAddress}
              handleRemove={handleRemoveAddress}
              handleChange={handleAddressChange}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <CustomTypography variant="h6" className="text-tsecondary">
              {t("No address found. Please add one to proceed.")}
            </CustomTypography>
          </div>
        )}
      </div>

      {/* Navigation for Checkout Flow */}
      {isCheckoutAddressRoute && (
        <div className="container mx-auto px-4">
          <div className="flex justify-between py-4">
            <Link href="/scheckout/carts">
              <CustomButton title="Back" onClick={handleBack} variant="outlined" />
            </Link>

            {selectedAddressId ? (
              <Link href="/scheckout/payment">
                <CustomButton title="Next" variant="outlined" onClick={handleNext} />
              </Link>
            ) : (
              <CustomButton
                title="Next"
                variant="outlined"
                disabled
                onClick={() => toast.error(t("Please add an address before proceeding."))}
              />
            )}
          </div>
        </div>
      )}

      {/* Drawer */}
      {open && (
        <CustomDrawer
          open={open}
          onClose={handleCloseDrawer}
          title={isEditing ? "Edit Address" : "Add Address"}
        >
          <AddressDrawer
            onClose={handleCloseDrawer}
            isEditing={isEditing}
            addressData={selectedAddressData}
            onAddressSaved={fetchAddresses}
          />
        </CustomDrawer>
      )}
    </CustomBox>

  );
};

export default AddressPage;
