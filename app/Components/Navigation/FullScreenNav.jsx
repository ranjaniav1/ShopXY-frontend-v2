"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sun, Moon, Globe } from "lucide-react";

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
  const [langOpen, setLangOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = () => {
    const query = searchQuery.trim();
    if (query) router.push(`/collection/${encodeURIComponent(query)}`);
    setSearchQuery("")
  };

  const toggleTheme = () => {
    switchTheme(theme === "dark" ? "light" : "dark");
  };

  const languageOptions = [
    { code: "en", label: "English", flag: "US" },
    { code: "hi", label: "Hindi", flag: "IN" },
    { code: "gu", label: "Gujarati", flag: "IN" },
    { code: "fr", label: "French", flag: "FR" },
  ];

  const navLinks = [
    { name: "Categories", href: "/categories" },
    { name: "Collections", href: "/collections" },
    { name: "Laptop", href: "/collection/laptop" },
    { name: "Camera", href: "/collection/camara" },
  ];

  return (
    <div className="flex justify-between items-center px-4 py-2 h-[72px] text-tprimary relative z-50">
      {/* Left: Logo & Nav links */}
      <div className="flex items-center gap-4">
        <ClientLink href="/" className="flex items-center">
          <img src={webSettings?.logo} alt="Site Logo" className="h-10 w-auto" />
        </ClientLink>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex gap-4 text-[15px] font-medium text-tprimary">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <ClientLink
                key={link.href}
                href={link.href}
                className={`relative px-2 py-1 transition-all duration-300
                  ${isActive ? "text-primary" : "text-tprimary"}
                  after:absolute after:left-0 after:bottom-0 after:h-[2px]
                  after:w-full after:bg-primary after:transition-transform after:duration-300
                  ${isActive ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}
                  after:origin-left
                `}
              >
                {link.name}
              </ClientLink>
            );
          })}
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
      <div className="flex items-center gap-2 sm:gap-3 relative">
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

        {/* Language dropdown with flags */}
        <div className="relative">
          <button
            onClick={() => setLangOpen((prev) => !prev)}
            className="flex items-center gap-1 text-sm font-medium hover:text-primary px-2 py-1"
          >
            <Globe size={16} />
            <span>{languageOptions.find((l) => l.code === language)?.flag}</span>
          </button>

          {langOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-body shadow-lg rounded-md z-50">
              {languageOptions.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setLangOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm  ${
                    lang.code === language ? "text-t-primary font-semibold" : "text-t-secondary"
                  }`}
                >
                  <span className="mr-2">{lang.flag}</span>
                  {lang.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {user ? (
          <>
            <NavCartButton />
            <NavProfileMenu />
          </>
        ) : (
          <NavAuthButtons />
        )}
      </div>
    </div>
  );
};

export default FullScreenNav;
