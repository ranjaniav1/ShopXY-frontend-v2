import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import Link from "next/link";
import { Search as SearchIcon } from "@mui/icons-material";
import NavCartButton from "./NavCartButton";
import NavAuthButtons from "./NavAuthButtons";
import CustomModal from "@/app/Custom/CustomModal";
import NavSearchBar from "./NavSearchBar";

const SmallScreenNav = ({ setDrawerOpen,user }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input


  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" p={2} sx={{ width: "100%" }}>
      {/* Logo */}
      <Link href="/" passHref>
        <div className="text-xl font-semibold">
          <span style={{ color: "#22aa99" }}>S</span>hopXY
        </div>
      </Link>

      <Box display="flex" alignItems="center">
        {/* ✅ Search Icon (Opens Modal) */}
        <IconButton onClick={() => setIsSearchOpen(true)} size="small">
          <SearchIcon />
        </IconButton>

        {/* Login/Account Button */}
        {user ? (
          <>
            <Link href="/user/profile" passHref>
              <img  src={`${user?.avatar}?sz=64`}alt="Avatar" className="w-8 h-8 rounded-md object-cover" />
            </Link>
            <NavCartButton />
          </>
        ) : (
          <NavAuthButtons />
        )}

        {/* Hamburger Menu Icon */}
        <IconButton onClick={() => setDrawerOpen(true)} size="small">
          <MenuIcon />
        </IconButton>
      </Box>

      {/* ✅ Render Modal only when open */}
      <CustomModal open={isSearchOpen} onClose={() => setIsSearchOpen(false)} height="450px" title="search">
        <NavSearchBar onClose={() => setIsSearchOpen(false)}/>
      </CustomModal>
    </Box>
  );
};

export default SmallScreenNav;
