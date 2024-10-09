"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  DeleteNotifications,
  deleteWishlistItem,
  getNotifications,
  getOrder,
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
  Button,
  useTheme
} from "@mui/material";
import CustomBox from "@/app/Custom/CustomBox";
import { toast } from "react-hot-toast";
import DialogBox from "@/app/Custom/CustomDialog";
import { Logout } from "@/app/Service/User";
import { RemoveUser } from "../../redux/reducer/user/loginReducer";
import { useRouter } from "next/navigation";
import UserProfile from "@/app/Components/profile/UserProfile";
import TabSection from "@/app/Components/profile/TabSection";
import WishlistItem from "@/app/Components/profile/WishlistProduct";
import DeleteIcon from "@mui/icons-material/Delete"; // Import the delete icon
import Cookies from "js-cookie";

const Layout = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth?.user?.data?.user._id);
  const user = useSelector((state) => state.auth?.user?.data?.user);
  const [activeTab, setActiveTab] = useState(0); // Track the active tab
  const [notifications, setNotifications] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [order, setOrder] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();
  const [openDeleteAccountDialog, setOpenDeleteAccountDialog] = useState(false);
  const [hoveredNotificationId, setHoveredNotificationId] = useState(null);

  const theme = useTheme();
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    // Reset dialog states when switching tabs
    if (newValue === 3) {
      setOpenDialog(true);
      setOpenDeleteAccountDialog(false); // Ensure delete dialog is closed
    } else if (newValue === 4) {
      setOpenDeleteAccountDialog(true);
      setOpenDialog(false); // Ensure logout dialog is closed
    } else {
      setOpenDialog(false); // Close dialog on other tabs
      setOpenDeleteAccountDialog(false); // Close delete account dialog on other tabs
    }

    if (newValue === 1) {
      fetchWishlist(); // Fetch wishlist when the tab is activated
    }
  };

  // Fetch notifications when the "Notifications" tab is selected
  useEffect(() => {
    if (activeTab === 0) notify();
    if (activeTab === 1) fetchWishlist();
    if (activeTab === 2) fetchOrder();
  }, [activeTab]);

  const notify = async () => {
    try {
      const response = await getNotifications(userId);
      setNotifications(response); // Store the notifications in state
    } catch (e) {
      console.log(e);
    }
  };
  // delete notify
  const handleDeleteNotification = async (notificationId) => {
    try {
      await DeleteNotifications(userId, notificationId);
      toast.success("Notification removed!");
      // Update notifications state correctly
      setNotifications((prevNotifications) =>
        prevNotifications.filter(
          (notification) => notification._id !== notificationId
        )
      );
    } catch (e) {
      console.log("notify delete", e);
      toast.error("Failed to remove notification.");
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
  // fetch order otems
  const fetchOrder = async () => {
    try {
      const response = await getOrder(userId);
      console.log("res", response);
      setOrder(response);
    } catch (error) {
      console.log(error);
    }
  };
  // Handle logout confirmation
  const handleLogoutConfirm = async () => {
    try {
      await Logout({ userId: userId });
      Cookies.remove("user");
      dispatch(RemoveUser());
      toast.success("User logged out successfully.");
      router.push("/");
      setOpenDialog(false); // Close dialog after logout
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setOpenDialog(false); // Close dialog after logout
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await DeleteAccount(userId);
      Cookies.remove("user");
      dispatch(RemoveUser());
      toast.success("Account deleted successfully.");
      router.push("/");
      setOpenDeleteAccountDialog(false); // Close dialog after logout
    } catch (error) {
      toast.error("Failed to delete account: " + error.message);
    }
  };

  const handleRemoveFromWishlist = async (productId) => {
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
            <Box
              p={2}
              sx={{
                backgroundColor: theme.palette.background.default, // Use theme-based background
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                mx: "auto"
              }}
            >
              {/* Optional Title */}
              {/* <Typography variant="h5" className="text-blue-600 mb-4">
                Notifications
            </Typography> */}
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <Paper
                    key={notification._id}
                    sx={{
                      p: 2,
                      mb: 2,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor: theme.palette.background.main,
                      borderLeft: `4px solid ${theme.palette.primary.main}`,
                      boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                      position: "relative" // To position the delete icon
                    }}
                    onMouseEnter={() =>
                      setHoveredNotificationId(notification._id)
                    } // Set hovered id
                    onMouseLeave={() => setHoveredNotificationId(null)}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.text.primary,
                        flexGrow: 1,
                        fontWeight: "bold"
                      }} // Allow the message to take available space
                    >
                      {notification.notify}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary, // Theme-based secondary text color
                        minWidth: "120px",
                        textAlign: "right",
                        ml: 2
                      }}
                    >
                      {new Date(notification.timestamp).toLocaleString([], {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true
                      })}
                    </Typography>
                    {hoveredNotificationId === notification._id && ( // Show delete icon on hover
                      <IconButton
                        onClick={() =>
                          handleDeleteNotification(notification._id)
                        } // Call delete handler
                        sx={{
                          position: "absolute",
                          right: "8px", // Adjust position
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: theme.palette.error.main // Theme-based error color
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Paper>
                ))
              ) : (
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  No notifications available.
                </Typography>
              )}
            </Box>
          )}

          {activeTab === 1 && (
            <Box
              p={2}
              sx={{
                backgroundColor: theme.palette.background.default,
                display: "flex",
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                mx: "auto"
              }}
            >
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
          {activeTab === 2 && (
            <Box
              p={2}
              sx={{
                backgroundColor: theme.palette.background.default, // Use theme-based background
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                mx: "auto"
              }}
            >
              {order.length > 0 ? (
                order.map((orderItem, index) => (
                  <Box key={orderItem._id}>
                    <Card
                      sx={{
                        marginBottom: 2,
                        borderRadius: 2,
                        boxShadow: 1,
                        border: `1px solid ${theme.palette.divider}`, // Use theme divider color
                        backgroundColor: theme.palette.card.background
                      }}
                    >
                      <CardContent>
                        <Typography variant="h5" component="div" gutterBottom>
                          Order ID: {orderItem._id}
                        </Typography>
                        <Grid
                          container
                          justifyContent="space-between"
                          sx={{ marginBottom: 2 }}
                        >
                          <Grid item xs={6}>
                            <Typography
                              variant="body1"
                              color={theme.palette.text.secondary}
                            >
                              Order Status: {orderItem.orderStatus}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} container justifyContent="flex-end">
                            <Typography
                              variant="body1"
                              color={theme.palette.text.secondary}
                              sx={{ textAlign: "right" }}
                            >
                              Order Date:{" "}
                              {new Date(
                                orderItem.createdAt
                              ).toLocaleDateString()}
                            </Typography>
                          </Grid>
                        </Grid>

                        <Divider sx={{ margin: "16px 0" }} />

                        <Box
                          sx={{
                            border: `1px dotted ${theme.palette.divider}`,
                            borderRadius: 2,
                            marginBottom: 2
                          }}
                        >
                          {orderItem.product.map((item, index) => (
                            <Box key={item._id}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  borderRadius: 1
                                }}
                              >
                                <CardMedia
                                  component="img"
                                  image={item.product.image}
                                  alt={item.product.name}
                                  sx={{
                                    width: 80,
                                    height: 80,
                                    objectFit: "cover",
                                    margin: 1
                                  }} // Smaller image
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                  <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                      <Typography variant="h6">
                                        {item.product.name}
                                      </Typography>
                                    </Grid>
                                    <Grid
                                      item
                                      xs={6}
                                      container
                                      justifyContent="flex-end"
                                    >
                                      <Typography
                                        variant="body1"
                                        sx={{
                                          color: theme.palette.primary.main,
                                          marginTop: 1
                                        }}
                                      >
                                        Price: ₹
                                        {item.product.discounted_price.toFixed(
                                          2
                                        )}
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <Typography
                                        variant="body1"
                                        color={theme.palette.text.secondary}
                                      >
                                        {item.product.description}
                                      </Typography>
                                    </Grid>
                                    <Grid
                                      item
                                      xs={6}
                                      container
                                      justifyContent="flex-end"
                                    >
                                      <Typography
                                        variant="body1"
                                        color={theme.palette.text.secondary}
                                        sx={{ textAlign: "right" }}
                                      >
                                        Qty: {item.quantity}
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </CardContent>
                              </Box>

                              {/* Divider between products */}
                              {index < orderItem.product.length - 1 && (
                                <Divider sx={{ margin: "8px 0" }} />
                              )}
                            </Box>
                          ))}
                        </Box>

                        <Divider sx={{ margin: "16px 0" }} />

                        <Grid container justifyContent="space-between">
                          <Grid item>
                            <Typography
                              variant="body1"
                              color={theme.palette.text.secondary}
                            >
                              Payment Type: {orderItem.paymentType}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography
                              variant="body1"
                              color={theme.palette.text.secondary}
                            >
                              Total Price: ₹{orderItem.discountedPrice}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                    {/* {index < order.length - 1 && (
                      <Divider sx={{ margin: "16px 0" }} />
                    )}{" "} */}
                    {/* Divider between orders */}
                  </Box>
                ))
              ) : (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                >
                  No orders found.
                </Typography>
              )}
            </Box>
          )}
        </Grid>
      </Grid>

      {/* Confirmation Dialog for Logout */}
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
