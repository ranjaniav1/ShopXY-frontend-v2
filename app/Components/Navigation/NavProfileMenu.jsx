import React, { useState } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Logout } from "@/app/Service/User";
import toast from "react-hot-toast";
import { RemoveUser } from "@/app/redux/reducer/user/loginReducer";
import Cookies from "js-cookie";

const NavProfileMenu = () => {
  const user = useSelector((state) => state.auth?.user?.data?.user) || {};
  const dispatch = useDispatch();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await Logout({ userId: user._id });
      Cookies.remove("user");
      dispatch(RemoveUser());
      toast.success("User logged out successfully.");
      router.push("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
      <IconButton onClick={handleOpenMenu}>
        <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        <MenuItem onClick={() => router.push("/user/profile")}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default NavProfileMenu;
