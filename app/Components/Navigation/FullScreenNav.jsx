import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, IconButton } from "@mui/material";
import Link from "next/link";
import NavSearchBar from "./NavSearchBar";
import NavProfileMenu from "./NavProfileMenu";
import NavCartButton from "./NavCartButton";
import NavAuthButtons from "./NavAuthButtons";
import { useTheme } from "@/app/context/ThemeContext";
import { useRouter } from "next/navigation";

const FullScreenNav = ({ setDrawerOpen, user }) => {
  const { webSettings } = useTheme()
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const query = searchQuery.trim();
    if (query) {
      router.push(`/product/${encodeURIComponent(query)}`);
    }
  };
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
    >
      {/* Logo */}
      <Link href="/" className="flex item-center">
        <img src={webSettings?.logo} alt="Site Logo" className="h-16 w-auto object-contain" />
      </Link>

      {/* Search Field */}
      <NavSearchBar searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch} />

      {/* Account and Cart Menu */}
      <div className="flex space-x-2">
        {user ? (<>
          <NavProfileMenu user={user} />  <NavCartButton /> </>
        ) : (
          <NavAuthButtons />
        )}
        <IconButton size="small">
          <MoreVertIcon onClick={() => setDrawerOpen(true)} />
        </IconButton>
      </div>
    </Box>
  );
};

export default FullScreenNav;
