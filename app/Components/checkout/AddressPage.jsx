"use client";

import React, { useEffect, useState } from "react";
import AddressCard from "@/app/Components/AddressCard";
import AddressDrawer from "@/app/Components/AddressDrawer";
import CustomButton from "@/app/Custom/CustomButton";
import CustomDrawer from "@/app/Custom/CustomDrawer";
import { getAddress, removeAddress, updateAddress } from "@/app/Service/Address";
import CustomIconButton from "@/app/Custom/CustomIconButton";
import CustomTypography from "@/app/Custom/CustomTypography";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import { Plus } from "lucide-react";
import ClientLink from "@/app/Common/ClientClick";

const AddressPage = ({ handleNext, handleBack }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isEditing, setEditing] = useState(false);
  const [selectedAddressData, setSelectedAddressData] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const pathname = usePathname();
  const isCheckoutAddressRoute = pathname === "/scheckout/address";
  const { user } = useUser();
  console.log(user)
  const userId = user?._id;
  const { t } = useTranslation();

  useEffect(() => {
    if (userId) fetchAddresses();
  }, [userId]);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const res = await getAddress(userId);
      console.log(res)
      const list = res.data.addresses || [];
      const hasPrimary = list.some((a) => a.isPrimary);

      if (!hasPrimary && list.length > 0) {
        const first = list[0];
        await updateAddress(userId, first._id, first.address, first.city, first.state, first.postalCode, first.country, first.phone, true);
      }

      // fetch fresh data AFTER update
      const updated = (await getAddress(userId))?.data.addresses || [];
      const primary = updated.find((a) => a.isPrimary);
      setAddresses(updated);
      setSelectedAddressId(primary ? primary._id : null);

    } catch (err) {
      console.error(err);
      toast.error("Failed to load addresses.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddAddressClick = () => {
    if (addresses.length >= 5) return toast.error("You can only add up to 5 addresses.");
    setEditing(false);
    setSelectedAddressData(null);
    setOpen(true);
  };

  const handleEditAddress = (id) => {
    setEditing(true);
    const found = addresses.find((a) => a._id === id);
    setSelectedAddressData(found);
    setOpen(true);
  };

  const handleRemoveAddress = async (id) => {
    try {
      await removeAddress(id);
      fetchAddresses();
    } catch {
      toast.error("Failed to remove address.");
    }
  };

  const handleAddressChange = async (id) => {
    const addr = addresses.find((a) => a._id === id);
    if (addr) {
      await updateAddress(userId, id, addr.address, addr.city, addr.state, addr.postalCode, addr.country, addr.phone, true);
      setSelectedAddressId(id);
      fetchAddresses();
    }
  };

  return (
    <div className="min-h-screen bg-body px-4 py-6 md:px-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <CustomTypography className="text-xl font-semibold text-tprimary">
          {t("Select Delivery Address")}
        </CustomTypography>

        {/* Mobile Add */}
        <div className="block sm:hidden">
          <CustomIconButton onClick={handleAddAddressClick} className="bg-primary text-white p-2 rounded-md">
            <Plus size={20} />
          </CustomIconButton>
        </div>

        {/* Desktop Add */}
        <div className="hidden sm:block">
          <CustomButton title={t("Add Address")} onClick={handleAddAddressClick} />
        </div>
      </div>

      {/* Address Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            <CustomTypography className="text-tsecondary">
              {t("No address found. Please add one to proceed.")}
            </CustomTypography>
          </div>
        )}
      </div>

      {/* Checkout Navigation */}
      {isCheckoutAddressRoute && (
        <div className="flex justify-between py-6">
          <ClientLink href="/scheckout/carts">
            <CustomButton title={t("Back")} onClick={handleBack} variant="outlined" />
          </ClientLink>

          {selectedAddressId ? (
            <ClientLink href="/scheckout/payment">
              <CustomButton title={t("Next")} onClick={handleNext} />
            </ClientLink>
          ) : (
            <CustomButton
              title={t("Next")}
              disabled
              onClick={() => toast.error(t("Please add an address before proceeding."))}
            />
          )}
        </div>
      )}

      {/* Drawer */}
      <CustomDrawer
        open={open}
        onClose={() => setOpen(false)}
        title={isEditing ? t("Edit Address") : t("Add Address")}
      >
        <AddressDrawer
          onClose={() => setOpen(false)}
          isEditing={isEditing}
          addressData={selectedAddressData}
          onAddressSaved={fetchAddresses}
        />
      </CustomDrawer>
    </div>
  );
};

export default AddressPage;
