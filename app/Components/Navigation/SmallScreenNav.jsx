import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import Link from "next/link";
import { Search as SearchIcon } from "@mui/icons-material";
import NavCartButton from "./NavCartButton";
import NavAuthButtons from "./NavAuthButtons";
import CustomModal from "@/app/Custom/CustomModal";
import SearchModal from "./SearchModal";
import NavSearchBar from "./NavSearchBar";

const SmallScreenNav = ({ setDrawerOpen }) => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth?.user?.data?.user) || {};
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    // Add your search logic here
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" p={2} sx={{ width: "100%" }}>
      {/* Logo */}
      <Link href="/" passHref>
        <div className="text-xl font-semibold">
          <span style={{ color: "#22aa99" }}>s</span>hopxy
        </div>
      </Link>

      <Box display="flex" alignItems="center">
        {/* ✅ Search Icon (Opens Modal) */}
        <IconButton onClick={() => setIsSearchOpen(true)} size="small">
          <SearchIcon />
        </IconButton>

        {/* Login/Account Button */}
        {isAuth ? (
          <>
            <Link href="/user/profile" passHref>
              <img src={user.avatar} alt="Avatar" className="w-8 h-7 rounded-md" />
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
        <NavSearchBar/>
      </CustomModal>
    </Box>
  );
};

export default SmallScreenNav;
