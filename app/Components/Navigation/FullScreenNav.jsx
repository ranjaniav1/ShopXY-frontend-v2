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

    if (query) router.push(`collection/${encodeURIComponent(query)}`);
  };

  const toggleTheme = () => {
    switchTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="flex justify-between items-center px-4 py-2 h-[72px] text-tprimary relative z-50 ">
      {/* Left: Logo & Nav links */}
      <div className="flex items-center gap-4">
        {/* Logo */}
        <ClientLink href="/" className="flex items-center">
          <img src={webSettings?.logo} alt="Site Logo" className="h-10 w-auto" />
        </ClientLink>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex gap-4 text-[15px] font-medium text-tprimary">
          <ClientLink href="/category/stationary">Stationary</ClientLink>
          <ClientLink href="/category/fashion">Fashions</ClientLink>
          <ClientLink href="/collection/laptop">Laptop</ClientLink>
          <ClientLink href="/collection/camara">Camera</ClientLink>
        </div>
      </div>

      {/* Search (desktop only) */}
      <div className="hidden lg:flex flex-grow max-w-xl mx-6">
        <NavSearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
        />
      </div>

      {/* Right: Theme toggle, language, cart, profile/auth */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={toggleTheme}
          className="p-2 rounded hover:bg-primary/20 transition"
          aria-label="Toggle Theme"
        >
          {theme === "dark" ? (
            <Moon className="w-5 h-5 text-primary" />
          ) : (
            <Sun className="w-5 h-5 text-primary" />
          )}
        </button>

        <select
          value={language}
          onChange={handleLanguageChange}
          className="text-sm px-2 p-2 border rounded bg-body text-tprimary"
        >
          <option value="en">EN</option>
          <option value="hi">HI</option>
          <option value="gu">GU</option>
          <option value="fr">FR</option>
        </select>

       
        {user ? <> <NavCartButton count={5} /> <NavProfileMenu /></> : <NavAuthButtons />}
      </div>

      
    </div>
  );
};

export default FullScreenNav;
