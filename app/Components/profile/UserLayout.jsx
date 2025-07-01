"use client";
import React, { useState } from "react";
import { DeleteAccount, Logout } from "@/app/Service/User";
import CustomBox from "@/app/Custom/CustomBox";
import { toast } from "react-hot-toast";
import DialogBox from "@/app/Custom/CustomDialog";
import { useRouter } from "next/navigation";
import UserProfile from "@/app/Components/profile/UserProfile";
import TabSection from "@/app/Components/profile/TabSection";
import WishlistItem from "@/app/Components/profile/WishlistProduct";
import UserOrders from "@/app/Components/profile/UserOrders";
import UserNotify from "@/app/Components/profile/UserNotify";
import { useUser } from "@/app/context/UserContext";
import AddressPage from "@/app/Components/checkout/AddressPage";

const UserLayout = () => {
  const { user, setUser } = useUser();
  const userId = user?._id;
  const [activeTab, setActiveTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteAccountDialog, setOpenDeleteAccountDialog] = useState(false);
  const router = useRouter();

  const handleTabChange = (event, newValue) => {
    if (newValue === 4) {
      setOpenDialog(true);
    } else if (newValue === 5) {
      setOpenDeleteAccountDialog(true);
    } else {
      setActiveTab(newValue);
      setOpenDialog(false);
      setOpenDeleteAccountDialog(false);
    }
  };

  const handleLogoutConfirm = async () => {
    try {
      await Logout({ userId });
      setUser(null);
      toast.success("User logged out successfully.");
      router.push("/");
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setOpenDialog(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await DeleteAccount(userId);
      setUser(null);
      toast.success("Account deleted successfully.");
      router.push("/");
    } catch (error) {
      toast.error("Failed to delete account: " + error.message);
    } finally {
      setOpenDeleteAccountDialog(false);
    }
  };

  return (
    <CustomBox>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Panel */}
        <div className="col-span-1">
          <UserProfile user={user} />
          <div className="my-4 border-b border-gray-300" />
          <TabSection activeTab={activeTab} handleTabChange={handleTabChange} />
        </div>

        {/* Right Panel */}
        <div className="col-span-1 md:col-span-3">
          <div className="p-4 rounded-lg shadow-md bg-white">
            {activeTab === 0 && <UserNotify userId={userId} activeTab={activeTab} />}
            {activeTab === 1 && <WishlistItem userId={userId} activeTab={activeTab} />}
            {activeTab === 2 && <UserOrders userId={userId} activeTab={activeTab} />}
            {activeTab === 3 && <AddressPage />}
          </div>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      <DialogBox
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        title="Logout Confirmation"
        description="Are you sure you want to logout?"
        onConfirm={handleLogoutConfirm}
        onCancel={() => setOpenDialog(false)}
      />

      {/* Delete Account Confirmation Dialog */}
      <DialogBox
        open={openDeleteAccountDialog}
        onClose={() => setOpenDeleteAccountDialog(false)}
        title="Delete Account Confirmation"
        description="Are you sure you want to delete your account?"
        onConfirm={handleDeleteAccount}
        onCancel={() => setOpenDeleteAccountDialog(false)}
      />
    </CustomBox>
  );
};

export default UserLayout;
