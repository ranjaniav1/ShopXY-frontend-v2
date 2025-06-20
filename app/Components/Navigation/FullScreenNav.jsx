'use client';
import React, { useState } from "react";
import Link from "next/link";
import NavSearchBar from "./NavSearchBar";
import NavProfileMenu from "./NavProfileMenu";
import NavCartButton from "./NavCartButton";
import { useTheme } from "@/app/context/ThemeContext";
import { useUser } from "@/app/context/UserContext";
import AuthModal from "../model/AuthModal";
import { MoreVertical } from "lucide-react";
import CustomButton from "@/app/Custom/CustomButton";

const FullScreenNav = ({ setDrawerOpen }) => {
  const { webSettings } = useTheme();
  const { user } = useUser();

  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center p-4 bg-body border-b border-gray-200">
        {/* Logo */}
        <Link href="/">
          {webSettings?.logo ? (
            <img
              src={webSettings.logo}
              alt="Site Logo"
              className="h-10 w-auto object-contain"
            />
          ) : (
            <div className="text-xl font-semibold text-primary">
              <span>S</span>hopXY
            </div>
          )}
        </Link>

        {/* Search Field */}
        <NavSearchBar />

        {/* Account and Cart Menu */}
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <NavProfileMenu user={user} />
              <NavCartButton />
            </>
          ) : (
            <>
              <CustomButton
                variant="outlined"
                title="Login / Register"
                onClick={() => setAuthOpen(true)}
                className="!text-primary border border-primary hover:bg-primary hover:text-white"
              />
            </>
          )}
          <CustomButton
            variant="text"
            onClick={() => setDrawerOpen(true)}
            startIcon={<MoreVertical className="w-5 h-5" />}
            className="p-2 rounded-full text-gray-600 hover:bg-gray-100"
          />
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
};

export default FullScreenNav;
