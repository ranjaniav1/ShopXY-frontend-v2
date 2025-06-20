import React, { useState } from "react";
import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material"; // Importing the edit icon from MUI
import CustomModal from "@/app/Custom/CustomModal";
import EditUserModal from "./EditUserModal";
import CustomTypography from "@/app/Custom/CustomTypography";

const UserProfile = ({ user }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  // Handler to toggle modal
  const onEditClick = () => {
    setOpen(true);
  };

  // Handler to close modal
  const handleClose = () => {
    setOpen(false);
  };
  console.log("avatar",user?.avatar)
  return (
    <Box
      sx={{
        position: "relative", // For positioning the edit itcon
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 3,
        mb: 4,
        background: `linear-gradient(135deg, ${theme.palette.card.background}, ${theme.palette.primary.main})`, // Theme-based background
        borderRadius: "12px",
        boxShadow: theme.shadows[3]
      }}
    >
      {" "}
      {/* Edit Icon in the top-right corner */}
      <IconButton
        onClick={onEditClick}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          color: theme.palette.grey[50] // Theme-based color for the icon
        }}
      >
        <EditIcon />
      </IconButton>
      <img
        src={user?.avatar}
        alt={user?.fullname || "Avatar"}
        style={{
          width: "130px",
          height: "130px",
          marginBottom: "16px",
          border: `2px solid ${theme.palette.secondary.main}`,
          borderRadius: "50%",
          objectFit: "cover", // important
        }}
      />

      <CustomTypography
        variant="h5"
        sx={{ fontWeight: "bold", color: theme.palette.text.primary }}
      >
        {user?.fullname || "Your Name"}
      </CustomTypography>
      <CustomTypography variant="body1" sx={{ color: theme.palette.text.secondary }}>
        {user?.email || "Email not available"}
      </CustomTypography>
      <CustomTypography variant="body1" sx={{ color: theme.palette.text.secondary }}>
        {user?.phone || "Phone not available"}
      </CustomTypography>
      <CustomModal open={open} onClose={handleClose} title="Edit Profile">
        <EditUserModal user={user} onClose={handleClose} />
      </CustomModal>
    </Box>
  );
};

export default UserProfile;
