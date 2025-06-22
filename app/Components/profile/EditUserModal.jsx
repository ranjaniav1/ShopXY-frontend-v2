import React, { useState } from "react";
import { TextField, Button, Avatar, Box, IconButton } from "@mui/material";
import { EditUser } from "@/app/Service/User";
import { Edit as EditIcon } from "@mui/icons-material"; // Import edit icon
import toast from "react-hot-toast";
import { useUser } from "@/app/context/UserContext";

const EditUserModal = ({ user, onClose }) => {
  const [fullname, setFullname] = useState(user?.fullname || "");
  const [avatar, setAvatar] = useState(null); // Avatar will be a file object
  const { user: contextUser, setUser } = useUser(); // 👈 Get user from context
  const userId = contextUser?._id;



  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    console.log("File input changed:", e.target.files); // Log all selected files
    if (file) {
      setAvatar(file);
      console.log("Selected avatar:", file); // Log the selected file
    } else {
      console.log("No file selected."); // Log if no file is selected
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("userId", userId); // Append user ID
    formData.append("fullname", fullname); // Append full name
    // Only append avatar if it's selected
    if (avatar) {
      formData.append("avatar", avatar);
    }

    try {
      const response = await EditUser(formData);
      console.log("response of edit user", response)
      setUser({ user: response?.data?.user }); // Update the user state
      toast.success("Profile updated successfully");
      onClose(); // Close modal after success
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    }
  };



  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box position="relative">
        <Avatar
          src={
            avatar
              ? URL.createObjectURL(avatar)
              : user?.avatar || "/default-avatar.png"
          }
          sx={{ width: 70, height: 70, mb: 2 }}
        />
        {/* Edit icon in the bottom right corner of the Avatar */}
        <IconButton
          component="label"
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            bgcolor: "white", // Background color for better visibility
            borderRadius: "50%",
            boxShadow: 2 // Optional shadow for better visibility
          }}
          size="small"
        >
          <EditIcon sx={{ color: "primary.main" }} fontSize="small" />
          <input
            type="file"
            hidden
            onChange={handleAvatarChange}
            accept="image/*" // Optional: limit file type to images
          />
        </IconButton>
      </Box>
      <TextField
        label="Full Name"
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
        fullWidth
        margin="dense"
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        onClick={handleSubmit}
      >
        Save Changes
      </Button>
    </Box>
  );
};

export default EditUserModal;
