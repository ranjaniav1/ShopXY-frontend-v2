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
import { useTheme } from "@/app/context/ThemeContext";
import { useRouter } from "next/navigation";

const SmallScreenNav = ({ setDrawerOpen, user }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const { webSettings } = useTheme()
  const router = useRouter();

  const handleSearch = () => {
    const query = searchQuery.trim();
    if (query) {
      setIsSearchOpen(false); // ✅ Close modal first
      setTimeout(() => {
        router.push(`/product/${encodeURIComponent(query)}`);
      }, 100); // slight delay ensures modal is removed first
    }
  };
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" p={2} sx={{ width: "100%" }}>
      {/* Logo */}
      <Link href="/" passHref>
        <img src={webSettings?.logo} alt="Site Logo" className="h-16 w-auto object-contain" />
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
              <img src={`${user?.avatar}?sz=64`} alt="Avatar" className="w-8 h-8 rounded-md object-cover" />
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
        <NavSearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
        />      </CustomModal>
    </Box>
  );
};

export default SmallScreenNav;
