"use client";
import AddressCard from "@/app/Components/AddressCard";
import AddressDrawer from "@/app/Components/AddressDrawer";
import CustomButton from "@/app/Custom/CustomButton";
import CustomDrawer from "@/app/Custom/CustomDrawer";
import {
  getAddress,
  removeAddress,
  updateAddress
} from "@/app/Service/Address";
import { Box, Container, Grid, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import { Add } from "@mui/icons-material"; // For add icon
import CustomIconButton from "@/app/Custom/CustomIconButton";

const Page = ({ handleNext, handleBack }) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isEditing, setEditing] = useState(false);
  const [selectedAddressData, setSelectedAddressData] = useState(null);
  const [addresses, setAddresses] = useState([]);

  const userId = useSelector((state) => state.auth.user.data.user._id);
  const { t } = useTranslation();
  const theme = useTheme();
  useEffect(() => {
    if(userId){

      fetchAddresses();
    }
  }, [userId]);

  const fetchAddresses = async () => {
    try {
      const response = await getAddress(userId);
      const fetchedAddresses = response.data || [];
  
      // If only one address and it's not set as primary
      if (fetchedAddresses.length === 1 && !fetchedAddresses[0].isPrimary) {
        const addr = fetchedAddresses[0];
        await updateAddress(
          userId,
          addr._id,
          addr.address,
          addr.city,
          addr.state,
          addr.postalCode,
          addr.country,
          addr.phone,
          true // set as primary
        );
        addr.isPrimary = true; // update locally
      }
  
      const primaryAddress = fetchedAddresses.find((address) => address.isPrimary);
  
      setAddresses(fetchedAddresses);
      setSelectedAddressId(primaryAddress ? primaryAddress._id : null);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError("Failed to load addresses. Please try again.");
    }
  };
  
  

  const handleAddAddressClick = () => {
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
      // Update the primary status of the selected address
      const selectedAddress = addresses.find(
        (addr) => addr._id === addressId
      );
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
        await fetchAddresses();
      }
    } catch (err) {
      console.error("Failed to update primary address", err);
      setError("Failed to update primary address. Please try again.");
    }
  };

  return (
    <div>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <Typography>{t("Select Delivery Address")}</Typography>

        {isSmallScreen ? (
          <CustomIconButton
            onClick={handleAddAddressClick}
            sx={{
              background: theme.palette.button.background,
              color: theme.palette.button.color
            }}
          >
            {" "}
            <Add />
          </CustomIconButton>
        ) : (
          <CustomButton
            title={t("Add Address")} // Show full button for larger devices
            onClick={handleAddAddressClick}
          />
        )}
      </Box>

      <Grid container spacing={2} p={2}>
  {loading ? (
    <Typography>Loading addresses...</Typography>
  ) : addresses.length > 0 ? (
    addresses.map((address) => (
      <Grid item xs={12} sm={6} md={6} key={address._id}>
        <AddressCard
          address={address}
          selectedAddressId={selectedAddressId}
          handleEdit={handleEditAddress}
          handleRemove={handleRemoveAddress}
          handleChange={handleAddressChange}
        />
      </Grid>
    ))
  ) : (
    <Grid item xs={12}>
      <Box textAlign="center" py={5}>
        <Typography variant="h6" color="text.secondary">
          {t("No address found. Please add one to proceed.")}
        </Typography>
      </Box>
    </Grid>
  )}
</Grid>

      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between", // Aligns buttons to start and end
            padding: "16px 0" // Optional: Adjust padding as needed
          }}
        >
          <Link href="/scheckout/carts">
            <CustomButton
              title="Back"
              onClick={handleBack}
              variant="outlined"
            />
          </Link>

          {selectedAddressId ? (
            <Link href="/scheckout/payment">
              <CustomButton
                title="Next"
                variant="outlined"
                onClick={handleNext}
              />
            </Link>
          ) : (
            <CustomButton
              title="Next"
              variant="outlined"
              disabled // Disable button if no address is selected
              onClick={() =>
                toast.error(t("Please add an address before proceeding."))
              } // Optional: Show a toast when clicked
            />
          )}
        </Box>
      </Container>

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
            onAddressSaved={async () => {
              await fetchAddresses(); // This is enough
            }}
                    />
        </CustomDrawer>
      )}
    </div>
  );
};

export default Page;
