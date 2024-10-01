"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteWishlistItem,
  getNotifications,
  getWishlist
} from "@/app/Service/Profile"; // Import the necessary services
import { DeleteAccount, Logout as performLogout } from "@/app/Service/User";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Button
} from "@mui/material";
import CustomBox from "@/app/Custom/CustomBox";
import { toast } from "react-hot-toast";
import DialogBox from "@/app/Custom/CustomDialog";
import { logout } from "@/app/redux/reducer/user/loginReducer";
import { Logout } from "@/app/Service/User";
import { RemoveUser } from "../../redux/reducer/user/loginReducer";
import { useRouter } from "next/navigation";
import DeleteIcon from "@mui/icons-material/Delete"; // Import Delete icon
import CustomCollectionCard from "@/app/Common/CustomCollectionCard";
import Link from "next/link";
import UserProfile from "@/app/Components/profile/UserProfile";
import TabSection from "@/app/Components/profile/TabSection";
import WishlistItem from "@/app/Components/profile/WishlistProduct";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth?.user?.data?.user._id);
  const user = useSelector((state) => state.auth?.user?.data?.user);
  const [activeTab, setActiveTab] = useState(0); // Track the active tab
  const [notifications, setNotifications] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();
  const [openDeleteAccountDialog, setOpenDeleteAccountDialog] = useState(false);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    if (newValue === 2) {
      setOpenDialog(true);
    } else if (newValue === 3) {
      setOpenDeleteAccountDialog(true); // Delete account dialog
    } else if (newValue === 1) {
      fetchWishlist(); // Fetch wishlist when the tab is activated
    }
  };

  // Fetch notifications when the "Notifications" tab is selected
  useEffect(() => {
    if (activeTab === 0) {
      notify();
    }
  }, [activeTab]);

  const notify = async () => {
    try {
      const response = await getNotifications(userId);
      setNotifications(response); // Store the notifications in state
    } catch (e) {
      console.log(e);
    }
  };

  // Fetch wishlist items
  const fetchWishlist = async () => {
    try {
      const response = await getWishlist(userId);
      console.log(response);
      setWishlist(response); // Store the wishlist items
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  // Handle logout confirmation
  const handleLogoutConfirm = async () => {
    try {
      await Logout({ userId: userId });
      dispatch(RemoveUser());
      toast.success("User logged out successfully.");
      router.push("/");
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setOpenDialog(false); // Close dialog after logout
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await DeleteAccount(userId);
      dispatch(RemoveUser());
      toast.success("Account deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete account: " + error.message);
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
    console.log("User ID:", userId); // Log userId
    console.log("Product ID:", productId); // Log productId
    try {
      await deleteWishlistItem({ userId, productId });
      setWishlist(wishlist.filter((item) => item.product._id !== productId)); // Update the local state
      toast.success("Item removed from wishlist.");
    } catch (error) {
      toast.error("Failed to remove item: " + error.message);
    }
  };

  return (
    <CustomBox>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <UserProfile user={user} />
          <Divider sx={{ my: 2 }} />
          <TabSection activeTab={activeTab} handleTabChange={handleTabChange} />
        </Grid>

        {/* Right side with dynamic content based on selected tab */}
        <Grid item xs={12} md={8}>
          {activeTab === 0 && (
            <Box p={2} className="bg-gray-100 rounded-md shadow-lg  mx-auto">
              {/* <Typography variant="h5" className="text-blue-600 mb-4">
                Notifications
              </Typography> */}
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <Paper
                    key={notification.id}
                    sx={{
                      p: 3,
                      mb: 3,
                      backgroundColor: "#fff",
                      borderLeft: "4px solid #00796b",
                      boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.05)"
                    }}
                  >
                    <Typography
                      variant="body1"
                      className="font-semibold text-gray-700"
                    >
                      {notification.notify}
                    </Typography>
                    <Typography variant="body2" className="text-gray-500 mt-1">
                      {new Date(notification.timestamp).toLocaleDateString()}
                    </Typography>
                  </Paper>
                ))
              ) : (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className="text-gray-500"
                >
                  No notifications available.
                </Typography>
              )}
            </Box>
          )}

          {activeTab === 1 && (
            <Box p={2} className="bg-gray-100 rounded-md shadow-lg mx-auto">
              {wishlist.length > 0 ? (
                wishlist.map((item) => (
                  <WishlistItem
                    key={item.product._id}
                    item={item}
                    handleRemove={handleRemoveFromWishlist}
                  />
                ))
              ) : (
                <Typography variant="h6" color="textSecondary" align="center">
                  No Items in Wishlist
                </Typography>
              )}
            </Box>
          )}
        </Grid>
      </Grid>

      {/* Confirmation Dialog for Logout */}
      <DialogBox
        open={openDialog}
        title="Logout Confirmation"
        description="Are you sure you want to logout?"
        onConfirm={handleLogoutConfirm}
        onCancel={() => setOpenDialog(false)}
      />
      <DialogBox
        open={openDeleteAccountDialog}
        title="Delete Account Confirmation"
        description="Are you sure you want to delete your account?"
        onConfirm={handleDeleteAccount}
        onCancel={() => setOpenDeleteAccountDialog(false)}
      />
    </CustomBox>
  );
};

export default Layout;
