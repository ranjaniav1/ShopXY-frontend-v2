import React from "react";
import { Box, Tabs, Tab } from "@mui/material";

const TabSection = ({ activeTab, handleTabChange }) => {
  return (
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
        <Tab label="Logout" />
        <Tab label="Delete Account" />
      </Tabs>
    </Box>
  );
};

export default TabSection;
