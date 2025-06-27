"use client";
import React, { useState, useEffect } from "react";
import { DeleteAccount, Logout } from "@/app/Service/User";
import {
  Box,
  Divider,
  Grid,
  useTheme
} from "@mui/material";
import CustomBox from "@/app/Custom/CustomBox";
import { toast } from "react-hot-toast";
import DialogBox from "@/app/Custom/CustomDialog";

import { useRouter } from "next/navigation";
import UserProfile from "@/app/Components/profile/UserProfile";
import TabSection from "@/app/Components/profile/TabSection";
import WishlistItem from "@/app/Components/profile/WishlistProduct";
import UserOrders from "@/app/Components/profile/UserOrders";
import UserNotify from "@/app/Components/profile/UserNotify";
import AddressPage from "@/app/scheckout/address/page";
import { useUser } from "@/app/context/UserContext";

const Layout = ({ children }) => {
  const { user, setUser } = useUser()
  const userId = user?._id;
  console.log(user)
  const [activeTab, setActiveTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteAccountDialog, setOpenDeleteAccountDialog] = useState(false);
  const router = useRouter();
  const theme = useTheme();

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
      setUser(null)
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
      setUser(null)
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
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <UserProfile user={user} />
          <Divider sx={{ my: 2 }} />
          <TabSection activeTab={activeTab} handleTabChange={handleTabChange} />
        </Grid>

        <Grid item xs={12} md={9}>
          <Box
            p={2}
            sx={{
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              mx: "auto",
            }}
          >
            {activeTab === 0 && <UserNotify userId={userId} activeTab={activeTab} />}
            {activeTab === 1 && <WishlistItem userId={userId} activeTab={activeTab} />}
            {activeTab === 2 && <UserOrders userId={userId} activeTab={activeTab} />}
            {activeTab === 3 && <AddressPage />} {/* Render AddressPage */}

          </Box>
        </Grid>
      </Grid>

      <DialogBox
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        title="Logout Confirmation"
        description="Are you sure you want to logout?"
        onConfirm={handleLogoutConfirm}
        onCancel={() => setOpenDialog(false)}
      />

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

export default Layout;
