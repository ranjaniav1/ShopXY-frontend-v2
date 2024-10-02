"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
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
  Button
} from "@mui/material";
import CustomBox from "@/app/Custom/CustomBox";
import { toast } from "react-hot-toast";
import DialogBox from "@/app/Custom/CustomDialog";
import { logout } from "@/app/redux/reducer/user/loginReducer";
import { Logout } from "@/app/Service/User";
import { RemoveUser } from "../../redux/reducer/user/loginReducer";
import { useRouter } from "next/navigation";
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
  const [order, setOrder] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();
  const [openDeleteAccountDialog, setOpenDeleteAccountDialog] = useState(false);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    if (newValue === 3) {
      setOpenDialog(true);
    } else if (newValue === 4) {
      setOpenDeleteAccountDialog(true); // Delete account dialog
    } else if (newValue === 1) {
      fetchWishlist(); // Fetch wishlist when the tab is activated
    }
  };

  // Fetch notifications when the "Notifications" tab is selected
  useEffect(() => {
    if (activeTab === 0) {
      notify();
    } else if (activeTab === 1) {
      fetchWishlist();
    }
    if (activeTab === 2) {
      fetchOrder();
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
            <Box p={2} className="bg-gray-100 rounded-md shadow-md mx-auto">
              {/* Optional Title */}
              {/* <Typography variant="h5" className="text-blue-600 mb-4">
                Notifications
            </Typography> */}
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <Paper
                    key={notification.id}
                    sx={{
                      p: 2,
                      mb: 2,
                      display: "flex", // Use flexbox for layout
                      justifyContent: "space-between", // Space between message and timestamp
                      alignItems: "center", // Center vertically
                      backgroundColor: "#fff",
                      borderLeft: "4px solid #00796b",
                      boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    <Typography
                      variant="body1"
                      className="font-semibold text-gray-700"
                      sx={{ flexGrow: 1 }} // Allow the message to take available space
                    >
                      {notification.notify}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="text-gray-500 ml-2"
                      sx={{ minWidth: "120px", textAlign: "right" }} // Fixed width for alignment
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
            <Box
              p={2}
              className="bg-gray-100 rounded-md shadow-md mx-auto flex "
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
            <Box p={2} className="bg-gray-100 rounded-md shadow-lg mx-auto">
              {order.length > 0 ? (
                order.map((orderItem, index) => (
                  <Box key={orderItem._id}>
                    <Card
                      sx={{
                        marginBottom: 2,
                        borderRadius: 2,
                        boxShadow: 1,
                        border: "1px solid #e0e0e0",
                        backgroundColor: "#ffffff"
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
                            <Typography variant="body1" color="text.secondary">
                              Order Status: {orderItem.orderStatus}
                            </Typography>
                          </Grid>
                          <Grid item xs={6} container justifyContent="flex-end">
                            <Typography
                              variant="body1"
                              color="text.secondary"
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
                            border: "1px dotted #e0e0e0",
                            borderRadius: 2,
                            // padding: 2,
                            backgroundColor: "#ffffff", // Optional background color
                            // boxShadow: 2, // Optional shadow for better visibility
                            marginBottom: 2 // Space below the order card
                          }}
                        >
                          {orderItem.product.map((item, index) => (
                            <Box key={item._id}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  borderRadius: 1,
                                
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
                                        sx={{ color: "#f57c00", marginTop: 1 }}
                                      >
                                        Price: $
                                        {item.product.discounted_price.toFixed(
                                          2
                                        )}
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <Typography
                                        variant="body1"
                                        color="text.secondary"
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
                                        color="text.secondary"
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
                            <Typography variant="body1" color="text.secondary">
                              Payment Type: {orderItem.paymentType}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="body1" color="text.secondary">
                              Total Price: ${orderItem.totalPrice.toFixed(2)}
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
