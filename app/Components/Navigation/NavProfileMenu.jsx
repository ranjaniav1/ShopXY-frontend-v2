"use client"
const { Logout } = require("@/app/Service/User");
const { IconButton, Menu, MenuItem } = require("@mui/material");
const { useRouter } = require("next/navigation");
const { useState } = require("react");
import { useUser } from "@/app/context/UserContext";
import toast from "react-hot-toast";
const NavProfileMenu = () => {
  const { setUser, user } = useUser()
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);

  console.log("users", user)
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };


  const handleLogout = async () => {
    handleCloseMenu(); // Close menu before logout
    try {
      await Logout({ userId: user._id });
      setUser(null)
      toast.success("User logged out successfully.");
      router.push("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleProfileClick = () => {
    handleCloseMenu(); // Close menu before navigating
    router.push("/user/profile");
  };

  return (
    <>
      <IconButton onClick={handleOpenMenu}>
        <img src={user?.avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};
export default NavProfileMenu;
