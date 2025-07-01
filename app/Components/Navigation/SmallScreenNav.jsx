'use client'

import React, { useState } from "react";
import { Menu, Search } from "lucide-react"; // ✅ Lucide icons
import Link from "next/link";
import NavCartButton from "./NavCartButton";
import NavAuthButtons from "./NavAuthButtons";
import CustomModal from "@/app/Custom/CustomModal";
import NavSearchBar from "./NavSearchBar";
import { useTheme } from "@/app/context/ThemeContext";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import ClientLink from "@/app/Common/ClientClick";

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
      <ClientLink href="/" className="flex items-center">
        <img
          src={webSettings?.logo}
          alt="Site Logo"
          className="h-14 w-auto object-contain"
        />
      </ClientLink>

      <div className="flex items-center gap-2">
        {/* Search Button */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="p-2 hover:bg-secondary/20 rounded-md"
        >
          <Search className="w-5 h-5 text-primary" />
        </button>

        {/* Avatar & Cart */}
        {user ? (
          <>
            <ClientLink href="/user/profile">
              <img
                src={`${user?.avatar}?sz=64`}
                alt="Avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
            </ClientLink>
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
          <Menu className="w-5 h-5 text-primary" />
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
