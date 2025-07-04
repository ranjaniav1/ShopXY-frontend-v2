"use client";

import React, { useState } from "react";
import { MoreVertical } from "lucide-react"; // ✅ Lucide icon
import Link from "next/link";
import NavSearchBar from "./NavSearchBar";
import NavProfileMenu from "./NavProfileMenu";
import NavCartButton from "./NavCartButton";
import NavAuthButtons from "./NavAuthButtons";
import { useTheme } from "@/app/context/ThemeContext";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import ClientLink from "@/app/Common/ClientClick";

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
      <ClientLink href="/" className="flex items-center">
        <img
          src={webSettings?.logo}
          alt="Site Logo"
          className="h-16 w-auto"
        />
      </ClientLink>

      {/* Search Bar */}
      <NavSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
      />

      {/* Right Side Buttons */}
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
          <MoreVertical className="w-5 h-5 text-primary" />
        </button>
      </div>
    </div>
  );
};

export default FullScreenNav;
