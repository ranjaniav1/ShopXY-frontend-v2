import React from "react";
import { Box, Tabs, Tab, useTheme } from "@mui/material";

const TabSection = ({ activeTab, handleTabChange }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: theme.palette.background.main,
        color: theme.palette.text.primary,
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
      }}
    >
      <Tabs
        orientation="vertical"
        value={activeTab}
        onChange={handleTabChange}
        sx={{
          width: "100%",
          "& .MuiTab-root": {
            color: theme.palette.text.primary, // Theme-based text color for tabs
            "&.Mui-selected": {
              color: theme.palette.primary.main, // Active tab color
            },
            "&:hover": {
              backgroundColor: theme.palette.background.secondary, // Hover effect based on theme
            }
          },
          "& .MuiTabs-indicator": {
            backgroundColor: theme.palette.primary.main, // Active tab indicator color
          }
        }}      >
        <Tab label="Notifications" />
        <Tab label="Wishlist" />
        <Tab label="Orders" />
        <Tab label="Address" />
        <Tab label="Logout" />
        <Tab label="Delete Account" />
      </Tabs>
    </Box>
  );
};

export default TabSection;
