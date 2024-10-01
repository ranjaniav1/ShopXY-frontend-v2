import React from "react";
import { Avatar, Box, Typography } from "@mui/material";

const UserProfile = ({ user }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 3,
        mb: 4,
        background: "linear-gradient(135deg, #e0f7fa, #26a69a)",
        borderRadius: "12px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)"
      }}
    >
      <Avatar
        src={user?.avatar || "/default-avatar.png"}
        alt={user?.fullname || "User Avatar"}
        sx={{
          width: 130,
          height: 130,
          mb: 2,
          border: "2px solid #22aa99"
        }}
      />
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        {user?.fullname || "Your Name"}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        {user?.email || "Email not available"}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        {user?.phone || "Phone not available"}
      </Typography>
    </Box>
  );
};

export default UserProfile;
