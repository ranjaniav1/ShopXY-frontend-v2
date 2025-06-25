"use client";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Link from "next/link";
import NavSearchBar from "./NavSearchBar";
import NavProfileMenu from "./NavProfileMenu";
import NavCartButton from "./NavCartButton";
import NavAuthButtons from "./NavAuthButtons";
import { useTheme } from "@/app/context/ThemeContext";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";

const FullScreenNav = ({ setDrawerOpen }) => {
  const { webSettings } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { user } = useUser();

  const handleSearch = () => {
    const query = searchQuery.trim();
    if (query) {
      router.push(`/product/${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="flex justify-between items-center py-2 px-4">
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <img
          src={webSettings?.logo}
          alt="Site Logo"
          className="h-16 w-auto object-contain"
        />
      </Link>

      {/* Search Field */}
      <NavSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
      />

      {/* Account + Cart + Drawer Button */}
      <div className="flex items-center gap-2">
        {user ? (
          <>
            <NavProfileMenu />
            <NavCartButton />
          </>
        ) : (
          <NavAuthButtons />
        )}
        <button
          onClick={() => setDrawerOpen(true)}
          className="p-2 hover:bg-secondary/20 rounded"
        >
          <MoreVertIcon className="text-primary" />
        </button>
      </div>
    </div>
  );
};

export default FullScreenNav;
