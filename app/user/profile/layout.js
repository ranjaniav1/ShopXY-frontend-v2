"use client";
import CustomBox from "@/app/Custom/CustomBox";
import { getNotifications } from "@/app/Service/Profile";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  Typography,
  Tabs,
  Tab
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const userId = useSelector((state) => state.auth?.user?.data?.user._id);
  const user = useSelector((state) => state.auth?.user?.data?.user);
  const [activeTab, setActiveTab] = useState(0); // Track the active tab
  const [notifications, setNotifications] = useState([]); // Store notifications

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
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
      console.log("res", response);
      setNotifications(response); // Store the notifications in state
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    notify();
  }, []);
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
              mb: 4, // Add some margin at the bottom for spacing
              backgroundColor: "#f9f9f9", // Give the profile section a light background
              borderRadius: "8px" // Rounded corners
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
              backgroundColor: "#fff", // Keep the tabs section with a white background
              borderRadius: "8px", // Same rounded corners for consistency
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" // Add shadow for slight elevation
            }}
          >
            <Tabs
              orientation="vertical"
              value={activeTab}
              onChange={handleTabChange}
              sx={{ width: "100%" }}
            >
              <Tab label="Notifications" />
              <Tab label="Orders" />
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
              {/* Display the notifications data */}
              {notifications ? (
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
              <Typography variant="h5">Orders</Typography>
              {/* Orders content can go here */}
            </Box>
          )}
          {activeTab === 2 && (
            <Box p={2}>
              <Typography variant="h5">Delete Account</Typography>
              {/* Delete Account content can go here */}
            </Box>
          )}
          {activeTab === 3 && (
            <Box p={2}>
              <Typography variant="h5">Logout</Typography>
              {/* Add a logout button or functionality here */}
            </Box>
          )}
        </Grid>
        <Grid xs={12} md={8}>
          {children && activeTab === 0 && <Box p={2}>{children}</Box>}
        </Grid>
      </Grid>
    </CustomBox>
  );
};

export default Layout;
