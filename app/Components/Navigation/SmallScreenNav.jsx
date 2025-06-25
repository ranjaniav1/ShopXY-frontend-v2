"use client";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import NavCartButton from "./NavCartButton";
import NavAuthButtons from "./NavAuthButtons";
import CustomModal from "@/app/Custom/CustomModal";
import NavSearchBar from "./NavSearchBar";
import { useTheme } from "@/app/context/ThemeContext";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";

const SmallScreenNav = ({ setDrawerOpen }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { webSettings } = useTheme();
  const router = useRouter();
  const { user } = useUser();

  const handleSearch = () => {
    const query = searchQuery.trim();
    if (query) {
      setIsSearchOpen(false);
      setTimeout(() => {
        router.push(`/product/${encodeURIComponent(query)}`);
      }, 100);
    }
  };

  return (
    <div className="flex justify-between items-center w-full px-4 py-2 border-b border-secondary bg-body">
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <img
          src={webSettings?.logo}
          alt="Site Logo"
          className="h-14 w-auto object-contain"
        />
      </Link>

      <div className="flex items-center gap-2">
        {/* Search Button */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="p-2 hover:bg-secondary/20 rounded-md"
        >
          <SearchIcon className="text-primary" />
        </button>

        {/* Auth / Avatar + Cart */}
        {user ? (
          <>
            <Link href="/user/profile">
              <img
                src={`${user?.avatar}?sz=64`}
                alt="Avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
            </Link>
            <NavCartButton />
          </>
        ) : (
          <NavAuthButtons />
        )}

        {/* Drawer Button */}
        <button
          onClick={() => setDrawerOpen(true)}
          className="p-2 hover:bg-secondary/20 rounded-md"
        >
          <MenuIcon className="text-primary" />
        </button>
      </div>

      {/* Search Modal */}
      <CustomModal
        open={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        title="Search"
        height="450px"
      >
        <NavSearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
        />
      </CustomModal>
    </div>
  );
};

export default SmallScreenNav;
