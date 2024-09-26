"use client";
import CustomBox from "@/app/Custom/CustomBox";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  Typography,
  Tabs,
  Tab
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const user = useSelector((state) => state.auth?.user?.data?.user);
  const [activeTab, setActiveTab] = useState(0); // Track the active tab

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <CustomBox>
      <Grid container spacing={4}>
        {/* left side with profile and tabs in separate sections */}
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

        {/* right side with dynamic content based on selected tab */}
        <Grid item xs={12} md={8}>
          {activeTab === 0 && (
            <Box p={2}>
              <Typography variant="h5">Notifications</Typography>
              {/* Notification content can go here */}
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

          {/* Default children content if needed */}
          {children && activeTab === 0 && <Box p={2}>{children}</Box>}
        </Grid>
      </Grid>
    </CustomBox>
  );
};

export default Layout;
