"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Sun, Moon } from "lucide-react";

import { useUser } from "@/app/context/UserContext";
import { useTheme } from "@/app/context/ThemeContext";
import { useLanguage } from "@/app/context/LanguageContext";

import NavSearchBar from "./NavSearchBar";
import NavProfileMenu from "./NavProfileMenu";
import NavCartButton from "./NavCartButton";
import NavAuthButtons from "./NavAuthButtons";
import ClientLink from "@/app/Common/ClientClick";

const FullScreenNav = () => {
  const { user } = useUser();
  const { webSettings, theme, switchTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const query = searchQuery.trim();
    if (query) router.push(`/${encodeURIComponent(query)}`);
  };

  const toggleTheme = () => {
    switchTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="flex justify-between items-center py-2 h-[72px] text-tprimary relative z-50">
      {/* Logo + Navigation Links */}
      <div className="flex items-center gap-6">
        <ClientLink href="/" className="flex items-center">
          <img src={webSettings?.logo} alt="Site Logo" className="h-10 w-auto" />
        </ClientLink>

        <div className="hidden lg:flex gap-4 text-[15px] font-medium">
          <ClientLink href="/categories">Categories</ClientLink>
          <ClientLink href="/collections">Collections</ClientLink>
          <ClientLink href="/brands">Brands</ClientLink>
          <ClientLink href="/deals">Deals</ClientLink>
        </div>
      </div>

      {/* Search */}
      <div className="hidden lg:flex flex-grow max-w-xl mx-6">
        <NavSearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
        />
      </div>

      {/* Right-side actions */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded hover:bg-secondary/20 transition"
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? <Moon className="w-5 h-5 text-primary" /> : <Sun className="w-5 h-5 text-primary" />}
        </button>

        {/* Language Selector */}
        <select
          value={language}
          onChange={handleLanguageChange}
          className="text-sm px-2 py-1 border rounded bg-white text-tprimary"
        >
          <option value="en">EN</option>
          <option value="hi">HI</option>
          <option value="gu">GU</option>
          <option value="fr">FR</option>
        </select>

        {/* Cart + Auth/Profile */}
        <NavCartButton count={5} />
        {user ? <NavProfileMenu /> : <NavAuthButtons />}
      </div>
    </div>
  );
};

export default FullScreenNav;
