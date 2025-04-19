import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {  Box, IconButton } from "@mui/material";
import {  useSelector } from "react-redux";
import Link from "next/link";
import NavSearchBar from "./NavSearchBar";
import NavProfileMenu from "./NavProfileMenu";
import NavCartButton from "./NavCartButton";
import NavAuthButtons from "./NavAuthButtons";

const FullScreenNav = ({ setDrawerOpen }) => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
    >
      {/* Logo */}
      <Link href="/">
        <div className="text-xl font-semibold">
          <span style={{ color: "#22aa99" }}>S</span>hopXY
        </div>
      </Link>

      {/* Search Field */}
      <NavSearchBar/>

      {/* Account and Cart Menu */}
      <div className="flex space-x-2">
        {isAuth ? (<NavProfileMenu/>
        ) : (
          <NavAuthButtons/>
        )}
       <NavCartButton/>
        <IconButton size="small">
          <MoreVertIcon onClick={() => setDrawerOpen(true)} />
        </IconButton>
      </div>
    </Box>
  );
};

export default FullScreenNav;
