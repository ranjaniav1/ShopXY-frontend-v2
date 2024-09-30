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
  CardMedia
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

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth?.user?.data?.user._id);
  const user = useSelector((state) => state.auth?.user?.data?.user);
  const [activeTab, setActiveTab] = useState(0); // Track the active tab
  const [notifications, setNotifications] = useState([]); // Store notifications
  const [wishlist, setWishlist] = useState([]); // Store wishlist items
  const [openDialog, setOpenDialog] = useState(false); // Control dialog visibility
  const router = useRouter();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // Control delete dialog visibility
  const [openDeleteAccountDialog, setOpenDeleteAccountDialog] = useState(false); // Control delete account dialog visibility

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    if (newValue === 3) {
      setOpenDialog(true);
    } else if (newValue === 2) {
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
    try {
      await deleteWishlistItem(userId, productId); // Call the delete service
      setWishlist(wishlist.filter((item) => item.product._id !== productId)); // Update the local state
      toast.success("Item removed from wishlist.");
    } catch (error) {
      toast.error("Failed to remove item: " + error.message);
    }
  };

  return (
    <CustomBox>
      <Grid container spacing={4}>
        {/* Left side with profile and tabs in separate sections */}
        <Grid item xs={12} md={4}>
          {/* Profile Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 2,
              mb: 4,
              backgroundColor: "#f9f9f9",
              borderRadius: "8px"
            }}
          >
            <Avatar
              src={user?.avatar || "/default-avatar.png"}
              alt={user?.fullname || "User Avatar"}
              sx={{
                width: 120,
                height: 120,
                mb: 2,
                border: "1px solid #22aa99"
              }}
            />
            <Typography variant="h6" gutterBottom>
              {user?.fullname || "Your Name"}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              {user?.email || "Email not available"}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              {user?.phone || "Phone not available"}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Tabs Section */}
          <Box
            sx={{
              p: 2,
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
            }}
          >
            <Tabs
              orientation="vertical"
              value={activeTab}
              onChange={handleTabChange}
              sx={{ width: "100%" }}
            >
              <Tab label="Notifications" />
              <Tab label="Wishlist" />
              <Tab label="Delete Account" />
              <Tab label="Logout" />
            </Tabs>
          </Box>
        </Grid>

        <Divider orientation="vertical" flexItem />

        {/* Right side with dynamic content based on selected tab */}
        <Grid item xs={12} md={6}>
          {activeTab === 0 && (
            <Box p={2}>
              <Typography variant="h5">Notifications</Typography>
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <Box key={notification.id} mb={2}>
                    <Typography variant="body1">
                      {notification.notify}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {new Date(notification.timestamp).toLocaleDateString()}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No notifications available.
                </Typography>
              )}
            </Box>
          )}

          {activeTab === 1 && (
            <Box p={2}>
              <Typography variant="h5">Wishlist</Typography>
              <Grid container spacing={2}>
                {wishlist.length > 0 ? (
                  wishlist.map((item) => (
                    <Grid
                      item
                      xs={6}
                      sm={4}
                      md={3}
                      lg={2}
                      key={item.product.id}
                    >
                      <CustomCollectionCard
                        id={item.product.id}
                        image={item.product.image}
                        title={item.product.title}
                      />
                    </Grid>
                  ))
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    No items in your wishlist.
                  </Typography>
                )}
              </Grid>
            </Box>
          )}

          {activeTab === 2 && (
            <Box p={2}>
              <Typography variant="h5">Delete Account</Typography>
              {/* Delete Account content can go here */}
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
